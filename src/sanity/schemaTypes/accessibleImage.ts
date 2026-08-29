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
    }),

    defineField({
      name: 'alt',
      title: 'Texto alternativo',
      type: 'string',
      description:
        'Describe brevemente la imagen para personas que utilizan lectores de pantalla.',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as {image?: unknown} | undefined

          if (parent?.image && !value) {
            return 'El texto alternativo es obligatorio cuando se selecciona una imagen.'
          }

          return true
        }),
    }),
  ],
})