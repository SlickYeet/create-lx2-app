"use client"

import { useEffect, useState } from "react"

import { Pre, PreProps } from "@/components/mdx/pre"
import { cn, processCode } from "@/lib/utils"
import { Figcaption } from "@/mdx-components"

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
      {title && <Figcaption>{title}</Figcaption>}
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
