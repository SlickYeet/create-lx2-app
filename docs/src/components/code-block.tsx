import { type BundledLanguage } from "shiki"

import { Code } from "@/components/mdx/code"
import { Pre } from "@/components/mdx/pre"
import { cn } from "@/lib/utils"

interface CodeBlockProps {
  code: string
  copy?: boolean
  alwaysShowCopy?: boolean
  language?: BundledLanguage
  filename?: string
}

export function CodeBlock({
  code,
  copy = true,
  alwaysShowCopy = false,
  language,
  filename,
}: CodeBlockProps) {
  return (
    <Pre
      copy={copy}
      alwaysShowCopy={alwaysShowCopy}
      language={language}
      filename={filename}
    >
      <Code className={cn("pl-4", !filename && "pt-1")}>{code}</Code>
    </Pre>
  )
}
