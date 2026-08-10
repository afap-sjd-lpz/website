import type { IconProps } from "./icon.types";

export type CommunityIconProps = IconProps;

export function CommunityIcon(props: CommunityIconProps) {
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
      <circle cx="12" cy="5" r="2.5" />
      <circle cx="5" cy="17" r="2.5" />
      <circle cx="19" cy="17" r="2.5" />
      <path d="m10.7 7.2-4.4 7.6M13.3 7.2l4.4 7.6M7.5 17h9" />
    </svg>
  );
}
