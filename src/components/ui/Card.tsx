import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";
import Divider from "./Divider";

type CardType = {
  cardData: {
    title: string;
    value: string | number;
    icon?: LucideIcon;
    iconBackground?: string;
    hasDivider?: boolean;
  }
  message?: string;
  className?: string;
  children?: ReactNode;
}

export const Card = ({
  cardData,
  message,
  className = "",
  children
}: CardType) => {

  const Icon = cardData.icon;

  return (
    <div
      className={cn(
        "flex flex-col rounded-sm items-center bg-background-dashboard-card",
        className
      )}
    >
      <div className="flex flex-col w-full font-mont">
        <div className="flex flex-row flex-1 p-3">
          {Icon &&
            <div
              className={`flex w-21 h-21 items-center justify-center rounded-lg ${cardData.iconBackground ?? ``}`}
            >
              <Icon size={35} />
            </div>
          }
          <div className="flex flex-col grow items-end">
            <div className="text-app-white-transparent-darker">
              {cardData.title}
            </div>
            <div className="text-2xl tracking-normal">
              {cardData.value}
            </div>
          </div>
        </div>
        {
          children &&
          <div className="flex flex-row p-3 w-full">
            {children}
          </div>
        }
        {
          (message) &&
          <>
            < Divider className="bg-app-white-transparent" />
            <div className="flex flex-row p-3">
              <div>
                {message}
              </div>
            </div>
          </>
        }
      </div>
    </div>
  );
}