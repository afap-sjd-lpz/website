import { Container } from "@/components/ui/container";
import { CalendarIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/section";
import { communityConfig } from "@/config/community.config";

export function CommunityActivities() {
  return (
    <Section
      aria-labelledby="community-activities-title"
      className="pt-8 pb-6 sm:pt-10 sm:pb-8 lg:pt-8 lg:pb-8"
    >
      <Container>
        <div className="grid gap-8 rounded-3xl border border-primary/20 bg-primary/10 p-6 sm:p-8 lg:grid-cols-[0.34fr_0.66fr] lg:gap-10 lg:p-10">
          <div>
            <span className="flex size-12 items-center justify-center rounded-full bg-primary/20 text-primary">
              <CalendarIcon className="size-6" />
            </span>
            <h2
              id="community-activities-title"
              className="mt-6 text-3xl font-bold text-foreground sm:text-4xl"
            >
              Próximas actividades
            </h2>
            <div
              aria-hidden="true"
              className="mt-4 h-1 w-14 rounded-full bg-primary"
            />
            <p className="mt-5 text-lg leading-8 text-muted">
              Conoce nuestros talleres, charlas y espacios de encuentro.
              Te invitamos a participar y ser parte de nuestra comunidad.
            </p>

            <aside className="mt-7 rounded-2xl border border-primary/20 bg-surface/70 p-5">
              <h3 className="font-bold text-foreground">Importante</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                Algunas actividades pueden requerir inscripción previa.
                Revisa el calendario y participa.
              </p>
            </aside>
          </div>

          <div className="min-h-96 overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
            {communityConfig.calendarEmbedUrl ? (
              <iframe
                src={communityConfig.calendarEmbedUrl}
                title="Calendario de actividades de AFAP"
                loading="lazy"
                className="h-[500px] w-full border-0 sm:h-[540px] lg:h-[560px]"
              />
            ) : (
              <div className="flex min-h-96 h-full flex-col items-center justify-center px-6 py-12 text-center">
                <span className="flex size-14 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <CalendarIcon className="size-7" />
                </span>
                <h3 className="mt-5 text-xl font-bold text-foreground">
                  Estamos preparando nuestra agenda
                </h3>
                <p className="mt-3 max-w-lg leading-7 text-muted">
                  Próximamente publicaremos aquí nuestras actividades y
                  encuentros.
                </p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
