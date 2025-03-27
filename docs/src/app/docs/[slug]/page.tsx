import { notFound } from "next/navigation"

import { getDocs } from "@/lib/mdx"

export function generateStaticParams() {
  const docs = getDocs()

  return docs.map((doc) => ({
    params: {
      slug: doc?.slug ?? "untitled",
    },
  }))
}

export const dynamicParams = false

interface DocPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function DocsPage({ params }: DocPageProps) {
  const { slug } = await params

  try {
    const { default: Source } = await import(`@/content/${slug}.mdx`)
    return <Source />
  } catch {
    return notFound()
  }
}
