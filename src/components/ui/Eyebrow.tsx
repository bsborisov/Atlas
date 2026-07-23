import { cn } from "@/lib/utils";
import { EyebrowProps } from "@/types/ui";

function Eyebrow({
  text,
  dotClasses = "",
  className = "",
  ...props
}: EyebrowProps) {
  return (
    <div
      {...props}
      className={cn(
        `flex gap-[7px] py-2 px-3 w-fit items-center rounded-full bg-main-background/[85%] 
        border border-main-border/[90%] 
        font-geist font-normal text-[11px]/[100%] tracking-[0%]
        `,
        className
      )}
    >
      <div className={cn(
        'block w-[5px] h-[5px] rounded-full bg-top-nav-active',
        dotClasses
      )}
      ></div>
      {text}
    </div>
  );
}

Eyebrow.displayName = "Eyebrow";

export default Eyebrow;