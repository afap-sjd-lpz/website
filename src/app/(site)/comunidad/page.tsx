import type { Metadata } from "next";

import { CommunityActivities } from "@/components/sections/community-activities";
import { CommunityHero } from "@/components/sections/community-hero";
import { CommunityJoin } from "@/components/sections/community-join";
import { CommunityResources } from "@/components/sections/community-resources";

export const metadata: Metadata = {
  title: "Comunidad y recursos | AFAP",
  description:
    "Conoce las actividades, formas de participación y recursos que AFAP prepara para familias y personas comprometidas con la salud mental.",
};

export default function CommunityPage() {
  return (
    <>
      <CommunityHero />
      <CommunityActivities />
      <CommunityJoin />
      <CommunityResources />
    </>
  );
}
