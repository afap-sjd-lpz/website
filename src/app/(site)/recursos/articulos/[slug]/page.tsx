import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import {cache} from 'react'

import {ArticleDetail} from '@/components/sections/article-detail'
import {client} from '@/sanity/lib/client'
import {
  ARTICLE_BY_SLUG_QUERY,
  RELATED_RESOURCES_QUERY,
} from '@/sanity/queries'

const SANITY_REVALIDATE_SECONDS = 900

interface ArticlePageProps {
  params: Promise<{slug: string}>
}

const getArticle = cache((slug: string) =>
  client.fetch(
    ARTICLE_BY_SLUG_QUERY,
    {slug},
    {next: {revalidate: SANITY_REVALIDATE_SECONDS}},
  ),
)

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const {slug} = await params
  const article = await getArticle(slug)

  if (!article) {
    return {
      title: 'Artículo no encontrado | AFAP',
    }
  }

  return {
    title: article.seo?.title ?? article.title,
    description: article.seo?.description ?? article.summary,
  }
}

export default async function ArticlePage({params}: ArticlePageProps) {
  const {slug} = await params
  const article = await getArticle(slug)

  if (!article) notFound()

  const relatedResources = await client.fetch(
    RELATED_RESOURCES_QUERY,
    {
      articleId: article._id,
      topicIds: article.topics.map((topic) => topic._id),
    },
    {next: {revalidate: SANITY_REVALIDATE_SECONDS}},
  )

  return (
    <ArticleDetail
      article={article}
      relatedResources={relatedResources}
    />
  )
}
