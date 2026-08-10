import { tv, type VariantProps } from "@heroui/styles";

export const buttonVariants = tv({
  base: "font-semibold",

  variants: {
    intent: {
      primary: [
        "[--button-bg:var(--primary)]",
        "[--button-bg-hover:color-mix(in_oklab,var(--primary)_90%,transparent)]",
        "[--button-bg-pressed:color-mix(in_oklab,var(--primary)_80%,transparent)]",
        "[--button-fg:var(--foreground)]",
      ],

      secondary: [
        "[--button-bg:var(--secondary)]",
        "[--button-bg-hover:color-mix(in_oklab,var(--secondary)_90%,transparent)]",
        "[--button-bg-pressed:color-mix(in_oklab,var(--secondary)_80%,transparent)]",
        "[--button-fg:var(--foreground)]",
      ],

      accent: [
        "[--button-bg:var(--accent)]",
        "[--button-bg-hover:color-mix(in_oklab,var(--accent)_90%,transparent)]",
        "[--button-bg-pressed:color-mix(in_oklab,var(--accent)_80%,transparent)]",
        "[--button-fg:var(--color-white)]",
      ],

      outline: [
        "border",
        "border-primary",
        "[--button-bg:transparent]",
        "[--button-bg-hover:color-mix(in_oklab,var(--primary)_10%,transparent)]",
        "[--button-bg-pressed:color-mix(in_oklab,var(--primary)_20%,transparent)]",
        "[--button-fg:var(--primary)]",
      ],

      ghost: [
        "[--button-bg:transparent]",
        "[--button-bg-hover:color-mix(in_oklab,var(--primary)_10%,transparent)]",
        "[--button-bg-pressed:color-mix(in_oklab,var(--primary)_20%,transparent)]",
        "[--button-fg:var(--foreground)]",
      ],
    },
  },

  defaultVariants: {
    intent: "primary",
  },
});

export type ButtonVariants = VariantProps<typeof buttonVariants>;
