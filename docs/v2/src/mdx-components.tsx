import { Anchor } from "@/components/mdx/anchor"
import { Blockquote } from "@/components/mdx/blockquote"
import { Callout } from "@/components/mdx/callout"
import { Code } from "@/components/mdx/code"
import { Figcaption } from "@/components/mdx/figcaption"
import { Figure } from "@/components/mdx/figure"
import { H1, H2, H3, H4, H5, H6 } from "@/components/mdx/headings"
import { Img } from "@/components/mdx/img"
import { Li, Ol, Ul } from "@/components/mdx/list"
import { Paragraph } from "@/components/mdx/paragraph"
import { Pre } from "@/components/mdx/pre"
import { Strong } from "@/components/mdx/strong"
import { Tab, Tabs } from "@/components/mdx/tabs"
import { Video } from "@/components/mdx/video"

export const mdxComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  p: Paragraph,
  a: Anchor,
  strong: Strong,
  ol: Ol,
  ul: Ul,
  li: Li,
  img: Img,
  blockquote: Blockquote,
  figure: Figure,
  figcaption: Figcaption,
  pre: Pre,
  code: Code,
  Callout,
  Video,
  Tabs: Object.assign(Tabs, { Tab }),
}
