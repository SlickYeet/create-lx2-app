import { transformerNotationDiff } from "@shikijs/transformers"
import { defineConfig, defineDocs } from "fumadocs-mdx/config"
import { rehypePrettyCode } from "rehype-pretty-code"

import { transformers } from "@/lib/highlight-code"

export default defineConfig({
  mdxOptions: {
    rehypePlugins: (plugins) => {
      plugins.shift()
      plugins.push([
        rehypePrettyCode,
        {
          theme: {
            dark: "dracula",
            light: "github-light",
          },
          transformers: [
            ...transformers,
            transformerNotationDiff({
              matchAlgorithm: "v3",
            }),
          ],
        },
      ])

      return plugins
    },
  },
})

export const docs = defineDocs({
  dir: "src/content/docs",
})
