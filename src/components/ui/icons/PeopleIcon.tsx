import type { IconProps } from "./icon.types";

export type PeopleIconProps = IconProps;

export function PeopleIcon(props: PeopleIconProps) {
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
      <circle cx="9" cy="7" r="3" />
      <path d="M3 20v-2a6 6 0 0 1 12 0v2M16 4.5a3 3 0 0 1 0 5.8M17 13a5 5 0 0 1 4 5v2" />
    </svg>
  );
}
