import { HTMLInputAutoCompleteAttribute, InputHTMLAttributes, ReactNode } from "react"

export type FormFieldType = {
  name: string;
  tabIndex?: number;
  type: string;
  label?: string;
  errorValues?: unknown;
  disabled?: boolean;
  placeholder?: string;
  descriptionLeading?: string;
  descriptionTrailing?: string;
  suppressErrors?: boolean;
  autoFocus?: boolean;
  autoComplete?: HTMLInputAutoCompleteAttribute
  children?: ReactNode
}

export type FormFieldInputType =
  InputHTMLAttributes<HTMLInputElement> & {
    hasError?: boolean;
  }