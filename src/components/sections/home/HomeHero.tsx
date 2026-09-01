import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

import { AnimatedAfapLogo } from "./AnimatedAfapLogo";
import { AnimatedHomeHeroContent } from "./AnimatedHomeHeroContent";

export function HomeHero() {
  return (
    <Section aria-labelledby="home-hero-title">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <AnimatedHomeHeroContent />

          <div className="relative flex aspect-4/3 items-center justify-center">
            <div
              aria-hidden="true"
              className="absolute inset-x-[9%] inset-y-[13%] rounded-[50%] bg-secondary/10"
            />

            <AnimatedAfapLogo className="relative h-auto w-[86%] max-w-[440px]" />
          </div>
        </div>
      </Container>
    </Section>
  );
}
