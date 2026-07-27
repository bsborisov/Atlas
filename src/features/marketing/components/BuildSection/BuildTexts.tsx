import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";

const ADVANTAGES = [
  "60+ native integrations",
  "Conditional branching + loops",
  "Human-in-the-loop approvals",
  "AI steps with model selection"
]

export const BuildTexts = () => {

  return (
    <div className="flex flex-col px-16 py-18 gap-5 items-start self-stretch justify-center md:border-r md:border-atlas-main-border">
      <Text
        className="text-[11px] tracking-[0.55px] font-jet-mono"
      >
        {`01 — Build`}
      </Text>
      <Heading
        size={5}
        className="font-extrabold text-foreground"
      >
        {"Visual automation,"}
        <br />
        {"no config files"}
      </Heading>
      <Text className="pb-1 max-w-95 text-[14px]/[175%]">
        {"Connect triggers, data sources, AI models, and actions on a canvas. Conditional logic, loops, and human approvals are first-class nodes — not afterthoughts."}
      </Text>
      <ul className="list-none p-0 m-0 flex flex-col gap-[10px]">
        {ADVANTAGES.map(adv => (
          <li key={adv} className="flex items-baseline gap-[10px] text-[13px] text-main-text">
            <span className="text-app-light-green font-bold">✓</span>
            {adv}
          </li>
        ))}
      </ul>
    </div>
  )
}