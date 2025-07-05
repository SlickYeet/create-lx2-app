import { cn } from "@/lib/utils"

export const Paragraph = ({
  className,
  ...props
}: React.ComponentProps<"p">) => (
  <p
    className={cn("leading-relaxed [&:not(:first-child)]:mt-6", className)}
    {...props}
  />
)
