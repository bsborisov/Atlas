import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardType = {
  children: ReactNode;
  className?: string;
}

function Card({ children, className = "" }: CardType) {
  return (
    <div
      className={cn(
        `relative p-6 rounded-xl overflow-hidden`,
        `border border-atlas-main-border bg-atlas-background-light`,
        className
      )}
    >
      {children}
    </div>
  );
}

export default Card;

Card.displayName = "Card";