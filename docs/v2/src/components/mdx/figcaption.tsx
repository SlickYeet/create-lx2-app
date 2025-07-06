import { getIconForLanguageExtension } from "@/components/icons"
import { cn } from "@/lib/utils"

export function Figcaption(props: React.ComponentProps<"figcaption">) {
  const { className, children, ...rest } = props

  const iconExtension =
    "data-language" in props && typeof props["data-language"] === "string"
      ? getIconForLanguageExtension(props["data-language"])
      : null

  return (
    <figcaption
      data-rehype-pretty-code-title=""
      className={cn(
        "text-muted-foreground [&_svg]:text-muted-foreground flex items-center gap-2 [&_svg]:size-4 [&_svg]:opacity-70",
        className,
      )}
      {...rest}
    >
      {iconExtension}
      {children}
    </figcaption>
  )
}
