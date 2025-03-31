import { ExternalLink } from "lucide-react"
import Link from "next/link"

import { cn } from "@/lib/utils"

interface AnchorProps {
  children: React.ReactNode
  href: string
  className?: string
}

export function Anchor({ children, href, className }: AnchorProps) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto")

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "text-primary hover:text-primary/80 inline-flex items-center gap-x-1 underline underline-offset-4",
          className,
        )}
      >
        <span className="py-0">{children}</span>
        <ExternalLink className="size-3.5" />
      </a>
    )
  }

  return (
    <Link
      href={href}
      className={cn(
        "text-primary hover:text-primary/80 underline underline-offset-4",
        className,
      )}
    >
      {children}
    </Link>
  )
}
