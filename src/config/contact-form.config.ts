import type {
  ContactSubject,
  ContactSubjectOption,
} from "@/interfaces/contact-form.interface";

export const contactSubjectOptions = [
  {
    value: "association_information",
    label: "Información sobre la asociación",
  },
  {
    value: "guidance_support",
    label: "Orientación y apoyo",
  },
  {
    value: "resources_information",
    label: "Recursos e información",
  },
  {
    value: "participation",
    label: "Participar / colaborar",
  },
  {
    value: "other",
    label: "Otro",
  },
] as const satisfies readonly ContactSubjectOption[];

export const contactSubjectValues: readonly ContactSubject[] =
  contactSubjectOptions.map(({ value }) => value);

export const contactFormLimits = {
  name: {
    min: 2,
    max: 100,
  },
  email: {
    max: 254,
  },
  phone: {
    max: 24,
  },
  message: {
    min: 10,
    max: 2000,
  },
} as const;
