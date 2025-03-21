import { DocsWrapper } from "@/components/docs-wrapper"

export default async function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DocsWrapper>
      <main className="container pt-10">{children}</main>
    </DocsWrapper>
  )
}
