import { cn } from "@/lib/utils";

type TextProps = React.HTMLAttributes<HTMLSpanElement> & {
  className?: string;
};
export function Text({
  className,
  ...props
}: TextProps) {
  return (
    <span
      {...props}
      className={cn(
        `text-main-text text-[10px] 
         leading-[150%] 
         font-inter font-normal`,
        className
      )}
    />
  );
}

Text.displayName = "Text";