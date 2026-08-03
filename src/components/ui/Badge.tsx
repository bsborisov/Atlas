import { cn } from "@/lib/utils";

function Badge({
  variant = "default",
  children,
  size = "sm",
}: {
  variant?: "default" | "success" | "error" | "warning" | "cyan" | "purple" | "blue" | "ghost";
  children: React.ReactNode;
  size?: "xs" | "sm";
}) {
  const variants: Record<string, string> = {
    default: `text-main-text-active bg-atlas-background-blue border-atlas-main-border`,
    success: `text-app-light-green bg-app-light-green/[12%] border-app-light-green/[25%]`,
    error: `text-app-light-red bg-app-light-red/[12%] border-app-light-red/[25%]`,
    warning: `text-app-light-yellow bg-app-light-yellow/[12%] border-app-light-yellow/[25%]`,
    cyan: `text-app-cyan bg-app-cyan/[12%] border-app-cyan/[25%]`,
    purple: `text-app-purple bg-app-purple/[12%] border-app-purple/[25%]`,
    blue: `text-app-blue bg-app-blue/[12%] border-app-blue/[25%]`,
    ghost: `text-main-text bg-transparent border-atlas-main-border`,
  };
  const sizeClasses = size === "xs"
    ? `text-[10px] py-px px-[6px] rounded-sm`
    : `text-[11px] py-[2px] px-2 rounded-[5px]`
  return (
    <span
      className={cn(
        `inline-flex gap-1 items-center font-semibold tracking-[0.02em] border`,
        variants[variant],
        sizeClasses
      )}
    >
      {children}
    </span>
  );
}

export default Badge