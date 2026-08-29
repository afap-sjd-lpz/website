import {defineArrayMember, defineField, defineType} from 'sanity'

export const blockContentType = defineType({
  name: 'blockContent',
  title: 'Contenido',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'Encabezado 2', value: 'h2'},
        {title: 'Encabezado 3', value: 'h3'},
        {title: 'Encabezado 4', value: 'h4'},
      ],
      lists: [
        {title: 'Viñetas', value: 'bullet'},
        {title: 'Numerada', value: 'number'},
      ],
      marks: {
        decorators: [
          {title: 'Negrita', value: 'strong'},
          {title: 'Énfasis', value: 'em'},
        ],
        annotations: [
          {
            name: 'link',
            title: 'Enlace',
            type: 'object',
            fields: [
              defineField({
                name: 'href',
                title: 'URL',
                type: 'url',
                validation: (rule) =>
                  rule.required().uri({scheme: ['http', 'https']}),
              }),
            ],
          },
        ],
      },
    }),
  ],
})
