import {LinkButton} from '@/components/ui/button'
import {Container} from '@/components/ui/container'
import {BookIcon} from '@/components/ui/icons'
import {Section} from '@/components/ui/section'

export function CommunityResources() {
  return (
    <Section
      aria-labelledby="community-resources-title"
      className="pt-8 sm:pt-10 lg:pt-8"
    >
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-primary/10 px-6 py-10 sm:px-10 lg:flex lg:items-center lg:justify-between lg:gap-12">
          <span
            aria-hidden="true"
            className="absolute -top-16 -right-10 size-44 rounded-full bg-secondary/15"
          />
          <span
            aria-hidden="true"
            className="absolute right-36 -bottom-10 size-24 rounded-full bg-accent/10"
          />

          <div className="relative flex max-w-3xl items-start gap-5">
            <span
              aria-hidden="true"
              className="flex size-14 shrink-0 items-center justify-center rounded-full bg-surface text-primary"
            >
              <BookIcon className="size-7" />
            </span>
            <div>
              <p className="text-sm font-bold tracking-[0.14em] text-primary uppercase">
                Recursos
              </p>
              <h2
                id="community-resources-title"
                className="mt-2 text-3xl font-bold text-foreground sm:text-4xl"
              >
                Información para orientar y acompañar
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted">
                Consulta artículos, materiales y videos que AFAP reúne para
                personas, familias y comunidad.
              </p>
            </div>
          </div>

          <LinkButton
            href="/recursos"
            intent="primary"
            className="relative mt-7 w-full lg:mt-0 lg:w-auto"
          >
            Explorar recursos
          </LinkButton>
        </div>
      </Container>
    </Section>
  )
}
