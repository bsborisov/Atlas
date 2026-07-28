"use client";

import { Button } from "@/components/ui/Button"
import { FaGithub } from "react-icons/fa";
import Link from "next/link"
import { redirect, usePathname } from "next/navigation";
import { topNavigation } from "@/config/topNavigation";
import { AtlasLogo } from "@/components/shared/AtlasLogo";
import { Text } from "@/components/ui/Text";


const onStartUpClick = () => {
  //maybe track some analytics in future
  redirect("/dashboard")
}

export const TopBar = () => {

  const pathname = usePathname();

  return (
    <div className="flex h-14 py-0 px-16 gap-8 items-center self-stretch bg-atlas-background border-b border-atlas-main-border">
      <Link
        href={"/"}
        className="flex items-center gap-[9px]"
      >
        <AtlasLogo />
        <Text className="text-sm text-foreground font-bold tracking-[-0.28px]">
          Atlas
        </Text>
      </Link>
      <div className="hidden lg:flex lg:flex-1 gap-6 justify-center items-start">
        {
          topNavigation.map((item) => {
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
      <div className="hidden lg:flex gap-5 items-center">
        <Link
          href="https://github.com/bsborisov/Atlas"
          target="_blank"
          className={`
            flex px-1 gap-2 items-center
            text-center text-[13px] text-top-nav-color hover:text-top-nav-color-active
            font-inter font-medium 
            leading-[150%] 
            whitespace-nowrap
          `}
        >
          <FaGithub />
          {"GitHub"}
        </Link>
        <Button
          size="md"
          variant="primary"
          onClick={onStartUpClick}
        >
          {
            "Get started →" //TODO translate
          }
        </Button>
      </div>
    </div>
  )
}