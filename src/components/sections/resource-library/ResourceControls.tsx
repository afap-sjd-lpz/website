'use client'

import {Drawer} from '@heroui/react'
import Link from 'next/link'
import {useRouter} from 'next/navigation'
import {startTransition, useState} from 'react'

import {Select, type SelectOption} from '@/components/ui/select'
import type {
  ResourceSort,
  ResourceType,
} from '@/sanity/queries'
import type {TOPICS_QUERY_RESULT} from '@/sanity/sanity.types'

import {createResourceUrl, type ResourceUrlState} from './resource-library.utils'

interface ResourceControlProps extends ResourceUrlState {
  topics: TOPICS_QUERY_RESULT
}

const formatOptions: ReadonlyArray<{
  label: string
  value: ResourceType | null
}> = [
  {label: 'Todos', value: null},
  {label: 'Artículos', value: 'article'},
  {label: 'Materiales', value: 'material'},
  {label: 'Videos', value: 'video'},
]

const sortOptions: readonly SelectOption<ResourceSort>[] = [
  {label: 'Más recientes', value: 'recent'},
  {label: 'Más antiguos', value: 'oldest'},
]

function FilterLink({
  active,
  href,
  label,
  onNavigate,
}: {
  active: boolean
  href: string
  label: string
  onNavigate?: () => void
}) {
  return (
    <Link
      href={href}
      aria-current={active ? 'true' : undefined}
      onClick={onNavigate}
      className="group flex items-start gap-3 rounded-xl px-2 py-2 text-sm text-foreground transition-colors hover:bg-primary/10 hover:text-primary"
    >
      <span
        aria-hidden="true"
        className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border text-xs font-bold transition-colors ${
          active
            ? 'border-secondary bg-secondary text-foreground'
            : 'border-primary/50 bg-surface text-transparent group-hover:border-primary'
        }`}
      >
        ✓
      </span>
      <span className={active ? 'font-semibold' : undefined}>{label}</span>
    </Link>
  )
}

function FilterPanel({
  topics,
  topicSlug,
  resourceType,
  sort,
  onNavigate,
}: ResourceControlProps & {onNavigate?: () => void}) {
  const state = {topicSlug, resourceType, sort}

  return (
    <div>
      <nav aria-label="Filtrar por temática">
        <h2 className="text-sm font-bold tracking-[0.12em] text-primary uppercase">
          Temáticas
        </h2>
        <div className="mt-4 space-y-1">
          <FilterLink
            active={!topicSlug}
            href={createResourceUrl({...state, topicSlug: null})}
            label="Todas"
            onNavigate={onNavigate}
          />
          {topics.map((topic) => (
            <FilterLink
              key={topic._id}
              active={topic.slug === topicSlug}
              href={createResourceUrl({...state, topicSlug: topic.slug})}
              label={topic.name}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </nav>

      <div className="my-6 border-t border-border" />

      <nav aria-label="Filtrar por formato">
        <h2 className="text-sm font-bold tracking-[0.12em] text-primary uppercase">
          Formatos
        </h2>
        <div className="mt-4 space-y-1">
          {formatOptions.map((option) => (
            <FilterLink
              key={option.value ?? 'all'}
              active={option.value === resourceType}
              href={createResourceUrl({
                ...state,
                resourceType: option.value,
              })}
              label={option.label}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </nav>

      <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/10 p-4 text-sm leading-6 text-muted">
        <p className="font-semibold text-foreground">
          Encuentra lo que necesitas
        </p>
        <p className="mt-2">Puedes combinar temática y formato.</p>
      </div>
    </div>
  )
}

export function ResourceDesktopFilters(props: ResourceControlProps) {
  return (
    <aside className="hidden self-start rounded-3xl border border-border bg-surface p-5 lg:block lg:sticky lg:top-6">
      <FilterPanel {...props} />
    </aside>
  )
}

export function ResourceMobileFilters(props: ResourceControlProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="lg:hidden">
      <Drawer isOpen={isOpen} onOpenChange={setIsOpen}>
        <Drawer.Trigger className="inline-flex min-h-11 items-center justify-center rounded-xl border border-primary px-4 font-semibold text-primary transition-colors hover:bg-primary/10">
          Filtros
        </Drawer.Trigger>
        <Drawer.Backdrop variant="opaque">
          <Drawer.Content placement="left">
            <Drawer.Dialog className="bg-surface">
              <Drawer.Header>
                <Drawer.Heading>Filtrar recursos</Drawer.Heading>
                <Drawer.CloseTrigger aria-label="Cerrar filtros" />
              </Drawer.Header>
              <Drawer.Body className="pb-8">
                <FilterPanel
                  {...props}
                  onNavigate={() => setIsOpen(false)}
                />
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </div>
  )
}

export function ResourceSortSelect({
  topicSlug,
  resourceType,
  sort,
}: Omit<ResourceControlProps, 'topics'>) {
  const router = useRouter()

  return (
    <Select
      label="Ordenar recursos"
      options={sortOptions}
      selectedKey={sort}
      onSelectionChange={(key) => {
        const nextSort: ResourceSort = key === 'oldest' ? 'oldest' : 'recent'

        startTransition(() => {
          router.push(
            createResourceUrl({topicSlug, resourceType, sort: nextSort}),
          )
        })
      }}
      className="min-w-44"
    />
  )
}
