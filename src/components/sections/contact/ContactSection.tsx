import {ContactForm} from '@/components/forms/contact-form'
import {Reveal} from '@/components/motion'
import {Container} from '@/components/ui/container'
import {Section} from '@/components/ui/section'
import {
  createWhatsappUrl,
  getPrimaryWhatsapp,
  type ContactSettingsData,
} from '@/sanity/lib/institutional'

import {ContactInfoCard} from './ContactInfoCard'
import {ContactWhatsappCard} from './ContactWhatsappCard'

interface ContactSectionProps {
  contactSettings: ContactSettingsData
}

export function ContactSection({contactSettings}: ContactSectionProps) {
  const phones = contactSettings?.phones ?? []
  const emails = contactSettings?.emails ?? []
  const primaryWhatsapp = getPrimaryWhatsapp(contactSettings)
  const whatsappUrl = primaryWhatsapp
    ? createWhatsappUrl(primaryWhatsapp.number)
    : undefined
  const hasContactInfo = Boolean(
    contactSettings?.location || phones.length || emails.length,
  )
  const hasSidebar = hasContactInfo || whatsappUrl

  return (
    <Section
      aria-labelledby="contact-form-title"
      className="pt-8 pb-6 sm:pt-10 sm:pb-8 lg:pt-8 lg:pb-8"
    >
      <Container>
        <div
          className={`grid items-start gap-8 ${hasSidebar ? 'lg:grid-cols-[2fr_1fr] lg:items-stretch' : ''}`}
        >
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
                Completa el formulario y nos pondremos en contacto contigo.
              </p>

              <ContactForm />
            </div>
          </Reveal>

          {hasSidebar ? (
            <div className="grid gap-6 lg:grid-rows-[auto_1fr]">
              {hasContactInfo ? (
                <Reveal>
                  <ContactInfoCard
                    location={contactSettings?.location ?? null}
                    emails={emails}
                    phones={phones}
                  />
                </Reveal>
              ) : null}

              {whatsappUrl ? (
                <Reveal>
                  <ContactWhatsappCard whatsappUrl={whatsappUrl} />
                </Reveal>
              ) : null}
            </div>
          ) : null}
        </div>
      </Container>
    </Section>
  )
}
