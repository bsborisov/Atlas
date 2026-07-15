import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { ButtonProps } from "@/types/formfields"

const buttonVariants = cva(
  `
  inline-flex 
  items-center 
  justify-center 
  gap-2
  rounded-sm
  font-semibold
  transition-all
  duration-200
  disabled:pointer-events-none
  disabled:opacity-50
  focus-visible:outline-none
  focus-visible:ring-2
  focus-visible:ring-offset-2
  active:scale-[0.98]
  cursor-pointer
  uppercase
  `,
  {
    variants: {
      variant: {

        primary: `
          bg-primary 
          text-white
          hover:bg-primary-hover
          focus-visible:ring-blue-500
        `,

        secondary: `
          bg-gray-100
          text-gray-900
          hover:bg-gray-200
        `,

        outline: `
          border
          border-gray-300
          bg-transparent
          hover:bg-gray-100
        `,

        ghost: `
          hover:bg-ghost-hover
        `,

        danger: `
          bg-red-600
          text-white
          hover:bg-red-700
        `,

        gradient: `
          bg-gradient-to-r
          from-indigo-500
          via-purple-500
          to-pink-500
          text-white
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
          py-2
          px-6
          text-sm
        `,

        md: `
          h-8
          py-2
          px-6
          text-sm
        `,

        lg: `
          h-12
          py-4
          px-8
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