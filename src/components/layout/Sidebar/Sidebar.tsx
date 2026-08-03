"use client";

import { useState } from "react";
import Divider from "@/components/ui/Divider";
import { usePathname } from "next/navigation";
import { sidebarNavigation } from "@/config/sidebarNavigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { AtlasLogo } from "@/components/shared/AtlasLogo";
import { Check, ChevronDown, ChevronLeft, ChevronRight, MoreHorizontal, Plus } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import UserAvatar from "@/components/ui/UserAvatar";

const WORKSPACES = ["Atlas Labs / Production", "Atlas Labs / Staging", "Atlas Labs / Dev"];

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [wsOpen, setWsOpen] = useState(false);

  const pathname = usePathname();
  const user = useAuth();

  return (
    <aside className={cn(
      `flex flex-col relative z-10 overflow-hidden`,
      collapsed ? 'w-15 min-w-15' : 'w-62 min-w-62',
      `border-r border-atlas-main-border`,
      `transition-[width] duration-200 ease-in-out`,
      `bg-atlas-background `
    )}>
      <div className={cn(
        `flex min-h-16 py-4`,
        collapsed ? 'px-0' : 'px-4',
        `items-center gap-[10px]`,
        `border-b border-atlas-main-border`,
      )}>
        <Link href={'/dashboard'}>
          <AtlasLogo />
        </Link>
        {!collapsed && (
          <div className="overflow-hidden">
            <div className="text-[13px] font-bold text-atlas-foreground tracking-[-0.02em]">Atlas</div>
            <button
              onClick={() => setWsOpen(!wsOpen)}
              className="flex gap-[3px] p-0 items-center text-[10px] text-main-text bg-none border-none cursor-pointer"
            >
              Atlas Labs / Production <ChevronDown size={10} />
            </button>
          </div>
        )}
      </div>

      {wsOpen && !collapsed && (
        <div className="absolute top-16 left-4 right-4 p-[6px] border border-atlas-main-border-active rounded-[10px] z-50 bg-atlas-background-blue">
          {WORKSPACES.map((ws) => (
            <div
              key={ws}
              onClick={() => setWsOpen(false)}
              className={cn(
                `flex py-[7px] px-[10px] rounded-[7px] text-xs`,
                ws.includes("Production") ? `text-atlas-foreground font-semibold` : `text-main-text-active font-normal`,
                `items-center justify-between cursor-pointer hover:bg-app-dark-blue`
              )}
            >
              {ws.split(" / ")[1]} {ws.includes("Production") && <Check size={12} className="text-app-purple" />}
            </div>
          ))}
          <Divider />
          <Link
            href="/workflows"
            className="flex py-[7px] px-[10px] gap-[6px] rounded-[7px] text-xs text-main-text-active items-center cursor-pointer hover:bg-app-dark-blue">
            <Plus size={12} /> New workspace
          </Link>
        </div>
      )}
      <nav style={{ flex: 1, padding: "8px 8px", overflowY: "auto" }}>
        {sidebarNavigation.map(({ href, title, icon: Icon }, index) => {
          const isActive = pathname === href || pathname.startsWith(`${href}/`)

          return (
            <Link
              key={index}
              href={href}
              className={cn(
                `flex w-full relative gap-[10px] text-[13px] items-center`,
                collapsed
                  ? `py-[9px] px-0 justify-center`
                  : `py-[9px] px-[10px] justify-start`,
                isActive
                  ? `text-app-purple font-semibold bg-app-purple/[12%]`
                  : `text-main-text-active font-normal bg-transparent`,
                `rounded-lg border-none cursor-pointer`,
                `transition-all duration-120`,
                !isActive ? `hover:!text-atlas-foreground` : ``
              )}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 w-[2.5px] h-4 bg-app-purple rounded-r-[2px] -translate-y-1/2" />
              )}
              <Icon size={15} className="shrink-0" />
              {!collapsed && title}
              {!collapsed && href === "/executions" && (
                <span className="ml-auto py-0 px-[5px] rounded-sm text-[10px] font-bold text-app-light-red border border-app-light-red/[20%] bg-app-light-red/[12%]">
                  1
                </span>
              )}
            </Link>
          );
        })}
      </nav>
      <div className={cn(
        `py-3 border border-atlas-main-border`,
        collapsed ? `px-0` : `px-3`
      )}
      >
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            `flex w-full py-[6px] px-[8px] gap-[6px] items-center`,
            `text-[11px] text-main-text`,
            `border-none bg-transparent cursor-pointer`,
            collapsed ? `justify-center` : `justify-end`,
            `hover:!text-main-text-active`
          )}
        >
          {!collapsed && "Collapse"} {collapsed ? <ChevronRight size={13} /> : <ChevronLeft size={13} />}
        </button>
        {!collapsed && (
          <div className="flex gap-2 p-2 mt-1 rounded-lg cursor-pointer items-center hover:bg-app-dark-blue">
            <UserAvatar user={user} />
            <div className="flex-1 overflow-hidden">
              <div className="min-w-0 text-xs font-semibold text-atlas-foreground overflow-hidden truncate">
                {user?.name}
              </div>
              <div className="text-[10px] text-main-text">
                Owner
              </div>
            </div>
            <MoreHorizontal
              size={13}
              className="text-main-text"
            />
          </div>
        )}
      </div>
    </aside>
  );
}