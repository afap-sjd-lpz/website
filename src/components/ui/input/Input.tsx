import {
  FieldError,
  Input as HeroUIInput,
  Label,
  TextField,
  type TextFieldProps,
} from "@heroui/react";
import type { ReactNode } from "react";

export interface InputProps extends TextFieldProps {
  label: string;
  placeholder?: string;
  errorMessage?: ReactNode;
}

export function Input({
  label,
  placeholder,
  errorMessage,
  ...props
}: InputProps) {
  return (
    <TextField {...props}>
      <Label>{label}</Label>

      <HeroUIInput placeholder={placeholder} />

      <FieldError>{errorMessage}</FieldError>
    </TextField>
  );
}
