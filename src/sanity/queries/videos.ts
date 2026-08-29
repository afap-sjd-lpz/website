import {defineQuery} from 'next-sanity'

export const VIDEO_BY_SLUG_QUERY = defineQuery(`
  *[
    _type == "video" &&
    !(_id in path("drafts.**")) &&
    slug.current == $slug
  ][0] {
    _id,
    _type,
    title,
    "slug": slug.current,
    description,
    youtubeUrl,
    videoType,
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
