"use client";

import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Play } from "lucide-react";

const redirectToLogin = async () => {
  console.log("Login")
}

const redirectToDashboard = async () => {
  console.log("dashboard")
}


export const MainHeroTexts = () => {

  const formatter = new Intl.NumberFormat("en-US");
  const runsToday = 12483;

  return (
    <div className="flex flex-col px-16 py-20 items-start self-stretch justify-center md:border-r md:border-atlas-main-border">
      <div className="flex w-fit pb-7 items-center gap-2">
        <div className="size-[6px] rounded-full pulse-green-dot"></div>
        <Text
          className="text-[11px] font-jet-mono"
        >
          {`Live · ${formatter.format(runsToday)} runs today`}
        </Text>
      </div>
      <Heading
        size={2}
        className="pb-6 font-inter text-foreground"
      >
        {"Run workflows."}
        <br />
        {"Know everything."}
        <br />
        {"Fix what breaks."}
      </Heading>
      <Text className="pb-9 max-w-90 text-[15px]/[175%]">
        {"Atlas is the workflow platform built for ops teams who need more than automation — they need answers. Real-time execution tracing, AI failure diagnosis, scoped retries."}
      </Text>
      <div className="flex items-center gap-3 self-stretch">
        <Button
          size="lg"
          variant="primary"
          onClick={redirectToLogin}
        >
          {
            "Start for free" //TODO translate
          }
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={redirectToDashboard}
          className="text-main-text-active"
        >
          <Play size={13} />
          {
            "Open demo" //TODO translate
          }
        </Button>
      </div>
    </div>
  )
}