"use client";

import {
  Button as HeroUIButton,
  type ButtonProps as HeroUIButtonProps,
} from "@heroui/react";

import {
  buttonVariants,
  type ButtonVariants,
} from "./button.styles";

export interface ButtonProps
  extends Omit<HeroUIButtonProps, "variant">,
    ButtonVariants {}

export function Button({
  intent,
  className,
  ...props
}: ButtonProps) {
  return (
    <HeroUIButton
      {...props}
      variant="ghost"
      className={(renderProps) =>
        buttonVariants({
          intent,
          className:
            typeof className === "function"
              ? className(renderProps)
              : className,
        })
      }
    />
  );
}
