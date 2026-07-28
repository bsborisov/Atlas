"use client";

import { Text } from "@/components/ui/Text";
import { footerNavigation } from "@/config/footerNavigation"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const Footer = () => {

  const pathname = usePathname();

  return (
    <div className="flex px-16 py-5 gap-8 items-center self-stretch">
      <Link href={"/"}>
        <span>
          <Image
            className="invert"
            src="/atlas.svg"
            alt="Atlas"
            width={100}
            height={20}
            priority
          />
        </span>
      </Link>
      <div className="flex flex-1 gap-6 items-start self-stretch">
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