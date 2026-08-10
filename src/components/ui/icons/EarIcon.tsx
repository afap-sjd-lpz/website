import type { IconProps } from "./icon.types";

export type EarIconProps = IconProps;

export function EarIcon(props: EarIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M6 9a6 6 0 1 1 11.5 2.4c-.8 1.8-2.4 2.4-3.2 4.2C13.7 17 13 19 10.5 19A3.5 3.5 0 0 1 7 15.5" />
      <path d="M9.5 10a2.5 2.5 0 1 1 4.5 1.5c-.8.9-2 1.3-2 2.5" />
    </svg>
  );
}
