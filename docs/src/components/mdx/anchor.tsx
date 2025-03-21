import Link from "next/link"
import { ComponentPropsWithoutRef } from "react"

type AnchorProps = ComponentPropsWithoutRef<"a">

export function Anchor({ href, children, ...props }: AnchorProps) {
  const className = "text-violet-500 hover:underline"

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
