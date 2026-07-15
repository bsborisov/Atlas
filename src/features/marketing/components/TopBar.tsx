"use client";

import { Button } from "@/components/ui/Button"
import Divider from "@/components/ui/Divider"
import { FaGithub } from "react-icons/fa";
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation";

const onSignupClick = () => {
  //maybe track some analytics in future
  redirect("/register")
}

const onLoginClick = () => {
  //maybe track some analytics in future
  redirect("/login")
}

export const TopBar = () => {
  return (
    <div className="flex h-16">
      <div className="w-full flex py-0 px-4 m-auto justify-between items-center">
        <div className="hidden lg:contents">
          <Link href={"/"}>
            <span>
              <Image
                className="invert"
                src="/next.svg"
                alt="Next.js logo"
                width={100}
                height={20}
                priority
              />
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-4 ms-auto">
          <div className="hidden lg:contents">
            <Button size="a" variant={"ghost"}>
              <FaGithub className="h-5 w-5" />
              View Source Code
            </Button>
            <Divider className="h-8" vertical />
            <div className="flex gap-1 items-center sm:gap-2">
              <Button size="md" onClick={onSignupClick}>
                {
                  "Register" //TODO translate
                }
              </Button>

              <Button size="md" variant="secondary" onClick={onLoginClick}>
                {
                  "Login" //TODO translate
                }
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}