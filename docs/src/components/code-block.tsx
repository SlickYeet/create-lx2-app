"use client"

import { useEffect, useState } from "react"

import { Pre, PreProps } from "@/components/mdx/pre"
import { cn, processCode } from "@/lib/utils"

interface CodeBlockProps extends PreProps {
  code: string
  title?: string
}

export function CodeBlock({
  code,
  className,
  "data-language": language,
  title,
  ...props
}: CodeBlockProps) {
  const [html, setHtml] = useState<string>("")

  useEffect(() => {
    processCode({ code, language }).then((html) => {
      setHtml(html)
    })
  }, [code, language])

  return (
    <div className={cn("mdx", className)}>
      {title && (
        <div className="bg-muted/80 border-muted -mb-6 min-w-sm rounded-t-lg border px-5 py-2">
          {title}
        </div>
      )}
      <Pre
        code={code}
        data-language={language}
        className={cn("px-4", title ? "rounded-t-none" : "")}
        {...props}
      >
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </Pre>
    </div>
  )
}
