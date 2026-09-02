import type { Metadata } from "next";

import { AboutBoard } from "@/components/sections/about/AboutBoard";
import { AboutCta } from "@/components/sections/about/AboutCta";
import { AboutHero } from "@/components/sections/about/AboutHero";
import { AboutHistory } from "@/components/sections/about/AboutHistory";
import { AboutMission } from "@/components/sections/about/AboutMission";
import { AboutPillars } from "@/components/sections/about/AboutPillars";
import { AboutReach } from "@/components/sections/about/AboutReach";
import {
  getActiveBoardMembers,
  getBoardSettings,
} from "@/sanity/lib/institutional";

export const metadata: Metadata = {
  title: "Quiénes somos | AFAP",
  description:
    "Conoce el origen, propósito y alcance nacional creciente de AFAP, una asociación independiente de familias y personas unidas por la salud mental.",
  alternates: {
    canonical: "/quienes-somos",
  },
};

export default async function AboutPage() {
  const [boardMembers, boardSettings] = await Promise.all([
    getActiveBoardMembers(),
    getBoardSettings(),
  ]);

  return (
    <>
      <AboutHero />
      <AboutHistory />
      <AboutMission />
      <AboutPillars />
      <AboutBoard members={boardMembers} settings={boardSettings} />
      <AboutReach />
      <AboutCta />
    </>
  );
}
