import {defineQuery} from 'next-sanity'

export const CONTACT_SETTINGS_QUERY = defineQuery(`
  *[
    _id == "contactSettings" &&
    _type == "contactSettings" &&
    !(_id in path("drafts.**"))
  ][0] {
    "phones": phones[]{
      label,
      number,
      whatsapp,
      primaryWhatsapp,
      order
    } | order(order asc),
    "emails": emails[]{
      label,
      email,
      purpose,
      order
    } | order(order asc),
    location,
    "socialLinks": socialLinks[]{
      platform,
      url,
      order
    } | order(order asc)
  }
`)

export const ACTIVE_BOARD_MEMBERS_QUERY = defineQuery(`
  *[
    _type == "boardMember" &&
    !(_id in path("drafts.**")) &&
    active == true
  ] | order(order asc, name asc, _id asc) {
    _id,
    name,
    role,
    photo,
    order,
    active
  }
`)

export const BOARD_SETTINGS_QUERY = defineQuery(`
  *[
    _id == "boardSettings" &&
    _type == "boardSettings" &&
    !(_id in path("drafts.**"))
  ][0] {
    termLabel
  }
`)
