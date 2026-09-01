import { Brand } from "@/components/layout/Brand";
import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { WhatsAppIcon } from "@/components/ui/icons";
import {
  createWhatsappUrl,
  getPrimaryWhatsapp,
  type ContactSettingsData,
} from "@/sanity/lib/institutional";

import { DesktopNavigation } from "./DesktopNavigation";
import { MobileNavigation } from "./MobileNavigation";

interface NavbarProps {
  contactSettings: ContactSettingsData;
}

export function Navbar({ contactSettings }: NavbarProps) {
  const primaryWhatsapp = getPrimaryWhatsapp(contactSettings);
  const whatsappUrl = primaryWhatsapp
    ? createWhatsappUrl(primaryWhatsapp.number)
    : undefined;

  return (
    <header className="border-b border-border bg-surface">
      <Container>
        <div className="flex h-20 items-center justify-between">
          <Brand imagePriority />

          <DesktopNavigation />

          {whatsappUrl ? <div className="hidden md:block">
            <LinkButton
              href={whatsappUrl}
              intent="secondary"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Escríbenos por WhatsApp"
            >
              <WhatsAppIcon className="size-4" />
              Escríbenos
            </LinkButton>
          </div> : null}

          <MobileNavigation whatsappUrl={whatsappUrl} />
        </div>
      </Container>
    </header>
  );
}
