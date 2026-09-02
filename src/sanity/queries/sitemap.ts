import {defineQuery} from "next-sanity";

export const SITEMAP_RESOURCES_QUERY = defineQuery(`
  *[
    _type in ["article", "material", "video"] &&
    !(_id in path("drafts.**")) &&
    defined(slug.current)
  ] | order(_type asc, slug.current asc) {
    _type,
    "slug": slug.current,
    _updatedAt
  }
`);
