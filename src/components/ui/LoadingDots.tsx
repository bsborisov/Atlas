export default function LoadingDots(
  props: React.HTMLAttributes<HTMLDivElement>
) {
  return (
    <div
      {...props}
      role="progressbar"
      aria-label="Loading"
      className="relative mx-auto flex w-[26px] justify-between"
    >
      <span className="size-[7px] rounded-full bg-white animate-loading-dot [animation-delay:-0.17s]" />
      <span className="size-[7px] rounded-full bg-white animate-loading-dot" />
      <span className="size-[7px] rounded-full bg-white animate-loading-dot [animation-delay:0.17s]" />
    </div>
  );
}