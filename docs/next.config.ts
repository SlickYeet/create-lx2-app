import nextMDX from "@next/mdx"
import {
  transformerMetaHighlight,
  transformerMetaWordHighlight,
  transformerNotationDiff,
} from "@shikijs/transformers"
import type { NextConfig } from "next"
import rehypePrettyCode, {
  type Options as PrettyCodeOptions,
} from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import remarkFrontmatter from "remark-frontmatter"
import remarkgfm from "remark-gfm"
import remarkMdxFrontmatter from "remark-mdx-frontmatter"

import { transformers } from "@/lib/highlight-code"

const nextConfig: NextConfig = {
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "md", "mdx"],
}

const prettyCodeOptions: PrettyCodeOptions = {
  keepBackground: false,
  theme: {
    dark: "github-dark-default",
    light: "github-light-default",
  },
  transformers: [
    transformerNotationDiff({
      matchAlgorithm: "v3",
    }),
    transformerMetaHighlight(),
    transformerMetaWordHighlight(),
    ...transformers,
  ],
}

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkgfm, remarkFrontmatter, remarkMdxFrontmatter],
    rehypePlugins: [[rehypePrettyCode, prettyCodeOptions], rehypeSlug],
  },
})

export default withMDX(nextConfig)
