import { cn } from "@/lib/utils";
import { NodeProps } from "../../types/marketing";
import { Text } from "@/components/ui/Text";

function Node({
  heading,
  text,
  borderColor = "border-atlas-white",
  dotColor = "bg-atlas-white",
  glow,
  nodeClasses = "",
  ...props
}: NodeProps) {
  return (
    <div
      {...props}
      className={cn(
        `flex flex-col gap-[5px] py-[11px] px-3 w-fit h-[70px] rounded-[13px] 
        bg-atlas-dark-blue/[90%] border 
        font-geist font-normal text-[11px]/[100%] tracking-[0%]
        `,
        borderColor,
        glow ? `shadow-[0px_8px_18px_0px] ${glow}` : ``,
        nodeClasses
      )}
    >
      <div className="flex gap-[7px] items-center">
        <div className={cn(
          `block w-[7px] h-[7px] rounded-full`,
          dotColor
        )}
        ></div>
        <Text
          weight="semibold"
          className="text-[11px] text-top-nav-active whitespace-nowrap"
        >
          {heading}
        </Text>
      </div>
      <Text
        className="text-[9px] text-top-nav whitespace-nowrap"
      >
        {text}
      </Text>
    </div>
  );
}

Node.displayName = "Node";

export default Node;