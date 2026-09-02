import Link from 'next/link'
import type {ReactNode} from 'react'

import {Reveal} from '@/components/motion'
import {Container} from '@/components/ui/container'
import {Section} from '@/components/ui/section'

import {RelatedResources} from './RelatedResources'
import type {RelatedResourcesProps} from './RelatedResources'
import {ResourceOrientationCard} from './ResourceOrientationCard'

export interface ResourceDetailShellProps {
  children: ReactNode
  sidebar: ReactNode
  relatedResources: RelatedResourcesProps['resources']
}

export function ResourceDetailShell({
  children,
  sidebar,
  relatedResources,
}: ResourceDetailShellProps) {
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
          <article>{children}</article>

          <aside className="space-y-5 lg:sticky lg:top-6">
            {sidebar}

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
