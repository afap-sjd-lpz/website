import {defineArrayMember, defineField, defineType} from 'sanity'

interface ContactPhoneValue {
  whatsapp?: boolean
  primaryWhatsapp?: boolean
}

interface ContactEmailValue {
  purpose?: string
}

export const contactSettingsType = defineType({
  name: 'contactSettings',
  title: 'Datos de contacto',
  type: 'document',
  fields: [
    defineField({
      name: 'phones',
      title: 'Teléfonos',
      type: 'array',
      of: [defineArrayMember({type: 'contactPhone'})],
    }),
    defineField({
      name: 'emails',
      title: 'Correos electrónicos',
      type: 'array',
      of: [defineArrayMember({type: 'contactEmail'})],
      description:
        'Puede existir un correo general y uno de privacidad. Si no se configura uno de privacidad, posteriormente la web podrá usar el correo general como respaldo.',
    }),
    defineField({
      name: 'location',
      title: 'Ubicación',
      type: 'string',
      description: 'Por ejemplo: La Paz, Bolivia.',
      validation: (rule) =>
        rule.custom((value) =>
          value === undefined || value.trim()
            ? true
            : 'La ubicación no puede contener únicamente espacios.',
        ),
    }),
    defineField({
      name: 'socialLinks',
      title: 'Redes sociales',
      type: 'array',
      description:
        'Configura únicamente las redes que AFAP desea mostrar. Si una red no se añade, su icono y enlace no aparecerán en el sitio.',
      of: [defineArrayMember({type: 'socialLink'})],
    }),
  ],
  validation: (rule) =>
    rule.custom((document) => {
      if (!document) return true

      const phones = (document.phones ?? []) as ContactPhoneValue[]
      const invalidPrimaryWhatsapp = phones.some(
        (phone) => phone.primaryWhatsapp && !phone.whatsapp,
      )

      if (invalidPrimaryWhatsapp) {
        return 'Un teléfono marcado como WhatsApp principal también debe permitir WhatsApp.'
      }

      if (phones.filter((phone) => phone.primaryWhatsapp).length > 1) {
        return 'Solo puede existir un WhatsApp principal.'
      }

      const emails = (document.emails ?? []) as ContactEmailValue[]

      if (emails.filter((email) => email.purpose === 'contact').length > 1) {
        return 'Solo puede existir un correo de contacto general.'
      }

      if (emails.filter((email) => email.purpose === 'privacy').length > 1) {
        return 'Solo puede existir un correo de privacidad.'
      }

      return true
    }),
  preview: {
    prepare() {
      return {title: 'Datos de contacto'}
    },
  },
})
