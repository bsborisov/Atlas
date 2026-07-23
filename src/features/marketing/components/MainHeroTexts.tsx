"use client";

import { Button } from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";

const redirectToLogin = async () => {
  console.log("Login")
}

export const MainHeroTexts = () => {
  return (
    <div className="flex flex-col gap-7 w-fit mx-auto z-4">
      <Eyebrow
        text="REACT POSSIBILITY ENGINE · ONLINE"
        dotClasses="w-[7px] h-[7px] pulse-green-shadow bg-atlas-green"
        className="gap-[9px] text-atlas-cyan font-semibold tracking-[12%] bg-atlas-dark-blue/[90%] border-atlas-cyan/[34%]"
      />
      <Heading
        className="font-geist font-extrabold text-[76px]/[92%] tracking-[-4%]"
      >
        {"React, without"}
        <br />
        <span
          className="bg-primary-hero-text-gradient"
        >
          {"the ceiling."}
        </span>
      </Heading>
      <Text className="font-geist text-[19px]/[150%] tracking-[0%] text-top-nav">
        {"Atlas is a living showcase of what modern React can "}
        <br />
        {"become — real-time state, cinematic motion, intelligent data "}
        <br />
        {"and product-grade architecture, working as one system."}
      </Text>
      <div
        className="flex gap-3"
      >
        <Button
          size="lg"
          variant="secondary"
          onClick={redirectToLogin}
          className="text-atlas-white bg-primary-header-button-gradient normal-case px-3 primary-header-button-shadow"
        >
          {
            "Explore the system" //TODO translate
          }
        </Button>
        <Button
          size="lg"
          variant="secondary"
          onClick={redirectToLogin}
          className="text-atlas-black normal-case px-3 border border-atlas-gray"
        >
          {
            "View architecture" //TODO translate
          }
        </Button>
      </div>
      <div
        className="flex gap-2"
      >
        <Eyebrow
          text="React 22"
          dotClasses="bg-atlas-cyan"
        />
        <Eyebrow
          text="Next.js"
          dotClasses="bg-top-nav-active"
        />
        <Eyebrow
          text="XState 5"
          dotClasses="bg-atlas-purple"
        />
        <Eyebrow
          text="TanStack"
          dotClasses="bg-atlas-pink"
        />

      </div>
    </div>
  )
}