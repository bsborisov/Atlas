"use client";

import { Button } from "@/components/ui/Button"
import Divider from "@/components/ui/Divider"
import { FaGithub } from "react-icons/fa";
import Image from "next/image"
import Link from "next/link"
import { redirect, usePathname } from "next/navigation";
import { topNavigation } from "@/config/topNavigation";


const onStartUpClick = () => {
  //maybe track some analytics in future
  redirect("/dashboard")
}

export const TopBar = () => {

  const pathname = usePathname();

  return (
    <div className="flex h-24 bg-atlas-darkest-blue border-b border-main-border/[65%]">
      <div className="w-full flex py-0 px-20 m-auto justify-between items-center">
        <div className="hidden lg:contents">
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
        </div>
        <div className="flex mx-auto gap-8 font-geist">
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
                  className={`
                    capitalize text-base font-medium
                    ${isActive
                      ? 'text-top-nav-active'
                      : 'text-top-nav hover:text-top-nav-hover hover:underline'
                    }
                  `}
                >
                  {item.title}
                </Link>
              )
            })
          }

        </div>
        <div className="hidden lg:flex gap-3 items-center">
          <Button
            size="a"
            variant={"ghost"}
            className="text-top-nav text-base font-medium font-geist normal-case"
          >
            GitHub ↗
          </Button>
          <Button
            size="lg"
            variant="secondary"
            onClick={onStartUpClick}
            className="text-atlas-white bg-primary-header-button-gradient normal-case px-3 primary-header-button-shadow"
          >
            {
              "Open Atlas" //TODO translate
            }
          </Button>
        </div>
      </div>
    </div>
  )
}