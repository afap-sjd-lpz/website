import Image from "next/image";

import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { CommunityIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/section";
import { communityConfig } from "@/config/community.config";

export function CommunityHero() {
  return (
    <Section
      aria-labelledby="community-hero-title"
      className="pb-8 sm:pb-10 lg:pb-10"
    >
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div>
            <p className="text-sm font-bold tracking-[0.16em] text-primary">
              COMUNIDAD Y RECURSOS
            </p>
            <h1
              id="community-hero-title"
              className="mt-4 max-w-3xl text-4xl leading-tight font-bold text-foreground sm:text-5xl"
            >
              Construimos comunidad, compartimos recursos
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted sm:text-xl sm:leading-9">
              En AFAP encontrarás actividades, espacios de participación y
              materiales de información que orientan y fortalecen el
              conocimiento sobre la salud mental, los trastornos mentales y la
              discapacidad mental.
            </p>

            <LinkButton
              href="#participar"
              intent="primary"
              className="mt-8 min-h-11 w-full px-5 text-base sm:w-auto"
            >
              <CommunityIcon className="size-5" />
              Conoce cómo participar
            </LinkButton>
          </div>

          <div className="relative aspect-4/3">
            {communityConfig.heroImageSrc ? (
              <Image
                src={communityConfig.heroImageSrc}
                alt="Personas participando en una actividad de la comunidad AFAP"
                fill
                preload
                unoptimized={process.env.NODE_ENV === "development"}
                sizes="(min-width: 1280px) 520px, (min-width: 1024px) 42vw, (min-width: 640px) calc(100vw - 3rem), calc(100vw - 2rem)"
                className="object-contain object-center"
              />
            ) : (
              <div
                aria-hidden="true"
                className="absolute inset-0 flex items-center justify-center"
              >
                <span className="absolute -top-10 -right-8 size-32 rounded-full bg-secondary/20" />
                <span className="absolute -bottom-12 -left-8 size-40 rounded-full bg-secondary/15" />
                <span className="absolute top-10 left-10 size-4 rounded-full bg-accent/25" />
                <span className="flex size-24 items-center justify-center rounded-full bg-surface/80 text-primary sm:size-28">
                  <CommunityIcon className="size-12 sm:size-14" />
                </span>
              </div>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
