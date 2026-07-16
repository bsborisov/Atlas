import { LucideIcon } from "lucide-react";

export type DashboardNavCardType = {
  item: {
    href: string;
    title: string;
    icon: LucideIcon;
  };
  active: boolean
};