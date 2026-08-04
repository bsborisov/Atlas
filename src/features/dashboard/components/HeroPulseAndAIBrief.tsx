"use client";

import { Button } from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Dot from "@/components/ui/Dot";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { cn } from "@/lib/utils";
import { AlertCircle, Eye, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import CountUp from "react-countup";

const WAVEFORM_BARS = [
  0.42, 0.55, 0.68, 0.76, 0.88, 0.94, 0.82, 0.97,
  0.91, 0.84, 0.78, 0.69, 0.61, 0.54, 0.47, 0.39,
  0.32, 0.27, 0.34, 0.22, 0.18, 0.29, 0.37, 0.44,
  0.52, 0.63, 0.71, 0.79, 0.87, 0.95, 0.89, 0.81,
  0.73, 0.85, 0.92, 0.98, 0.86, 0.77, 0.69, 0.82,
  0.91, 0.96, 0.88, 0.79, 0.72, 0.64, 0.57, 0.49,
] as const;

function WaveformViz() {
  return (
    <div className="flex h-10 items-center gap-[2px]">
      {WAVEFORM_BARS.map((height, index) => {
        const isFailed = index === 35;

        return (
          <div
            key={index}
            className={cn(
              "w-[3px] rounded-xs",
              isFailed
                ? "bg-app-light-red"
                : index > 40
                  ? "bg-app-purple"
                  : "bg-app-light-green",
            )}
            style={{
              height: `${height * 100}%`,
              opacity: isFailed ? 1 : 0.6 + height * 0.4,
            }}
          />
        );
      })}
    </div>
  );
}

const HeroPulseAndAIBrief = () => {
  const { push } = useRouter();

  const DISPLAY_ITEMS = [
    {
      label: "Executions",
      value: (
        <CountUp
          start={0}
          end={12483}
          duration={1}
          separator=","
        />
      ),
      sub: "last 24h",
      color: "text-atlas-foreground",
    },
    {
      label: "Success Rate",
      value: (
        <CountUp
          start={0}
          end={98.7}
          duration={1}
          decimals={1}
          suffix="%"
        />
      ),
      sub: "↑ 0.3% vs yesterday",
      color: "text-app-light-green",
    },
    {
      label: "Avg Duration",
      value: (
        <CountUp
          start={0}
          end={842}
          duration={1}
          suffix="ms"
        />
      ),
      sub: "↓ 12ms vs yesterday",
      color: "text-app-cyan",
    },
    {
      label: "Active Workflows",
      value: (
        <CountUp
          start={0}
          end={18}
          duration={1}
        />
      ),
      sub: "2 paused",
      color: "text-app-purple",
    },
  ];

  return (
    <div className="grid grid-cols-[1fr_340px] mb-4 gap-4">
      {/* Atlas System Pulse */}
      <Card>
        <div className="absolute top-0 right-0 size-75 background-hero-gradient pointer-events-none" />
        <div className="flex mb-5 items-start justify-between">
          <div>
            <Text className="mb-1 font-bold uppercase tracking-[0.1em]">
              Atlas System Pulse
            </Text>
            <div className="flex gap-2 items-center">
              <Dot className="size-[7px] bg-app-light-green shadow-[0_0_8px_rgb(82,217,154)] animate-pulse" />
              <Text className="text-xs font-semibold text-app-light-green">
                Live
              </Text>
            </div>
          </div>
          <div
            className={cn(
              `flex py-[5px] px-[10px] gap-[6px] rounded-[7px]`,
              `items-center bg-app-light-red/[12%]`,
              `border border-app-light-red/[20%] cursor-pointer`
            )}
            onClick={() => push("/failure")}
          >
            <AlertCircle
              size={12}
              className="text-app-light-red"
            />
            <Text className="text-[11px] font-semibold text-app-light-red">
              1 issue requires attention
            </Text>
          </div>
        </div>

        <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {DISPLAY_ITEMS.map(({ label, value, sub, color }, index) => (
            <div key={`display-${index}`}>
              <Text className="mb-[6px] font-semibold uppercase tracking-[0.06em]">
                {label}
              </Text>
              <Heading
                size={6}
                className={cn(
                  `mb-1 font-jet-mono`,
                  color,
                  `tracking-[-0.04em] leading-none`
                )}
              >
                {value}
              </Heading>
              <div className="text-[11px] text-main-text">
                {sub}
              </div>
            </div>
          ))}
        </div>

        <div>
          <Text className="mb-2 text-[11px]">
            Execution stream — last 24h
          </Text>
          <WaveformViz />
        </div>
      </Card>

      {/* AI Brief */}
      <Card className="p-5">
        <div className="absolute top-0 left-0 right-0 h-px border-gradient-auth" />
        <div className="flex gap-2 mb-[14px] items-center">
          <div className="flex size-7 rounded-[7px] items-center justify-center border border-app-purple/[25%] bg-app-purple/[12%]">
            <Sparkles
              size={14}
              className="text-app-purple"
            />
          </div>
          <div>
            <div className="text-xs font-bold text-atlas-foreground">
              AI Operations Brief
            </div>
            <div className="text-[10px] text-main-text">Generated · 14:30 UTC</div>
          </div>
        </div>

        <p className="mb-4 text-[12.5px] text-main-text-active leading-[170%]">
          {"Atlas completed "}
          <strong className="text-atlas-foreground">
            {"1,842 overnight runs"}
          </strong>
          {" with 98.7% success."}
          {" Incident intelligence recovered from three PagerDuty EU timeouts."}
          {" Customer risk routing is trending "}
          <strong className="text-app-light-yellow">
            {"12% slower"}
          </strong>
          {" after the Salesforce schema update."}
        </p>

        <div className="mb-[14px] py-[10px] px-3 rounded-lg border border-app-light-red/[20%] bg-app-light-red/[12%]">
          <div className="mb-[3px] text-[11px] font-semibold text-app-light-red">
            Attention: run_01JAZ9
          </div>
          <div className="text-[11px] text-main-text-active">
            Incident intelligence failed at Create incident — PagerDuty returned HTTP 502.
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <Button
            variant="secondary"
            icon={
              <Eye size={12} />
            }
            onClick={
              () => push("/failure")
            }
          >
            View failed run
          </Button>
          <Button
            variant="ghost"
            icon={
              <Sparkles size={12} />
            }
          >
            Ask Atlas
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default HeroPulseAndAIBrief;