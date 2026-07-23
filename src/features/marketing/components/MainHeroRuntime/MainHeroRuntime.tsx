"use client";

import Eyebrow from "@/components/ui/Eyebrow";
import { Text } from "@/components/ui/Text";
import Node from "./Node";
import RuntimeCard from "./RuntimeCard";

const NodeConnector = ({
  background
}: {
  background: string
}) => {
  return (
    <div className={`w-full h-[2px] max-w-21 ${background}`}></div>
  )
}


export const MainHeroRuntime = () => {
  return (
    <div className="justify-center z-4">
      <div className="flex flex-col mt-11 mx-auto max-w-[570px] rounded-[28px] border border-runtime-border/[58%] bg-main-background/[94%]">
        <div className="flex px-5 w-full h-16 items-center justify-between border-b border-runtime-border/[58%]">
          <div className="flex gap-[10px] wordwrap-nowrap items-center">
            <div className="flex gap-[6px]">
              <div className='block w-[7px] h-[7px] rounded-full bg-atlas-pink'></div>
              <div className='block w-[7px] h-[7px] rounded-full bg-atlas-yellow'></div>
              <div className='block w-[7px] h-[7px] rounded-full bg-atlas-green'></div>
            </div>
            <div className="font-geist font-semibold text-xs text-top-nav-active leading-[100%] tracking-[0%]">
              atlas.runtime
            </div>
          </div>
          <Eyebrow
            dotClasses="w-[6px] h-[6px] bg-atlas-green"
            className="border-atlas-green/[22%] bg-atlas-green/[8%] text-atlas-green"
            text="LIVE · 60 FPS"
          />
        </div>
        <div className="flex flex-col gap-4 p-5 pb-17">
          <div className="flex w-full justify-between">
            <div className="flex flex-col gap-[3px]">
              <Text
                size="xSmall"
                weight="semibold"
                className="leading-[100%] tracking-[0%] text-top-nav"
              >
                ORCHESTRATION GRAPH
              </Text>
              <Text
                size="xLarge"
                weight="semibold"
                className="leading-[100%] tracking-[0%] text-top-nav-active"
              >
                One event. Every layer in sync.
              </Text>
            </div>
            <div className="w-fit px-[9px] py-[6px] rounded-lg font-geist font-medium text-[10px] text-atlas-cyan bg-atlas-cyan/[12%]">
              8.4ms render
            </div>
          </div>
          <div className="flex flex-col gap-6 w-full rounded-[18px] px-5 py-9 bg-atlas-darker-blue border border-main-border/[90%]">
            <div className="flex gap-0 items-center">
              <Node
                heading="UI EVENT"
                text="pointer.move"
                dotColor="bg-atlas-cyan"
                borderColor="border-atlas-cyan/[35%]"
              />
              <NodeConnector background="bg-atlas-cyan/[55%]" />
              <Node
                heading="XSTATE"
                text="transition"
                dotColor="bg-atlas-purple"
                borderColor="border-atlas-purple/[80%]"
                glow="shadow-atlas-purple/[22%]"
              />
              <NodeConnector background="bg-atlas-purple/[55%]" />
              <Node
                heading="QUERY"
                text="cache sync"
                dotColor="bg-atlas-pink"
                borderColor="border-atlas-pink/[35%]"
              />
              <NodeConnector background="bg-atlas-pink/[55%]" />
              <Node
                heading="RENDER"
                text="commit"
                dotColor="bg-atlas-cyan"
                borderColor="border-atlas-cyan/[80%]"
                glow="shadow-atlas-cyan/[22%]"
              />
            </div>
            <div className="flex gap-0 items-center justify-center">
              <Node
                heading="AI ROUTER"
                text="intent → action"
                dotColor="bg-atlas-purple"
                borderColor="border-atlas-purple/[35%]"
              />
              <NodeConnector background="bg-atlas-purple/[55%]" />
              <Node
                heading="EDGE DATA"
                text="stream update"
                dotColor="bg-atlas-green"
                borderColor="border-atlas-green/[80%]"
                glow="shadow-atlas-green/[22%]"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <RuntimeCard
              heading="STATE"
              text="ready"
              textColor="text-atlas-green"
            />
            <RuntimeCard
              heading="EVENTS"
              text="2,481"
              textColor="text-atlas-cyan"
            />
            <RuntimeCard
              heading="CACHE"
              text="warm"
              textColor="text-atlas-purple"
            />
          </div>
        </div>
      </div>
    </div>
  )
}