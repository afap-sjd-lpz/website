import {defineField, defineType} from 'sanity'

export const contactPhoneType = defineType({
  name: 'contactPhone',
  title: 'Teléfono de contacto',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Etiqueta',
      type: 'string',
      description: 'Por ejemplo: Contacto general, Secretaría o Información.',
      validation: (rule) =>
        rule.required().custom((value) =>
          value === undefined || value.trim()
            ? true
            : 'La etiqueta no puede contener únicamente espacios.',
        ),
    }),
    defineField({
      name: 'number',
      title: 'Número',
      type: 'string',
      description:
        'Puedes usar formato nacional o internacional con espacios, guiones y el signo +.',
      validation: (rule) =>
        rule.required().custom((value) =>
          value === undefined || value.trim()
            ? true
            : 'El número no puede contener únicamente espacios.',
        ),
    }),
    defineField({
      name: 'whatsapp',
      title: 'Disponible en WhatsApp',
      type: 'boolean',
      description:
        'Indica si este número puede recibir mensajes por WhatsApp.',
      initialValue: false,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'primaryWhatsapp',
      title: 'WhatsApp principal',
      type: 'boolean',
      description:
        'Este número se utilizará en los botones principales de WhatsApp del sitio.',
      initialValue: false,
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
      number: 'number',
      whatsapp: 'whatsapp',
      primaryWhatsapp: 'primaryWhatsapp',
    },
    prepare({title, number, whatsapp, primaryWhatsapp}) {
      const status = primaryWhatsapp
        ? 'WhatsApp principal'
        : whatsapp
          ? 'WhatsApp'
          : undefined

      return {
        title,
        subtitle: [number, status].filter(Boolean).join(' · '),
      }
    },
  },
})
