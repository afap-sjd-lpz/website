import Image from 'next/image'
import Link from 'next/link'

import {Reveal} from '@/components/motion'
import {MaterialFallback} from '@/components/sections/resource-library/ResourceCard'
import {
  formatResourceDate,
  RelatedResources,
  ResourceDetailInfoRow,
  ResourceOrientationCard,
} from '@/components/sections/resource-detail'
import {LinkButton} from '@/components/ui/button'
import {Container} from '@/components/ui/container'
import {
  BookIcon,
  CalendarIcon,
  CommunityIcon,
  PeopleIcon,
} from '@/components/ui/icons'
import {Section} from '@/components/ui/section'
import {urlFor} from '@/sanity/lib/image'
import type {
  MATERIAL_BY_SLUG_QUERY_RESULT,
  RELATED_RESOURCES_QUERY_RESULT,
} from '@/sanity/sanity.types'

type Material = NonNullable<MATERIAL_BY_SLUG_QUERY_RESULT>

export interface MaterialDetailProps {
  material: Material
  relatedResources: RELATED_RESOURCES_QUERY_RESULT
}

export function MaterialDetail({
  material,
  relatedResources,
}: MaterialDetailProps) {
  const pdfUrl = material.file?.asset?.url
  const source = material.source?.trim()

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
            <Reveal>
            <header>
              <span className="inline-flex rounded-full bg-accent px-3 py-1 text-xs font-bold tracking-wide text-white uppercase">
                Material
              </span>
              <h1 className="mt-4 max-w-4xl text-4xl leading-tight font-bold text-foreground sm:text-5xl">
                {material.title}
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
                {material.description}
              </p>
            </header>
            </Reveal>

            {material.cover?.image.asset ? (
              <Reveal className="mt-8 flex min-h-96 items-center justify-center rounded-3xl border border-border bg-primary/5 p-4 sm:p-8">
                <div className="relative aspect-[3/4] w-full max-w-md overflow-hidden rounded-2xl bg-surface shadow-sm">
                  <Image
                    src={urlFor(material.cover.image)
                      .width(900)
                      .auto('format')
                      .url()}
                    alt={material.cover.alt}
                    fill
                    preload
                    sizes="(min-width: 1024px) 448px, (min-width: 640px) 60vw, calc(100vw - 4rem)"
                    className="object-contain"
                  />
                </div>
              </Reveal>
            ) : (
              <Reveal className="relative mt-8 aspect-[4/3] overflow-hidden rounded-3xl border border-border">
                <MaterialFallback />
              </Reveal>
            )}
          </article>

          <aside className="space-y-5 lg:sticky lg:top-6">
            <Reveal
              aria-labelledby="material-info-title"
              className="rounded-3xl border border-border bg-surface p-6"
            >
              <h2
                id="material-info-title"
                className="text-2xl font-bold text-primary"
              >
                Información del material
              </h2>

              <div className="mt-7 space-y-5">
                <ResourceDetailInfoRow Icon={BookIcon} label="Tipo de recurso">
                  Material
                </ResourceDetailInfoRow>

                <ResourceDetailInfoRow Icon={CommunityIcon} label="Temáticas">
                  <ul className="flex flex-wrap gap-2">
                    {material.topics.map((topic) => (
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
                  <time dateTime={material.publishedAt}>
                    {formatResourceDate(material.publishedAt)}
                  </time>
                </ResourceDetailInfoRow>

                {source && (
                  <ResourceDetailInfoRow Icon={PeopleIcon} label="Fuente">
                    {source}
                  </ResourceDetailInfoRow>
                )}
              </div>

              {(pdfUrl || material.externalUrl) && (
                <div className="mt-7 space-y-3 border-t border-border pt-6">
                  {pdfUrl && (
                    <LinkButton
                      href={pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      intent="primary"
                      aria-label={`Abrir ${material.title} en una pestaña nueva`}
                      className="w-full justify-center"
                    >
                      Abrir material
                    </LinkButton>
                  )}

                  {material.externalUrl && (
                    <LinkButton
                      href={material.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      intent={pdfUrl ? 'outline' : 'primary'}
                      aria-label={`${pdfUrl ? 'Visitar fuente externa' : 'Visitar recurso'} en una pestaña nueva`}
                      className="w-full justify-center"
                    >
                      {pdfUrl ? 'Visitar fuente externa' : 'Visitar recurso'}
                    </LinkButton>
                  )}
                </div>
              )}
            </Reveal>

            <Reveal>
              <ResourceOrientationCard />
            </Reveal>
          </aside>
        </div>

        <RelatedResources resources={relatedResources} />
      </Container>
    </Section>
  )
}
