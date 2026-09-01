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
  PhoneIcon,
  WhatsAppIcon,
  YouTubeIcon,
  type IconProps,
} from "@/components/ui/icons";
import { navigationItems } from "@/config/navigation.config";
import {
  createPhoneHref,
  createWhatsappUrl,
  getEmailByPurpose,
  type ContactSettingsData,
} from "@/sanity/lib/institutional";

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

interface FooterProps {
  contactSettings: ContactSettingsData;
}

export function Footer({ contactSettings }: FooterProps) {
  const phones = contactSettings?.phones ?? [];
  const contactEmail = getEmailByPurpose(contactSettings, "contact");
  const socialLinks = contactSettings?.socialLinks ?? [];

  return (
    <footer className="py-6 sm:py-8">
      <Container>
        <div className="rounded-3xl bg-primary/10 px-6 py-10 sm:px-8 lg:px-10 lg:py-12">
          <div
            className={`grid gap-10 text-center md:text-start ${
              socialLinks.length > 0
                ? "md:grid-cols-2 md:gap-12 lg:grid-cols-4 lg:gap-10"
                : "md:grid-cols-3 md:gap-12 lg:gap-20"
            }`}
          >
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
                {contactSettings?.location ? <p className="flex items-center gap-3">
                  <LocationIcon className="size-6 shrink-0 text-primary" />
                  {contactSettings.location}
                </p> : null}

                {phones.length > 0 ? (
                  <div className="flex items-start gap-3">
                    <PhoneIcon className="mt-0.5 size-6 shrink-0 text-primary" />
                    <ul className="grid gap-3 text-start">
                      {phones.map((phone) => {
                        const phoneHref = createPhoneHref(phone.number);
                        const phoneWhatsappUrl = phone.whatsapp
                          ? createWhatsappUrl(phone.number)
                          : undefined;

                        return (
                          <li
                            key={`${phone.label}-${phone.number}`}
                            className="flex items-center justify-between gap-3"
                          >
                            <span className="min-w-0">
                              <span className="block text-sm font-semibold">
                                {phone.label}
                              </span>
                              <span className="block text-muted">
                                {phone.number}
                              </span>
                            </span>

                            {phoneHref || phoneWhatsappUrl ? (
                              <span className="flex shrink-0 gap-1">
                                {phoneHref ? (
                                  <a
                                    href={phoneHref}
                                    aria-label={`Llamar a ${phone.label}`}
                                    title={`Llamar a ${phone.label}`}
                                    className="inline-flex size-7 items-center justify-center rounded-lg text-primary transition-colors hover:bg-primary/10"
                                  >
                                    <PhoneIcon className="size-4" />
                                  </a>
                                ) : null}

                                {phoneWhatsappUrl ? (
                                  <a
                                    href={phoneWhatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Escribir por WhatsApp a ${phone.label}`}
                                    title={`Escribir por WhatsApp a ${phone.label}`}
                                    className="inline-flex size-7 items-center justify-center rounded-lg text-secondary transition-colors hover:bg-secondary/10"
                                  >
                                    <WhatsAppIcon className="size-4" />
                                  </a>
                                ) : null}
                              </span>
                            ) : null}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ) : null}

                {contactEmail ? <a
                  href={`mailto:${contactEmail.email}`}
                  className="flex items-center gap-3 transition-colors hover:text-primary"
                >
                  <MailIcon className="size-6 shrink-0 text-primary" />
                  {contactEmail.email}
                </a> : null}
              </div>

            </div>

            {socialLinks.length > 0 ? (
              <div>
                <h2 className="text-lg font-bold text-foreground">
                  Redes sociales
                </h2>
                <div className="mt-5 flex justify-center gap-3 md:justify-start">
                  {socialLinks.map((socialLink) => (
                    <SocialLink
                      key={`${socialLink.platform}-${socialLink.url}`}
                      href={socialLink.url}
                      label={`Visitar ${socialLink.platform === "facebook" ? "Facebook" : "YouTube"} de AFAP`}
                      opensInNewTab
                    >
                      {socialLink.platform === "facebook" ? (
                        <FacebookIcon className="size-5" />
                      ) : (
                        <YouTubeIcon className="size-5" />
                      )}
                    </SocialLink>
                  ))}
                </div>
              </div>
            ) : null}
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
