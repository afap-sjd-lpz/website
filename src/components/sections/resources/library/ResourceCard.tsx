import Image from 'next/image'
import Link from 'next/link'

import {getResourceDetailHref} from '@/components/sections/resources/detail/resource-detail.utils'
import {
  getYouTubeThumbnailUrl,
  getYouTubeVideoId,
} from '@/components/sections/resources/detail/youtube.utils'
import {
  BookIcon,
  CalendarIcon,
  HeartIcon,
  PlayIcon,
} from '@/components/ui/icons'
import {urlFor} from '@/sanity/lib/image'
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

function PlayIndicator({className = ''}: {className?: string}) {
  return (
    <span
      aria-hidden="true"
      className={`flex size-14 items-center justify-center rounded-full bg-surface/90 shadow-sm ${className}`}
    >
      <span className="ml-1 h-0 w-0 border-y-[9px] border-y-transparent border-l-[15px] border-l-current" />
    </span>
  )
}

export function MaterialFallback() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden bg-accent/10 text-accent"
    >
      <span className="absolute -top-8 -right-5 size-28 rounded-full bg-primary/10" />
      <span className="absolute -bottom-12 -left-8 size-32 rounded-full bg-secondary/15" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex size-20 items-center justify-center rounded-2xl bg-surface/90 shadow-sm">
          <BookIcon className="size-10" />
        </span>
      </span>
    </div>
  )
}

function ResourceImageFallback({type}: {type: ResourceCardData['_type']}) {
  if (type === 'material') {
    return <MaterialFallback />
  }

  if (type === 'video') {
    return <VideoFallback />
  }

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 flex items-center justify-center bg-secondary/10 text-secondary"
    >
      <span className="flex size-16 items-center justify-center rounded-full bg-surface/80">
        <HeartIcon className="size-8" />
      </span>
    </div>
  )
}

export function VideoFallback() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 flex items-center justify-center overflow-hidden bg-primary/10 text-primary"
    >
      <span className="absolute -top-10 -left-8 size-32 rounded-full bg-secondary/15" />
      <span className="absolute right-8 bottom-7 size-3 rounded-full bg-accent/30" />
      <span className="absolute right-14 bottom-12 size-2 rounded-full bg-primary/40" />
      <PlayIcon className="size-16 drop-shadow-sm" />
    </div>
  )
}

export function ResourceMedia({resource}: ResourceCardProps) {
  const image =
    resource._type === 'article'
      ? resource.mainImage
      : resource._type === 'material'
        ? resource.cover
        : null
  const hasImage = Boolean(image?.image.asset)
  const youtubeVideoId =
    resource._type === 'video'
      ? getYouTubeVideoId(resource.youtubeUrl)
      : null
  const label =
    resource._type === 'article'
      ? 'Artículo'
      : resource._type === 'material'
        ? 'Material'
        : 'Video'
  const badgeClassName =
    resource._type === 'article'
      ? 'bg-secondary text-foreground'
      : resource._type === 'material'
        ? 'bg-accent text-white'
        : 'bg-primary text-foreground'

  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-primary/10">
      {youtubeVideoId ? (
        <>
          <Image
            src={getYouTubeThumbnailUrl(youtubeVideoId)}
            alt=""
            fill
            sizes="(min-width: 1280px) 280px, (min-width: 640px) 42vw, calc(100vw - 2rem)"
            className="object-cover"
          />
          <span className="absolute inset-0 flex items-center justify-center bg-foreground/10 text-foreground">
            <PlayIndicator />
          </span>
        </>
      ) : hasImage && image ? (
        <Image
          src={urlFor(image.image)
            .width(720)
            .height(450)
            .fit('crop')
            .auto('format')
            .url()}
          alt={image.alt}
          fill
          sizes="(min-width: 1280px) 280px, (min-width: 640px) 42vw, calc(100vw - 2rem)"
          className="object-cover"
        />
      ) : (
        <ResourceImageFallback type={resource._type} />
      )}

      <span
        className={`absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-bold tracking-wide uppercase ${badgeClassName}`}
      >
        {label}
      </span>
    </div>
  )
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
