"use client"

import copyToClipboard from "copy-to-clipboard"
import { Check, Copy } from "lucide-react"
import { useState } from "react"
import { BundledLanguage } from "shiki/bundle/web"

import { Button } from "@/components/ui/button"
import { cn, extractTextContent } from "@/lib/utils"

export interface PreProps {
  code?: string
  children?: React.ReactNode
  className?: string
  "data-language"?: BundledLanguage
  showLanguage?: boolean
  alwaysShowCopy?: boolean
}

export function Pre({
  code,
  children,
  className,
  "data-language": language,
  showLanguage = true,
  alwaysShowCopy = false,
  ...props
}: PreProps) {
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
        className={cn(
          "dark:bg-input/30 bg-background group border-input my-6 min-w-sm overflow-x-scroll rounded-lg border py-4 shadow-xs",
          className,
        )}
        {...props}
      >
        <Button
          onClick={handleCopy}
          size="icon"
          variant="outline"
          className={cn(
            "absolute top-2 right-1 z-10 opacity-0 group-hover:opacity-100",
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

        {language && showLanguage && !alwaysShowCopy && (
          <span className="text-muted-foreground bg-input/50 border-input absolute top-2 right-1 z-0 rounded-lg rounded-tl-none rounded-br-none border px-2 py-1 font-mono text-xs opacity-100 transition-opacity group-hover:opacity-0">
            {language}
          </span>
        )}

        <Code data-language={language}>{children}</Code>
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
