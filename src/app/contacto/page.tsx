import { ContactHero } from "@/components/sections/contact-hero";
import { ContactMessage } from "@/components/sections/contact-message";
import { ContactSection } from "@/components/sections/contact-section";

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactSection />
      <ContactMessage />
    </>
  );
}
