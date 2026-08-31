import {defineQuery} from 'next-sanity'

export const ARTICLE_BY_SLUG_QUERY = defineQuery(`
  *[
    _type == "article" &&
    !(_id in path("drafts.**")) &&
    slug.current == $slug
  ][0] {
    _id,
    _type,
    title,
    "slug": slug.current,
    summary,
    mainImage,
    content,
    "topics": topics[]->{
      _id,
      name,
      "slug": slug.current
    },
    publishedAt,
    reviewedAt,
    author,
    featured,
    seo
  }
`)
