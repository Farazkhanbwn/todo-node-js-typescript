import { ChangeEvent } from "react";

export enum CustomInputFieldType {
  TEXT = "text",
  PASSWORD = "password",
  EMAIL = "email",
  URL = "url",
}

export interface CustomInputFieldProps {
  name?: string;
  placeholder?: string;
  type: CustomInputFieldType;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  className?: string;
  required?: boolean;
  errorMessage?: string;
}
