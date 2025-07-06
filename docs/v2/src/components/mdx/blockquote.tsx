import { cn } from "@/lib/utils"

export function Blockquote({
  className,
  ...props
}: React.ComponentProps<"blockquote">) {
  return (
    <blockquote
      className={cn("border-primary mt-6 border-l-2 pl-6 italic", className)}
      {...props}
    />
  )
}
