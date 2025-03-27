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
import remarkFrontmatter from "remark-frontmatter"
import remarkgfm from "remark-gfm"
import remarkMdxFrontmatter from "remark-mdx-frontmatter"

const nextConfig: NextConfig = {
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "md", "mdx"],
}

const prettyCodeOptions: PrettyCodeOptions = {
  grid: false,
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
  ],
}

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkgfm, remarkFrontmatter, remarkMdxFrontmatter],
    rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
  },
})

export default withMDX(nextConfig)
