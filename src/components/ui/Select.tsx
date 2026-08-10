import { cn } from "@/lib/utils"
import { SelectProps } from "@/types/ui"
import React from "react"

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      items,
      className,
      ...props
    },
    ref
  ) => {

    return (
      <select
        ref={ref}
        className={cn(
          "h-8.5 py-0 px-2.5 text-xs text-main-text-active",
          "border border-atlas-main-border rounded-lg",
          "bg-atlas-background-light",
          className
        )}
        {...props}
      >
        {items.map(({ value, label, disabled }) => (
          <option key={value} value={value} disabled={disabled}>
            {label}
          </option>
        ))}
      </select>
    )
  })

Select.displayName = "Select"