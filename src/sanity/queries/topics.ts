import {defineQuery} from 'next-sanity'

export const TOPICS_QUERY = defineQuery(`
  *[
    _type == "topic" &&
    !(_id in path("drafts.**"))
  ] | order(order asc, name asc) {
    _id,
    name,
    "slug": slug.current,
    description,
    order
  }
`)
