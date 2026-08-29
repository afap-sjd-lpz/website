import type { Metadata } from "next";

import { HomeHero } from "@/components/sections/home-hero";
import { HomeStory } from "@/components/sections/home-story";
import { HomeWhatWeDo } from "@/components/sections/home-what-we-do";

export const metadata: Metadata = {
  title: "Inicio | AFAP",
  description:
    "Conoce AFAP, una comunidad de familias y personas unidas por la salud mental, la inclusión y los derechos en Bolivia.",
};

export default function Home() {
  return (
    <>
      <HomeHero />
      <HomeWhatWeDo />
      <HomeStory />
    </>
  );
}
