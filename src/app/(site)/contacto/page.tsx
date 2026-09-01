import type { Metadata } from "next";

import { ContactHero } from "@/components/sections/contact/ContactHero";
import { ContactMessage } from "@/components/sections/contact/ContactMessage";
import { ContactSection } from "@/components/sections/contact/ContactSection";
import { getContactSettings } from "@/sanity/lib/institutional";

export const metadata: Metadata = {
  title: "Contacto | AFAP",
  description:
    "Comunícate con AFAP para solicitar información, orientación o conocer cómo participar en nuestra comunidad.",
};

export default async function ContactPage() {
  const contactSettings = await getContactSettings();

  return (
    <>
      <ContactHero />
      <ContactSection contactSettings={contactSettings} />
      <ContactMessage />
    </>
  );
}
