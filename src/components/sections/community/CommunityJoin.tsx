import Image from "next/image";

import { Reveal } from "@/components/motion";
import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { CommunityIcon, HeartIcon, LockIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/section";
import { communityConfig } from "@/config/community.config";

export function CommunityJoin() {
  return (
    <Section
      id="participar"
      aria-labelledby="community-join-title"
      className="scroll-mt-24 pt-8 pb-6 sm:pt-10 sm:pb-8 lg:pt-8 lg:pb-8"
    >
      <Container>
        <Reveal className="grid items-center gap-10 overflow-hidden rounded-3xl border border-secondary/20 bg-secondary/10 p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:p-10">
          <div>
            <div className="flex items-center gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-secondary/20 text-secondary">
                <CommunityIcon className="size-6" />
              </span>
              <div>
                <h2
                  id="community-join-title"
                  className="text-3xl font-bold text-foreground sm:text-4xl"
                >
                  Forma parte de nuestra comunidad
                </h2>
                <div
                  aria-hidden="true"
                  className="mt-4 h-1 w-14 rounded-full bg-secondary"
                />
              </div>
            </div>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
              Si quieres involucrarte, participar en nuestras actividades o
              acercarte a AFAP, nos encantará conocerte. Completa el formulario
              y la directiva se pondrá en contacto contigo para orientarte sobre
              las formas de participación.
            </p>

            <LinkButton
              href="/contacto"
              intent="secondary"
              className="mt-7 min-h-11 w-full px-5 text-base sm:w-auto"
            >
              Solicitar incorporación
            </LinkButton>

            <aside className="mt-7 flex gap-4 rounded-2xl border border-secondary/20 bg-surface/70 p-5">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary/15 text-secondary">
                <LockIcon className="size-5" />
              </span>
              <div>
                <h3 className="font-bold text-foreground">
                  Privacidad y cuidado
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Por respeto y seguridad de nuestra comunidad, el acceso a
                  nuestros espacios se realiza únicamente a través de la
                  directiva. No publicamos enlaces directos a grupos ni canales
                  de WhatsApp.
                </p>
              </div>
            </aside>
          </div>

          <div className="relative aspect-4/3">
            {communityConfig.joinImageSrc ? (
              <Image
                src={communityConfig.joinImageSrc}
                alt="Personas compartiendo en la comunidad AFAP"
                fill
                unoptimized={process.env.NODE_ENV === "development"}
                sizes="(min-width: 1280px) 520px, (min-width: 1024px) 42vw, (min-width: 640px) calc(100vw - 5rem), calc(100vw - 3rem)"
                className="object-contain object-center"
              />
            ) : (
              <div
                aria-hidden="true"
                className="absolute inset-0 flex items-center justify-center overflow-hidden"
              >
                <span className="absolute -right-12 -bottom-16 size-48 rounded-full bg-primary/10" />
                <span className="absolute -bottom-8 left-8 h-36 w-16 rotate-35 rounded-[100%_0] bg-secondary/25" />
                <span className="absolute right-6 bottom-0 h-44 w-18 -rotate-25 rounded-[0_100%] bg-secondary/20" />
                <span className="absolute top-10 right-12 size-4 rounded-full bg-accent/30" />
                <span className="relative flex size-24 items-center justify-center rounded-full bg-surface/85 text-secondary shadow-sm sm:size-28">
                  <CommunityIcon className="size-12 sm:size-14" />
                  <HeartIcon className="absolute -right-2 -bottom-1 size-8 text-accent" />
                </span>
              </div>
            )}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
