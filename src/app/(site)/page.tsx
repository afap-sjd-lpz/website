import type { Metadata } from "next";

import { HomeHero } from "@/components/sections/home/HomeHero";
import { HomeStory } from "@/components/sections/home/HomeStory";
import { HomeWhatWeDo } from "@/components/sections/home/HomeWhatWeDo";

export const metadata: Metadata = {
  title: "AFAP Bolivia | Unidos por la salud mental",
  description:
    "AFAP reúne a familias, amigos y personas comprometidas con la salud mental en Bolivia, promoviendo apoyo, orientación, inclusión y defensa de derechos.",
  alternates: {
    canonical: "/",
  },
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
