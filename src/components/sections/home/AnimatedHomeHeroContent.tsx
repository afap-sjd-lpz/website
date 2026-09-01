"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

import { LinkButton } from "@/components/ui/button";

const ease = [0.22, 1, 0.36, 1] as const;

function createEntranceVariants(y: number, delay: number): Variants {
  return {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.38, delay, ease },
    },
  };
}

const eyebrowVariants = createEntranceVariants(8, 0);
const titleVariants = createEntranceVariants(10, 0.06);
const copyVariants = createEntranceVariants(8, 0.12);
const actionsVariants = createEntranceVariants(6, 0.18);

export function AnimatedHomeHeroContent() {
  const shouldReduceMotion = useReducedMotion();
  const initialState = shouldReduceMotion ? false : "hidden";

  return (
    <div>
      <motion.p
        initial={initialState}
        animate="visible"
        variants={eyebrowVariants}
        className="mb-4 text-sm font-bold tracking-[0.16em] text-primary"
      >
        APOYO · ORIENTACIÓN · DERECHOS
      </motion.p>

      <motion.h1
        id="home-hero-title"
        initial={initialState}
        animate="visible"
        variants={titleVariants}
        className="max-w-3xl text-4xl leading-tight font-bold text-foreground sm:text-5xl"
      >
        Unidos por la salud mental en Bolivia
      </motion.h1>

      <motion.p
        initial={initialState}
        animate="visible"
        variants={copyVariants}
        className="mt-6 max-w-2xl text-lg leading-8 text-muted sm:text-xl sm:leading-9"
      >
        En AFAP, familias, amigos y personas comprometidas con la salud mental
        nos unimos para orientarnos, apoyarnos, defender derechos y contribuir a
        una sociedad más informada e inclusiva.
      </motion.p>

      <motion.div
        initial={initialState}
        animate="visible"
        variants={actionsVariants}
        className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
      >
        <LinkButton
          href="/quienes-somos"
          intent="primary"
          className="min-h-11 w-full px-5 text-base sm:w-auto"
        >
          Conoce AFAP
        </LinkButton>

        <LinkButton
          href="/contacto"
          intent="outline"
          className="min-h-11 w-full px-5 text-base sm:w-auto"
        >
          Contáctanos
        </LinkButton>
      </motion.div>
    </div>
  );
}
