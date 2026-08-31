import type { IconProps } from "./icon.types";

export type TargetIconProps = IconProps;

export function TargetIcon(props: TargetIconProps) {
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
      <circle cx="11" cy="13" r="8" />
      <circle cx="11" cy="13" r="4" />
      <path d="m11 13 8-8M16 5h3v3" />
    </svg>
  );
}
