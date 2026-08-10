import { Resend } from "resend";

import { contactSubjectOptions } from "@/config/contact-form.config";
import type { ContactSubject } from "@/interfaces/contact-form.interface";

export type ContactEmailErrorCategory =
  | "configuration_error"
  | "resend_error"
  | "unexpected_error";

export class ContactEmailServiceError extends Error {
  constructor(public readonly category: ContactEmailErrorCategory) {
    super("Contact email delivery failed.");
    this.name = "ContactEmailServiceError";
  }
}

export interface ContactEmailInput {
  submissionId: string;
  name: string;
  email: string;
  phone?: string;
  subject: ContactSubject;
  message: string;
}

function getRequiredEnvironmentVariable(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new ContactEmailServiceError("configuration_error");
  }

  return value;
}

function escapeHtml(value: string): string {
  const replacements: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };

  return value.replace(/[&<>"']/g, (character) => replacements[character]);
}

function getSubjectLabel(subject: ContactSubject): string {
  const option = contactSubjectOptions.find(
    ({ value }) => value === subject,
  );

  if (!option) {
    throw new ContactEmailServiceError("unexpected_error");
  }

  return option.label;
}

export async function sendContactEmail(
  input: ContactEmailInput,
): Promise<void> {
  const apiKey = getRequiredEnvironmentVariable("RESEND_API_KEY");
  const from = getRequiredEnvironmentVariable("CONTACT_FROM_EMAIL");
  const to = getRequiredEnvironmentVariable("CONTACT_TO_EMAIL");
  const subjectLabel = getSubjectLabel(input.subject);
  const idempotencyKey = `afap-contact/${input.submissionId}`;

  const escapedName = escapeHtml(input.name);
  const escapedEmail = escapeHtml(input.email);
  const escapedPhone = input.phone ? escapeHtml(input.phone) : undefined;
  const escapedSubject = escapeHtml(subjectLabel);
  const escapedMessage = escapeHtml(input.message).replace(
    /\n/g,
    "<br />",
  );

  const phoneHtml = escapedPhone
    ? `<p><strong>Celular/WhatsApp:</strong> ${escapedPhone}</p>`
    : "";
  const contactTextLines = [
    `Nombre: ${input.name}`,
    `Correo electrónico: ${input.email}`,
    ...(input.phone
      ? [`Celular/WhatsApp: ${input.phone}`]
      : []),
    `Asunto: ${subjectLabel}`,
  ];

  const html = `
    <main style="font-family: Arial, sans-serif; color: #1e2530; line-height: 1.6;">
      <h1 style="font-size: 22px;">Nueva consulta desde el sitio web de AFAP</h1>
      <p><strong>Nombre:</strong> ${escapedName}</p>
      <p><strong>Correo electrónico:</strong> ${escapedEmail}</p>
      ${phoneHtml}
      <p><strong>Asunto:</strong> ${escapedSubject}</p>
      <hr style="border: 0; border-top: 1px solid #e5e1dc; margin: 24px 0;" />
      <p><strong>Mensaje:</strong></p>
      <p>${escapedMessage}</p>
    </main>
  `.trim();

  const text = [
    "Nueva consulta desde el sitio web de AFAP",
    "",
    ...contactTextLines,
    "",
    "Mensaje:",
    input.message,
  ]
    .join("\n");

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send(
      {
        from,
        to,
        replyTo: input.email,
        subject: `[Web AFAP] ${subjectLabel}`,
        html,
        text,
      },
      {
        idempotencyKey,
      },
    );

    if (error) {
      throw new ContactEmailServiceError("resend_error");
    }

    if (!data?.id) {
      throw new ContactEmailServiceError("unexpected_error");
    }
  } catch (error) {
    if (error instanceof ContactEmailServiceError) {
      throw error;
    }

    throw new ContactEmailServiceError("unexpected_error");
  }
}
