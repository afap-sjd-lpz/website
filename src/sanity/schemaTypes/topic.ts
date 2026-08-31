import {defineField, defineType} from 'sanity'

export const topicType = defineType({
  name: 'topic',
  title: 'Temática',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'order',
      title: 'Orden',
      type: 'number',
      validation: (rule) => rule.integer().min(0),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      order: 'order',
    },
    prepare({title, order}) {
      return {
        title,
        subtitle: typeof order === 'number' ? `Orden ${order}` : undefined,
      }
    },
  },
})
