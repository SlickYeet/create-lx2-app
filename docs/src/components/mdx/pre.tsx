import { type ComponentProps } from "react"

import { cn } from "@/lib/utils"

export function Pre(props: ComponentProps<"pre">) {
  const { className, children, ...rest } = props

  return (
    <pre
      className={cn(
        "no-scrollbar min-w-0 overflow-x-auto px-4 py-3.5 outline-none has-[[data-highlighted-line]]:px-0 has-[[data-line-numbers]]:px-0 has-[[data-slot=tabs]]:p-0",
        className,
      )}
      {...rest}
    >
      {children}
    </pre>
  )
}
