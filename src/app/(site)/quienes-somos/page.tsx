import type { Metadata } from "next";

import { AboutCta } from "@/components/sections/about-cta";
import { AboutHero } from "@/components/sections/about-hero";
import { AboutHistory } from "@/components/sections/about-history";
import { AboutMission } from "@/components/sections/about-mission";
import { AboutPillars } from "@/components/sections/about-pillars";
import { AboutReach } from "@/components/sections/about-reach";

export const metadata: Metadata = {
  title: "Quiénes somos | AFAP",
  description:
    "Conoce el origen, propósito y alcance nacional creciente de AFAP, una asociación independiente de familias y personas unidas por la salud mental.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutHistory />
      <AboutMission />
      <AboutPillars />
      <AboutReach />
      <AboutCta />
    </>
  );
}
