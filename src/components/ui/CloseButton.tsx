import { cn } from "@/lib/utils"
import { CloseButtonProps } from "@/types/ui"
import { forwardRef } from "react";

const CloseButton = forwardRef<HTMLButtonElement, CloseButtonProps>(
  (
    {
      className,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          "flex size-7 rounded-md items-center justify-center",
          "bg-none border border-atlas-main-border",
          "cursor-pointer text-main-text",
          className
        )}
        {...props}
      >
        {"×"}
      </button>
    )
  }
)

CloseButton.displayName = "CloseButton";

export default CloseButton;