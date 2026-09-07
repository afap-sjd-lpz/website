"use client";

import { Tooltip as HeroUITooltip } from "@heroui/react";
import type {
  AnchorHTMLAttributes,
  ComponentProps,
  ReactNode,
} from "react";

export interface TooltipLinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  label: string;
  placement?: ComponentProps<typeof HeroUITooltip.Content>["placement"];
}

export function TooltipLink({
  children,
  label,
  placement = "bottom",
  ...linkProps
}: TooltipLinkProps) {
  return (
    <HeroUITooltip.Root delay={300} closeDelay={100}>
      <HeroUITooltip.Trigger<"a">
        {...linkProps}
        role="link"
        render={(triggerProps) => <a {...triggerProps} />}
      >
        {children}
      </HeroUITooltip.Trigger>
      <HeroUITooltip.Content
        placement={placement}
        showArrow
        className="rounded-lg border border-border bg-surface px-3 py-2 text-xs font-semibold text-foreground shadow-lg"
      >
        <HeroUITooltip.Arrow className="fill-surface" />
        {label}
      </HeroUITooltip.Content>
    </HeroUITooltip.Root>
  );
}
