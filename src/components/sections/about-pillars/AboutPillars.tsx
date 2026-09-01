import {
  BookIcon,
  CommunityIcon,
  EarIcon,
  HeartIcon,
} from "@/components/ui/icons";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

const pillars = [
  {
    title: "Apoyo mutuo y orientación",
    text: "Facilitamos espacios de encuentro para compartir experiencias, acceder a información y tomar decisiones informadas en familia.",
    Icon: EarIcon,
    iconClassName: "bg-primary/15 text-primary",
  },
  {
    title: "Sensibilización y socialización",
    text: "Impulsamos una visión social informada y respetuosa que favorezca la salud mental y mejore las condiciones de vida de las personas con trastornos o discapacidad mental.",
    Icon: CommunityIcon,
    iconClassName: "bg-secondary/15 text-secondary",
  },
  {
    title: "Defensa de derechos",
    text: "Promovemos y defendemos la dignidad, la inclusión y los derechos de las personas con trastornos o discapacidad mental y de sus familias.",
    Icon: HeartIcon,
    iconClassName: "bg-accent/15 text-accent",
  },
  {
    title: "Articulación y trabajo colectivo",
    text: "Construimos vínculos con instituciones y organizaciones para buscar respuestas y soluciones junto a la comunidad.",
    Icon: BookIcon,
    iconClassName: "bg-primary/15 text-primary",
  },
] as const;

export function AboutPillars() {
  return (
    <Section
      aria-labelledby="about-pillars-title"
      className="bg-surface pt-8 pb-10 sm:pt-10 sm:pb-10 lg:pt-10 lg:pb-10"
    >
      <Container>
        <div className="text-center">
          <h2
            id="about-pillars-title"
            className="text-3xl font-bold text-foreground sm:text-4xl"
          >
            Nuestros ejes de trabajo
          </h2>
          <div
            aria-hidden="true"
            className="mx-auto mt-4 h-1 w-14 rounded-full bg-secondary"
          />
        </div>

        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => (
            <article
              key={pillar.title}
              className="h-full rounded-3xl border border-border bg-surface p-6"
            >
              <div className="flex items-start gap-4">
                <span
                  aria-hidden="true"
                  className={`flex size-11 shrink-0 items-center justify-center rounded-full ${pillar.iconClassName}`}
                >
                  <pillar.Icon className="size-5" />
                </span>
                <h3 className="text-lg font-bold text-foreground">
                  {pillar.title}
                </h3>
              </div>
              <p className="mt-4 leading-7 text-muted">{pillar.text}</p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
