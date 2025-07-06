"use client"

import { useBreadcrumb } from "fumadocs-core/breadcrumb"
import type { PageTree } from "fumadocs-core/server"
import { ChevronDown, Home } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Fragment } from "react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DocsBreadcrumb({ tree }: { tree: PageTree.Root }) {
  const pathname = usePathname()
  const items = useBreadcrumb(pathname, tree)

  if (items.length === 0) return null

  return (
    <Breadcrumb>
      <BreadcrumbList className="text-primary text-base">
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">
              <Home className="size-4" />
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator />

        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger className="hover:text-foreground flex items-center gap-1 transition-colors">
              {items[0].name}
              <ChevronDown className="size-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {tree.children.map((item) => {
                const href =
                  item.type === "folder" && item.children[0]?.type === "page"
                    ? item.children[0].url
                    : ""

                return (
                  <DropdownMenuItem key={item.$id} asChild>
                    <Link href={href} className="truncate">
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                )
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>

        <BreadcrumbSeparator />

        {items.map((item, i) =>
          item === items[0] ? null : (
            <Fragment key={i}>
              <BreadcrumbItem>
                {item.url ? (
                  <BreadcrumbLink asChild>
                    <Link href={item.url} className="truncate">
                      {item.name}
                    </Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbLink className="truncate">
                    {item.name}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </Fragment>
          ),
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
