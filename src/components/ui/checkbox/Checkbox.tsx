import {
  Checkbox as HeroUICheckbox,
  FieldError,
  type CheckboxProps as HeroUICheckboxProps,
} from "@heroui/react";
import type { ReactNode } from "react";

export interface CheckboxProps
  extends Omit<HeroUICheckboxProps, "children"> {
  children: ReactNode;
  errorMessage?: ReactNode;
}

export function Checkbox({
  children,
  errorMessage,
  ...props
}: CheckboxProps) {
  return (
    <HeroUICheckbox {...props}>
      <HeroUICheckbox.Content>
        <HeroUICheckbox.Control>
          <HeroUICheckbox.Indicator />
        </HeroUICheckbox.Control>

        {children}
      </HeroUICheckbox.Content>

      <FieldError>{errorMessage}</FieldError>
    </HeroUICheckbox>
  );
}
