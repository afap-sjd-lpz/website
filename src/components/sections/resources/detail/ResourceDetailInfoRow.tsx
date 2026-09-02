import type {ComponentType, ReactNode} from 'react'

import type {IconProps} from '@/components/ui/icons'

export interface ResourceDetailInfoRowProps {
  Icon: ComponentType<IconProps>
  label: string
  children: ReactNode
}

export function ResourceDetailInfoRow({
  Icon,
  label,
  children,
}: ResourceDetailInfoRowProps) {
  return (
    <div className="flex gap-4 border-b border-border pb-5 last:border-0 last:pb-0">
      <span
        aria-hidden="true"
        className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
      >
        <Icon className="size-5" />
      </span>
      <div className="min-w-0">
        <p className="text-sm text-muted">{label}</p>
        <div className="mt-1 font-semibold text-foreground">{children}</div>
      </div>
    </div>
  )
}
