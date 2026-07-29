import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";

const ADVANTAGES = [
  "Streaming execution trace",
  "Full request/response payloads",
  "Per-node timing breakdown",
  "Searchable run history"
]

export const ObserveTexts = () => {

  return (
    <div className="flex flex-col px-16 py-18 gap-5 items-start self-stretch justify-center">
      <Text
        className="text-[11px] tracking-[0.55px] font-jet-mono"
      >
        {`02 — Observe`}
      </Text>
      <Heading
        size={5}
        className="font-extrabold text-atlas-foreground"
      >
        {"Every step,"}
        <br />
        {"streamed in real time"}
      </Heading>
      <Text className="pb-1 max-w-95 text-[14px]/[175%] text-main-text">
        {"As your workflow executes, Atlas streams every node's input, output, duration, and HTTP status. No black boxes. No waiting until the run completes."}
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