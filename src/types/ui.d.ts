import { VariantProps } from "class-variance-authority"
import { CSSProperties, InputHTMLAttributes, ReactNode } from "react"

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
  loading?: boolean;
  icon?: React.ReactNode;
}

export interface CloseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export type EyebrowProps = {
  text: string;
  dotClasses?: string;
  className?: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  items: {
    value: string;
    label: string;
    disabled?: boolean;
  }[];
  className?: string;
}
