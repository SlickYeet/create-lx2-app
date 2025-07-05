import { type ComponentProps } from "react"

import { cn } from "../../lib/utils"
import { getIconForLanguageExtension } from "../icons"

export function Figcaption(props: ComponentProps<"figcaption">) {
  const { className, children, ...rest } = props

  const iconExtension =
    "data-language" in props && typeof props["data-language"] === "string"
      ? getIconForLanguageExtension(props["data-language"])
      : null

  return (
    <figcaption
      className={cn(
        "text-code-foreground [&_svg]:text-code-foreground flex items-center gap-2 [&_svg]:size-4 [&_svg]:opacity-70",
        className,
      )}
      {...rest}
      data-rehype-pretty-code-title=""
    >
      {iconExtension}
      {children}
    </figcaption>
  )
}
