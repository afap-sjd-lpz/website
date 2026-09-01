import type {Metadata} from 'next'
import {notFound, redirect} from 'next/navigation'

import {ResourceLibraryHero} from '@/components/sections/resources/ResourceLibraryHero'
import {ResourceLibrary} from '@/components/sections/resources/library/ResourceLibrary'
import {createResourceUrl} from '@/components/sections/resources/library/resource-library.utils'
import {client} from '@/sanity/lib/client'
import {
  RESOURCES_OLDEST_QUERY,
  RESOURCES_QUERY,
  TOPICS_QUERY,
  type ResourceQueryParams,
  type ResourceSort,
  type ResourceType,
} from '@/sanity/queries'

const PAGE_SIZE = 9
const SANITY_REVALIDATE_SECONDS = 900
const resourceTypes = new Set<ResourceType>(['article', 'material', 'video'])

type SearchParamValue = string | string[] | undefined

interface ResourcesPageProps {
  searchParams: Promise<Record<string, SearchParamValue>>
}

export const metadata: Metadata = {
  title: 'Recursos | AFAP',
  description:
    'Consulta artículos, materiales y videos de AFAP para la orientación, la información y el acompañamiento en salud mental.',
}

function normalizeSearchParams(searchParams: Record<string, SearchParamValue>) {
  let shouldRedirect = false

  const rawTopic = searchParams.topic
  let topicSlug: string | null = null

  if (rawTopic !== undefined) {
    if (typeof rawTopic !== 'string' || !rawTopic.trim()) {
      shouldRedirect = true
    } else {
      topicSlug = rawTopic.trim()
      if (topicSlug !== rawTopic) shouldRedirect = true
    }
  }

  const rawType = searchParams.type
  let resourceType: ResourceType | null = null

  if (rawType !== undefined) {
    if (typeof rawType === 'string' && resourceTypes.has(rawType as ResourceType)) {
      resourceType = rawType as ResourceType
    } else {
      shouldRedirect = true
    }
  }

  const rawSort = searchParams.sort
  let sort: ResourceSort = 'recent'

  if (rawSort !== undefined) {
    if (rawSort === 'oldest') {
      sort = rawSort
    } else {
      shouldRedirect = true
    }
  }

  const rawPage = searchParams.page
  let page = 1

  if (rawPage !== undefined) {
    if (
      typeof rawPage === 'string' &&
      /^[1-9]\d*$/.test(rawPage) &&
      Number.isSafeInteger(Number(rawPage)) &&
      Number(rawPage) > 1 &&
      Number(rawPage) <= Math.floor(Number.MAX_SAFE_INTEGER / PAGE_SIZE)
    ) {
      page = Number(rawPage)
    } else {
      shouldRedirect = true
    }
  }

  return {topicSlug, resourceType, sort, page, shouldRedirect}
}

export default async function ResourcesPage({searchParams}: ResourcesPageProps) {
  const normalized = normalizeSearchParams(await searchParams)
  const {topicSlug, resourceType, sort, page} = normalized

  if (normalized.shouldRedirect) {
    redirect(createResourceUrl({topicSlug, resourceType, sort, page}))
  }

  const start = (page - 1) * PAGE_SIZE
  const end = start + PAGE_SIZE - 1
  const params: ResourceQueryParams = {
    topicSlug,
    resourceType,
    start,
    end,
  }
  const resourcesQuery =
    sort === 'oldest' ? RESOURCES_OLDEST_QUERY : RESOURCES_QUERY

  const [resources, topics] = await Promise.all([
    client.fetch(resourcesQuery, params, {
      next: {revalidate: SANITY_REVALIDATE_SECONDS},
    }),
    client.fetch(TOPICS_QUERY, {}, {
      next: {revalidate: SANITY_REVALIDATE_SECONDS},
    }),
  ])

  if (resources.total === 0 && page > 1) {
    redirect(createResourceUrl({topicSlug, resourceType, sort}))
  }

  const totalPages = Math.max(1, Math.ceil(resources.total / PAGE_SIZE))

  if (resources.total > 0 && page > totalPages) {
    notFound()
  }

  return (
    <>
      <ResourceLibraryHero />
      <ResourceLibrary
        items={resources.items}
        total={resources.total}
        totalPages={totalPages}
        currentPage={page}
        topics={topics}
        topicSlug={topicSlug}
        resourceType={resourceType}
        sort={sort}
      />
    </>
  )
}
