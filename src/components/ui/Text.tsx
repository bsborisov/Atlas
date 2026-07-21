import { colors } from "@/config/themeSettings";
import { cn } from "@/lib/utils";

type TextProps = React.HTMLAttributes<HTMLSpanElement> & {
  size?: string;
  weight?: string;
  category?: string;
  color?: string;
};

type typographyProps = {
  size: string,
  spacing: number,
  lineHeight: number
}

const typography: Record<string, typographyProps> = {
  h1: {
    size: "68px",
    spacing: -.015,
    lineHeight: 80
  },
  h2: {
    size: "50px",
    spacing: -.005,
    lineHeight: 56
  },
  h3: {
    size: "38px",
    spacing: -.005,
    lineHeight: 44
  },
  h4: {
    size: "28px",
    spacing: .0025,
    lineHeight: 32
  },
  h5: {
    size: "22px",
    spacing: .005,
    lineHeight: 28
  },
  h6: {
    size: "16px",
    spacing: .005,
    lineHeight: 20
  },
  large: {
    size: "16px",
    spacing: .0025,
    lineHeight: 24
  },
  normal: {
    size: "14px",
    spacing: .02,
    lineHeight: 20
  },
  small: {
    size: "12px",
    spacing: .02,
    lineHeight: 16
  },
  xSmall: {
    size: "10px",
    spacing: .02,
    lineHeight: 16
  }
}

export function Text({
  size = "normal",
  weight = "normal",
  category,
  color,
  className,
  ...props
}: TextProps) {
  return (
    <span
      {...props}
      className={cn(
        `text-[${typography[size].size}] 
         tracking-[${typography[size].spacing}] 
         leading-[${typography[size].lineHeight}] 
         font-mont font-${weight}`,
        category && colors[category],
        color && colors[color],
        className
      )}
    />
  );
}

Text.displayName = "Text";