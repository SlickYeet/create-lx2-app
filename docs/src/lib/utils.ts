import { clsx, type ClassValue } from "clsx"
import { isValidElement } from "react"
import { BundledLanguage, codeToHtml } from "shiki"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper function to extract text content from the code block
export const extractTextContent = (node: React.ReactNode): string => {
  if (typeof node === "string") return node
  if (Array.isArray(node)) return node.map(extractTextContent).join("")
  if (isValidElement(node)) {
    const element = node as React.ReactElement<{ children?: React.ReactNode }>
    if (element.props.children)
      return extractTextContent(element.props.children)
    return ""
  }
  return ""
}

export async function processCode({
  code,
  language,
}: {
  code: string
  language?: BundledLanguage
}) {
  return await codeToHtml(code, {
    lang: language || "plaintext",
    themes: {
      dark: "github-dark-default",
      light: "github-light-default",
    },
    defaultColor: false,
    /**
     * TODO: Implement these transformers
     */
    transformers: [
      //   transformerNotationDiff({
      //     matchAlgorithm: "v3",
      //   }),
      //   transformerMetaHighlight(),
      //   transformerMetaWordHighlight(),
    ],
  })
}
