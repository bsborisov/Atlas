"use client";

import Divider from "@/components/ui/Divider";
import SidebarNavCard from "./SidebarNavCard";
import { usePathname } from "next/navigation";
import { sidebarNavigation } from "@/config/sidebarNavigation";

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 p-5 bg-background-sidebar">
      <div className="p-6 text-xl font-bold">
        Atlas
      </div>
      <Divider className="bg-app-white-transparent" />
      <ul className="mt-4 list-none">
        {sidebarNavigation.map(item => (
          <SidebarNavCard key={item.href} item={item} active={pathname === item.href} />
        ))}
      </ul>
    </aside>
  );
}