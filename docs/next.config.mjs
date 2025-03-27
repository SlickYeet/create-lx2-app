import nextMDX from "@next/mdx"
import {
  transformerMetaHighlight,
  transformerMetaWordHighlight,
  transformerNotationDiff,
} from "@shikijs/transformers"
import rehypePrettyCode from "rehype-pretty-code"
import remarkFrontmatter from "remark-frontmatter"
import remarkgfm from "remark-gfm"
import remarkMdxFrontmatter from "remark-mdx-frontmatter"

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "md", "mdx"],
}

/** @type {import("rehype-pretty-code").Options} */
const prettyCodeOptions = {
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
