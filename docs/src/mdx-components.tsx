import { useMDXComponents as getThemeComponents } from "nextra-theme-docs"
import { type MDXComponents } from "nextra/mdx-components"

import { customComponents } from "@/components/mdx"

// Get the default MDX components
const defaultComponents = getThemeComponents()

// Merge components
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...defaultComponents,
    ...customComponents,
    ...components,
  }
}
