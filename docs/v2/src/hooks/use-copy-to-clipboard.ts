"use client"

import React from "react"

interface UseCopyToClipboardProps {
  timeout?: number
  onCopy?: () => void
}

export function UseCopyToClipboard({
  timeout = 2000,
  onCopy,
}: UseCopyToClipboardProps = {}) {
  const [isCopied, setIsCopied] = React.useState<boolean>(false)

  function copyToClipboard(str: string) {
    if (typeof window === "undefined" || !navigator.clipboard.writeText) return
    if (!str) return

    navigator.clipboard.writeText(str).then(() => {
      setIsCopied(true)

      if (onCopy) onCopy()

      if (timeout !== 0) {
        setTimeout(() => {
          setIsCopied(false)
        }, timeout)
      }
    }, console.error)
  }

  return { isCopied, copyToClipboard }
}
