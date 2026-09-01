import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import {cache} from 'react'

import {VideoDetail} from '@/components/sections/resources/detail/VideoDetail'
import {client} from '@/sanity/lib/client'
import {
  RELATED_RESOURCES_QUERY,
  VIDEO_BY_SLUG_QUERY,
} from '@/sanity/queries'

const SANITY_REVALIDATE_SECONDS = 900

interface VideoPageProps {
  params: Promise<{slug: string}>
}

const getVideo = cache((slug: string) =>
  client.fetch(
    VIDEO_BY_SLUG_QUERY,
    {slug},
    {next: {revalidate: SANITY_REVALIDATE_SECONDS}},
  ),
)

export async function generateMetadata({
  params,
}: VideoPageProps): Promise<Metadata> {
  const {slug} = await params
  const video = await getVideo(slug)

  if (!video) {
    return {
      title: 'Video no encontrado | AFAP',
    }
  }

  return {
    title: video.seo?.title ?? video.title,
    description: video.seo?.description ?? video.description,
  }
}

export default async function VideoPage({params}: VideoPageProps) {
  const {slug} = await params
  const video = await getVideo(slug)

  if (!video) notFound()

  const relatedResources = await client.fetch(
    RELATED_RESOURCES_QUERY,
    {
      currentId: video._id,
      topicIds: video.topics.map((topic) => topic._id),
    },
    {next: {revalidate: SANITY_REVALIDATE_SECONDS}},
  )

  return (
    <VideoDetail
      video={video}
      relatedResources={relatedResources}
    />
  )
}
