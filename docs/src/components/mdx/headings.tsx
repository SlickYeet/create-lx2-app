import { LinkIcon } from "lucide-react"
import { JSX } from "react"

import { cn } from "@/lib/utils"

interface HeadingProps {
  children: React.ReactNode
  depth: 1 | 2 | 3 | 4 | 5 | 6
  id?: string
  className?: string
}

export function Heading({
  children,
  depth,
  id = undefined,
  className = "",
}: HeadingProps) {
  const Tag: keyof JSX.IntrinsicElements = `h${depth}`

  const headingStylesMap = {
    1: "text-4xl mb-4",
    2: "text-3xl mb-4 border-b pb-2",
    3: "text-2xl mb-3",
    4: "text-xl mb-2",
    5: "text-lg mb-2",
    6: "text-base mb-2",
  }
  const baseStyles = "scroll-m-20 font-bold tracking-tight"
  const headingStyles = `${baseStyles} ${headingStylesMap[depth]}`

  return (
    <Tag id={id} className={cn(headingStyles, className)}>
      {id ? (
        <a href={`#${id}`} className="group relative">
          <LinkIcon
            className={cn(
              "text-muted-foreground absolute top-1/2 -left-7 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100",
              depth === 1 && "size-6",
              depth === 2 && "size-5",
              depth > 2 && "size-4",
            )}
            aria-hidden="true"
          />
          {children}
        </a>
      ) : (
        children
      )}
    </Tag>
  )
}

function createHeading(depth: 1 | 2 | 3 | 4 | 5 | 6) {
  const Component = ({ children, id, className }: HeadingProps) => (
    <Heading depth={depth} id={id} className={className}>
      {children}
    </Heading>
  )
  Component.displayName = `HeadingLevel${depth}`
  return Component
}

export const H1 = createHeading(1)
export const H2 = createHeading(2)
export const H3 = createHeading(3)
export const H4 = createHeading(4)
export const H5 = createHeading(5)
export const H6 = createHeading(6)
