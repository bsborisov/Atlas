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
      <div className="flex justify-center pt-9 gap-3 self-stretch">
        <Button
          size="xl"
          variant="primary"
          onClick={redirectToLogin}
        >
          {
            "Get started free" //TODO translate
          }
        </Button>
        <Button
          size="xl"
          variant="outline"
          onClick={redirectToDashboard}
          className="text-main-text-active"
        >
          {
            "Explore the demo →" //TODO translate
          }
        </Button>
      </div>
    </div>
  )
}