"use client"

import { type PageTree } from "fumadocs-core/server"
import {
  AlignLeft,
  ArrowUpCircle,
  MenuIcon,
  MessageSquare,
  Pen,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useMemo, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { siteConfig } from "@/lib/config"
import { cn } from "@/lib/utils"

interface TableOfContentsProps {
  toc: {
    title?: React.ReactNode
    url: string
    depth: number
  }[]
  tree: PageTree.Root
  variant?: "dropdown" | "list"
  className?: string
}

function useActiveItem(itemIds: string[]) {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
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

  const [open, setOpen] = useState<boolean>(false)
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false)

  const itemIds = useMemo(
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
  const pagePath = pathname.replace("/docs/", "")

  const editUrl = `${siteConfig.links.github}/blob/main/docs/v2/src/content/docs/${
    parent?.$id
  }/${pagePath ? `${pagePath}.mdx` : "index.md"}`

  useEffect(() => {
    function handleScroll() {
      const halfwayPoint = window.innerHeight / 2
      setShowBackToTop(window.scrollY > halfwayPoint)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!toc?.length) {
    return null
  }

  if (variant === "dropdown") {
    return (
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            size="sm"
            variant="outline"
            className={cn("h-8 text-xs md:h-7", className)}
          >
            <MenuIcon className="size-3.5" /> On This Page
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="no-scrollbar max-h-[70svh]"
        >
          {toc.map((item) => (
            <DropdownMenuItem
              key={item.url}
              onClick={() => setOpen(false)}
              data-depth={item.depth}
              className="data-[depth=3]:pl-6 data-[depth=4]:pl-8"
              asChild
            >
              <a href={item.url}>{item.title}</a>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <div className={cn("flex flex-col gap-2 p-4 pt-0 text-sm", className)}>
      <p className="text-foreground bg-background sticky top-0 flex h-6 items-center gap-1 text-xs">
        <AlignLeft className="size-4" />
        On This Page
      </p>
      <div className="flex flex-col">
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
