import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { HeartIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/section";

export function AboutCta() {
  return (
    <Section
      aria-labelledby="about-cta-title"
      className="bg-surface pt-6 sm:pt-8 lg:pt-8"
    >
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-primary/10 px-6 py-9 sm:px-10 sm:py-11 lg:px-12">
          <div className="relative z-10 max-w-3xl lg:max-w-[62%]">
            <h2
              id="about-cta-title"
              className="text-3xl font-bold text-foreground sm:text-4xl"
            >
              Conoce, participa y construye comunidad
            </h2>
            <div
              aria-hidden="true"
              className="mt-4 h-1 w-14 rounded-full bg-primary"
            />
            <p className="mt-4 text-base leading-7 text-muted sm:text-lg sm:leading-8">
              Si quieres conocer más sobre AFAP, participar en nuestras
              actividades o comunicarte con una filial, estamos para
              escucharte.
            </p>
            <LinkButton
              href="/contacto"
              intent="primary"
              className="mt-6 min-h-11 w-full px-5 text-base sm:w-auto"
            >
              Contáctanos
            </LinkButton>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 hidden w-[38%] lg:block"
          >
            <span className="absolute right-16 bottom-8 flex size-16 items-center justify-center rounded-full bg-surface/85 text-accent shadow-sm">
              <HeartIcon className="size-8" />
            </span>
            <span className="absolute right-36 bottom-0 h-36 w-16 rotate-35 rounded-[100%_0] bg-secondary/30" />
            <span className="absolute right-2 bottom-0 h-44 w-18 -rotate-25 rounded-[0_100%] bg-secondary/25" />
            <span className="absolute right-24 bottom-0 h-24 w-11 rotate-12 rounded-[100%_0] bg-accent/15" />
            <span className="absolute top-7 right-32 size-5 rounded-full bg-accent/30" />
            <span className="absolute top-16 right-6 size-3 rounded-full bg-accent/20" />
            <span className="absolute top-10 right-8 size-32 rounded-full bg-primary/15" />
          </div>
        </div>
      </Container>
    </Section>
  );
}
