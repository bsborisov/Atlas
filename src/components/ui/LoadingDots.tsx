export default function LoadingDots(
  props: React.HTMLAttributes<HTMLDivElement>
) {
  return (
    <div
      {...props}
      role="progressbar"
      aria-label="Loading"
      className="relative mx-auto flex w-7 justify-between"
    >
      <span className="size-2 rounded-full bg-white animate-loading-dot [animation-delay:-0.18s]" />
      <span className="size-2 rounded-full bg-white animate-loading-dot" />
      <span className="size-2 rounded-full bg-white animate-loading-dot [animation-delay:0.18s]" />
    </div>
  );
}

LoadingDots.displayName = "LoadingDots";