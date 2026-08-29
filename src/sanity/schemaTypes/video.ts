import {defineArrayMember, defineField, defineType} from 'sanity'

export const videoType = defineType({
  name: 'video',
  title: 'Video',
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
      name: 'youtubeUrl',
      title: 'URL de YouTube',
      type: 'url',
      validation: (rule) =>
        rule.required().custom((value) => {
          if (!value) return true

          try {
            const url = new URL(value)
            const hostname = url.hostname.replace(/^www\./, '')

            if (
              hostname === 'youtube.com' ||
              hostname === 'm.youtube.com' ||
              hostname === 'youtu.be'
            ) {
              return true
            }

            return 'La URL debe corresponder a YouTube.'
          } catch {
            return 'Introduce una URL válida.'
          }
        }),
    }),

    defineField({
      name: 'videoType',
      title: 'Tipo de video',
      type: 'string',
      options: {
        list: [
          {title: 'Charla', value: 'charla'},
          {title: 'Taller', value: 'taller'},
          {title: 'Otro', value: 'otro'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
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

  preview: {
    select: {
      title: 'title',
      videoType: 'videoType',
      date: 'publishedAt',
    },
    prepare({title, videoType, date}) {
      const typeLabels: Record<string, string> = {
        charla: 'Charla',
        taller: 'Taller',
        otro: 'Otro',
      }

      const typeLabel = videoType ? typeLabels[videoType] : undefined

      return {
        title,
        subtitle:
          [typeLabel, date].filter(Boolean).join(' · ') || 'Video',
      }
    },
  },
})