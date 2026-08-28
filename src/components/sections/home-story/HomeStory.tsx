import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export function HomeStory() {
  return (
    <Section aria-labelledby="home-story-title">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-secondary/20 bg-secondary/10 px-6 py-10 sm:px-10 sm:py-12 lg:px-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-16 -right-16 size-44 rounded-full bg-primary/10"
          />
          <div className="relative max-w-3xl">
            <p className="text-sm font-bold tracking-[0.16em] text-primary">
              NUESTRA HISTORIA CONTINÚA
            </p>
            <h2
              id="home-story-title"
              className="mt-3 text-3xl font-bold text-foreground sm:text-4xl"
            >
              Una comunidad que crece en Bolivia
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted">
              AFAP nació en La Paz a partir de la unión de familiares
              vinculados al Instituto Psiquiátrico San Juan de Dios. Con
              el tiempo, la asociación fue creciendo y hoy cuenta con
              filiales y participación en otros departamentos del país,
              fortaleciendo progresivamente su alcance nacional.
            </p>
            <LinkButton
              href="/quienes-somos"
              intent="outline"
              className="mt-7 min-h-11 px-5 text-base"
            >
              Conoce nuestra historia
            </LinkButton>
          </div>
        </div>
      </Container>
    </Section>
  );
}
