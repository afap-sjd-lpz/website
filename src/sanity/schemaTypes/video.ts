import {defineArrayMember, defineField, defineType} from 'sanity'

const YOUTUBE_VIDEO_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/

function getYouTubeVideoId(value: string): string | null {
  try {
    const url = new URL(value)

    if (url.protocol !== 'https:' && url.protocol !== 'http:') return null

    const hostname = url.hostname.replace(/^www\./, '')
    let videoId: string | null = null

    if (hostname === 'youtu.be') {
      videoId = url.pathname.split('/').filter(Boolean)[0] ?? null
    } else if (hostname === 'youtube.com' || hostname === 'm.youtube.com') {
      if (url.pathname === '/watch') {
        videoId = url.searchParams.get('v')
      } else {
        const [format, id] = url.pathname.split('/').filter(Boolean)

        if (format === 'shorts' || format === 'live') {
          videoId = id ?? null
        }
      }
    }

    return videoId && YOUTUBE_VIDEO_ID_PATTERN.test(videoId) ? videoId : null
  } catch {
    return null
  }
}

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

          return getYouTubeVideoId(value)
            ? true
            : 'La URL debe corresponder a un video reproducible de YouTube.'
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
      validation: (rule) => rule.required().min(1).unique(),
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
