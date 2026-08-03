import Dot from "@/components/ui/Dot";
import { Text } from "@/components/ui/Text"

const edges = [
  { d: "M 90,90 C 118,90 120,46 152,46", col: "var(--main-border)", delay: "0s", dur: "2s" },
  { d: "M 90,90 C 118,90 120,134 152,134", col: "var(--app-purple)", delay: "0.5s", dur: "2.5s" },
  { d: "M 248,46 C 280,46 296,90 322,90", col: "var(--main-border)", delay: "1s", dur: "2s" },
  { d: "M 248,134 C 280,134 296,90 322,90", col: "var(--app-purple)", delay: "0.3s", dur: "2.2s" },
  { d: "M 406,90 L 480,90", col: "var(--app-light-red)", delay: "0s", dur: "1s" },
];
const nodes = [
  { x: 10, y: 72, w: 80, h: 36, top: "Webhook", bot: "trigger", t: "trigger" },
  { x: 152, y: 28, w: 96, h: 36, top: "Salesforce", bot: "fetch", t: "data" },
  { x: 152, y: 116, w: 96, h: 36, top: "GPT-4o", bot: "score", t: "ai" },
  { x: 322, y: 72, w: 84, h: 36, top: "Severity", bot: "route", t: "logic" },
  { x: 480, y: 72, w: 80, h: 36, top: "PagerDuty", bot: "notify", t: "error" },
];

export const BuildGraph = () => {

  return (
    <div className="flex flex-col p-14 items-center self-stretch justify-center bg-atlas-background-light/[40%]">
      <div className="flex flex-col w-full items-start rounded-[10px] border border-atlas-main-border bg-atlas-background-light">
        <div className="flex py-[10px] px-4 items-center justify-between gap-3 self-stretch border-b border-atlas-main-border">
          <Text className="font-jet-mono">
            incident_intelligence
          </Text>
          <div className="flex items-center gap-[5px]">
            <Dot className="size-[5px] bg-app-light-red" />
            <Text className="font-jet-mono text-app-light-red whitespace-nowrap">
              1 error · step 5
            </Text>
          </div>
        </div>
        <div className="flex flex-col py-6 px-4 items-start self-stretch">
          <svg viewBox="0 0 560 180" className="w-full overflow-visible">
            {edges.map((e, i) => (
              <path
                key={i}
                d={e.d}
                fill="none"
                stroke={e.col}
                strokeWidth={1}
                strokeDasharray="4 8"
                opacity={0.6}
                style={{ animation: `dash-flow-animation ${e.dur} linear infinite`, animationDelay: e.delay }}
              />
            ))}
            {
              nodes.map((n, i) => {

                const isAI = n.t === "ai", isErr = n.t === "error";

                return (
                  <g key={i}>
                    {
                      isErr &&
                      <rect
                        x={n.x - 2}
                        y={n.y - 2}
                        width={n.w + 4}
                        height={n.h + 4}
                        rx={8}
                        fill="none"
                        stroke={"var(--app-light-red)"}
                        strokeWidth={1}
                        strokeDasharray="3 3"
                        className="node-pulse"
                      />
                    }
                    <rect
                      x={n.x}
                      y={n.y}
                      width={n.w}
                      height={n.h}
                      rx={6}
                      fill={
                        isAI
                          ? "rgba(168,107,255,0.08)"
                          : isErr
                            ? "rgba(255,107,129,0.08)"
                            : "rgba(13,20,34,0.9)"
                      }
                      stroke={
                        isAI
                          ? "var(--app-purple)"
                          : isErr
                            ? "var(--app-light-red)"
                            : "var(--main-border)"
                      }
                      strokeWidth={
                        isAI || isErr
                          ? 1.5
                          : 1
                      }
                    />
                    <text
                      x={n.x + n.w / 2}
                      y={n.y + 15}
                      textAnchor="middle"
                      fill={
                        isAI
                          ? "var(--app-purple)"
                          : isErr
                            ? "var(--app-light-red)"
                            : "var(--foreground)"
                      }
                      fontSize={10}
                      fontWeight={600}
                      fontFamily="Inter,sans-serif"
                    >
                      {n.top}
                    </text>
                    <text
                      x={n.x + n.w / 2}
                      y={n.y + 28}
                      textAnchor="middle"
                      fill={"var(--nav-color)"}
                      fontSize={9}
                      fontFamily="'JetBrains Mono',monospace"
                    >
                      {n.bot}
                    </text>
                  </g>
                );
              })
            }
            <rect
              x={522}
              y={57}
              width={28}
              height={16}
              rx={4}
              fill="rgba(255,107,129,0.15)"
              stroke={"var(--app-light-red)"}
              strokeWidth={0.75}
            />
            <text
              x={536}
              y={68}
              textAnchor="middle"
              fill={"var(--app-light-red)"}
              fontSize={8}
              fontWeight={700}
              fontFamily="'JetBrains Mono',monospace"
            >
              502
            </text>
          </svg>
        </div>
      </div>
    </div>
  )
}