import fm from "front-matter"
import * as PageTree from "fumadocs-core/page-tree"
import type { Page } from "fumadocs-core/source"
import type { TOCItemType } from "fumadocs-core/toc"
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import z from "zod"

import { DocsBreadcrumb } from "@/components/docs/breadcrumb"
import { CopyPageButton } from "@/components/docs/copy-page"
import { TableOfContents } from "@/components/docs/toc"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { source } from "@/lib/source"
import { absoluteUrl } from "@/lib/utils"

interface DocsHeaderProps {
  page: Page & { data: { toc: TOCItemType[] } }
  raw: string
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

function Controls(props: Pick<DocsHeaderProps, "page" | "raw" | "neighbours">) {
  const { page, raw, neighbours } = props

  const doc = page.data

  return (
    <div className="bg-background fixed bottom-0 left-0 z-20 w-full space-y-1 border-t-2 pb-3 max-xl:ml-(--sidebar-width) max-lg:ml-0 xl:static xl:w-auto xl:space-y-0 xl:border-0 xl:pt-1.5 xl:pb-0">
      <div className="xl:hidden">
        <TableOfContents
          toc={doc.toc}
          tree={source.pageTree}
          variant="menu"
          className="no-scrollbar z-40 w-full"
        />
      </div>

      <div className="flex items-center gap-2 px-2">
        <CopyPageButton page={raw} url={absoluteUrl(page.url)} />

        {neighbours.previous && (
          <Button
            size="icon"
            className="extend-touch-target size-8 shadow-none lg:size-7"
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
            className="extend-touch-target size-8 shadow-none lg:size-7"
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
  )
}

export async function DocsHeader(props: DocsHeaderProps) {
  const { page, raw, tree, neighbours } = props

  const doc = page.data

  const { attributes } = fm(raw)
  const { links } = z
    .object({
      links: z
        .object({
          docs: z.string().optional(),
          api: z.string().optional(),
          repo: z.string().optional(),
          community: z.string().optional(),
        })
        .optional(),
    })
    .parse(attributes)

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-2">
            <DocsBreadcrumb tree={tree} />
            <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight sm:text-3xl xl:text-4xl">
              {doc.title}
            </h1>
          </div>

          <Controls page={page} raw={raw} neighbours={neighbours} />
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
