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
          bg-gray-100
          text-gray-900
          hover:bg-gray-200
        `,

        outline: `
          border
          border-atlas-main-border
          bg-transparent
          hover:border-atlas-main-border-active
          hover:text-atlas-foreground
        `,

        ghost: `
          hover:bg-gray-100/[3%]
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
        a: `
          w-auto
          h-8
          p-2
          text-sm
        `,
        sm: `
          h-6
          py-0
          px-3
          text-sm
        `,

        md: `
          h-8
          py-0
          px-4
          text-sm
        `,

        lg: `
          h-[42px]
          py-0
          px-[22px]
          rounded-[7px]
          text-sm
        `,

        icon: `
          h-10
          w-10
          p-0
        `,
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
      size,
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
          loading && (
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
          )
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