import Image from "next/image";

import { Reveal } from "@/components/motion";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export function ResourceLibraryHero() {
  return (
    <Section
      aria-labelledby="resource-library-hero-title"
      className="pb-8 sm:pb-10 lg:pb-10"
    >
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <Reveal>
            <p className="text-sm font-bold tracking-[0.16em] text-primary">
              RECURSOS
            </p>
            <h1
              id="resource-library-hero-title"
              className="mt-4 text-4xl leading-tight font-bold text-foreground sm:text-5xl"
            >
              Biblioteca de recursos
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted sm:text-xl sm:leading-9">
              AFAP reúne artículos, materiales y videos para informar, orientar
              y acompañar a personas y familias en temas relacionados con la
              salud mental, los trastornos mentales y la discapacidad mental.
            </p>
          </Reveal>

          <Reveal className="relative aspect-3/2 w-full">
            <Image
              src="/images/heroresources.png"
              alt=""
              fill
              preload
              sizes="(min-width: 1280px) 520px, (min-width: 1024px) 42vw, (min-width: 640px) calc(100vw - 3rem), calc(100vw - 2rem)"
              className="object-contain object-center"
            />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
