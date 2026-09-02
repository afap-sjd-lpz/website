import {Reveal} from '@/components/motion'
import {VideoFallback} from '@/components/sections/resources/ResourceMedia'
import {
  formatResourceDate,
  ResourceDetailInfoRow,
  ResourceDetailShell,
  ResourceDetailTopics,
} from '@/components/sections/resources/detail'
import {CalendarIcon, CommunityIcon, PlayIcon} from '@/components/ui/icons'
import {getYouTubeVideoId} from '@/lib/youtube/youtube.utils'
import type {
  RELATED_RESOURCES_QUERY_RESULT,
  VIDEO_BY_SLUG_QUERY_RESULT,
} from '@/sanity/sanity.types'

type Video = NonNullable<VIDEO_BY_SLUG_QUERY_RESULT>

const videoTypeLabels = {
  charla: 'Charla',
  taller: 'Taller',
  otro: 'Otro',
} as const

export interface VideoDetailProps {
  video: Video
  relatedResources: RELATED_RESOURCES_QUERY_RESULT
}

export function VideoDetail({video, relatedResources}: VideoDetailProps) {
  const videoId = getYouTubeVideoId(video.youtubeUrl)
  const videoTypeLabel = videoTypeLabels[video.videoType]
  const sidebar = (
    <Reveal
      aria-labelledby="video-info-title"
      className="rounded-3xl border border-border bg-surface p-6"
    >
      <h2 id="video-info-title" className="text-2xl font-bold text-primary">
        Información del video
      </h2>

      <div className="mt-7 space-y-5">
        <ResourceDetailInfoRow Icon={PlayIcon} label="Tipo de video">
          {videoTypeLabel}
        </ResourceDetailInfoRow>

        <ResourceDetailInfoRow Icon={CommunityIcon} label="Temáticas">
          <ResourceDetailTopics topics={video.topics} />
        </ResourceDetailInfoRow>

        <ResourceDetailInfoRow Icon={CalendarIcon} label="Publicado">
          <time dateTime={video.publishedAt}>
            {formatResourceDate(video.publishedAt)}
          </time>
        </ResourceDetailInfoRow>
      </div>
    </Reveal>
  )

  return (
    <ResourceDetailShell
      sidebar={sidebar}
      relatedResources={relatedResources}
    >
      <Reveal>
        <header>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex rounded-full bg-primary px-3 py-1 text-xs font-bold tracking-wide text-foreground uppercase">
              Video
            </span>
            <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-bold tracking-wide text-primary uppercase">
              {videoTypeLabel}
            </span>
          </div>

          <h1 className="mt-4 max-w-4xl text-4xl leading-tight font-bold text-foreground sm:text-5xl">
            {video.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
            {video.description}
          </p>
        </header>
      </Reveal>

      <Reveal className="relative mt-8 aspect-video overflow-hidden rounded-3xl bg-primary/10 shadow-sm">
        {videoId ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}`}
            title={`Video: ${video.title}`}
            loading="lazy"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="absolute inset-0 size-full border-0"
          />
        ) : (
          <VideoFallback />
        )}
      </Reveal>
    </ResourceDetailShell>
  )
}
