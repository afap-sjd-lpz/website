import {
  FieldError,
  Label,
  ListBox,
  ListBoxItem,
  Select as HeroUISelect,
  type SelectProps as HeroUISelectProps,
} from "@heroui/react";
import type { ReactNode } from "react";

export interface SelectOption<TValue extends string = string> {
  value: TValue;
  label: string;
}

export interface SelectProps<TValue extends string = string>
  extends Omit<
    HeroUISelectProps<SelectOption<TValue>>,
    "children" | "items"
  > {
  label: string;
  options: readonly SelectOption<TValue>[];
  errorMessage?: ReactNode;
}

export function Select<TValue extends string = string>({
  label,
  options,
  errorMessage,
  ...props
}: SelectProps<TValue>) {
  return (
    <HeroUISelect {...props}>
      <Label>{label}</Label>

      <HeroUISelect.Trigger>
        <HeroUISelect.Value />
        <HeroUISelect.Indicator />
      </HeroUISelect.Trigger>

      <HeroUISelect.Popover>
        <ListBox items={options}>
          {(option) => (
            <ListBoxItem
              id={option.value}
              textValue={option.label}
            >
              {option.label}
            </ListBoxItem>
          )}
        </ListBox>
      </HeroUISelect.Popover>

      <FieldError>{errorMessage}</FieldError>
    </HeroUISelect>
  );
}
