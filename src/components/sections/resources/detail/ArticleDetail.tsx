import Image from 'next/image'

import {Reveal} from '@/components/motion'
import {
  formatResourceDate,
  ResourceDetailInfoRow,
  ResourceDetailShell,
  ResourceDetailTopics,
} from '@/components/sections/resources/detail'
import {
  BookIcon,
  CalendarIcon,
  CommunityIcon,
  PeopleIcon,
} from '@/components/ui/icons'
import {urlFor} from '@/sanity/lib/image'
import type {
  ARTICLE_BY_SLUG_QUERY_RESULT,
  RELATED_RESOURCES_QUERY_RESULT,
} from '@/sanity/sanity.types'

import {ArticleBody} from './ArticleBody'

type Article = NonNullable<ARTICLE_BY_SLUG_QUERY_RESULT>

export interface ArticleDetailProps {
  article: Article
  relatedResources: RELATED_RESOURCES_QUERY_RESULT
}

export function ArticleDetail({article, relatedResources}: ArticleDetailProps) {
  const sidebar = (
    <Reveal
      aria-labelledby="article-info-title"
      className="rounded-3xl border border-border bg-surface p-6"
    >
      <h2 id="article-info-title" className="text-2xl font-bold text-primary">
        Información del artículo
      </h2>

      <div className="mt-7 space-y-5">
        <ResourceDetailInfoRow Icon={BookIcon} label="Tipo de recurso">
          Artículo
        </ResourceDetailInfoRow>

        <ResourceDetailInfoRow Icon={CommunityIcon} label="Temáticas">
          <ResourceDetailTopics topics={article.topics} />
        </ResourceDetailInfoRow>

        <ResourceDetailInfoRow Icon={CalendarIcon} label="Publicado">
          <time dateTime={article.publishedAt}>
            {formatResourceDate(article.publishedAt)}
          </time>
        </ResourceDetailInfoRow>

        {article.author?.trim() && (
          <ResourceDetailInfoRow Icon={PeopleIcon} label="Autor">
            {article.author}
          </ResourceDetailInfoRow>
        )}

        {article.reviewedAt && (
          <ResourceDetailInfoRow Icon={CalendarIcon} label="Última revisión">
            <time dateTime={article.reviewedAt}>
              {formatResourceDate(article.reviewedAt)}
            </time>
          </ResourceDetailInfoRow>
        )}
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
          <span className="inline-flex rounded-full bg-secondary px-3 py-1 text-xs font-bold tracking-wide text-foreground uppercase">
            Artículo
          </span>
          <h1 className="mt-4 max-w-4xl text-4xl leading-tight font-bold text-foreground sm:text-5xl">
            {article.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
            {article.summary}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted">
            <div className="flex items-center gap-2">
              <CommunityIcon className="size-5 text-primary" />
              <span>
                {article.topics.map((topic) => topic.name).join(', ')}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarIcon className="size-5 text-primary" />
              <time dateTime={article.publishedAt}>
                {formatResourceDate(article.publishedAt)}
              </time>
            </div>
          </div>
        </header>
      </Reveal>

      <Reveal className="relative mt-8 aspect-[16/10] overflow-hidden rounded-3xl bg-primary/10 shadow-sm">
        <Image
          src={urlFor(article.mainImage.image)
            .width(1200)
            .height(750)
            .fit('crop')
            .auto('format')
            .url()}
          alt={article.mainImage.alt}
          fill
          preload
          sizes="(min-width: 1280px) 800px, (min-width: 1024px) 64vw, calc(100vw - 2rem)"
          className="object-cover"
        />
      </Reveal>

      <div className="mt-10 max-w-3xl">
        <ArticleBody content={article.content} />
      </div>
    </ResourceDetailShell>
  )
}
