"use client";

import {
  Link as HeroUILink,
  type LinkProps as HeroUILinkProps,
} from "@heroui/react";

import {
  buttonVariants,
  type ButtonVariants,
} from "./button.styles";

export interface LinkButtonProps
  extends HeroUILinkProps,
    ButtonVariants {}

export function LinkButton({
  intent,
  className,
  ...props
}: LinkButtonProps) {
  return (
    <HeroUILink
      {...props}
      className={(renderProps) =>
        buttonVariants({
          intent,
          className: `button button--ghost !gap-2 ${
            (typeof className === "function"
              ? className(renderProps)
              : className) ?? ""
          }`,
        })
      }
    />
  );
}
