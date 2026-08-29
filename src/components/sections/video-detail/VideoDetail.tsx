import Link from 'next/link'

import {VideoFallback} from '@/components/sections/resource-library/ResourceCard'
import {
  formatResourceDate,
  getYouTubeVideoId,
  RelatedResources,
  ResourceDetailInfoRow,
  ResourceOrientationCard,
} from '@/components/sections/resource-detail'
import {Container} from '@/components/ui/container'
import {CalendarIcon, CommunityIcon, PlayIcon} from '@/components/ui/icons'
import {Section} from '@/components/ui/section'
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

  return (
    <Section className="pt-8 sm:pt-10 lg:pt-12">
      <Container>
        <Link
          href="/recursos"
          className="inline-flex items-center gap-2 font-semibold text-primary hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <span aria-hidden="true">←</span>
          Volver a Recursos
        </Link>

        <div className="mt-8 grid items-start gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(18rem,1fr)] lg:gap-12">
          <article>
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

            <div className="relative mt-8 aspect-video overflow-hidden rounded-3xl bg-primary/10 shadow-sm">
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
            </div>
          </article>

          <aside className="space-y-5 lg:sticky lg:top-6">
            <div
              aria-labelledby="video-info-title"
              className="rounded-3xl border border-border bg-surface p-6"
            >
              <h2
                id="video-info-title"
                className="text-2xl font-bold text-primary"
              >
                Información del video
              </h2>

              <div className="mt-7 space-y-5">
                <ResourceDetailInfoRow Icon={PlayIcon} label="Tipo de video">
                  {videoTypeLabel}
                </ResourceDetailInfoRow>

                <ResourceDetailInfoRow Icon={CommunityIcon} label="Temáticas">
                  <ul className="flex flex-wrap gap-2">
                    {video.topics.map((topic) => (
                      <li
                        key={topic._id}
                        className="rounded-full bg-secondary/10 px-3 py-1 text-xs"
                      >
                        {topic.name}
                      </li>
                    ))}
                  </ul>
                </ResourceDetailInfoRow>

                <ResourceDetailInfoRow Icon={CalendarIcon} label="Publicado">
                  <time dateTime={video.publishedAt}>
                    {formatResourceDate(video.publishedAt)}
                  </time>
                </ResourceDetailInfoRow>
              </div>
            </div>

            <ResourceOrientationCard />
          </aside>
        </div>

        <RelatedResources resources={relatedResources} />
      </Container>
    </Section>
  )
}
