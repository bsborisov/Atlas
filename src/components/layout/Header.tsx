"use client";

import { logoutAction } from "@/features/auth/actions/auth";
import { Button } from "@/components/ui/Button";
import { sidebarNavigation } from "@/config/sidebarNavigation";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Bell, HelpCircle, Search } from "lucide-react";
import Dot from "../ui/Dot";
import Badge from "../ui/Badge";
import Link from "next/link";

const NOTIFICATIONS = [
  { title: "Run failed: Incident intelligence", time: "2m ago", type: "error" },
  { title: "PagerDuty EU is degraded", time: "5m ago", type: "warning" },
  { title: "Slack token expires in 24h", time: "1h ago", type: "warning" },
];

function Kbd({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <span className="py-px px-[5px] rounded-sm text-jet-mono text-[10px] text-main-text border border-atlas-main-border-active">
      {children}
    </span>
  );
}

export function Header() {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(true);

  const pathname = usePathname();

  const page = sidebarNavigation.find(
    (item) => item.href === pathname
  );

  const logoutHandler = () => {
    //probably some analytics tracking
    logoutAction()
  }

  return (
    <header
      className={cn(
        `flex h-14 shrink-0 sticky top-0 p-14 py-0 px-5 gap-4`,
        `border-b border-atlas-main-border`,
        `items-center bg-atlas-background-inner z-20`
      )}
    >
      {/* Title */}
      <div className="flex flex-1 gap-[6px] min-w-0 items-center">
        {
          page?.href
            ? <Link
              href={page.href}
            >
              <span className="text-[13px] text-atlas-foreground font-semibold cursor-pointer">
                {page.title}
              </span>
            </Link>
            : ""
        }
      </div>

      {/* Search */}
      <button
        //onClick={onCmdK}
        className={cn(
          `flex py-0 px-3 h-9 min-w-55 gap-2 items-center`,
          `border border-atlas-main-border rounded-lg`,
          `hover:border-[#34425B] transition-colors cursor pointer`
        )}
      >
        <Search size={13} className="text-main-text" />
        <span className="flex-1 text-xs text-left text-main-text">Search or jump to…</span>
        <Kbd>⌘K</Kbd>
      </button>

      {/* Status strip */}
      <div className="flex gap-[6px] py-1 px-[10px] rounded-lg items-center border border-atlas-main-border bg-atlas-background-light">
        <Dot className="size-[6px] bg-app-light-green" />
        <span className="text-[11px] text-main-text-active">All systems</span>
      </div>

      {/* Env badge */}
      <Badge variant="warning">Production</Badge>

      {/* Notifications */}
      <div className="relative">
        <button
          onClick={() => setNotificationsOpen(!notificationsOpen)}
          className={cn(
            `flex w-9 h-9 relative items-center justify-center rounded-lg`,
            `border border-atlas-main-border bg-atlas-background-light`,
            `hover:bg-accent transition-colors cursor-pointer`
          )}
        >
          <Bell size={15} className="text-main-text-active" />
          {
            hasUnreadNotifications &&
            <span className="absolute top-[7px] right-[7px] size-[6px] rounded-full bg-app-light-red border-[1.5px] border-atlas-background-inner" />
          }
        </button>
        {notificationsOpen && (
          <div
            className={cn(
              `absolute right-0 top-11 w-75`,
              `border border-atlas-main-border-active`,
              `rounded-xl overflow-hidden z-50 bg-atlas-background-blue`
            )}
          >
            <div className="flex py-3 px-4 border-b border-atlas-main-border items-center justify-between">
              <span className="text-[13px] font-semibold text-atlas-foreground">
                Notifications
              </span>
              <span
                className="text-[11px] text-app-purple cursor-pointer"
                onClick={() => setHasUnreadNotifications(false)}
              >Mark all read</span>
            </div>
            {NOTIFICATIONS.map((n, i) => (
              <div
                key={i}
                className={cn(
                  `flex gap-[10px] py-3 px-4 cursor-pointer`,
                  i < 2 ? `border-b border-atlas-main-border` : ``,
                  `hover:bg-app-dark-blue`
                )}
              >
                <Dot
                  className={cn(
                    `size-[6px] mt-[5px]`,
                    n.type === "error" ? `bg-app-light-red` : `bg-app-light-yellow`,
                  )}
                />
                <div>
                  <div className="text-xs text-atlas-foreground mb-[2px]">
                    {n.title}
                  </div>
                  <div className="text-[11px] text-main-text-active">
                    {n.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Help Icon */}
      <button
        className={cn(
          `flex w-9 h-9 items-center justify-center`,
          `rounded-lg bg-atlas-background-light border border-atlas-main-border`,
          `transition-colors cursor-pointer hover:bg-app-dark-blue`
        )}
      >
        <HelpCircle size={15} className="text-main-text-active" />
      </button>

      <div className="flex flex-row whitespace-nowrap gap-3 items-center">
        <Button onClick={logoutHandler}>Logout</Button>
      </div>
    </header>
  );
}