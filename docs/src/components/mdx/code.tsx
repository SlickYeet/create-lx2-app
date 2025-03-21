import { Code as NextraCode } from "nextra/components"
import { ComponentPropsWithoutRef } from "react"

type CodeProps = ComponentPropsWithoutRef<"code">

export function Code({ children, className, ...props }: CodeProps) {
  return (
    <NextraCode {...props} className={className}>
      {children}
    </NextraCode>
  )
}
