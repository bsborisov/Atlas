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
    1: "text-7xl font-black tracking-tight leading-17",
    2: "text-6xl font-extrabold tracking-tight leading-15",
    3: "text-5xl font-extrabold tracking-normal leading-13",
    4: "text-4xl font-bold tracking-normal leading-11",
    5: "text-3xl font-bold tracking-normal leading-9",
    6: "text-2xl font-bold tracking-wide leading-7",
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
                className={`m-0 ${baseStyle} ${className}`.trim()}
                {...props}
            >
                {children}
            </Component>
        );
    }
);

Heading.displayName = "Heading";