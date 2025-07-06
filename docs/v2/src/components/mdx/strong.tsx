import { cn } from "@/lib/utils"

export function Strong({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return <strong className={cn("font-medium", className)} {...props} />
}
