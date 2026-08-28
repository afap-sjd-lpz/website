import { Container } from "@/components/ui/container";
import { CommunityIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/section";

export function CommunityHero() {
  return (
    <Section aria-labelledby="community-hero-title" className="pb-10 lg:pb-12">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-secondary/20 bg-secondary/10 px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-12 -bottom-16 size-48 rounded-full bg-primary/10"
          />
          <div className="relative max-w-4xl">
            <span className="flex size-12 items-center justify-center rounded-full bg-surface text-secondary">
              <CommunityIcon className="size-6" />
            </span>
            <p className="mt-6 text-sm font-bold tracking-[0.16em] text-secondary">
              COMUNIDAD Y RECURSOS
            </p>
            <h1
              id="community-hero-title"
              className="mt-3 text-4xl leading-tight font-bold text-foreground sm:text-5xl"
            >
              Encontrarnos también es parte del apoyo
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted sm:text-xl sm:leading-9">
              Consulta próximas actividades, conoce cómo acercarte a
              nuestra comunidad y accede progresivamente a recursos
              relacionados con salud mental y derechos.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
