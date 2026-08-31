import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import {cache} from 'react'

import {MaterialDetail} from '@/components/sections/material-detail'
import {client} from '@/sanity/lib/client'
import {
  MATERIAL_BY_SLUG_QUERY,
  RELATED_RESOURCES_QUERY,
} from '@/sanity/queries'

const SANITY_REVALIDATE_SECONDS = 900

interface MaterialPageProps {
  params: Promise<{slug: string}>
}

const getMaterial = cache((slug: string) =>
  client.fetch(
    MATERIAL_BY_SLUG_QUERY,
    {slug},
    {next: {revalidate: SANITY_REVALIDATE_SECONDS}},
  ),
)

export async function generateMetadata({
  params,
}: MaterialPageProps): Promise<Metadata> {
  const {slug} = await params
  const material = await getMaterial(slug)

  if (!material) {
    return {
      title: 'Material no encontrado | AFAP',
    }
  }

  return {
    title: material.seo?.title ?? material.title,
    description: material.seo?.description ?? material.description,
  }
}

export default async function MaterialPage({params}: MaterialPageProps) {
  const {slug} = await params
  const material = await getMaterial(slug)

  if (!material) notFound()

  const relatedResources = await client.fetch(
    RELATED_RESOURCES_QUERY,
    {
      currentId: material._id,
      topicIds: material.topics.map((topic) => topic._id),
    },
    {next: {revalidate: SANITY_REVALIDATE_SECONDS}},
  )

  return (
    <MaterialDetail
      material={material}
      relatedResources={relatedResources}
    />
  )
}
