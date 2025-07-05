import { transformerNotationDiff } from "@shikijs/transformers"
import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
} from "fumadocs-mdx/config"
import { rehypePrettyCode } from "rehype-pretty-code"
import { z } from "zod"

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
  docs: {
    schema: frontmatterSchema.extend({
      links: z
        .object({
          docs: z.string().optional(),
          api: z.string().optional(),
          community: z.string().optional(),
          repo: z.string().optional(),
        })
        .optional(),
    }),
  },
})
