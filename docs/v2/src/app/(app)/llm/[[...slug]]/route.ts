import { notFound } from "next/navigation"
import { NextResponse, type NextRequest } from "next/server"

import { source } from "@/lib/source"

export const revalidate = false

export function generateStaticParams() {
  return source.generateParams()
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug?: string[] }> },
) {
  const { slug } = await params

  const page = source.getPage(slug)
  if (!page) notFound()

  const content = await page.data.getText("raw")

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  })
}
