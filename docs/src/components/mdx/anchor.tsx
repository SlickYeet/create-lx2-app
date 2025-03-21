import Link from "next/link"
import { ComponentPropsWithoutRef } from "react"

import { cn } from "@/lib/utils"

type AnchorProps = ComponentPropsWithoutRef<"a">

export function Anchor({ href, children, ...props }: AnchorProps) {
  const className = cn(
    "text-violet-500 underline-offset-2 hover:underline",
    props.className,
  )

  if (href?.startsWith("/")) {
    return (
      <Link href={href} className={className} {...props}>
        {children}
      </Link>
    )
  }
  if (href?.startsWith("#")) {
    return (
      <a href={href} className={className} {...props}>
        {children}
      </a>
    )
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      {...props}
    >
      {children}↗
    </a>
  )
}
