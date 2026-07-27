import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { MainHeroTexts } from "./MainHero/MainHeroTexts";
import { MainHeroRuntime } from "./MainHero/MainHeroRuntime";
import { BuildTexts } from "./BuildSection/BuildTexts";
import { BuildGraph } from "./BuildSection/BuildGraph";
import { ObserveGraph } from "./ObserveSection/ObserveGraph";
import { ObserveTexts } from "./ObserveSection/ObserveTexts";
import { RecoverGraph } from "./RecoverSection/RecoverGraph";
import { RecoverTexts } from "./RecoverSection/RecoverTexts";

const STATS = [
  { value: "12,483", text: "runs today" },
  { value: "98.7%", text: "success rate" },
  { value: "8.2m", text: "mean recovery time" },
  { value: "60+", text: "native integrations" },
];

const StatBox = ({
  value,
  text
}: {
  value: string;
  text: string;
}) => {
  return (
    <div className="flex flex-col py-10 px-12 items-start gap-2 self-stretch">
      <Heading
        size={4}
        className="text-foreground font-jet-mono"
      >
        {value}
      </Heading>
      <Text
        className="text-xs"
      >
        {text}
      </Text>
    </div>
  )
}

export const MainLanding = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 w-full min-h-[792px]">
        <MainHeroTexts />
        <MainHeroRuntime />
      </div>

      <div className="grid grid-cols-1 w-full divide-x divide-atlas-main-border border-b border-atlas-main-border md:grid-cols-2 lg:grid-cols-4">
        {
          STATS.map((s, i) => {
            return (
              <StatBox
                key={i}
                value={s.value}
                text={s.text}
              />
            )
          })
        }

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 w-full border-b border-atlas-main-border">
        <BuildTexts />
        <BuildGraph />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 w-full border-b border-atlas-main-border">
        <ObserveGraph />
        <ObserveTexts />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 w-full border-b border-atlas-main-border">
        <RecoverTexts />
        <RecoverGraph />
      </div>
      ss
    </>
  )
}