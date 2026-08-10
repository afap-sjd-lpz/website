import type { IconProps } from "./icon.types";

export type BookIconProps = IconProps;

export function BookIcon(props: BookIconProps) {
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
      <path d="M3 5.5A3.5 3.5 0 0 1 6.5 2H11v18H6.5A3.5 3.5 0 0 0 3 23Z" />
      <path d="M21 5.5A3.5 3.5 0 0 0 17.5 2H13v18h4.5a3.5 3.5 0 0 1 3.5 3Z" />
    </svg>
  );
}
