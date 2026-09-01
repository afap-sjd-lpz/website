import type {
  ResourceSort,
  ResourceType,
} from '@/sanity/queries'

export interface ResourceUrlState {
  topicSlug: string | null
  resourceType: ResourceType | null
  sort: ResourceSort
  page?: number
}

export function createResourceUrl({
  topicSlug,
  resourceType,
  sort,
  page,
}: ResourceUrlState) {
  const searchParams = new URLSearchParams()

  if (topicSlug) searchParams.set('topic', topicSlug)
  if (resourceType) searchParams.set('type', resourceType)
  if (sort === 'oldest') searchParams.set('sort', sort)
  if (page && page > 1) searchParams.set('page', String(page))

  const query = searchParams.toString()

  return query ? `/recursos?${query}` : '/recursos'
}
