import type { Metadata } from "next";

import { ContactHero } from "@/components/sections/contact-hero";
import { ContactMessage } from "@/components/sections/contact-message";
import { ContactSection } from "@/components/sections/contact-section";

export const metadata: Metadata = {
  title: "Contacto | AFAP",
  description:
    "Comunícate con AFAP para solicitar información, orientación o conocer cómo participar en nuestra comunidad.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactSection />
      <ContactMessage />
    </>
  );
}
