import {defineQuery} from 'next-sanity'

export type ResourceType = 'article' | 'material' | 'video'
export type ResourceSort = 'recent' | 'oldest'

export interface ResourceQueryParams {
  topicSlug: string | null
  resourceType: ResourceType | null
  start: number
  end: number
}

// GROQ ranges are inclusive, so `end` is the index of the last requested item.
export const RESOURCES_QUERY = defineQuery(`
  {
    "items": *[
      _type in ["article", "material", "video"] &&
      !(_id in path("drafts.**")) &&
      (!defined($topicSlug) || $topicSlug in topics[]->slug.current) &&
      (!defined($resourceType) || _type == $resourceType)
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
      (!defined($topicSlug) || $topicSlug in topics[]->slug.current) &&
      (!defined($resourceType) || _type == $resourceType)
    ])
  }
`)

// GROQ ranges are inclusive, so `end` is the index of the last requested item.
export const RESOURCES_OLDEST_QUERY = defineQuery(`
  {
    "items": *[
      _type in ["article", "material", "video"] &&
      !(_id in path("drafts.**")) &&
      (!defined($topicSlug) || $topicSlug in topics[]->slug.current) &&
      (!defined($resourceType) || _type == $resourceType)
    ]
      | order(featured desc, publishedAt asc, _id asc)[$start...$end] {
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
      (!defined($topicSlug) || $topicSlug in topics[]->slug.current) &&
      (!defined($resourceType) || _type == $resourceType)
    ])
  }
`)
