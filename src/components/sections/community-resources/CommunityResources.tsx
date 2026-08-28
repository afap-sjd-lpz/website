import { Container } from "@/components/ui/container";
import { BookIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/section";

export function CommunityResources() {
  return (
    <Section aria-labelledby="community-resources-title" className="pt-14 sm:pt-16 lg:pt-20">
      <Container>
        <div className="rounded-3xl border border-primary/20 bg-primary/10 px-6 py-10 sm:px-10 sm:py-12">
          <span className="flex size-11 items-center justify-center rounded-full bg-surface text-primary">
            <BookIcon className="size-5" />
          </span>
          <h2
            id="community-resources-title"
            className="mt-5 text-3xl font-bold text-foreground sm:text-4xl"
          >
            Recursos
          </h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-muted">
            Estamos preparando materiales de orientación, información
            sobre derechos y recursos de utilidad para las familias y la
            comunidad.
          </p>
        </div>
      </Container>
    </Section>
  );
}
