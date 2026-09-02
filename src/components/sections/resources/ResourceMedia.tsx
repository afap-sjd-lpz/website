import Image from 'next/image'

import {getYouTubeThumbnailUrl} from '@/components/sections/resources/detail/youtube.utils'
import {BookIcon, HeartIcon, PlayIcon} from '@/components/ui/icons'
import {getYouTubeVideoId} from '@/lib/youtube/youtube.utils'
import {urlFor} from '@/sanity/lib/image'
import type {RESOURCES_QUERY_RESULT} from '@/sanity/sanity.types'

type ResourceMediaData = RESOURCES_QUERY_RESULT['items'][number]

export interface ResourceMediaProps {
  resource: ResourceMediaData
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

function ResourceImageFallback({type}: {type: ResourceMediaData['_type']}) {
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

export function ResourceMedia({resource}: ResourceMediaProps) {
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
