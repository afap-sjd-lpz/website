import Link from "next/link";
import type { ComponentType, ReactNode } from "react";

import { Brand } from "@/components/layout/brand";
import { Container } from "@/components/ui/container";
import {
  BookIcon,
  CommunityIcon,
  FacebookIcon,
  HomeIcon,
  LocationIcon,
  MailIcon,
  PeopleIcon,
  WhatsAppIcon,
  type IconProps,
} from "@/components/ui/icons";
import { contactConfig } from "@/config/contact.config";
import { navigationItems } from "@/config/navigation.config";

const navigationIcons: Record<
  string,
  ComponentType<IconProps>
> = {
  "/": HomeIcon,
  "/quienes-somos": PeopleIcon,
  "/comunidad": CommunityIcon,
  "/recursos": BookIcon,
  "/contacto": MailIcon,
};

interface SocialLinkProps {
  children: ReactNode;
  href: string;
  label: string;
  opensInNewTab?: boolean;
}

function SocialLink({
  children,
  href,
  label,
  opensInNewTab = false,
}: SocialLinkProps) {
  return (
    <a
      href={href}
      aria-label={label}
      target={opensInNewTab ? "_blank" : undefined}
      rel={opensInNewTab ? "noopener noreferrer" : undefined}
      className="inline-flex size-11 items-center justify-center rounded-xl border border-primary/40 text-primary transition-colors hover:border-primary hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      {children}
    </a>
  );
}

export function Footer() {
  return (
    <footer className="py-6 sm:py-8">
      <Container>
        <div className="rounded-3xl bg-primary/10 px-6 py-10 sm:px-8 lg:px-10 lg:py-12">
          <div className="grid gap-10 text-center md:grid-cols-3 md:gap-12 md:text-start lg:gap-20">
            <div className="flex flex-col items-center md:items-start">
              <Brand />

              <p className="mt-6 max-w-sm leading-7 text-foreground">
                Acompañamos a personas y familias promoviendo apoyo,
                orientación, inclusión y bienestar en salud mental.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-foreground">
                Enlaces
              </h2>

              <nav
                aria-label="Enlaces del pie de página"
                className="mt-5"
              >
                <ul className="grid grid-cols-3 gap-2 md:flex md:flex-col md:items-start md:gap-3">
                  {navigationItems.map((item) => {
                    const Icon = navigationIcons[item.href];

                    return (
                      <li key={item.href} className="min-w-0">
                        <Link
                          href={item.href}
                          className="flex flex-col items-center gap-2 rounded-lg py-2 text-xs text-foreground transition-colors hover:text-primary md:flex-row md:py-0 md:text-base"
                        >
                          <Icon className="size-6 shrink-0 text-primary" />
                          <span>{item.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>

            <div>
              <h2 className="text-lg font-bold text-foreground">
                Contacto
              </h2>

              <div className="mt-5 flex flex-col items-center gap-4 text-foreground md:items-start">
                <p className="flex items-center gap-3">
                  <LocationIcon className="size-6 shrink-0 text-primary" />
                  {contactConfig.location}
                </p>

                <a
                  href={`mailto:${contactConfig.email}`}
                  className="flex items-center gap-3 transition-colors hover:text-primary"
                >
                  <MailIcon className="size-6 shrink-0 text-primary" />
                  {contactConfig.email}
                </a>
              </div>

              <div className="mt-6 flex justify-center gap-3 md:justify-start">
                <SocialLink
                  href={contactConfig.facebookUrl}
                  label="Visitar Facebook de AFAP"
                  opensInNewTab
                >
                  <FacebookIcon className="size-5" />
                </SocialLink>

                <SocialLink
                  href={contactConfig.whatsappUrl}
                  label="Escribir a AFAP por WhatsApp"
                  opensInNewTab
                >
                  <WhatsAppIcon className="size-5" />
                </SocialLink>

                <SocialLink
                  href={`mailto:${contactConfig.email}`}
                  label="Enviar un correo electrónico a AFAP"
                >
                  <MailIcon className="size-5" />
                </SocialLink>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center gap-4 border-t border-primary/25 pt-6 text-center text-sm text-muted sm:flex-row sm:justify-between sm:text-start">
            <p>© 2026 AFAP</p>

            <Link
              href="/politica-de-privacidad"
              className="font-semibold text-primary hover:underline"
            >
              Política de privacidad
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
