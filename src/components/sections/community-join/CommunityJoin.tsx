import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PeopleIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/section";

export function CommunityJoin() {
  return (
    <Section
      aria-labelledby="community-join-title"
      className="bg-surface/60 py-14 sm:py-16 lg:py-20"
    >
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-[0.7fr_0.3fr] lg:gap-12">
          <div>
            <h2
              id="community-join-title"
              className="text-3xl font-bold text-foreground sm:text-4xl"
            >
              Forma parte de nuestra comunidad
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
              Si tú o tu familia desean acercarse a AFAP, participar en
              sus actividades o conocer nuestros espacios de
              comunicación, pueden ponerse en contacto con la asociación.
            </p>
            <p className="mt-4 max-w-3xl leading-7 text-muted">
              Las solicitudes de incorporación a los espacios internos de
              comunicación son revisadas por la directiva de AFAP.
            </p>
            <LinkButton
              href="/contacto"
              intent="secondary"
              className="mt-7 min-h-11 px-5 text-base"
            >
              Solicitar incorporación
            </LinkButton>
          </div>

          <div className="flex size-28 items-center justify-center rounded-3xl bg-secondary/15 text-secondary lg:justify-self-end">
            <PeopleIcon className="size-14" />
          </div>
        </div>
      </Container>
    </Section>
  );
}
