import { H3 } from "@/mdx-components"

export function DocsTOC() {
  return (
    <div className="sticky top-24">
      <H3 className="text-xl">On This Page</H3>

      <nav className="flex flex-col gap-2">
        <a href="#introduction">Introduction</a>
        <a href="#getting-started">Getting Started</a>
        <a href="#features">Features</a>
        <a href="#components">Components</a>
        <a href="#layouts">Layouts</a>
        <a href="#theming">Theming</a>
        <a href="#examples">Examples</a>
        <a href="#faq">FAQ</a>
      </nav>
    </div>
  )
}
