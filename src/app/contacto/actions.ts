"use server";

import { checkRateLimit } from "@vercel/firewall";

import type { ContactFormState } from "@/interfaces/contact-form.interface";
import { validateContactForm } from "@/lib/contact-form/contact-form.validation";
import {
  ContactEmailServiceError,
  sendContactEmail,
  type ContactEmailErrorCategory,
} from "@/services/email/contact-email.service";
import { verifyTurnstileToken } from "@/services/security/turnstile.service";

const successMessage =
  "Tu mensaje fue enviado correctamente. Nos pondremos en contacto contigo lo antes posible.";
const errorMessage =
  "No pudimos enviar tu mensaje en este momento. Por favor, inténtalo nuevamente.";
const turnstileErrorMessage =
  "No pudimos completar la verificación anti-spam. Inténtalo nuevamente.";
const rateLimitId = "afap-contact-form";
const rateLimitMessage =
  "Has realizado varios intentos en poco tiempo. Espera unos minutos antes de volver a intentarlo.";

function getSuccessState(
  submissionId?: string,
  turnstileResetRequired = false,
): ContactFormState {
  return {
    status: "success",
    message: successMessage,
    fieldErrors: {},
    submissionId,
    turnstileResetRequired,
  };
}

export async function submitContactForm(
  previousState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  void previousState;

  const honeypot = formData.get("website");
  const isHoneypotFilled =
    typeof honeypot === "string"
      ? honeypot.trim().length > 0
      : honeypot !== null;

  if (isHoneypotFilled) {
    return getSuccessState();
  }

  try {
    const rateLimit = await checkRateLimit(rateLimitId);

    if (rateLimit.rateLimited) {
      console.warn({
        event: "contact_rate_limited",
      });

      return {
        status: "error",
        message: rateLimitMessage,
        fieldErrors: {},
        turnstileResetRequired: false,
      };
    }

    if (rateLimit.error === "not-found") {
      console.error({
        event: "contact_rate_limit_check_failed",
        category: "not_found",
      });
    }
  } catch {
    console.error({
      event: "contact_rate_limit_check_failed",
      category: "unavailable",
    });
  }

  const privacyAccepted = formData.has("privacyAccepted");

  const validation = validateContactForm({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") ?? undefined,
    subject: formData.get("subject"),
    message: formData.get("message"),
    privacyAccepted,
  });

  if (!validation.success) {
    return {
      status: "error",
      message: "Revisa los campos indicados e inténtalo nuevamente.",
      fieldErrors: validation.errors,
      turnstileResetRequired: false,
    };
  }

  const turnstileToken = formData.get("turnstileToken");
  const turnstileVerification = await verifyTurnstileToken(
    typeof turnstileToken === "string" ? turnstileToken : "",
  );

  if (!turnstileVerification.success) {
    console.error({
      event: "turnstile_verification_failed",
      category: turnstileVerification.category,
    });

    return {
      status: "error",
      message: turnstileErrorMessage,
      fieldErrors: {},
      turnstileResetRequired: true,
    };
  }

  const submissionId = crypto.randomUUID();

  try {
    await sendContactEmail({
      submissionId,
      name: validation.data.name,
      email: validation.data.email,
      phone: validation.data.phone,
      subject: validation.data.subject,
      message: validation.data.message,
    });

    return getSuccessState(submissionId, true);
  } catch (error) {
    const category: ContactEmailErrorCategory =
      error instanceof ContactEmailServiceError
        ? error.category
        : "unexpected_error";

    console.error({
      event: "contact_email_failed",
      category,
      submissionId,
    });

    return {
      status: "error",
      message: errorMessage,
      fieldErrors: {},
      turnstileResetRequired: true,
    };
  }
}
