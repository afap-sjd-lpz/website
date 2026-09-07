import Image from "next/image";

import { Reveal } from "@/components/motion";
import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export function AboutCta() {
  return (
    <Section
      aria-labelledby="about-cta-title"
      className="bg-surface pt-6 sm:pt-8 lg:pt-8"
    >
      <Container>
        <Reveal className="relative overflow-hidden rounded-3xl border border-primary/20 bg-primary/10 px-6 py-9 sm:px-10 sm:py-11 lg:px-12">
          <div className="relative z-10 max-w-3xl lg:max-w-[70%]">
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
            <Image
              src="/images/comunidad.png"
              alt=""
              fill
              sizes="38vw"
              className="object-contain object-right"
            />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
