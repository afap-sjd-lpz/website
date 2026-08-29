import Image from 'next/image'
import Link from 'next/link'
import type {ComponentType, ReactNode} from 'react'

import {LinkButton} from '@/components/ui/button'
import {Container} from '@/components/ui/container'
import {
  BookIcon,
  CalendarIcon,
  CommunityIcon,
  HeartIcon,
  PeopleIcon,
  type IconProps,
} from '@/components/ui/icons'
import {Section} from '@/components/ui/section'
import {urlFor} from '@/sanity/lib/image'
import type {
  ARTICLE_BY_SLUG_QUERY_RESULT,
  RELATED_RESOURCES_QUERY_RESULT,
} from '@/sanity/sanity.types'

import {ArticleBody} from './ArticleBody'
import {RelatedResources} from './RelatedResources'

type Article = NonNullable<ARTICLE_BY_SLUG_QUERY_RESULT>

const dateFormatter = new Intl.DateTimeFormat('es-BO', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
})

function formatDate(value: string) {
  return dateFormatter.format(new Date(`${value}T00:00:00Z`))
}

interface InfoRowProps {
  Icon: ComponentType<IconProps>
  label: string
  children: ReactNode
}

function InfoRow({Icon, label, children}: InfoRowProps) {
  return (
    <div className="flex gap-4 border-b border-border pb-5 last:border-0 last:pb-0">
      <span
        aria-hidden="true"
        className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
      >
        <Icon className="size-5" />
      </span>
      <div className="min-w-0">
        <p className="text-sm text-muted">{label}</p>
        <div className="mt-1 font-semibold text-foreground">{children}</div>
      </div>
    </div>
  )
}

export interface ArticleDetailProps {
  article: Article
  relatedResources: RELATED_RESOURCES_QUERY_RESULT
}

export function ArticleDetail({article, relatedResources}: ArticleDetailProps) {
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
                  <span>{article.topics.map((topic) => topic.name).join(', ')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="size-5 text-primary" />
                  <time dateTime={article.publishedAt}>
                    {formatDate(article.publishedAt)}
                  </time>
                </div>
              </div>
            </header>

            <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-3xl bg-primary/10 shadow-sm">
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
            </div>

            <div className="mt-10 max-w-3xl">
              <ArticleBody content={article.content} />
            </div>
          </article>

          <aside className="space-y-5 lg:sticky lg:top-6">
            <div
              aria-labelledby="article-info-title"
              className="rounded-3xl border border-border bg-surface p-6"
            >
              <h2
                id="article-info-title"
                className="text-2xl font-bold text-primary"
              >
                Información del artículo
              </h2>

              <div className="mt-7 space-y-5">
                <InfoRow Icon={BookIcon} label="Tipo de recurso">
                  Artículo
                </InfoRow>

                <InfoRow Icon={CommunityIcon} label="Temáticas">
                  <ul className="flex flex-wrap gap-2">
                    {article.topics.map((topic) => (
                      <li
                        key={topic._id}
                        className="rounded-full bg-secondary/10 px-3 py-1 text-xs"
                      >
                        {topic.name}
                      </li>
                    ))}
                  </ul>
                </InfoRow>

                <InfoRow Icon={CalendarIcon} label="Publicado">
                  <time dateTime={article.publishedAt}>
                    {formatDate(article.publishedAt)}
                  </time>
                </InfoRow>

                {article.author?.trim() && (
                  <InfoRow Icon={PeopleIcon} label="Autor">
                    {article.author}
                  </InfoRow>
                )}

                {article.reviewedAt && (
                  <InfoRow Icon={CalendarIcon} label="Última revisión">
                    <time dateTime={article.reviewedAt}>
                      {formatDate(article.reviewedAt)}
                    </time>
                  </InfoRow>
                )}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-secondary/20 bg-secondary/10 p-6">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-8 -bottom-10 size-32 rounded-full bg-primary/10"
              />
              <span
                aria-hidden="true"
                className="relative flex size-11 items-center justify-center rounded-full bg-surface text-secondary"
              >
                <HeartIcon className="size-5" />
              </span>
              <div className="relative mt-4">
                <h2 className="text-xl font-bold text-foreground">
                  ¿Necesitas orientación?
                </h2>
                <p className="mt-3 leading-7 text-muted">
                  Si este contenido te genera dudas o necesitas conversar,
                  puedes comunicarte con AFAP.
                </p>
                <LinkButton
                  href="/contacto"
                  intent="secondary"
                  className="mt-5"
                >
                  Contactar con AFAP
                </LinkButton>
              </div>
            </div>
          </aside>
        </div>

        <RelatedResources resources={relatedResources} />
      </Container>
    </Section>
  )
}
