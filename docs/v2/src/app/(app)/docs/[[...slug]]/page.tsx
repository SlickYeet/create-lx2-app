import { findNeighbour } from "fumadocs-core/server"
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { TableOfContents } from "@/components/docs/toc"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getParent } from "@/lib/get-parent"
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
  const parent = getParent(doc)
  const neighbours = findNeighbour(source.pageTree, page.url)
  // @ts-expect-error - revisit fumadocs types
  const links = doc.links

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
            variant="dropdown"
            className="no-scrollbar sticky top-4 right-4 z-40 ml-auto hidden lg:flex xl:hidden"
          />
        ) : null}

        <div className="h-(--top-spacing) shrink-0" />
        <div className="mx-auto flex w-full max-w-2xl min-w-0 flex-1 flex-col gap-8 px-4 py-6 md:px-0 lg:py-8">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <div className="flex items-start justify-between">
                <div className="flex flex-col">
                  {parent && (
                    <span className="text-primary uppercase">
                      {parent.name}
                    </span>
                  )}
                  <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight sm:text-3xl xl:text-4xl">
                    {doc.title}
                  </h1>
                </div>

                <div className="flex items-center gap-2 pt-1.5">
                  {neighbours.previous && (
                    <Button
                      size="icon"
                      className="extend-touch-target size-8 shadow-none md:size-7"
                      asChild
                    >
                      <Link href={neighbours.previous.url}>
                        <ArrowLeft />
                        <span className="sr-only">Previous</span>
                      </Link>
                    </Button>
                  )}
                  {neighbours.next && (
                    <Button
                      size="icon"
                      className="extend-touch-target size-8 shadow-none md:size-7"
                      asChild
                    >
                      <Link href={neighbours.next.url}>
                        <span className="sr-only">Next</span>
                        <ArrowRight />
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
              {doc.description && (
                <p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
                  {doc.description}
                </p>
              )}
            </div>
            {links ? (
              <div className="flex items-center space-x-2 pt-4">
                {links?.docs && (
                  <Badge variant="outline" asChild>
                    <Link href={links.docs} target="_blank" rel="noreferrer">
                      Docs <ArrowUpRight />
                    </Link>
                  </Badge>
                )}
                {links?.api && (
                  <Badge variant="outline" asChild>
                    <Link href={links.api} target="_blank" rel="noreferrer">
                      API Reference <ArrowUpRight />
                    </Link>
                  </Badge>
                )}
                {links?.repo && (
                  <Badge variant="outline" asChild>
                    <Link href={links.repo} target="_blank" rel="noreferrer">
                      Repository <ArrowUpRight />
                    </Link>
                  </Badge>
                )}
                {links?.community && (
                  <Badge variant="outline" asChild>
                    <Link
                      href={links.community}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Community <ArrowUpRight />
                    </Link>
                  </Badge>
                )}
              </div>
            ) : null}
          </div>

          <div className="mdx w-full flex-1 *:data-[slot=alert]:first:mt-0">
            <MDX components={mdxComponents} />
          </div>
        </div>

        <div className="mx-auto flex h-16 w-full max-w-2xl items-center gap-2 px-4 md:px-0">
          {neighbours.previous && (
            <Button size="sm" asChild className="shadow-none">
              <Link href={neighbours.previous.url}>
                <ArrowLeft /> {neighbours.previous.name}
              </Link>
            </Button>
          )}
          {neighbours.next && (
            <Button size="sm" className="ml-auto shadow-none" asChild>
              <Link href={neighbours.next.url}>
                {neighbours.next.name} <ArrowRight />
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* @ts-expect-error - revisit fumadocs types. */}
      {doc.toc?.length ? (
        <TableOfContents
          // @ts-expect-error - revisit fumadocs types.
          toc={doc.toc}
          variant="list"
          className="no-scrollbar sticky top-8 z-30 ml-auto hidden h-full w-72 overflow-hidden overflow-y-auto overscroll-none pl-8 xl:flex"
        />
      ) : null}
    </div>
  )
}
