import { ReactNode } from "react";
import { cn } from "@/lib/utils";

function Card({
  children,
  className = ""
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        `rounded-xl border border-atlas-main-border bg-atlas-background-light`,
        className
      )}
    >
      {children}
    </div>
  );
}

export default Card;

Card.displayName = "Card";