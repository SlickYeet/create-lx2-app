"use client"

import { CheckIcon, CopyIcon, FileIcon } from "lucide-react"
import { Pre as NextraPre } from "nextra/components"
import { ComponentPropsWithoutRef, useRef, useState } from "react"

import { cn } from "@/lib/utils"

type PreProps = ComponentPropsWithoutRef<"pre"> & {
  copy?: boolean
  alwaysShowCopy?: boolean
  language?: string
  filename?: string
}

export function Pre({
  children,
  className,
  copy,
  alwaysShowCopy,
  language,
  filename,
  ...props
}: PreProps) {
  const preRef = useRef<HTMLPreElement>(null)
  const [isCopied, setIsCopied] = useState(false)

  const copyToClipboard = async () => {
    if (!preRef.current) return

    // Get text content from the pre element
    const text = preRef.current.textContent || ""

    try {
      await navigator.clipboard.writeText(text)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <div className="group relative">
      <div
        className={cn(
          "absolute top-0 right-0 left-0 flex items-center justify-between px-4 py-2",
          language || filename ? "z-10 border-b" : "hidden",
        )}
      >
        {filename && (
          <div className="text-muted-foreground flex items-center gap-1.5 text-xs font-medium">
            <FileIcon className="size-3.5" />
            <span>{filename}</span>
          </div>
        )}

        <div className="ml-auto flex h-7 items-center gap-2">
          {language && (
            <span className="text-muted-foreground bg-muted/50 rounded px-2 py-1 font-mono text-xs">
              {language}
            </span>
          )}
          {copy && (
            <CopyButton
              copyToClipboard={copyToClipboard}
              isCopied={isCopied}
              alwaysShowCopy={alwaysShowCopy}
            />
          )}
        </div>
      </div>

      {copy && (
        <CopyButton
          copyToClipboard={copyToClipboard}
          isCopied={isCopied}
          alwaysShowCopy={alwaysShowCopy}
          className={cn(
            "absolute top-3 right-4",
            language || filename ? "hidden" : "z-10",
          )}
        />
      )}

      <NextraPre
        ref={preRef}
        className={cn(
          "border-muted bg-muted/50 dark:bg-muted/20 my-6 overflow-x-auto rounded-lg border font-mono text-sm",
          language || filename ? "pt-14" : "pt-3",
          className,
        )}
        {...props}
      >
        {children}
      </NextraPre>
    </div>
  )
}

interface CopyButtonProps {
  copyToClipboard: () => void
  isCopied: boolean
  alwaysShowCopy?: boolean
  className?: string
}

function CopyButton({
  copyToClipboard,
  isCopied,
  alwaysShowCopy,
  className,
}: CopyButtonProps) {
  return (
    <button
      onClick={copyToClipboard}
      className={cn(
        "border-muted-foreground/40 cursor-pointer rounded-md border p-1.5 transition-all",
        alwaysShowCopy ? "opacity-100" : "opacity-0 group-hover:opacity-100",
        className,
      )}
      aria-label="Copy code to clipboard"
    >
      {isCopied ? (
        <CheckIcon className="size-3.5" />
      ) : (
        <CopyIcon className="size-3.5" />
      )}
    </button>
  )
}
