import type { Metadata } from "next";

import { AboutCta } from "@/components/sections/about-cta";
import { AboutBoard } from "@/components/sections/about-board";
import { AboutHero } from "@/components/sections/about-hero";
import { AboutHistory } from "@/components/sections/about-history";
import { AboutMission } from "@/components/sections/about-mission";
import { AboutPillars } from "@/components/sections/about-pillars";
import { AboutReach } from "@/components/sections/about-reach";
import {
  getActiveBoardMembers,
  getBoardSettings,
} from "@/sanity/lib/institutional";

export const metadata: Metadata = {
  title: "Quiénes somos | AFAP",
  description:
    "Conoce el origen, propósito y alcance nacional creciente de AFAP, una asociación independiente de familias y personas unidas por la salud mental.",
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
