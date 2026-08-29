import {defineField, defineType} from 'sanity'

export const seoType = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',

  fields: [
    defineField({
      name: 'title',
      title: 'Título SEO',
      type: 'string',
      validation: (rule) => rule.max(60),
    }),

    defineField({
      name: 'description',
      title: 'Descripción SEO',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(160),
    }),
  ],
})