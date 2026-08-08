import { cn } from "@/lib/utils"

const Dot = ({
  className
}: {
  className?: string
}) => {
  return (
    <span className={cn(`size-2.25 rounded-full bg-atlas-foreground`, className)} />
  )
}

export default Dot