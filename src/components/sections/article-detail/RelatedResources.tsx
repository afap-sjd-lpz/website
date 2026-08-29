import Link from 'next/link'

import {ResourceMedia} from '@/components/sections/resource-library/ResourceCard'
import {BookIcon} from '@/components/ui/icons'
import type {RELATED_RESOURCES_QUERY_RESULT} from '@/sanity/sanity.types'

export interface RelatedResourcesProps {
  resources: RELATED_RESOURCES_QUERY_RESULT
}

export function RelatedResources({resources}: RelatedResourcesProps) {
  if (resources.length === 0) return null

  return (
    <section
      aria-labelledby="related-resources-title"
      className="mt-14 rounded-3xl border border-primary/20 bg-primary/10 p-5 sm:p-7"
    >
      <div className="flex items-center gap-3 text-primary">
        <BookIcon className="size-6" />
        <h2
          id="related-resources-title"
          className="text-xl font-bold text-foreground sm:text-2xl"
        >
          También te podría interesar
        </h2>
      </div>

      <div className="mt-6 grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource) => (
          <article
            key={resource._id}
            className="relative overflow-hidden rounded-2xl border border-border bg-surface"
          >
            <ResourceMedia resource={resource} />
            <div className="p-4">
              <h3 className="line-clamp-2 font-bold leading-6 text-foreground">
                {resource._type === 'article' ? (
                  <Link
                    href={`/recursos/articulos/${resource.slug}`}
                    className="transition-colors after:absolute after:inset-0 hover:text-primary focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    {resource.title}
                  </Link>
                ) : (
                  resource.title
                )}
              </h3>

              {resource.topics[0] && (
                <p className="mt-3 inline-flex rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-foreground">
                  {resource.topics[0].name}
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
