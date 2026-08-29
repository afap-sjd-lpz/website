import {defineArrayMember, defineType} from 'sanity'

export const blockContentType = defineType({
  name: 'blockContent',
  title: 'Contenido',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
    }),
  ],
})