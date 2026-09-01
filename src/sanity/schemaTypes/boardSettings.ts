import {defineField, defineType} from 'sanity'

export const boardSettingsType = defineType({
  name: 'boardSettings',
  title: 'Configuración de la Directiva',
  type: 'document',
  fields: [
    defineField({
      name: 'termLabel',
      title: 'Gestión',
      type: 'string',
      description: 'Por ejemplo: Gestión 2026–2028.',
      validation: (rule) =>
        rule.required().custom((value) =>
          value === undefined || value.trim()
            ? true
            : 'La gestión no puede contener únicamente espacios.',
        ),
    }),
  ],
  preview: {
    select: {
      termLabel: 'termLabel',
    },
    prepare({termLabel}) {
      return {
        title: 'Configuración de la Directiva',
        subtitle: termLabel,
      }
    },
  },
})
