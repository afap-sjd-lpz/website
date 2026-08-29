import {defineArrayMember, defineField, defineType} from 'sanity'

export const materialType = defineType({
  name: 'material',
  title: 'Material',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'cover',
      title: 'Portada',
      type: 'accessibleImage',
    }),

    defineField({
      name: 'file',
      title: 'Archivo PDF',
      type: 'file',
      options: {
        accept: 'application/pdf',
      },
    }),

    defineField({
      name: 'externalUrl',
      title: 'URL externa',
      type: 'url',
      description:
        'Usa este campo cuando el material esté alojado en otro sitio web.',
    }),

    defineField({
      name: 'source',
      title: 'Fuente',
      type: 'string',
      description:
        'Institución, organización o autor responsable del material, si corresponde.',
    }),

    defineField({
      name: 'topics',
      title: 'Temáticas',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'topic'}],
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),

    defineField({
      name: 'publishedAt',
      title: 'Fecha',
      type: 'date',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'featured',
      title: 'Destacado',
      type: 'boolean',
      initialValue: false,
    }),

    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],

  validation: (rule) =>
    rule.custom((document) => {
      if (!document) return true

      if (!document.file && !document.externalUrl) {
        return 'Debes agregar un archivo PDF o una URL externa.'
      }

      return true
    }),

  preview: {
    select: {
      title: 'title',
      source: 'source',
      media: 'cover.image',
    },
    prepare({title, source, media}) {
      return {
        title,
        subtitle: source || 'Material',
        media,
      }
    },
  },
})