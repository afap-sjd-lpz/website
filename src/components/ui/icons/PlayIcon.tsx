import type { IconProps } from "./icon.types";

export type PlayIconProps = IconProps;

export function PlayIcon(props: PlayIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M7.5 4.85a1.5 1.5 0 0 1 2.3-1.27l10.1 6.65a1.5 1.5 0 0 1 0 2.54L9.8 19.42a1.5 1.5 0 0 1-2.3-1.27Z" />
    </svg>
  );
}
