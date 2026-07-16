"use client";

import { logoutAction } from "@/features/auth/actions/auth";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/providers/AuthProvider";
import { Heading } from "@/components/ui/Heading";
import { sidebarNavigation } from "@/config/sidebarNavigation";
import { usePathname } from "next/navigation";

export function Header() {

  const pathname = usePathname();

  const page = sidebarNavigation.find(
    (item) => item.href === pathname
  );

  const user = useAuth();

  const logoutHandler = () => {
    //probably some analytics tracking
    logoutAction()
  }

  return (
    <div className="flex p-6 w-full items-center justify-between">
      <Heading size={5} className="text-base font-normal">{page?.title ?? ""}</Heading>
      <div className="flex flex-row whitespace-nowrap gap-3 items-center">
        <h1 className="">Hello, {user?.name}</h1>
        <Button onClick={logoutHandler}>Logout</Button>
      </div>
    </div>
  );
}