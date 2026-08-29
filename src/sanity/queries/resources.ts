import {defineQuery} from 'next-sanity'

// GROQ ranges are inclusive, so `end` is the index of the last requested item.
export const RESOURCES_QUERY = defineQuery(`
  {
    "items": *[
      _type in ["article", "material", "video"] &&
      !(_id in path("drafts.**"))
    ]
      | order(featured desc, publishedAt desc, _id asc)[$start...$end] {
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
      },
    "total": count(*[
      _type in ["article", "material", "video"] &&
      !(_id in path("drafts.**"))
    ])
  }
`)

// GROQ ranges are inclusive, so `end` is the index of the last requested item.
export const RESOURCES_BY_TOPIC_QUERY = defineQuery(`
  {
    "items": *[
      _type in ["article", "material", "video"] &&
      !(_id in path("drafts.**")) &&
      $topicSlug in topics[]->slug.current
    ]
      | order(featured desc, publishedAt desc, _id asc)[$start...$end] {
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
      },
    "total": count(*[
      _type in ["article", "material", "video"] &&
      !(_id in path("drafts.**")) &&
      $topicSlug in topics[]->slug.current
    ])
  }
`)

// GROQ ranges are inclusive, so `end` is the index of the last requested item.
export const RESOURCES_BY_TYPE_QUERY = defineQuery(`
  {
    "items": *[
      _type in ["article", "material", "video"] &&
      _type == $resourceType &&
      !(_id in path("drafts.**"))
    ]
      | order(featured desc, publishedAt desc, _id asc)[$start...$end] {
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
      },
    "total": count(*[
      _type in ["article", "material", "video"] &&
      _type == $resourceType &&
      !(_id in path("drafts.**"))
    ])
  }
`)
