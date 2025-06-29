import { MDXComponents } from "mdx/types"

import { Anchor } from "@/components/mdx/anchor"
import { Blockquote } from "@/components/mdx/blockquote"
import { Callout } from "@/components/mdx/callout"
import { Code } from "@/components/mdx/code"
import { Figcaption } from "@/components/mdx/figcaption"
import { Figure } from "@/components/mdx/figure"
import { H1, H2, H3, H4, H5, H6 } from "@/components/mdx/headings"
import { LI, OL, UL } from "@/components/mdx/lists"
import { Paragraph } from "@/components/mdx/paragraph"
import { Pre } from "@/components/mdx/pre"
import { Strong } from "@/components/mdx/strong"
import { Tab, Tabs } from "@/components/mdx/tabs"
import { Video } from "@/components/mdx/video"

export const mdxComponents: MDXComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  p: Paragraph,
  a: Anchor,
  strong: Strong,
  figure: Figure,
  figcaption: Figcaption,
  pre: Pre,
  code: Code,
  ol: OL,
  ul: UL,
  li: LI,
  blockquote: Blockquote,
  Tabs: Object.assign(Tabs, { Tab }),
  Callout,
  Video,
}

// Export the components to be used outside of the MDX context
export {
  Anchor,
  Callout,
  Code,
  Figcaption,
  Figure,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  LI,
  OL,
  Paragraph,
  Pre,
  Strong,
  Tabs,
  UL,
  Video,
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...mdxComponents,
    ...components,
  }
}
