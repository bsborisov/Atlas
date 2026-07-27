import { cn } from "@/lib/utils";
import { forwardRef } from "react";

const TAGS = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h5",
  6: "h6",
} as const;

type HeadingSize = keyof typeof TAGS;

const HEADING_STYLES: Record<HeadingSize, string> = {
  1: "text-[68px] font-inter font-extrabold tracking-[-2.72px] leading-[102%]",
  2: "text-6xl font-inter font-extrabold tracking-tight leading-15",
  3: "text-5xl font-inter font-extrabold tracking-normal leading-13",
  4: "text-[40px] font-inter font-bold tracking-[-1.6px] leading-[100%]",
  5: "text-[30px] font-inter font-bold tracking-[-1.2px] leading-[110%]",
  6: "text-2xl font-inter font-bold tracking-wide leading-7",
};

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  size?: HeadingSize;
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ size = 1, className = "", children, ...props }, ref) => {
    const Component = TAGS[size];
    const baseStyle = HEADING_STYLES[size];

    return (
      <Component
        ref={ref}
        className={cn(
          `m-0 ${baseStyle}`,
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Heading.displayName = "Heading";