import Image from "next/image";

import { Container } from "@/components/ui/container";
import {
  CommunityIcon,
  EarIcon,
  HeartIcon,
} from "@/components/ui/icons";
import { Section } from "@/components/ui/section";

const contactConcepts = [
  {
    title: "Escuchamos",
    description: "Te brindamos un espacio seguro para expresarte.",
    backgroundClassName: "bg-secondary/15",
    iconClassName: "text-secondary",
    Icon: EarIcon,
  },
  {
    title: "Acompañamos",
    description: "Orientación y apoyo para ti y tu familia.",
    backgroundClassName: "bg-primary/15",
    iconClassName: "text-primary",
    Icon: HeartIcon,
  },
  {
    title: "Conectamos",
    description: "Te vinculamos con recursos y comunidad.",
    backgroundClassName: "bg-accent/15",
    iconClassName: "text-accent",
    Icon: CommunityIcon,
  },
] as const;

export function ContactHero() {
  return (
    <Section
      aria-labelledby="contact-hero-title"
      className="pb-8 sm:pb-10 lg:pb-10"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-x-14 lg:gap-y-10">
          <div>
            <p className="mb-4 text-sm font-bold tracking-[0.16em] text-accent">
              CONTACTO
            </p>

            <h1
              id="contact-hero-title"
              className="max-w-3xl text-4xl leading-tight font-bold text-foreground sm:text-5xl"
            >
              Hablemos, estamos para acompañarte
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              Si necesitas orientación, información o quieres conocer
              más sobre nuestra asociación, escríbenos. Te
              responderemos con la mayor prontitud posible.
            </p>
          </div>

          <Image
            src="/images/herocontact.png"
            alt="Ilustración de una mujer comunicándose desde su teléfono"
            width={1448}
            height={1086}
            preload
            sizes="(min-width: 1280px) 520px, (min-width: 1024px) 42vw, (min-width: 640px) calc(100vw - 3rem), calc(100vw - 2rem)"
            className="aspect-4/3 w-full rounded-3xl object-cover object-center lg:col-start-2 lg:row-span-2 lg:row-start-1"
          />

          <div className="grid gap-5 lg:col-start-1 lg:row-start-2 lg:grid-cols-3">
            {contactConcepts.map((concept) => (
              <div
                key={concept.title}
                className="flex items-start gap-4 lg:flex-col lg:gap-3"
              >
                <div
                  aria-hidden="true"
                  className={`flex size-10 shrink-0 items-center justify-center rounded-full ${concept.backgroundClassName}`}
                >
                  <concept.Icon
                    className={`size-5 ${concept.iconClassName}`}
                  />
                </div>

                <div>
                  <h2 className="font-bold text-foreground">
                    {concept.title}
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-muted">
                    {concept.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
