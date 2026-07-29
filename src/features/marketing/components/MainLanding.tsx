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
import { Footer } from "./Footer";
import { BottomHero } from "./BottomHero";

const STATS = [
  { value: "12,483", text: "runs today" },
  { value: "98.7%", text: "success rate" },
  { value: "8.2m", text: "mean recovery time" },
  { value: "60+", text: "native integrations" },
];

const SERVICES = ["PagerDuty", "OpenAI", "Salesforce", "Slack", "Stripe", "Jira", "GitHub", "HubSpot", "Datadog", "Notion", "Clearbit", "Segment", "Twilio", "Linear", "Zendesk", "Webhooks"];

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
        className="text-atlas-foreground font-jet-mono"
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
    <div className="self-stretch divide-y divide-atlas-main-border">
      <div className="grid grid-cols-1 md:grid-cols-2 self-stretch min-h-[792px]">
        <MainHeroTexts />
        <MainHeroRuntime />
      </div>

      <div className="grid grid-cols-1 self-stretch divide-x divide-atlas-main-border md:grid-cols-2 lg:grid-cols-4">
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

      <div className="grid grid-cols-1 md:grid-cols-2 self-stretch">
        <BuildTexts />
        <BuildGraph />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 self-stretch">
        <ObserveGraph />
        <ObserveTexts />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 self-stretch">
        <RecoverTexts />
        <RecoverGraph />
      </div>

      <div className="flex flex-col py-20 px-30 gap-7 self-stretch">
        <Heading size={6}>
          {"\"We went from 45-minute resolution times to under 8 minutes. Every run explains itself.\""}
        </Heading>
        <div className="flex gap-3 self-stretch items-center">
          <div className="flex size-9 justify-center items-center shrink-0 rounded-lg bg-app-dark-blue">
            <Text className="font-bold text-sm text-main-text-active">N</Text>
          </div>
          <div className="flex flex-col items-start shrink-0">
            <Text className="font-semibold text-[13px] text-atlas-foreground">
              Nour Al-Hassan
            </Text>
            <Text className="text-xs">
              VP Engineering, Meridian
            </Text>
          </div>
        </div>
      </div>

      <div className="flex flex-col py-13 px-16 gap-[18px] self-stretch">
        <Text className="text-[11px] tracking-[0.33px] items-start self-stretch">
          Works with the services you already use
        </Text>
        <div className="flex gap-[7px] items-start self-stretch">
          {
            SERVICES.map((s, i) => (
              <Text
                key={i}
                className="flex py-1 px-[10px] items-start rounded-[5px] border border-atlas-main-border self-stretch"
              >
                {s}
              </Text>
            ))
          }
        </div>
      </div>

      <BottomHero />

      <Footer />

    </div>
  )
}