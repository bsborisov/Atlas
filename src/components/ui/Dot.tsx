import { cn } from "@/lib/utils"

const Dot = ({
  className
}: {
  className?: string
}) => {
  return (
    <span className={cn(`w-[9px] h-[9px] rounded-full bg-atlas-foreground`, className)} />
  )
}

export default Dot