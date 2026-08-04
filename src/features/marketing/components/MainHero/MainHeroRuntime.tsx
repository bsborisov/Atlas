"use client";

import { Text } from "@/components/ui/Text"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { workflow_steps } from "../../config/static-data";
import Dot from "@/components/ui/Dot";

export const MainHeroRuntime = () => {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 1600);
    return () => clearInterval(id);
  }, []);

  const cycleLen = workflow_steps.length + 4;
  const visibleSteps = workflow_steps.slice(0, Math.min(workflow_steps.length, tick % cycleLen));
  const statusColor = (s: string) => s === "ok" ? "text-app-light-green" : s === "err" ? "text-app-light-red" : "text-app-purple";

  return (
    <div className="flex flex-col p-14 items-center self-stretch justify-center bg-atlas-background-light/[50%]">
      <div className="flex flex-col w-full items-start rounded-[10px] border border-atlas-main-border bg-atlas-background-light">
        <div className="flex py-[10px] px-4 items-center gap-3 self-stretch border-b border-atlas-main-border">
          <div className="flex items-start gap-[5px]">
            <Dot className="bg-app-red" />
            <Dot className="bg-app-yellow" />
            <Dot className="bg-app-green" />
          </div>
          <Text
            className="w-full text-center font-jet-mono"
          >
            incident_intelligence · run_01HZAQ7
          </Text>
          <div className="flex items-center gap-[5px]">
            <Dot className="size-[5px] bg-app-light-green animate-pulse" />
            <Text
              className="text-[9px] font-jet-mono font-semibold tracking-[0.9px] leading-[100%] text-app-light-green"
            >
              LIVE
            </Text>
          </div>
        </div>
        <div className="flex flex-col py-3 px-4 items-start self-stretch">
          <div className="demo-table-grid w-full pt-0 px-1 pb-2 mb-[2px] gap-[6px] border-b border-atlas-main-border self-stretch">
            <span />
            <Text className="font-jet-mono">
              STEP
            </Text>
            <Text className="font-jet-mono">
              NODE
            </Text>
            <Text className="font-jet-mono">
              DUR
            </Text>
            <Text className="font-jet-mono">
              CODE
            </Text>
          </div>
          {visibleSteps.map((s, i) => (
            <div
              key={i}
              className={cn(
                `demo-table-grid w-full items-center py-[5px] px-1 gap-[6px] rounded-sm font-jet-mono text-[11px]`,
                i === visibleSteps.length - 1 ? "bg-white/[3%]" : "",
                s.status === "err" ? "bg-app-red/[6%]" : ""
              )}
            >
              <span className={cn(
                statusColor(s.status),
                `font-bold`
              )}
              >
                {s.status === "ok" ? "✓" : s.status === "err" ? "✗" : "~"}
              </span>
              <span className={cn(
                s.status === "err"
                  ? "text-app-light-red"
                  : s.status === "ai"
                    ? "text-app-purple"
                    : "text-main-text",
                `overflow-hidden text-ellipsis whitespace-nowrap`
              )}>
                {s.step}
              </span>
              <span className="text-main-text">{s.node}</span>
              <span className="text-main-text">{s.ms}</span>
              <span className={
                s.code === 502
                  ? "text-app-light-red"
                  : s.code
                    ? "text-app-light-green"
                    : "text-transparent"
              }>
                {s.code || "·"}
              </span>
            </div>
          ))}
          <div className="py-[5px] px-1">
            <span className="font-jet-mono text-xs text-app-purple cursor-animation">_</span>
          </div>
        </div>
      </div>
    </div >
  )
}