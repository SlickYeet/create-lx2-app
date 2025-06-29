import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

export function UL({ className, ...props }: ComponentProps<"ul">) {
  return <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
}

export function OL({ className, ...props }: ComponentProps<"ol">) {
  return <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
}

export function LI({ className, ...props }: ComponentProps<"li">) {
  return <li className={cn("marker:text-primary mt-2", className)} {...props} />
}
