import {LinkButton} from '@/components/ui/button'
import {HeartIcon} from '@/components/ui/icons'

export function ResourceOrientationCard() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-secondary/20 bg-secondary/10 p-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 -bottom-10 size-32 rounded-full bg-primary/10"
      />
      <span
        aria-hidden="true"
        className="relative flex size-11 items-center justify-center rounded-full bg-surface text-secondary"
      >
        <HeartIcon className="size-5" />
      </span>
      <div className="relative mt-4">
        <h2 className="text-xl font-bold text-foreground">
          ¿Necesitas orientación?
        </h2>
        <p className="mt-3 leading-7 text-muted">
          Si este contenido te genera dudas o necesitas conversar, puedes
          comunicarte con AFAP.
        </p>
        <LinkButton href="/contacto" intent="secondary" className="mt-5">
          Contactar con AFAP
        </LinkButton>
      </div>
    </div>
  )
}
