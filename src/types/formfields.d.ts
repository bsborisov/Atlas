import { VariantProps } from "class-variance-authority"
import { CSSProperties, HTMLInputAutoCompleteAttribute, InputHTMLAttributes, ReactNode } from "react"

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

export type FormFieldInputType = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  tabIndex?: number;
  type: string;
  disabled?: boolean;
  hasError?: boolean;
  placeholder?: string;
  autoFocus?: boolean;
  autoComplete?: HTMLInputAutoCompleteAttribute;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  ref?: React.Ref<HTMLInputElement>;
}

export type InputHolderProps = {
  children: ReactNode;
  isMultiSelect?: boolean;
  hasError?: boolean;
  usePointer?: boolean;
  isDisabled?: boolean;
  isFocused?: boolean;
  isReadonly?: boolean;
  className?: string
  style?: CSSProperties
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  startSlot?: string | ReactNode;
  endSlot?: string | ReactNode;
  preValueSlot?: string | ReactNode;
  hasError?: boolean;
  isMultiSelect?: boolean;
  disableEllipsis?: boolean;
  usePointer?: boolean;
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  loading?: boolean
}