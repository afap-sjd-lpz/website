import type { Metadata } from "next";

import { CommunityActivities } from "@/components/sections/community/CommunityActivities";
import { CommunityHero } from "@/components/sections/community/CommunityHero";
import { CommunityJoin } from "@/components/sections/community/CommunityJoin";
import { CommunityResources } from "@/components/sections/community/CommunityResources";

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
