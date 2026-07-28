"use client";

import { Button } from "@/components/ui/Button"
import { Heading } from "@/components/ui/Heading"
import { Text } from "@/components/ui/Text"

export const BottomHero = () => {

  const redirectToLogin = async () => {
    console.log("Login")
  }

  const redirectToDashboard = async () => {
    console.log("dashboard")
  }

  return (
    <div className="flex flex-col py-25 px-16 self-stretch">
      <Heading
        size={1}
        className="text-center"
      >
        {"Stop guessing."}
        <br />
        {"Start knowing."}
      </Heading>
      <Text className="text-[13px] text-center pt-[14px]">
        {"Free plan · Up to 3 workflows · No credit card"}
      </Text>
      <div className="flex items-center justify-center pt-9 gap-3 self-stretch">
        <Button
          size="lg"
          variant="primary"
          onClick={redirectToLogin}
          className="px-[28px]"
        >
          {
            "Get started free" //TODO translate
          }
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={redirectToDashboard}
          className="px-[28px] text-main-text-active"
        >
          {
            "Explore the demo →" //TODO translate
          }
        </Button>
      </div>
    </div>
  )
}