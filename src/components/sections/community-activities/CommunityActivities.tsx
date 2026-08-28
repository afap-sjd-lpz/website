import { Container } from "@/components/ui/container";
import { BookIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/section";
import { communityConfig } from "@/config/community.config";

export function CommunityActivities() {
  return (
    <Section
      aria-labelledby="community-activities-title"
      className="py-10 sm:py-12 lg:py-14"
    >
      <Container>
        <div className="max-w-3xl">
          <h2
            id="community-activities-title"
            className="text-3xl font-bold text-foreground sm:text-4xl"
          >
            Próximas actividades
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted">
            Reuniones, talleres y actividades organizadas o difundidas
            por AFAP.
          </p>
        </div>

        <div className="mt-8 overflow-hidden rounded-3xl border border-border bg-surface">
          {communityConfig.calendarEmbedUrl ? (
            <iframe
              src={communityConfig.calendarEmbedUrl}
              title="Calendario de actividades de AFAP"
              loading="lazy"
              className="h-128 w-full border-0"
            />
          ) : (
            <div className="flex min-h-72 flex-col items-center justify-center px-6 py-12 text-center">
              <span className="flex size-14 items-center justify-center rounded-full bg-primary/15 text-primary">
                <BookIcon className="size-7" />
              </span>
              <h3 className="mt-5 text-xl font-bold text-foreground">
                Estamos preparando nuestra agenda
              </h3>
              <p className="mt-3 max-w-xl leading-7 text-muted">
                Próximamente encontrarás aquí información actualizada
                sobre reuniones, talleres y otras actividades de AFAP.
              </p>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
