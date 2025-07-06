import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

export function Paragraph({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      className={cn("leading-relaxed [&:not(:first-child)]:mt-6", className)}
      {...props}
    />
  )
}
