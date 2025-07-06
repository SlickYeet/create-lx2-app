import { findNeighbour } from "fumadocs-core/server"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { DocsHeader } from "@/components/docs/header"
import { DocsPagination } from "@/components/docs/pagination"
import { TableOfContents } from "@/components/docs/toc"
import { source } from "@/lib/source"
import { absoluteUrl } from "@/lib/utils"
import { mdxComponents } from "@/mdx-components"

export function generateStaticParams() {
  return source.generateParams()
}

export async function generateMetadata({
  params,
}: DocsPageProps): Promise<Metadata> {
  const { slug } = await params
  const page = source.getPage(slug)
  if (!page) {
    notFound()
  }

  const doc = page.data
  if (!doc.title || !doc.description) {
    notFound()
  }

  return {
    title: doc.title,
    description: doc.description,
    openGraph: {
      title: doc.title,
      description: doc.description,
      type: "article",
      url: absoluteUrl(page.url),
      images: [
        {
          url: `og?title=${encodeURIComponent(doc.title)}&description=${encodeURIComponent(doc.description)}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: doc.title,
      description: doc.description,
      images: [
        {
          url: `og?title=${encodeURIComponent(doc.title)}&description=${encodeURIComponent(doc.description)}`,
        },
      ],
      creator: "@SlickYeet",
    },
  }
}

interface DocsPageProps {
  params: Promise<{
    slug?: string[]
  }>
}

export default async function DocsPage({ params }: DocsPageProps) {
  const { slug } = await params
  const page = source.getPage(slug)
  if (!page) {
    notFound()
  }

  const doc = page.data
  // @ts-expect-error - revisit fumadocs types
  const MDX = doc.body
  const neighbours = findNeighbour(source.pageTree, page.url)

  return (
    <div
      data-slot="docs"
      className="mb-8 flex items-stretch text-[1.05rem] sm:text-[15px] xl:w-full"
    >
      <div className="relative flex min-w-0 flex-1 flex-col">
        {/* @ts-expect-error - revisit fumadocs types. */}
        {doc.toc?.length ? (
          <TableOfContents
            // @ts-expect-error - revisit fumadocs types.
            toc={doc.toc}
            tree={source.pageTree}
            variant="dropdown"
            className="no-scrollbar sticky top-4 right-4 z-40 ml-auto hidden lg:flex xl:hidden"
          />
        ) : null}

        <div className="mx-auto flex w-full max-w-2xl min-w-0 flex-1 flex-col gap-8 px-4 py-6 md:px-0 lg:py-8">
          <DocsHeader
            doc={doc}
            neighbours={neighbours}
            tree={source.pageTree}
          />

          <div className="mdx w-full flex-1 *:data-[slot=alert]:first:mt-0">
            <MDX components={mdxComponents} />
          </div>
        </div>

        <DocsPagination neighbours={neighbours} />
      </div>

      {/* @ts-expect-error - revisit fumadocs types. */}
      {doc.toc?.length ? (
        <TableOfContents
          // @ts-expect-error - revisit fumadocs types.
          toc={doc.toc}
          tree={source.pageTree}
          variant="list"
          className="no-scrollbar sticky top-8 z-30 ml-auto hidden h-full w-72 overflow-hidden overflow-y-auto overscroll-none pl-8 xl:flex"
        />
      ) : null}
    </div>
  )
}
