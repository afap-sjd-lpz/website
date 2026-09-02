import {LinkButton} from '@/components/ui/button'
import {WhatsAppIcon} from '@/components/ui/icons'

export interface ContactWhatsappCardProps {
  whatsappUrl: string
}

export function ContactWhatsappCard({
  whatsappUrl,
}: ContactWhatsappCardProps) {
  return (
    <aside className="rounded-3xl border border-secondary/20 bg-secondary/10 p-6 sm:p-8">
      <h2 className="text-xl font-bold text-foreground">¿Prefieres hablar?</h2>
      <p className="mt-3 leading-7 text-muted">
        Escríbenos por WhatsApp y te responderemos lo antes posible.
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
    </aside>
  )
}
