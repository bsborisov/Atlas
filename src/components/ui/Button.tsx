import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { ButtonProps } from "@/types/ui"

const buttonVariants = cva(
  `
  inline-flex 
  items-center 
  justify-center 
  gap-2
  rounded-md
  text-center
  font-inter
  font-semibold
  leading-[150%]
  transition-all
  duration-200
  disabled:pointer-events-none
  disabled:opacity-50
  focus-visible:outline-none
  focus-visible:ring-2
  focus-visible:ring-offset-2
  active:scale-[0.98]
  cursor-pointer
  whitespace-nowrap
  `,
  {
    variants: {
      variant: {

        primary: `
          bg-app-purple 
          text-white
          hover:bg-app-purple/[90%]
        `,

        secondary: `
          bg-atlas-background-blue
          text-main-text-active
          border border-atlas-main-border
          hover:bg-app-dark-blue
          hover:text-atlas-foreground
        `,

        outline: `
          border
          border-atlas-main-border
          bg-transparent
          hover:border-atlas-main-border-active
          hover:text-atlas-foreground
        `,

        ghost: `
          text-main-text 
          hover:bg-app-dark-blue 
          hover:text-atlas-foreground
        `,

        danger: `
          bg-red-600
          text-white
          hover:bg-red-700
        `,

        gradient: `
          bg-gradient-to-r
          from-white
          via-green-500
          to-red-500
          text-black
          hover:opacity-90
        `,
      },

      size: {
        a: `w-auto h-8 p-2 text-sm`,
        xs: `h-[25px] px-[9px] text-[10.5px] gap-[7px]`,
        sm: `h-6 px-3 text-xs`,
        md: `h-[32px] px-[14px] text-xs rounded-[10px]`,
        lg: `h-[42px] px-[22px] rounded-[7px] text-sm`,
        xl: `h-[48px] px-[28px] rounded-[7px] text-[15px] font-semibold`,
        icon: `h-10 w-10 p-0`,
      },

      fullWidth: {
        true: "w-full",
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size = "md",
      icon,
      fullWidth,
      loading,
      children,
      disabled,
      ...props
    },
    ref
  ) => {

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          buttonVariants({
            variant,
            size,
            fullWidth,
          }),
          className
        )}
        {...props}
      >

        {
          loading ? (
            <svg
              className="h-4 w-4 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                className="opacity-25"
              />

              <path
                d="M4 12a8 8 0 018-8"
                stroke="currentColor"
                strokeWidth="4"
                className="opacity-75"
              />

            </svg>
          ) : icon
        }
        {children}
      </button>
    )
  })

Button.displayName = "Button"

export {
  Button,
  buttonVariants
}