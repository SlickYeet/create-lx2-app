"use client"

import { CheckIcon, CopyIcon, WrapTextIcon } from "lucide-react"
import { motion } from "motion/react"
import { useTheme } from "next-themes"
import { Highlight, themes } from "prism-react-renderer"
import { useEffect, useRef, useState } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CodeSnippetProps {
  code: string
  title?: string
  language?: string
  showLineNumbers?: boolean
  showControls?:
    | { showCopyButton?: boolean; showWrapButton?: boolean }
    | boolean
  wrapLines?: boolean
  maxHeight?: string | number
  className?: string
}

export function CodeSnippet({
  code,
  title,
  language = "bash",
  showLineNumbers = false,
  showControls,
  wrapLines: initialWrapLines = false,
  maxHeight,
  className,
}: CodeSnippetProps) {
  const { resolvedTheme } = useTheme()

  const [copied, setCopied] = useState<boolean>(false)
  const [wrapLines, setWrapLines] = useState(initialWrapLines)
  const [isHovering, setIsHovering] = useState(false)

  const codeRef = useRef<HTMLPreElement>(null)

  const hasMultipleLines = code.split("\n").length > 1

  // Determine which controls to show based on showControls prop
  const showCopyButton =
    typeof showControls === "boolean"
      ? showControls
      : (showControls?.showCopyButton ?? (isHovering || hasMultipleLines))

  const showWrapButton =
    typeof showControls === "boolean"
      ? showControls
      : (showControls?.showWrapButton ?? (isHovering || hasMultipleLines))

  // Update wrapLines when initialWrapLines changes
  useEffect(() => {
    setWrapLines(initialWrapLines)
  }, [initialWrapLines])

  // Handle copy to clipboard
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Toggle line wrapping
  const toggleWrapLines = () => {
    setWrapLines((prev) => !prev)
  }

  const theme = resolvedTheme === "dark" ? themes.oneDark : themes.oneLight

  // Calculate max height style
  const maxHeightStyle = maxHeight
    ? {
        maxHeight: typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight,
      }
    : {}

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
      className={cn(
        "gradient-border relative min-h-[3.25rem] overflow-hidden rounded-lg",
        className,
      )}
    >
      {title && (
        <div className="bg-muted/50 border-b px-4 py-2 text-sm font-medium">
          {title}
        </div>
      )}

      <div className="relative">
        <Highlight theme={theme} code={code.trim()} language={language}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              ref={codeRef}
              tabIndex={0}
              className={cn("overflow-auto p-4 text-sm", className)}
              style={{
                ...style,
                ...maxHeightStyle,
                whiteSpace: wrapLines ? "pre-wrap" : "pre",
                backgroundColor:
                  resolvedTheme === "dark"
                    ? "rgb(0 0 0 / 0.5)"
                    : "hsl(var(--muted) / 0.5)",
              }}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })} className="table-row">
                  {showLineNumbers && (
                    <span className="table-cell pr-4 text-right text-xs opacity-50 select-none">
                      {i + 1}
                    </span>
                  )}
                  <span className="table-cell">
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </span>
                </div>
              ))}
            </pre>
          )}
        </Highlight>

        {/* Controls */}
        <div
          className={cn(
            "absolute top-2 right-2 flex gap-1.5 transition-opacity duration-200",
            showCopyButton || showWrapButton ? "opacity-100" : "opacity-0",
          )}
          aria-hidden={!showCopyButton && !showWrapButton}
        >
          {showWrapButton && (
            <Button onClick={toggleWrapLines} size="icon" variant="outline">
              <WrapTextIcon
                className={cn("size-4", wrapLines && "text-primary")}
              />
              <span className="sr-only">Wrap lines</span>
            </Button>
          )}
          {showCopyButton && (
            <Button
              disabled={copied}
              onClick={copyToClipboard}
              size="icon"
              variant="outline"
            >
              {copied ? (
                <CheckIcon className="size-4 text-green-500" />
              ) : (
                <CopyIcon className="size-4" />
              )}
              <span className="sr-only">Copy code</span>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
