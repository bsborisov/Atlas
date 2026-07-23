import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { Button } from "./Button";
import { Icon } from "./Icon";
import { ButtonProps } from "@/types/ui";

function getButtonVariant(e: string) {
  switch (e) {
    case `ghost`:
      return `text`;
    case `rounded`:
      return `filled`;
    default:
      return e
  }
}

const paddingMapping: Record<string, string> = {
  s: "p-1",
  m: "p-2",
  l: "p-3",
};

const widthMapping: Record<string, string> = {
  s: "w-8",
  m: "w-10",
  l: "w-12",
};

type IconButtonProps = ButtonProps & {
  size?: string;
  rounded?: boolean;
};

export function IconButtonWrapper({
  size = "s",
  rounded = false,
  className,
  ...props
}: IconButtonProps) {
  return (
    <Button
      className={cn(
        paddingMapping[size],
        widthMapping[size],
        rounded && "rounded-full",
        "disabled:cursor-not-allowed",
        className
      )}
      {...props}
    />
  );
}

export const IconButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "filled",
      src,
      title,
      iconSize = "m",
      //showTooltip = false,
      //tooltipProps,
      mirroring = true,
      fetchOptions,
      ...buttonProps
    },
    ref
  ) => {
    const resolvedVariant = getButtonVariant(variant);

    return (
      <IconButtonWrapper
        ref={ref}
        variant={resolvedVariant}
        className={className}
        aria-label={title}
        rounded={variant === "rounded"}
        {...buttonProps}
      >
        <Icon
          src={src}
          size={iconSize}
          inline
          focusable="false"
          aria-hidden="true"
          mirroring={mirroring}
          fetchOptions={fetchOptions}
        />
      </IconButtonWrapper>
    );
  }
);

IconButton.displayName = "IconButton";