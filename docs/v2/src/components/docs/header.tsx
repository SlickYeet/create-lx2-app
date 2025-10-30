import * as PageTree from "fumadocs-core/page-tree"
import { type PageData } from "fumadocs-core/source"
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react"
import Link from "next/link"

import { DocsBreadcrumb } from "@/components/docs/breadcrumb"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface DocsHeaderProps {
  doc: PageData
  tree: PageTree.Root
  neighbours: {
    previous?: Item
    next?: Item
  }
}

interface Item {
  name: React.ReactNode
  url: string
}

export function DocsHeader(props: DocsHeaderProps) {
  const { doc, tree, neighbours } = props

  // @ts-expect-error - revisit fumadocs types
  const links = doc.links

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <DocsBreadcrumb tree={tree} />
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
        <div className="flex flex-wrap items-center space-x-2 pt-4">
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
              <Link href={links.community} target="_blank" rel="noreferrer">
                Community <ArrowUpRight />
              </Link>
            </Badge>
          )}
        </div>
      ) : null}
    </div>
  )
}
