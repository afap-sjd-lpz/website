import Image from "next/image";

import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export function AboutHero() {
  return (
    <Section
      aria-labelledby="about-hero-title"
      className="pb-12 sm:pb-14 lg:pb-16"
    >
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div>
            <p className="text-sm font-bold tracking-[0.16em] text-primary">
              QUIÉNES SOMOS
            </p>
            <h1
              id="about-hero-title"
              className="mt-4 max-w-3xl text-4xl leading-tight font-bold text-foreground sm:text-5xl"
            >
              Familias y personas unidas por la salud mental
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted sm:text-xl sm:leading-9">
              AFAP es una asociación sin fines de lucro que trabaja por el
              bienestar, la inclusión y los derechos de las personas con
              trastornos o discapacidad mental, constituyéndose en una guía y
              un apoyo para sus familias.
            </p>

            <LinkButton
              href="/contacto"
              intent="primary"
              className="mt-8 min-h-11 w-full px-5 text-base sm:w-auto"
            >
              Contáctanos
            </LinkButton>
          </div>

          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute inset-0 translate-x-3 translate-y-3 rounded-3xl bg-secondary/25"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-3 -right-2 z-10 size-4 rounded-full bg-accent/25 sm:-right-3 sm:size-5"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-5 left-8 z-10 size-2.5 rounded-full bg-accent/35 sm:left-12"
            />
            <Image
              src="/images/herohome.png"
              alt="Familia conversando con una profesional en un espacio de acompañamiento"
              width={1448}
              height={1086}
              preload
              sizes="(min-width: 1280px) 520px, (min-width: 1024px) 42vw, (min-width: 640px) calc(100vw - 3rem), calc(100vw - 2rem)"
              className="relative aspect-4/3 w-full rounded-3xl border border-border/60 object-cover object-center shadow-sm"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
