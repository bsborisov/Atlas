import { ComponentProps } from "react";
import { cn } from "@/lib/utils";

function Card({
  children,
  className = "",
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        `rounded-xl border border-atlas-main-border bg-atlas-background-light`,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;

Card.displayName = "Card";