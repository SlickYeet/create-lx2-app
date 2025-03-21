import { MDXComponents } from "nextra/mdx-components"

import { Anchor } from "./anchor"
import { Code } from "./code"
import { Pre } from "./pre"

export const customComponents: MDXComponents = {
  pre: Pre,
  code: Code,
  a: Anchor,
}
