"use client"

import * as PageTree from "fumadocs-core/page-tree"
import {
  AlignLeft,
  ArrowUpCircle,
  MenuIcon,
  MessageSquare,
  Pen,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { SIDEBAR_WIDTH } from "@/components/ui/sidebar"
import { siteConfig } from "@/lib/config"
import { cn } from "@/lib/utils"

interface TableOfContentsProps {
  toc: {
    title?: React.ReactNode
    url: string
    depth: number
  }[]
  tree: PageTree.Root
  variant?: "list" | "menu"
  className?: string
}

function useActiveItem(itemIds: string[]) {
  const [activeId, setActiveId] = React.useState<string | null>(null)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: "0% 0% -80% 0%" },
    )

    for (const id of itemIds ?? []) {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    }

    return () => {
      for (const id of itemIds ?? []) {
        const element = document.getElementById(id)
        if (element) {
          observer.unobserve(element)
        }
      }
    }
  }, [itemIds])

  return activeId
}

export function TableOfContents(props: TableOfContentsProps) {
  const pathname = usePathname()
  const { toc, tree, variant = "list", className } = props

  const [open, setOpen] = React.useState<boolean>(false)
  const [showBackToTop, setShowBackToTop] = React.useState<boolean>(false)

  const itemIds = React.useMemo(
    () => toc.map((item) => item.url.replace("#", "")),
    [toc],
  )
  const activeHeading = useActiveItem(itemIds)

  const parent = tree.children.find(
    (item) =>
      item.type === "folder" &&
      item.children.some(
        (child) => child.type === "page" && child.url === pathname,
      ),
  )
  const parentId = parent?.$id?.replace("root:", "")
  const pagePath = pathname.replace("/docs", "")

  const editUrl = `${siteConfig.links.github}/blob/main/docs/v2/src/content/docs/${
    parentId
  }${pagePath ? `${pagePath}.mdx` : "/index.mdx"}`

  React.useEffect(() => {
    function handleScroll() {
      const halfwayPoint = window.innerHeight / 2
      setShowBackToTop(window.scrollY > halfwayPoint)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!toc?.length) return null

  if (variant === "list") {
    return (
      <div className={cn("flex flex-col gap-2 p-4 pt-0 text-sm", className)}>
        <p className="text-foreground bg-background sticky top-0 flex h-6 items-center gap-1 text-xs">
          <AlignLeft className="size-4" />
          On This Page
        </p>
        <div className="no-scrollbar flex max-h-[calc(100svh-16rem)] flex-col overflow-hidden overflow-y-auto overscroll-none">
          {toc.map((item) => (
            <a
              key={item.url}
              href={item.url}
              data-active={item.url === `#${activeHeading}`}
              data-depth={item.depth}
              className={cn(
                "rounded-l-none rounded-r-lg border-l-2 py-1 pl-4 no-underline transition-colors",
                "text-muted-foreground hover:text-foreground",
                "hover:text-primary hover:border-primary/50 hover:bg-primary/5",
                "focus-visible:text-primary focus-visible:border-primary/50 focus-visible:bg-primary/5 focus-visible:ring-0 focus-visible:outline-none",
                "data-[active=true]:text-primary data-[active=true]:border-primary data-[active=true]:bg-primary/10 data-[active=true]:font-medium",
                "data-[depth=3]:pl-6 data-[depth=4]:pl-8 data-[depth=5]:pl-10 data-[depth=6]:pl-12",
              )}
            >
              {item.title}
            </a>
          ))}
        </div>

        <p className="text-foreground bg-background h-6 text-xs">More</p>
        <ul className="space-y-2">
          <li>
            <Link
              href={editUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary focus:text-primary flex items-center gap-1.5 text-xs transition-colors hover:underline focus:underline focus:outline-none"
            >
              <Pen className="size-3 fill-current" />
              Edit this page
            </Link>
          </li>
          <li>
            <Link
              href={`${siteConfig.links.github}/issues/new/choose`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary focus:text-primary flex items-center gap-1.5 text-xs transition-colors hover:underline focus:underline focus:outline-none"
            >
              <MessageSquare className="size-3 fill-current" />
              Give feedback
            </Link>
          </li>
          <li>
            <button
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
              }}
              className={cn(
                "text-muted-foreground hover:text-primary focus-visible:text-primary flex items-center gap-1.5 text-sm opacity-0 transition-all hover:underline focus-visible:underline focus-visible:outline-none",
                showBackToTop && "opacity-100",
              )}
              aria-label="Back to top"
            >
              <ArrowUpCircle className="size-3" />
              Back to top
            </button>
          </li>
        </ul>
      </div>
    )
  }

  if (variant === "menu") {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button className="text-foreground z-10 ml-0 w-full justify-start rounded-none bg-transparent px-2! text-sm transition-none hover:bg-transparent lg:ml-(--sidebar-width)">
            <MenuIcon className="size-3.5" /> On This Page
          </Button>
        </PopoverTrigger>
        <PopoverContent
          side="top"
          sideOffset={2}
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH,
            } as React.CSSProperties
          }
          className={cn(
            "bg-background/90 no-scrollbar supports-[backdrop-filter:blur(0)]:bg-background/60 container overflow-y-auto rounded-none border-none p-0 shadow-none backdrop-blur-sm duration-100",
            "h-(--radix-popper-available-height) w-(--radix-popper-available-width) lg:w-[calc(var(--radix-popper-available-width)-var(--sidebar-width))]",
          )}
        >
          <div className="flex flex-col gap-4">
            <div className="bg-background/90 sticky top-0 w-full border-b-2 px-4 py-2 backdrop-blur-sm">
              <div className="text-muted-foreground flex items-center gap-1.5 text-sm font-medium">
                <MenuIcon className="size-3.5" /> On This Page
              </div>
            </div>

            <div className="flex flex-col gap-2 pb-4">
              {toc.map((item) => (
                <a
                  data-active={item.url === `#${activeHeading}`}
                  key={item.url}
                  data-depth={item.depth}
                  className={cn(
                    "rounded px-4 py-1",
                    "data-[active=true]:bg-primary/10 data-[active=true]:text-primary data-[active=true]:font-medium",
                    "data-[depth=3]:pl-6 data-[depth=4]:pl-8",
                  )}
                  onClick={() => setOpen(false)}
                  href={item.url}
                >
                  {item.title}
                </a>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    )
  }

  return null
}
