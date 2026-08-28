import { Container } from "@/components/ui/container";
import {
  BookIcon,
  CommunityIcon,
  HeartIcon,
  ShieldIcon,
} from "@/components/ui/icons";
import { Section } from "@/components/ui/section";

const resources = [
  {
    title: "Orientación y bienestar",
    description:
      "Información y materiales de orientación para personas y familias vinculadas a la salud mental.",
    Icon: HeartIcon,
    iconClassName: "bg-primary/15 text-primary",
  },
  {
    title: "Derechos y normativa",
    description:
      "Información sobre derechos, normativa y marcos relevantes para las personas y sus familias.",
    Icon: ShieldIcon,
    iconClassName: "bg-secondary/15 text-secondary",
  },
  {
    title: "Materiales descargables",
    description:
      "Folletos, infografías, guías y otros materiales para consultar y compartir.",
    Icon: BookIcon,
    iconClassName: "bg-accent/15 text-accent",
  },
  {
    title: "Videos y charlas",
    description:
      "Charlas, entrevistas y materiales audiovisuales sobre salud mental e inclusión.",
    Icon: CommunityIcon,
    iconClassName: "bg-primary/15 text-primary",
  },
] as const;

export function CommunityResources() {
  return (
    <Section
      aria-labelledby="community-resources-title"
      className="pt-10 sm:pt-12 lg:pt-14"
    >
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="community-resources-title"
            className="text-3xl font-bold text-foreground sm:text-4xl"
          >
            Recursos para informarte y orientarte
          </h2>
          <div
            aria-hidden="true"
            className="mx-auto mt-4 h-1 w-14 rounded-full bg-primary"
          />
          <p className="mt-5 text-lg leading-8 text-muted">
            Ponemos a tu disposición materiales y herramientas útiles
            para fortalecer el bienestar, la inclusión y la defensa de
            derechos.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {resources.map((resource) => (
            <article
              key={resource.title}
              className="flex h-full flex-col rounded-3xl border border-border bg-surface p-6"
            >
              <span
                aria-hidden="true"
                className={`flex size-11 items-center justify-center rounded-full ${resource.iconClassName}`}
              >
                <resource.Icon className="size-5" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-foreground">
                {resource.title}
              </h3>
              <p className="mt-3 grow leading-7 text-muted">
                {resource.description}
              </p>
              <span className="mt-5 self-start rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                Próximamente
              </span>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
