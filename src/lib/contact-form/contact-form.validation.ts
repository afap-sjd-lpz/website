import {
  contactFormLimits,
  contactSubjectValues,
} from "@/config/contact-form.config";
import type {
  ContactFormField,
  ContactFormFieldErrors,
  ContactFormValidationResult,
  ContactFormValues,
  ContactSubject,
} from "@/interfaces/contact-form.interface";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+\d\s-]+$/;

type RawContactFormValues = Partial<
  Record<ContactFormField, unknown>
>;

function readString(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}

function normalizeSpaces(value: string): string {
  return value.trim().replace(/\s+/g, " ");
}

export function validateContactFormField(
  field: ContactFormField,
  value: unknown,
): string[] {
  const errors: string[] = [];
  const rawValue = readString(value);

  if (field === "name") {
    const name = rawValue === null ? "" : normalizeSpaces(rawValue);

    if (!name) {
      errors.push("El nombre es obligatorio.");
    } else if (name.length < contactFormLimits.name.min) {
      errors.push(
        `El nombre debe tener al menos ${contactFormLimits.name.min} caracteres.`,
      );
    } else if (name.length > contactFormLimits.name.max) {
      errors.push(
        `El nombre no debe superar los ${contactFormLimits.name.max} caracteres.`,
      );
    }
  }

  if (field === "email") {
    const email = rawValue === null ? "" : rawValue.trim().toLowerCase();

    if (!email) {
      errors.push("El correo electrónico es obligatorio.");
    } else {
      if (email.length > contactFormLimits.email.max) {
        errors.push(
          `El correo no debe superar los ${contactFormLimits.email.max} caracteres.`,
        );
      }

      if (!emailPattern.test(email)) {
        errors.push("Ingresa un correo electrónico válido.");
      }
    }
  }

  if (field === "phone") {
    if (value !== undefined && rawValue === null) {
      errors.push("El teléfono tiene un formato no válido.");
    } else {
      const phone =
        rawValue === null ? undefined : normalizeSpaces(rawValue) || undefined;

      if (phone) {
        if (phone.length > contactFormLimits.phone.max) {
          errors.push(
            `El celular no debe superar los ${contactFormLimits.phone.max} caracteres.`,
          );
        }

        if (!phonePattern.test(phone)) {
          errors.push(
            "El celular solo puede contener números, espacios, + y guiones.",
          );
        }
      }
    }
  }

  if (field === "subject") {
    const subject = rawValue === null ? "" : rawValue.trim();

    if (!subject) {
      errors.push("Selecciona un asunto.");
    } else if (
      !contactSubjectValues.includes(subject as ContactSubject)
    ) {
      errors.push("Selecciona un asunto válido.");
    }
  }

  if (field === "message") {
    const message =
      rawValue === null
        ? ""
        : rawValue.replace(/\r\n?/g, "\n").trim();

    if (!message) {
      errors.push("El mensaje es obligatorio.");
    } else if (message.length < contactFormLimits.message.min) {
      errors.push(
        `El mensaje debe tener al menos ${contactFormLimits.message.min} caracteres.`,
      );
    } else if (message.length > contactFormLimits.message.max) {
      errors.push(
        `El mensaje no debe superar los ${contactFormLimits.message.max} caracteres.`,
      );
    }
  }

  if (field === "privacyAccepted" && value !== true) {
    errors.push(
      "Debes aceptar la Política de Privacidad para continuar.",
    );
  }

  return errors;
}

export function validateContactForm(
  input: RawContactFormValues,
): ContactFormValidationResult {
  const errors: ContactFormFieldErrors = {};

  const rawName = readString(input.name);
  const rawEmail = readString(input.email);
  const rawPhone = readString(input.phone);
  const rawSubject = readString(input.subject);
  const rawMessage = readString(input.message);
  const privacyAccepted = input.privacyAccepted === true;

  const name = rawName === null ? "" : normalizeSpaces(rawName);
  const email = rawEmail === null ? "" : rawEmail.trim().toLowerCase();
  const phone =
    rawPhone === null ? undefined : normalizeSpaces(rawPhone) || undefined;
  const subject = rawSubject === null ? "" : rawSubject.trim();
  const message =
    rawMessage === null
      ? ""
      : rawMessage.replace(/\r\n?/g, "\n").trim();

  const rawValues = {
    name: input.name,
    email: input.email,
    phone: input.phone,
    subject: input.subject,
    message: input.message,
    privacyAccepted: input.privacyAccepted,
  };

  for (const field of Object.keys(rawValues) as ContactFormField[]) {
    const fieldErrors = validateContactFormField(
      field,
      rawValues[field],
    );

    if (fieldErrors.length > 0) {
      errors[field] = fieldErrors;
    }
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      errors,
    };
  }

  return {
    success: true,
    data: {
      name,
      email,
      phone,
      subject: subject as ContactSubject,
      message,
      privacyAccepted,
    } satisfies ContactFormValues,
  };
}
