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

  // Use rehype-pretty-code to process the code block
  // and apply syntax highlighting

  //   const result = await unified()
  //     .use(rehypeParse)
  //     .use(rehypeStringify)
  //     .use(rehypePrettyCode, {
  //       keepBackground: false,
  //       theme: {
  //         dark: "github-dark-default",
  //         light: "github-light-default",
  //       },
  //       onVisitHighlightedLine(node) {
  //         node.properties.className = [
  //           ...(node.properties.className || []),
  //           "highlighted-line",
  //         ]
  //       },
  //       onVisitHighlightedChars(node) {
  //         node.properties.className = [
  //           ...(node.properties.className || []),
  //           "highlighted-word",
  //         ]
  //       },
  //     })
  //     .process(
  //       `<pre><code class="language-${language || "plaintext"}">${code}</code></pre>`,
  //     )

  //   return result.toString()
}

export async function getNpmVersion(
  version: "latest" | "beta" = "latest",
): Promise<string> {
  // Fetch the latest version of the package from npm
  // If the beta flag is true, fetch the beta version

  const response = await fetch("https://registry.npmjs.org/create-tnt-stack", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  if (!response.ok) {
    throw new Error("Failed to fetch the latest version")
  }
  const data = await response.json()

  if (version === "latest") {
    return data["dist-tags"].latest
  } else {
    return data["dist-tags"].beta
  }
}
