import { Container } from "@/components/ui/container";
import { HeartIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/section";

export function ContactMessage() {
  return (
    <Section
      aria-labelledby="contact-message-title"
      className="pt-8 sm:pt-10 lg:pt-8"
    >
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-secondary/20 bg-secondary/10 px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
          >
            <span className="absolute -top-12 -left-12 size-32 rounded-full bg-primary/10 sm:size-40" />
            <span className="absolute top-7 left-8 size-3 rounded-full bg-accent/15 sm:left-14 sm:size-4" />
            <span className="absolute -right-10 -bottom-14 size-36 rounded-full bg-primary/10 sm:size-48" />
            <span className="absolute right-8 bottom-8 size-2.5 rounded-full bg-accent/15 sm:right-14 sm:size-3.5" />
          </div>

          <div className="relative z-10 mx-auto max-w-2xl text-center">
            <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/20 text-primary sm:size-14">
              <HeartIcon className="size-6 sm:size-7" />
            </span>

            <h2
              id="contact-message-title"
              className="mt-6 text-2xl font-bold text-foreground sm:text-3xl"
            >
              Tu mensaje hace la diferencia
            </h2>

            <p className="mt-4 text-base leading-7 text-muted sm:text-lg sm:leading-8">
              Cada consulta nos ayuda a seguir construyendo una
              comunidad más informada, empática y solidaria.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
