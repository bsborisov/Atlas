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
  1: "text-[72px] font-extrabold tracking-[-3.6px] leading-[100%]",
  2: "text-[68px] font-extrabold tracking-[-2.72px] leading-[102%]",
  3: "text-[50px] font-extrabold tracking-[-1.9px] leading-[105%]",
  4: "text-[40px] font-bold tracking-[-1.6px] leading-[100%]",
  5: "text-[30px] font-bold tracking-[-1.2px] leading-[110%]",
  6: "text-[28px] font-medium tracking-[-0.56px] leading-[150%]",
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
          `m-0 font-inter ${baseStyle}`,
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