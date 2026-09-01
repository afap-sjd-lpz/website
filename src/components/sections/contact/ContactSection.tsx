import { ContactForm } from "@/components/forms/contact-form";
import { Reveal } from "@/components/motion";
import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import {
  LocationIcon,
  MailIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "@/components/ui/icons";
import { Section } from "@/components/ui/section";
import {
  createPhoneHref,
  createWhatsappUrl,
  getPrimaryWhatsapp,
  type ContactSettingsData,
} from "@/sanity/lib/institutional";

interface ContactSectionProps {
  contactSettings: ContactSettingsData;
}

export function ContactSection({ contactSettings }: ContactSectionProps) {
  const phones = contactSettings?.phones ?? [];
  const emails = contactSettings?.emails ?? [];
  const primaryWhatsapp = getPrimaryWhatsapp(contactSettings);
  const whatsappUrl = primaryWhatsapp
    ? createWhatsappUrl(primaryWhatsapp.number)
    : undefined;
  const hasContactInfo = Boolean(
    contactSettings?.location || phones.length || emails.length,
  );
  const hasSidebar = hasContactInfo || whatsappUrl;

  return (
    <Section
      aria-labelledby="contact-form-title"
      className="pt-8 pb-6 sm:pt-10 sm:pb-8 lg:pt-8 lg:pb-8"
    >
      <Container>
        <div className={`grid items-start gap-8 ${hasSidebar ? "lg:grid-cols-[2fr_1fr] lg:items-stretch" : ""}`}>
          <Reveal>
            <div className="rounded-3xl border border-border bg-surface p-6 shadow-sm sm:p-8">
            <h2
              id="contact-form-title"
              className="text-3xl font-bold text-foreground"
            >
              Envíanos un mensaje
            </h2>

            <div
              aria-hidden="true"
              className="mt-4 h-1 w-14 rounded-full bg-secondary"
            />

            <p className="mt-4 text-base leading-7 text-muted">
              Completa el formulario y nos pondremos en contacto
              contigo.
            </p>

              <ContactForm />
            </div>
          </Reveal>

          {hasSidebar ? <div className="grid gap-6 lg:grid-rows-[auto_1fr]">
            {hasContactInfo ? <Reveal><aside
              aria-labelledby="contact-info-title"
              className="relative overflow-hidden rounded-3xl border border-primary/20 bg-primary/10 p-6 sm:p-8"
            >
              <div className="relative z-10">
              <h2
                id="contact-info-title"
                className="text-2xl font-bold text-foreground"
              >
                Información de contacto
              </h2>

              <div
                aria-hidden="true"
                className="mt-4 h-1 w-14 rounded-full bg-secondary"
              />

              <address className="mt-8 divide-y divide-border/60 not-italic">
                {contactSettings?.location ? <div className="flex items-center gap-4 pb-5">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                    <LocationIcon className="size-6" />
                  </span>

                  <p>
                    <span className="block text-sm text-muted">
                      Ubicación
                    </span>
                    <span className="mt-1 block font-semibold text-foreground">
                      {contactSettings.location}
                    </span>
                  </p>
                </div> : null}

                {emails.map((email) => (
                  <a
                    key={`${email.purpose}-${email.email}`}
                    href={`mailto:${email.email}`}
                    className="flex items-center gap-4 py-5 transition-colors hover:text-primary"
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                      <MailIcon className="size-6" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm text-muted">{email.label}</span>
                      <span className="mt-1 block break-all font-semibold text-foreground">
                        {email.email}
                      </span>
                    </span>
                  </a>
                ))}

                {phones.length > 0 ? (
                  <div className="flex items-start gap-4 py-5">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-secondary/15 text-secondary">
                      <PhoneIcon className="size-6" />
                    </span>

                    <div className="min-w-0 flex-1 divide-y divide-border/60">
                      {phones.map((phone, index) => {
                        const phoneHref = createPhoneHref(phone.number);
                        const phoneWhatsappUrl = phone.whatsapp
                          ? createWhatsappUrl(phone.number)
                          : undefined;

                        return (
                          <div
                            key={`${phone.label}-${phone.number}`}
                            className={index === 0 ? "pb-4" : "py-4 last:pb-0"}
                          >
                            <span className="block text-sm text-muted">
                              {phone.label}
                            </span>
                            <span className="mt-1 block font-semibold text-foreground">
                              {phone.number}
                            </span>

                            {phoneHref || phoneWhatsappUrl ? (
                              <div className="mt-3 flex flex-wrap gap-2">
                                {phoneHref ? (
                                  <a
                                    href={phoneHref}
                                    aria-label={`Llamar a ${phone.label}`}
                                    className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:border-primary hover:bg-primary/10"
                                  >
                                    <PhoneIcon className="size-4" />
                                    Llamar
                                  </a>
                                ) : null}

                                {phoneWhatsappUrl ? (
                                  <a
                                    href={phoneWhatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Escribir por WhatsApp a ${phone.label}`}
                                    className="inline-flex items-center gap-1.5 rounded-full border border-secondary/40 px-3 py-1.5 text-xs font-semibold text-secondary transition-colors hover:border-secondary hover:bg-secondary/10"
                                  >
                                    <WhatsAppIcon className="size-4" />
                                    WhatsApp
                                  </a>
                                ) : null}
                              </div>
                            ) : null}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : null}
              </address>
              </div>

              <div
                aria-hidden="true"
              className="pointer-events-none absolute right-0 bottom-0 z-0 h-32 w-28 overflow-hidden opacity-55 sm:h-40 sm:w-40 sm:opacity-75"
              >
                <span className="absolute -right-12 -bottom-12 size-32 rounded-full bg-primary/10 sm:size-40" />
                <span className="absolute right-0 -bottom-4 h-32 w-24 -rotate-8 sm:right-2 sm:h-40 sm:w-28">
                  <span className="absolute bottom-0 left-1/2 h-full w-px rounded-full bg-secondary/25" />
                  <span className="absolute bottom-5 left-1/2 h-5 w-9 origin-bottom-left rotate-35 rounded-[100%_0] bg-secondary/25" />
                  <span className="absolute right-1/2 bottom-12 h-6 w-10 origin-bottom-right -rotate-32 rounded-[0_100%] bg-secondary/35" />
                  <span className="absolute bottom-20 left-1/2 h-5 w-11 origin-bottom-left rotate-42 rounded-[100%_0] bg-secondary/30" />
                  <span className="absolute right-1/2 bottom-28 hidden h-7 w-12 origin-bottom-right -rotate-38 rounded-[0_100%] bg-secondary/20 sm:block" />
                  <span className="absolute bottom-36 left-1/2 hidden h-6 w-10 origin-bottom-left rotate-48 rounded-[100%_0] bg-secondary/25 sm:block" />
                </span>
              </div>
            </aside></Reveal> : null}

            {whatsappUrl ? <Reveal><aside className="rounded-3xl border border-secondary/20 bg-secondary/10 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-foreground">
                ¿Prefieres hablar?
              </h2>
              <p className="mt-3 leading-7 text-muted">
                Escríbenos por WhatsApp y te responderemos lo antes
                posible.
              </p>
              <LinkButton
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Abrir conversación de WhatsApp con AFAP"
                intent="secondary"
                className="mt-5"
              >
                <WhatsAppIcon className="size-5" />
                Escribir por WhatsApp
              </LinkButton>
            </aside></Reveal> : null}
          </div> : null}
        </div>
      </Container>
    </Section>
  );
}
