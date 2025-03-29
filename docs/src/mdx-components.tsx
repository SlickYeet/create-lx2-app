import { MDXComponents } from "mdx/types"

import { Anchor } from "@/components/mdx/anchor"
import { Callout } from "@/components/mdx/callout"
import { Figcaption } from "@/components/mdx/figcaption"
import { H1, H2, H3, H4, H5, H6 } from "@/components/mdx/headings"
import { LI, OL, UL } from "@/components/mdx/lists"
import { Paragraph } from "@/components/mdx/paragraph"
import { Code, Pre } from "@/components/mdx/pre"
import { Tab, Tabs } from "@/components/mdx/tabs"

export const mdxComponents: MDXComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  p: Paragraph,
  a: Anchor,
  pre: Pre,
  code: Code,
  figcaption: Figcaption,
  ol: OL,
  ul: UL,
  li: LI,
  Tabs: Object.assign(Tabs, { Tab }),
  Callout,
}

/**
 * Export the components to be used outside of the MDX context
 */
export {
  Anchor,
  Callout,
  Code,
  Figcaption,
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
  Tabs,
  UL,
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...mdxComponents,
    ...components,
  }
}
