import { cn } from "@/lib/utils";
import { RuntimeCardProps } from "../../types/marketing";
import { Text } from "@/components/ui/Text";

function RuntimeCard({
  heading,
  text,
  textColor = "text-atlas-white",
  ...props
}: RuntimeCardProps) {
  return (
    <div
      {...props}
      className={`
        flex flex-col gap-[5px] py-[13px] px-3 w-full h-[70px] rounded-[13px] 
        bg-atlas-dark-blue/[75%] border border-main-border/[70%]
        font-geist font-normal text-[11px]/[100%] tracking-[0%]
      `}
    >
      <Text
        weight="semibold"
        className="text-[9px] text-top-nav whitespace-nowrap"
      >
        {heading}
      </Text>
      <Text
        weight="semibold"
        className={`text-[17px] whitespace-nowrap ${textColor}`}
      >
        {text}
      </Text>
    </div>
  );
}

RuntimeCard.displayName = "RuntimeCard";

export default RuntimeCard;