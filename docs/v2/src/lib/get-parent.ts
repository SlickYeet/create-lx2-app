import { type PageData } from "fumadocs-core/source"

export function getParent(doc: PageData): { name: string } | null {
  // @ts-expect-error - revisit fumadocs types
  if (!doc._file.path) return ""

  // @ts-expect-error - revisit fumadocs types
  const pathParts = doc._file.path.split("/") as string[]
  pathParts.pop()

  const parent = pathParts.join("/")
  const name = parent.replace(/^\((.*)\)$/, "$1").replace(/-/g, " ")

  return { name }
}
