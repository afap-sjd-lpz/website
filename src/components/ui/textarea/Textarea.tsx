import {
  FieldError,
  Label,
  TextArea as HeroUITextArea,
  TextField,
  type TextFieldProps,
} from "@heroui/react";
import type { ReactNode } from "react";

export interface TextareaProps extends TextFieldProps {
  label: string;
  placeholder?: string;
  rows?: number;
  errorMessage?: ReactNode;
}

export function Textarea({
  label,
  placeholder,
  rows = 5,
  errorMessage,
  ...props
}: TextareaProps) {
  return (
    <TextField {...props}>
      <Label>{label}</Label>

      <HeroUITextArea
        placeholder={placeholder}
        rows={rows}
      />

      <FieldError>{errorMessage}</FieldError>
    </TextField>
  );
}
