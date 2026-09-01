import {defineField, defineType} from 'sanity'

const boardRoleOptions = [
  {title: 'Presidencia', value: 'presidency'},
  {title: 'Vicepresidencia', value: 'vicePresidency'},
  {title: 'Secretaría de Actas', value: 'minutesSecretary'},
  {title: 'Secretaría de Hacienda', value: 'financeSecretary'},
  {title: 'Vocal', value: 'boardMember'},
] as const

const boardRoleLabels: Record<
  (typeof boardRoleOptions)[number]['value'],
  string
> = {
  presidency: 'Presidencia',
  vicePresidency: 'Vicepresidencia',
  minutesSecretary: 'Secretaría de Actas',
  financeSecretary: 'Secretaría de Hacienda',
  boardMember: 'Vocal',
}

export const boardMemberType = defineType({
  name: 'boardMember',
  title: 'Miembro de la Directiva',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
      validation: (rule) =>
        rule.required().custom((value) =>
          value === undefined || value.trim()
            ? true
            : 'El nombre no puede contener únicamente espacios.',
        ),
    }),
    defineField({
      name: 'role',
      title: 'Cargo',
      type: 'string',
      options: {
        list: [...boardRoleOptions],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Fotografía',
      type: 'accessibleImage',
      description:
        'Opcional. Si se añade una fotografía, también debe incluir texto alternativo.',
    }),
    defineField({
      name: 'order',
      title: 'Orden',
      type: 'number',
      validation: (rule) => rule.required().integer().min(0),
    }),
    defineField({
      name: 'active',
      title: 'Miembro activo',
      type: 'boolean',
      description:
        'Desactiva esta opción para conservar el registro sin mostrarlo posteriormente en el sitio.',
      initialValue: true,
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: 'Directiva',
      name: 'boardMemberOrder',
      by: [
        {field: 'active', direction: 'desc'},
        {field: 'order', direction: 'asc'},
        {field: 'name', direction: 'asc'},
      ],
    },
  ],
  preview: {
    select: {
      title: 'name',
      role: 'role',
      media: 'photo.image',
    },
    prepare({title, role, media}) {
      return {
        title,
        subtitle: boardRoleLabels[role as keyof typeof boardRoleLabels],
        media,
      }
    },
  },
})
