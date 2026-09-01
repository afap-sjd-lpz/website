import Link from 'next/link'

import type {
  ResourceSort,
  ResourceType,
} from '@/sanity/queries'

import {createResourceUrl} from './resource-library.utils'

export interface ResourcePaginationProps {
  currentPage: number
  totalPages: number
  topicSlug: string | null
  resourceType: ResourceType | null
  sort: ResourceSort
}

function getVisiblePages(currentPage: number, totalPages: number) {
  return Array.from(
    new Set([1, currentPage - 1, currentPage, currentPage + 1, totalPages]),
  )
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b)
}

export function ResourcePagination({
  currentPage,
  totalPages,
  topicSlug,
  resourceType,
  sort,
}: ResourcePaginationProps) {
  if (totalPages <= 1) return null

  const pages = getVisiblePages(currentPage, totalPages)
  const baseState = {topicSlug, resourceType, sort}

  return (
    <nav
      aria-label="Paginación de recursos"
      className="mt-10 flex flex-wrap items-center justify-center gap-2"
    >
      {currentPage > 1 ? (
        <Link
          href={createResourceUrl({...baseState, page: currentPage - 1})}
          className="inline-flex min-h-10 items-center rounded-full border border-border bg-surface px-4 font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
        >
          Anterior
        </Link>
      ) : (
        <span className="inline-flex min-h-10 items-center rounded-full border border-border px-4 text-muted/60">
          Anterior
        </span>
      )}

      {pages.map((page, index) => {
        const previousPage = pages[index - 1]
        const showEllipsis = previousPage && page - previousPage > 1

        return (
          <span key={page} className="contents">
            {showEllipsis && (
              <span className="px-1 text-muted" aria-hidden="true">
                …
              </span>
            )}
            <Link
              href={createResourceUrl({...baseState, page})}
              aria-current={page === currentPage ? 'page' : undefined}
              aria-label={`Página ${page}`}
              className={`inline-flex size-10 items-center justify-center rounded-full font-semibold transition-colors ${
                page === currentPage
                  ? 'bg-primary text-foreground'
                  : 'bg-surface text-foreground hover:bg-primary/10 hover:text-primary'
              }`}
            >
              {page}
            </Link>
          </span>
        )
      })}

      {currentPage < totalPages ? (
        <Link
          href={createResourceUrl({...baseState, page: currentPage + 1})}
          className="inline-flex min-h-10 items-center rounded-full border border-border bg-surface px-4 font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
        >
          Siguiente
        </Link>
      ) : (
        <span className="inline-flex min-h-10 items-center rounded-full border border-border px-4 text-muted/60">
          Siguiente
        </span>
      )}
    </nav>
  )
}
