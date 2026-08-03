import {
  Activity,
  LayoutDashboard,
  Plug,
  Settings,
  Users,
  Zap
} from "lucide-react";

export const sidebarNavigation = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard
  },
  {
    title: "Workflows",
    href: "/workflows",
    icon: Zap
  },
  {
    title: "Executions",
    href: "/executions",
    icon: Activity
  },
  {
    title: "Connections",
    href: "/connections",
    icon: Plug
  },
  {
    title: "Team",
    href: "/team",
    icon: Users
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings
  },
];