"use client";

import Link from "next/link";
import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";

import { submitContactForm } from "@/app/(site)/contacto/actions";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  contactFormLimits,
  contactSubjectOptions,
} from "@/config/contact-form.config";
import type {
  ContactFormField,
  ContactFormState,
  ContactSubject,
} from "@/interfaces/contact-form.interface";
import { validateContactFormField } from "@/lib/contact-form/contact-form.validation";

import {
  TurnstileWidget,
  type TurnstileWidgetHandle,
} from "./TurnstileWidget";

interface ContactFormDraft {
  name: string;
  email: string;
  phone: string;
  subject: ContactSubject | "";
  message: string;
  privacyAccepted: boolean;
}

type FieldErrorOverrides = Partial<
  Record<ContactFormField, string | null>
>;

const contactFormFields: ContactFormField[] = [
  "name",
  "email",
  "phone",
  "subject",
  "message",
  "privacyAccepted",
];

const initialDraft: ContactFormDraft = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
  privacyAccepted: false,
};

const initialContactFormState: ContactFormState = {
  status: "idle",
  message: "",
  fieldErrors: {},
  turnstileResetRequired: false,
};

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const turnstileRef = useRef<TurnstileWidgetHandle>(null);
  const lastResetSubmissionId = useRef<string>(undefined);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(
    null,
  );
  const [draft, setDraft] = useState<ContactFormDraft>(initialDraft);
  const [touchedFields, setTouchedFields] = useState<
    Partial<Record<ContactFormField, boolean>>
  >({});
  const [fieldErrorOverrides, setFieldErrorOverrides] =
    useState<FieldErrorOverrides>({});
  const [state, formAction, pending] = useActionState(
    submitContactForm,
    initialContactFormState,
  );

  useEffect(() => {
    if (
      state.status !== "success" ||
      !state.submissionId ||
      state.submissionId === lastResetSubmissionId.current
    ) {
      return;
    }

    lastResetSubmissionId.current = state.submissionId;
    formRef.current?.reset();
    setDraft(initialDraft);
    setTouchedFields({});
    setFieldErrorOverrides({});
  }, [state.status, state.submissionId]);

  useEffect(() => {
    if (state.turnstileResetRequired) {
      turnstileRef.current?.reset();
    }
  }, [state]);

  function getFieldError(field: ContactFormField) {
    if (Object.hasOwn(fieldErrorOverrides, field)) {
      return fieldErrorOverrides[field] ?? undefined;
    }

    return state.fieldErrors[field]?.[0];
  }

  function setFieldError(field: ContactFormField, value: unknown) {
    const error = validateContactFormField(field, value)[0] ?? null;

    setFieldErrorOverrides((current) => ({
      ...current,
      [field]: error,
    }));
  }

  function updateField<Field extends ContactFormField>(
    field: Field,
    value: ContactFormDraft[Field],
  ) {
    setDraft((current) => ({
      ...current,
      [field]: value,
    }));

    if (
      touchedFields[field] ||
      state.fieldErrors[field] ||
      Object.hasOwn(fieldErrorOverrides, field)
    ) {
      setFieldError(field, value);
    }
  }

  function handleBlur(field: ContactFormField) {
    setTouchedFields((current) => ({
      ...current,
      [field]: true,
    }));
    setFieldError(field, draft[field]);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors: FieldErrorOverrides = {};
    let hasErrors = false;

    for (const field of contactFormFields) {
      const error = validateContactFormField(field, draft[field])[0] ?? null;
      nextErrors[field] = error;
      hasErrors ||= Boolean(error);
    }

    setTouchedFields(
      Object.fromEntries(
        contactFormFields.map((field) => [field, true]),
      ) as Record<ContactFormField, boolean>,
    );

    if (hasErrors) {
      setFieldErrorOverrides(nextErrors);
      return;
    }

    if (!turnstileToken) {
      return;
    }

    setFieldErrorOverrides({});

    const formData = new FormData(event.currentTarget);
    formData.set("turnstileToken", turnstileToken);

    startTransition(() => {
      formAction(formData);
    });
  }

  const nameError = getFieldError("name");
  const emailError = getFieldError("email");
  const phoneError = getFieldError("phone");
  const subjectError = getFieldError("subject");
  const messageError = getFieldError("message");
  const privacyAcceptedError = getFieldError("privacyAccepted");

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="relative mt-10 grid gap-6"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[10000px] size-px overflow-hidden"
      >
        <label htmlFor="contact-website">
          No completes este campo
        </label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Input
          label="Nombre completo"
          name="name"
          value={draft.name}
          onChange={(value) => updateField("name", value)}
          onBlur={() => handleBlur("name")}
          autoComplete="name"
          placeholder="Tu nombre"
          minLength={contactFormLimits.name.min}
          maxLength={contactFormLimits.name.max}
          validationBehavior="aria"
          isInvalid={Boolean(nameError)}
          errorMessage={nameError}
          isRequired
          fullWidth
        />

        <Input
          label="Correo electrónico"
          name="email"
          value={draft.email}
          onChange={(value) => updateField("email", value)}
          onBlur={() => handleBlur("email")}
          type="email"
          autoComplete="email"
          placeholder="tunombre@ejemplo.com"
          maxLength={contactFormLimits.email.max}
          validationBehavior="aria"
          isInvalid={Boolean(emailError)}
          errorMessage={emailError}
          isRequired
          fullWidth
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Input
          label="Celular o WhatsApp"
          name="phone"
          value={draft.phone}
          onChange={(value) => updateField("phone", value)}
          onBlur={() => handleBlur("phone")}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="Tu número de celular"
          maxLength={contactFormLimits.phone.max}
          validationBehavior="aria"
          isInvalid={Boolean(phoneError)}
          errorMessage={phoneError}
          fullWidth
        />

        <Select
          label="Asunto"
          name="subject"
          selectedKey={draft.subject || null}
          onSelectionChange={(key) =>
            updateField(
              "subject",
              typeof key === "string" ? (key as ContactSubject) : "",
            )
          }
          onBlur={() => handleBlur("subject")}
          placeholder="Selecciona un asunto"
          options={contactSubjectOptions}
          validationBehavior="aria"
          isInvalid={Boolean(subjectError)}
          errorMessage={subjectError}
          isRequired
          fullWidth
        />
      </div>

      <Textarea
        label="Mensaje"
        name="message"
        value={draft.message}
        onChange={(value) => updateField("message", value)}
        onBlur={() => handleBlur("message")}
        placeholder="Cuéntanos cómo podemos ayudarte..."
        minLength={contactFormLimits.message.min}
        maxLength={contactFormLimits.message.max}
        rows={6}
        validationBehavior="aria"
        isInvalid={Boolean(messageError)}
        errorMessage={messageError}
        isRequired
        fullWidth
      />

      <div className="grid gap-4">
        <p className="text-sm leading-6 text-muted">
          Por tu privacidad, evita incluir diagnósticos, historiales
          médicos, documentos de identidad u otros datos sensibles
          que no sean necesarios para tu consulta.
        </p>

        <Checkbox
          name="privacyAccepted"
          isSelected={draft.privacyAccepted}
          onChange={(isSelected) => {
            setTouchedFields((current) => ({
              ...current,
              privacyAccepted: true,
            }));
            updateField("privacyAccepted", isSelected);
          }}
          validationBehavior="aria"
          isInvalid={Boolean(privacyAcceptedError)}
          errorMessage={privacyAcceptedError}
          isRequired
        >
          <span className="text-sm leading-6 text-foreground">
            He leído y acepto la{" "}
            <Link
              href="/politica-de-privacidad"
              className="font-semibold text-primary underline-offset-4 hover:underline"
            >
              Política de Privacidad
            </Link>
            .
          </span>
        </Checkbox>
      </div>

      <TurnstileWidget
        ref={turnstileRef}
        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
        onTokenChange={setTurnstileToken}
      />

      <Button
        type="submit"
        intent="primary"
        isDisabled={pending || !turnstileToken}
        isPending={pending}
        className="min-h-11 w-full px-6 text-base sm:w-fit"
      >
        {pending ? "Enviando..." : "Enviar mensaje"}
      </Button>

      {state.message ? (
        <p
          role={state.status === "error" ? "alert" : "status"}
          className="text-sm leading-6 font-semibold text-foreground"
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
