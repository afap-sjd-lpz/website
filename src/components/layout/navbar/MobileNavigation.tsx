"use client";

import { Drawer } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { LinkButton } from "@/components/ui/button";
import {
  MenuIcon,
  WhatsAppIcon,
} from "@/components/ui/icons";
import { navigationItems } from "@/config/navigation.config";

import { isNavigationItemActive } from "./navigation.utils";

interface MobileNavigationProps {
  whatsappUrl?: string;
}

export function MobileNavigation({ whatsappUrl }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="md:hidden">
      <Drawer
        isOpen={isOpen}
        onOpenChange={setIsOpen}
      >
        <Drawer.Trigger
          aria-label="Abrir menú principal"
          className="inline-flex size-10 items-center justify-center rounded-lg text-foreground hover:bg-primary/10"
        >
          <MenuIcon className="size-6" />
        </Drawer.Trigger>

        <Drawer.Backdrop variant="opaque">
          <Drawer.Content placement="right">
            <Drawer.Dialog className="bg-surface">
              <Drawer.Header>
                <Drawer.Heading>Menú principal</Drawer.Heading>
                <Drawer.CloseTrigger aria-label="Cerrar menú" />
              </Drawer.Header>

              <Drawer.Body className="pt-6">
                <nav
                  aria-label="Navegación principal móvil"
                  className="flex flex-col gap-2"
                >
                  {navigationItems.map((item) => {
                    const isActive = isNavigationItemActive(
                      pathname,
                      item.href,
                    );

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        aria-current={isActive ? "page" : undefined}
                        onClick={() => setIsOpen(false)}
                        className={`rounded-lg border-b-2 px-4 py-3 text-base transition-colors ${
                          isActive
                            ? "border-primary font-semibold text-primary"
                            : "border-transparent font-medium text-foreground hover:bg-primary/10 hover:text-primary"
                        }`}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>
              </Drawer.Body>

              {whatsappUrl ? <Drawer.Footer className="flex-col items-stretch border-t border-border pt-4">
                <LinkButton
                  href={whatsappUrl}
                  intent="secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Escríbenos por WhatsApp"
                  onPress={() => setIsOpen(false)}
                  className="w-full"
                >
                  <WhatsAppIcon className="size-4" />
                  Escríbenos por WhatsApp
                </LinkButton>
              </Drawer.Footer> : null}
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </div>
  );
}
