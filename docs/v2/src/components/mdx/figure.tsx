import { cn } from "@/lib/utils"

export function Figure(props: React.ComponentProps<"figure">) {
  const { className, ...rest } = props

  return <figure className={cn(className)} {...rest} />
}
