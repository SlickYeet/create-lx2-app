import { type ComponentProps } from "react"

import { cn } from "@/lib/utils"

export function Figure(props: ComponentProps<"figure">) {
  const { className, ...rest } = props

  return <figure className={cn(className)} {...rest} />
}
