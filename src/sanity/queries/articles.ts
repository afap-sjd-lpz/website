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

export const RELATED_RESOURCES_QUERY = defineQuery(`
  *[
    _type in ["article", "material", "video"] &&
    !(_id in path("drafts.**")) &&
    _id != $articleId &&
    count(topics[_ref in $topicIds]) > 0
  ]
    | order(featured desc, publishedAt desc, _id asc)[0...3] {
      _id,
      _type,
      title,
      "slug": slug.current,
      publishedAt,
      featured,
      "topics": topics[]->{
        _id,
        name,
        "slug": slug.current
      },
      _type == "article" => {
        summary,
        mainImage
      },
      _type == "material" => {
        description,
        cover,
        source
      },
      _type == "video" => {
        description,
        videoType,
        youtubeUrl
      }
    }
`)
