import fm from "front-matter"
import * as PageTree from "fumadocs-core/page-tree"
import type { Page } from "fumadocs-core/source"
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import z from "zod"

import { DocsBreadcrumb } from "@/components/docs/breadcrumb"
import { CopyPageButton } from "@/components/docs/copy-page"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { absoluteUrl } from "@/lib/utils"

interface DocsHeaderProps {
  page: Page
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
        <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:gap-0">
          <div className="order-1 block sm:hidden">
            <DocsBreadcrumb tree={tree} />
          </div>

          <div className="order-3 flex flex-col sm:order-2">
            <div className="hidden sm:block">
              <DocsBreadcrumb tree={tree} />
            </div>
            <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight sm:text-3xl xl:text-4xl">
              {doc.title}
            </h1>
          </div>

          <div className="order-2 flex w-full items-center gap-2 pt-1.5 sm:order-3 sm:w-auto">
            <div className="flex-1 sm:flex-none">
              <CopyPageButton page={raw} url={absoluteUrl(page.url)} />
            </div>
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
