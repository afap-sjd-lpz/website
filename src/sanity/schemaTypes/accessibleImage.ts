import {defineField, defineType} from 'sanity'

export const accessibleImageType = defineType({
  name: 'accessibleImage',
  title: 'Imagen accesible',
  type: 'object',

  fields: [
    defineField({
      name: 'image',
      title: 'Imagen',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'alt',
      title: 'Texto alternativo',
      type: 'string',
      description:
        'Describe brevemente la imagen para personas que utilizan lectores de pantalla.',
      validation: (rule) =>
        rule.required().custom((value) => {
          if (!value?.trim()) {
            return 'El texto alternativo es obligatorio.'
          }

          return true
        }),
    }),
  ],
})
