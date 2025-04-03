"use client"

import copyToClipboard from "copy-to-clipboard"
import { Check, Copy, WrapTextIcon } from "lucide-react"
import { useRef, useState } from "react"
import { BundledLanguage } from "shiki/bundle/web"

import { useWrapLines } from "@/components/provider"
import { Button } from "@/components/ui/button"
import { cn, extractTextContent } from "@/lib/utils"

export interface PreProps {
  code?: string
  children?: React.ReactNode
  className?: string
  "data-language"?: BundledLanguage
  showLanguage?: boolean
  "data-line-numbers"?: string
  alwaysShowCopy?: boolean
  showWrapLines?: boolean
}

export function Pre({
  code,
  children,
  className,
  "data-language": language,
  showLanguage = true,
  alwaysShowCopy = false,
  showWrapLines = true,
  ...props
}: PreProps) {
  const preRef = useRef<HTMLPreElement>(null)

  const { wrapLines, toggleWrapLines } = useWrapLines()
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = () => {
    if (code !== undefined) {
      copyToClipboard(code)
    } else {
      const codeString = extractTextContent(children)
      copyToClipboard(codeString)
    }
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <div className="relative">
      <pre
        ref={preRef}
        data-wrap-lines={wrapLines}
        className={cn(
          "dark:bg-input/30 bg-background group border-input my-6 w-auto overflow-x-auto rounded-lg border py-4 shadow-xs md:min-w-sm",
          className,
        )}
        {...props}
      >
        <div className="absolute top-2 right-1 z-20 flex items-center gap-1">
          <Button
            onClick={toggleWrapLines}
            size="icon"
            variant="outline"
            className={cn(
              "dark:bg-input/50 dark:hover:bg-input opacity-0 group-focus-within:opacity-100 group-hover:opacity-100",
              "sm:hidden",
              !showWrapLines && "hidden",
              className,
            )}
            aria-label="Toggle line wrapping"
          >
            <WrapTextIcon
              className={cn("size-3.5", wrapLines && "rotate-y-180 transform")}
            />
          </Button>
          <Button
            onClick={handleCopy}
            size="icon"
            variant="outline"
            className={cn(
              "dark:bg-input/50 dark:hover:bg-input opacity-0 group-focus-within:opacity-100 group-hover:opacity-100",
              alwaysShowCopy && "opacity-100",
              className,
            )}
            aria-label="Copy code to clipboard"
          >
            {isCopied ? (
              <Check className="size-3.5 text-emerald-500" />
            ) : (
              <Copy className="size-3.5" />
            )}
          </Button>
        </div>

        {language && showLanguage && !alwaysShowCopy && (
          <span className="text-muted-foreground bg-input/50 border-input absolute top-2 right-1 z-10 rounded-lg rounded-tl-none rounded-br-none border px-2 py-1 font-mono text-xs opacity-100 transition-opacity group-focus-within:opacity-0 group-hover:opacity-0">
            {language}
          </span>
        )}

        {children}
      </pre>
    </div>
  )
}

export function Code({
  children,
  className,
  "data-language": language,
  ...props
}: PreProps) {
  // Inline code block styling
  if (!language) {
    return (
      <code
        className={cn(
          "bg-input/50 border-input rounded-lg border p-1",
          className,
        )}
        {...props}
      >
        {children}
      </code>
    )
  }

  return <code {...props}>{children}</code>
}
