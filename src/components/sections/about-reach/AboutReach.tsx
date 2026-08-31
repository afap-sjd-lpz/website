import Image from "next/image";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export function AboutReach() {
  return (
    <Section
      aria-labelledby="about-reach-title"
      className="bg-surface pt-8 pb-6 sm:pt-8 sm:pb-8 lg:pt-8 lg:pb-8"
    >
      <Container>
        <div className="grid items-center gap-8 overflow-hidden rounded-3xl border border-secondary/20 bg-secondary/10 px-6 py-8 sm:px-10 lg:grid-cols-[0.34fr_0.66fr] lg:gap-12 lg:px-12">
          <div
            aria-hidden="true"
            className="mx-auto w-full max-w-72 lg:max-w-80"
          >
            <Image
              src="/images/mapa_bolivia.png"
              alt=""
              width={1536}
              height={1024}
              sizes="(min-width: 1024px) 320px, 288px"
              className="h-auto w-full object-contain"
            />
          </div>
          <div>
            <h2
              id="about-reach-title"
              className="text-3xl font-bold text-foreground sm:text-4xl"
            >
              AFAP en Bolivia
            </h2>
            <div
              aria-hidden="true"
              className="mt-4 h-1 w-14 rounded-full bg-secondary"
            />
            <div className="mt-5 grid gap-4 text-base leading-7 text-muted sm:text-lg sm:leading-8">
              <p>
                Nuestro trabajo comenzó en La Paz y continúa creciendo
                mediante filiales, familias y personas comprometidas con
                los objetivos de AFAP en distintos departamentos del país.
              </p>
              <p>
                Nuestro crecimiento es progresivo y buscamos fortalecer
                vínculos que permitan acercar orientación, información y
                defensa de derechos a más familias en Bolivia.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
