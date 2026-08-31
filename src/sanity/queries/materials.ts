import {defineQuery} from 'next-sanity'

export const MATERIAL_BY_SLUG_QUERY = defineQuery(`
  *[
    _type == "material" &&
    !(_id in path("drafts.**")) &&
    slug.current == $slug
  ][0] {
    _id,
    _type,
    title,
    "slug": slug.current,
    description,
    cover,
    file {
      asset->{
        _id,
        url,
        originalFilename,
        mimeType
      }
    },
    externalUrl,
    source,
    "topics": topics[]->{
      _id,
      name,
      "slug": slug.current
    },
    publishedAt,
    featured,
    seo
  }
`)
