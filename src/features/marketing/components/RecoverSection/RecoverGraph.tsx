"use client";

import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text"
import { RefreshCw } from "lucide-react";

const coreStats = [
  {
    stat: "API p95 latency",
    value: "8.2s"
  },
  {
    stat: "PagerDuty status",
    value: "Degraded"
  },
  {
    stat: "Retry after",
    value: "45s"
  },
]

export const RecoverGraph = () => {

  const rootConfidence = 92;

  const retryHandler = () => {
    console.log('Retry!')
  }

  return (
    <div className="flex flex-col p-14 items-center self-stretch justify-center bg-atlas-background-light/[40%]">
      <div className="flex flex-col w-full items-start rounded-[10px] border border-atlas-main-border bg-atlas-background-light">
        <div className="flex py-[10px] px-4 items-center justify-between gap-3 self-stretch border-b border-atlas-main-border">
          <div className="flex items-center gap-[5px]">
            <div className="flex flex-col items-start size-[5px] rounded-full bg-app-purple"></div>
            <Text className="font-jet-mono text-app-purple whitespace-nowrap">
              Atlas AI — diagnosis
            </Text>
          </div>
          <div className="flex items-center gap-[5px]">
            <Text className="font-jet-mono text-app-light-red">
              step 5 failed
            </Text>
          </div>
        </div>
        <div className="flex flex-col p-4 gap-3 items-start self-stretch">
          <div className="flex flex-col self-stretch py-[10px] px-3 rounded-md bg-app-light-red/[6%] border border-app-light-red/[15%]">
            <Text className="font-jet-mono text-app-light-red">
              POST /v2/incidents → 502 Bad Gateway
            </Text>
            <Text className="font-jet-mono">
              PagerDuty API · upstream_timeout · 240ms
            </Text>
          </div>
          <div className="flex flex-col self-stretch">
            <div className="flex justify-between items-start shrink-0 self-stretch">
              <Text className="text-[11px]">
                Root cause confidence
              </Text>
              <Text className="font-bold text-jet-mono text-[13px] text-app-purple ">
                {rootConfidence}
                {"%"}
              </Text>
            </div>
            <div className="pt-[6px]">
              <div className="h-1 bg-app-purple/[12%] rounded-xs overflow-hidden">
                <div
                  className="h-full bg-app-purple rounded-xs linear-width003"
                  style={{ width: `${rootConfidence}%` }}
                />
              </div>
            </div>
          </div>
          <div className="flex self-stretch py-[10px] px-3 rounded-md bg-app-purple/[6%] border border-app-purple/[15%]">
            <Text className="text-[11px] leading-[165%]">
              {"PagerDuty experienced a regional degradation. Status page confirms incident "}
              <Text className="font-jet-mono text-app-cyan">
                {"PDU-STATUS-2891"}
              </Text>
              {"."}
            </Text>
          </div>
          <div className="flex flex-col gap-[3px] self-stretch">
            {
              coreStats.map((s, i) => (
                <div
                  key={i}
                  className="flex py-[5px] px-2 self-stretch justify-between rounded-sm bg-white/[2%]"
                >
                  <Text className="text-[11px]">{s.stat}</Text>
                  <Text className="text-jet-mono text-[11px] text-main-text-active">{s.value}</Text>
                </div>
              ))
            }
          </div>
          <Button
            variant="outline"
            className="flex h-9 justify-center items-center gap-2 text-app-purple self-stretch rounded-[7px] bg-app-purple/[10%] border-app-purple/[25%]"
            onClick={retryHandler}
          >
            <RefreshCw size={11} />
            <Text className="text-xs text-app-purple font-semibold">Retry from step 5</Text>
          </Button>
        </div>
      </div>
    </div>
  )
}