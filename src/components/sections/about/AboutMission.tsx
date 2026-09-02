import { Stagger, StaggerItem } from "@/components/motion";
import { Container } from "@/components/ui/container";
import { EyeIcon, TargetIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/section";

const statements = [
  {
    title: "Misión",
    text: "Contribuir a mejorar la calidad de vida de las personas con trastornos o discapacidad mental y de sus familias, fortaleciendo el apoyo mutuo, la orientación, la sensibilización, la defensa de derechos y la articulación con la comunidad y las instituciones.",
    className: "border-primary/20 bg-primary/10",
    iconClassName: "bg-primary/20 text-primary",
    Icon: TargetIcon,
  },
  {
    title: "Visión",
    text: "Consolidar una comunidad de alcance nacional que contribuya a una Bolivia más informada, inclusiva y respetuosa de los derechos de las personas con trastornos o discapacidad mental y de sus familias.",
    className: "border-secondary/20 bg-secondary/10",
    iconClassName: "bg-secondary/20 text-secondary",
    Icon: EyeIcon,
  },
] as const;

export function AboutMission() {
  return (
    <Section
      aria-label="Misión y visión"
      className="bg-surface pt-6 pb-4 sm:pt-8 sm:pb-5 lg:pt-10 lg:pb-5"
    >
      <Container>
        <Stagger className="grid items-stretch gap-6 md:grid-cols-2">
          {statements.map((statement) => (
            <StaggerItem key={statement.title} className="h-full">
              <article className={`h-full rounded-3xl border p-7 sm:p-9 ${statement.className}`}>
              <div className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className={`flex size-12 shrink-0 items-center justify-center rounded-full ${statement.iconClassName}`}
                >
                  <statement.Icon className="size-6" />
                </span>
                <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                  {statement.title}
                </h2>
              </div>
              <p className="mt-6 text-base leading-7 text-muted sm:text-lg sm:leading-8">
                {statement.text}
              </p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
