import { Brand } from "@/components/layout/brand";
import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { WhatsAppIcon } from "@/components/ui/icons";
import { contactConfig } from "@/config/contact.config";

import { DesktopNavigation } from "./DesktopNavigation";
import { MobileNavigation } from "./MobileNavigation";

export function Navbar() {
  return (
    <header className="border-b border-border bg-surface">
      <Container>
        <div className="flex h-20 items-center justify-between">
          <Brand imagePriority />

          <DesktopNavigation />

          <div className="hidden md:block">
            <LinkButton
              href={contactConfig.whatsappUrl}
              intent="secondary"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Escríbenos por WhatsApp"
            >
              <WhatsAppIcon className="size-4" />
              Escríbenos
            </LinkButton>
          </div>

          <MobileNavigation />
        </div>
      </Container>
    </header>
  );
}
