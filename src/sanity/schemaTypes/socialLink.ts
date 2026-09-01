import {defineField, defineType} from 'sanity'

const socialPlatformOptions = [
  {title: 'Facebook', value: 'facebook'},
  {title: 'YouTube', value: 'youtube'},
] as const

const socialPlatformLabels: Record<
  (typeof socialPlatformOptions)[number]['value'],
  string
> = {
  facebook: 'Facebook',
  youtube: 'YouTube',
}

export const socialLinkType = defineType({
  name: 'socialLink',
  title: 'Red social',
  type: 'object',
  fields: [
    defineField({
      name: 'platform',
      title: 'Plataforma',
      type: 'string',
      description:
        'Solo se mostrarán en el sitio las redes que tengan una URL configurada.',
      options: {
        list: [...socialPlatformOptions],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (rule) =>
        rule.required().uri({scheme: ['http', 'https']}),
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
      platform: 'platform',
      url: 'url',
    },
    prepare({platform, url}) {
      return {
        title:
          socialPlatformLabels[
            platform as keyof typeof socialPlatformLabels
          ] ?? 'Red social',
        subtitle: url,
      }
    },
  },
})
