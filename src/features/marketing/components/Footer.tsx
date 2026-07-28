"use client";

import { AtlasLogo } from "@/components/shared/AtlasLogo";
import { Text } from "@/components/ui/Text";
import { footerNavigation } from "@/config/footerNavigation"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const Footer = () => {

  const pathname = usePathname();

  return (
    <div className="flex px-16 py-5 gap-8 items-center self-stretch">
      <Link
        href={"/"}
        className="flex items-center gap-[9px]"
      >
        <AtlasLogo />
        <Text className="text-[13px] font-semibold text-main-text-active">
          Atlas
        </Text>
      </Link>
      <div className="flex flex-1 gap-6 items-center self-stretch">
        {
          footerNavigation.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href ||
                pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.title}
                href={item.href}
                className={`flex px-1 text-center text-[13px] font-inter font-medium leading-[150%] ${isActive
                  ? 'text-top-nav-color-active'
                  : 'text-top-nav-color hover:text-top-nav-color-active'
                  }`}
              >
                {item.title}
              </Link>
            )
          })
        }
      </div>

      <Text className="text-[11px]">
        {`© 2026 Atlas Labs, Inc.`}
      </Text>
    </div>
  )
}