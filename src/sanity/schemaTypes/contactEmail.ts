import {defineField, defineType} from 'sanity'

const purposeLabels: Record<string, string> = {
  contact: 'Contacto general',
  privacy: 'Privacidad',
  other: 'Otro',
}

export const contactEmailType = defineType({
  name: 'contactEmail',
  title: 'Correo de contacto',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Etiqueta',
      type: 'string',
      description: 'Por ejemplo: Contacto general, Privacidad o Secretaría.',
      validation: (rule) =>
        rule.required().custom((value) =>
          value === undefined || value.trim()
            ? true
            : 'La etiqueta no puede contener únicamente espacios.',
        ),
    }),
    defineField({
      name: 'email',
      title: 'Correo electrónico',
      type: 'string',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'purpose',
      title: 'Finalidad',
      type: 'string',
      description:
        'Contacto general se usará para consultas. Privacidad se usará para solicitudes de datos; si falta, posteriormente la web podrá usar el correo general como respaldo.',
      options: {
        list: [
          {title: 'Contacto general', value: 'contact'},
          {title: 'Privacidad', value: 'privacy'},
          {title: 'Otro', value: 'other'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Orden',
      type: 'number',
      validation: (rule) => rule.required().integer().min(0),
    }),
  ],
  preview: {
    select: {
      title: 'label',
      email: 'email',
      purpose: 'purpose',
    },
    prepare({title, email, purpose}) {
      const purposeLabel = purpose ? purposeLabels[purpose] : undefined

      return {
        title,
        subtitle: [email, purposeLabel].filter(Boolean).join(' · '),
      }
    },
  },
})
