import { Reveal } from "@/components/motion";
import { Container } from "@/components/ui/container";
import { PeopleIcon, ShieldIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/section";

export function AboutHistory() {
  return (
    <Section
      aria-labelledby="about-history-title"
      className="bg-surface py-12 sm:py-14 lg:py-16"
    >
      <Container>
        <div className="grid items-start gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:gap-14">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-secondary/15 text-secondary">
                <PeopleIcon className="size-6" />
              </span>
              <div>
                <h2
                  id="about-history-title"
                  className="text-3xl font-bold text-foreground sm:text-4xl"
                >
                  Nuestro origen
                </h2>
                <div
                  aria-hidden="true"
                  className="mt-3 flex items-center gap-2"
                >
                  <span className="h-1 w-14 rounded-full bg-secondary" />
                  <span className="size-2 rounded-full bg-accent/35" />
                </div>
              </div>
            </div>
            <div className="mt-7 grid max-w-3xl gap-5 text-base leading-7 text-muted sm:text-lg sm:leading-8">
              <p>
                AFAP nació en La Paz a partir de la iniciativa de familiares de
                pacientes atendidos en el Centro de Rehabilitación y Salud
                Mental San Juan de Dios, quienes comenzaron a organizarse para
                apoyarse mutuamente y buscar mejores condiciones para sus
                familiares.
              </p>
              <p>
                La referencia a San Juan de Dios en la denominación legal de la
                asociación responde a este origen histórico. AFAP es una
                organización independiente y no forma parte de la Orden
                Hospitalaria de San Juan de Dios.
              </p>
              <p>
                Con los años, la comunidad fue creciendo. Actualmente AFAP
                cuenta con filiales y participación en otros departamentos de
                Bolivia y continúa fortaleciendo su presencia y articulación a
                nivel nacional.
              </p>
            </div>
          </Reveal>

          <Reveal className="self-start">
            <aside className="relative overflow-hidden rounded-3xl border border-primary/20 bg-primary/10 p-7 sm:p-9">
            <div className="relative z-10">
              <span className="flex size-12 items-center justify-center rounded-full bg-primary/20 text-primary">
                <ShieldIcon className="size-6" />
              </span>
              <p className="mt-6 text-sm font-bold tracking-[0.12em] text-primary uppercase">
                Denominación legal
              </p>
              <p className="mt-4 max-w-md leading-7 text-foreground">
                Asociación de Familiares y Amigos de Pacientes con Discapacidad
                Mental y/o Psíquica de San Juan de Dios - La Paz (A.F.A.P.)
              </p>
            </div>

            <svg
              aria-hidden="true"
              viewBox="0 0 420 100"
              className="pointer-events-none absolute right-0 bottom-0 w-full text-primary/20"
              fill="none"
            >
              <path
                d="M0 82c48-30 75 8 118-13s75-10 111 4 66 10 97-7 58-19 94 2v32H0Z"
                fill="currentColor"
                opacity=".18"
              />
              <path
                d="M0 87c51-25 78 7 121-12s73-7 109 7 64 8 96-8 59-16 94 3"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M245 54c12-10 24-10 36 0M312 40c11-9 22-9 33 0"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle
                cx="368"
                cy="47"
                r="5"
                fill="var(--accent)"
                opacity=".22"
              />
            </svg>
            </aside>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
