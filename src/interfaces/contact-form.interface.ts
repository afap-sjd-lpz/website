export type ContactSubject =
  | "association_information"
  | "guidance_support"
  | "resources_information"
  | "participation"
  | "other";

export interface ContactSubjectOption {
  value: ContactSubject;
  label: string;
}

export interface ContactFormValues {
  name: string;
  email: string;
  phone?: string;
  subject: ContactSubject;
  message: string;
  privacyAccepted: boolean;
}

export type ContactFormField = keyof ContactFormValues;

export type ContactFormFieldErrors = Partial<
  Record<ContactFormField, string[]>
>;

export interface ContactFormValidationSuccess {
  success: true;
  data: ContactFormValues;
}

export interface ContactFormValidationFailure {
  success: false;
  errors: ContactFormFieldErrors;
}

export type ContactFormValidationResult =
  | ContactFormValidationSuccess
  | ContactFormValidationFailure;

export type ContactFormStatus = "idle" | "success" | "error";

export interface ContactFormState {
  status: ContactFormStatus;
  message: string;
  fieldErrors: ContactFormFieldErrors;
  submissionId?: string;
  turnstileResetRequired: boolean;
}
