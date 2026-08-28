import {
  BookIcon,
  CommunityIcon,
  EarIcon,
  HeartIcon,
} from "@/components/ui/icons";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

const areas = [
  {
    title: "Orientación y apoyo",
    description:
      "Generamos espacios de encuentro y orientación para que las familias compartan experiencias, accedan a información y encuentren apoyo mutuo.",
    Icon: EarIcon,
    colorClassName: "bg-primary/15 text-primary",
  },
  {
    title: "Sensibilización",
    description:
      "Promovemos talleres y actividades de sensibilización y socialización sobre salud mental y trastornos mentales.",
    Icon: CommunityIcon,
    colorClassName: "bg-secondary/15 text-secondary",
  },
  {
    title: "Defensa de derechos",
    description:
      "Promovemos y defendemos los derechos de las personas con trastornos y discapacidad mental y/o psíquica y de sus familias.",
    Icon: HeartIcon,
    colorClassName: "bg-accent/15 text-accent",
  },
  {
    title: "Articulación institucional",
    description:
      "Coordinamos acciones con instituciones públicas y privadas y fortalecemos vínculos con organizaciones nacionales e internacionales.",
    Icon: BookIcon,
    colorClassName: "bg-primary/15 text-primary",
  },
] as const;

export function HomeWhatWeDo() {
  return (
    <Section aria-labelledby="home-what-we-do-title" className="bg-surface/60">
      <Container>
        <div className="max-w-3xl">
          <h2
            id="home-what-we-do-title"
            className="text-3xl font-bold text-foreground sm:text-4xl"
          >
            Qué hacemos
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted">
            Trabajamos junto a las familias, la comunidad y las
            instituciones para afrontar colectivamente los desafíos
            relacionados con la salud mental.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {areas.map((area) => (
            <article
              key={area.title}
              className="rounded-3xl border border-border bg-surface p-6"
            >
              <span
                aria-hidden="true"
                className={`flex size-11 items-center justify-center rounded-full ${area.colorClassName}`}
              >
                <area.Icon className="size-5" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-foreground">
                {area.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted">
                {area.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
