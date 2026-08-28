import type { IconProps } from "./icon.types";

export type ShieldIconProps = IconProps;

export function ShieldIcon(props: ShieldIconProps) {
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
      <path d="M12 3 5 6v5c0 4.7 2.9 8.1 7 10 4.1-1.9 7-5.3 7-10V6Z" />
      <path d="m9.5 12 1.7 1.7 3.6-3.8" />
    </svg>
  );
}
