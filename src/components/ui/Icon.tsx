import { colors, iconSize } from "@/config/themeSettings";
import { cn } from "@/lib/utils";
import { isNumber } from "lodash";
import InlineSVG from "react-inlinesvg";

type StyledSvgProps = {
  color?: string;
  hovercolor?: string;
  mirroring?: boolean;
} & React.ComponentProps<typeof InlineSVG>;

type SVGFallbackProps = React.HTMLAttributes<HTMLDivElement> & {
  width: number;
  height: number;
};

type IconType = {
  className?: string,
  src: any,
  size?: string | number,
  title?: string,
  "aria-label"?: string,
  color?: string,
  hovercolor?: string,
  inline?: boolean,
  mirroring?: any,
  onClick?: (e?: any) => void,
  onKeyDown?: (e?: any) => void,
  tabIndex?: number,
  "data-testid"?: string,
  fallback?: any,
  loadingPlaceholder?: any,
  forceOriginalIcon?: boolean,
} & React.ComponentProps<typeof StyledSvg>

const getColor = (value: string) => {
  return value ? colors[value] : "inherit";
};

export function StyledSvg({
  width,
  height,
  color,
  hovercolor,
  mirroring = true,
  className,
  ...props
}: StyledSvgProps) {
  return (
    <InlineSVG
      {...props}
      className={cn(
        "table transition-colors duration-200 outline-none",
        mirroring && "rtl:[transform:rotateY(180deg)]",
        "[&>svg]:table-cell [&>svg]:align-middle",
        className
      )}
      style={{
        width,
        height,
        color: getColor(color ?? "none"),
        fill: getColor(color ?? "none"),
        ...(hovercolor && {
          ["--hover-color" as any]: getColor(hovercolor),
        }),
      }}
    />
  );
}

export function SVGFallback({
  width,
  height,
  className,
  ...props
}: SVGFallbackProps) {
  return (
    <div
      {...props}
      className={className}
      style={{
        width,
        height,
      }}
    />
  );
}

export const Icon = ({
  className,
  src,
  size = "m",
  title,
  "aria-label": ariaLabel,
  color,
  hovercolor,
  inline,
  mirroring = true,
  onClick,
  onKeyDown,
  tabIndex,
  fallback,
  loadingPlaceholder,
  ...rest
}: IconType) => {
  const resolvedSize = isNumber(size)
    ? size
    : iconSize[size];

  return (
    <i
      className={cn(
        "items-center flex-row justify-center",
        inline
          ? "inline-flex"
          : "flex h-full w-full",
        onClick && "cursor-pointer",
        className
      )}
      title={title}
      aria-label={ariaLabel}
      onClick={onClick}
      onKeyDown={onKeyDown}
      tabIndex={tabIndex}
      role="img"
    >
      <StyledSvg
        color={color}
        hovercolor={hovercolor}
        height={resolvedSize}
        width={resolvedSize}
        src={src}
        title={title}
        mirroring={mirroring}
        uniquifyIDs={true}
        loader={
          loadingPlaceholder ?? (
            <SVGFallback height={resolvedSize} width={resolvedSize} />
          )
        }
        {...rest}
      >
        {fallback ?? (
          <SVGFallback height={resolvedSize} width={resolvedSize} />
        )}
      </StyledSvg>
    </i>
  );
};