import Image from "next/image";

import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export function HomeHero() {
  return (
    <Section aria-labelledby="home-hero-title">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div>
            <p className="mb-4 text-sm font-bold tracking-[0.16em] text-primary">
              APOYO · ORIENTACIÓN · COMUNIDAD
            </p>

            <h1
              id="home-hero-title"
              className="max-w-3xl text-4xl leading-tight font-bold text-foreground sm:text-5xl"
            >
              Acompañamos a familias, con{" "}
              <span className="text-primary">
                empatía y esperanza
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted sm:text-xl sm:leading-9">
              Brindamos orientación, acompañamiento y un espacio de
              comunidad para personas y familias vinculadas a la
              salud mental.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <LinkButton
                href="/quienes-somos"
                intent="primary"
                className="min-h-11 w-full px-5 text-base sm:w-auto"
              >
                Conoce nuestra asociación
              </LinkButton>

              <LinkButton
                href="/contacto"
                intent="outline"
                className="min-h-11 w-full px-5 text-base sm:w-auto"
              >
                Escríbenos
              </LinkButton>
            </div>
          </div>

          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute inset-0 translate-x-3 translate-y-3 rounded-3xl bg-secondary/25"
            />

            <Image
              src="/images/herohome.png"
              alt="Familia conversando con una profesional en un espacio de acompañamiento"
              width={1448}
              height={1086}
              preload
              sizes="(min-width: 1280px) 520px, (min-width: 1024px) 42vw, (min-width: 640px) calc(100vw - 3rem), calc(100vw - 2rem)"
              className="relative aspect-4/3 w-full rounded-3xl object-cover object-center shadow-sm"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
