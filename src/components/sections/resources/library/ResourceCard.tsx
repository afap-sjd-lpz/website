import Link from 'next/link'

import {getResourceDetailHref} from '@/components/sections/resources/detail/resource-detail.utils'
import {ResourceMedia} from '@/components/sections/resources/ResourceMedia'
import {CalendarIcon} from '@/components/ui/icons'
import type {RESOURCES_QUERY_RESULT} from '@/sanity/sanity.types'

type ResourceCardData = RESOURCES_QUERY_RESULT['items'][number]

export interface ResourceCardProps {
  resource: ResourceCardData
}

const dateFormatter = new Intl.DateTimeFormat('es-BO', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
})

const videoTypeLabels = {
  charla: 'Charla',
  taller: 'Taller',
  otro: null,
} as const

function formatDate(value: string) {
  return dateFormatter.format(new Date(`${value}T00:00:00Z`))
}

export function ResourceCard({resource}: ResourceCardProps) {
  const description =
    resource._type === 'article' ? resource.summary : resource.description
  const href = getResourceDetailHref(resource)

  return (
    <article className="relative flex min-w-0 flex-col overflow-hidden rounded-3xl border border-border bg-surface">
      <ResourceMedia resource={resource} />

      <div className="flex grow flex-col p-5">
        {resource._type === 'video' && videoTypeLabels[resource.videoType] && (
          <p className="mb-2 text-xs font-semibold tracking-wide text-primary uppercase">
            {videoTypeLabels[resource.videoType]}
          </p>
        )}

        <h2 className="line-clamp-2 text-lg leading-6 font-bold text-foreground">
          <Link
            href={href}
            className="transition-colors after:absolute after:inset-0 hover:text-primary focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {resource.title}
          </Link>
        </h2>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted">
          {description}
        </p>

        {resource._type === 'material' && resource.source && (
          <p className="mt-3 text-sm text-muted">
            <span className="font-semibold text-foreground">Fuente:</span>{' '}
            {resource.source}
          </p>
        )}

        <div className="mt-auto pt-5">
          <ul className="flex flex-wrap gap-2" aria-label="Temáticas">
            {resource.topics.slice(0, 2).map((topic) => (
              <li
                key={topic._id}
                className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-foreground"
              >
                {topic.name}
              </li>
            ))}
          </ul>

          <p className="mt-4 flex items-center gap-2 text-sm text-muted">
            <CalendarIcon className="size-4 shrink-0" />
            <time dateTime={resource.publishedAt}>
              {formatDate(resource.publishedAt)}
            </time>
          </p>
        </div>
      </div>
    </article>
  )
}
