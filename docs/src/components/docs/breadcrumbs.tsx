"use client"

import { ChevronDownIcon, HomeIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

function Seperator() {
  return <span className="text-muted-foreground mx-3">/</span>
}

export function Breadcrumbs() {
  const pathname = usePathname()

  const [open, setOpen] = useState<boolean>(false)

  const segments = pathname.split("/").filter(Boolean)

  const segment =
    segments[0] === "docs" || segments[0] === "faq" || segments[0] === "roadmap"
  const section = segments[0]

  const currentPage = segments.length > 0 ? segments[segments.length - 1] : ""

  const formatSlug = (slug: string) => {
    return slug === "faq"
      ? "FAQ"
      : slug
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
  }

  return (
    <div
      className="text-muted-foreground flex items-center pb-4 text-sm"
      aria-label="Breadcrumbs"
    >
      <Button size="icon" variant="ghost" className="size-8" asChild>
        <Link href="/" className="hover:text-foreground transition-colors">
          <HomeIcon className="size-4" />
        </Link>
      </Button>

      <Seperator />

      {segment && (
        <>
          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="ghost" aria-label="Select Section">
                {formatSlug(section)}
                <ChevronDownIcon className="size-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {["docs", "faq", "roadmap"].map((item) => (
                <DropdownMenuItem key={item} asChild>
                  <Link
                    href={`${item === "docs" ? "/docs" : `/docs/${item}`}`}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "w-full cursor-pointer",
                      section === item && "font-medium",
                    )}
                  >
                    {formatSlug(item)}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Seperator />

          {segments.length > 1 && (
            <Button
              size="sm"
              variant="ghost"
              aria-label="Select Segment"
              asChild
            >
              <Link
                href={`/${section}/${currentPage}`}
                className="hover:text-foreground transition-colors"
              >
                {formatSlug(currentPage)}
              </Link>
            </Button>
          )}
        </>
      )}

      {!segment && segments.length > 0 && (
        <>
          <Button size="sm" variant="ghost" aria-label="Select Segment" asChild>
            <Link
              href={`/${segments[0]}`}
              className="hover:text-foreground transition-colors"
            >
              {formatSlug(segments[0])}
            </Link>
          </Button>

          {segments.length > 1 && (
            <>
              <Seperator />
              <Button
                size="sm"
                variant="ghost"
                aria-label="Select Segment"
                asChild
              >
                <Link
                  href={`/${segments[0]}/${segments[1]}`}
                  className="hover:text-foreground transition-colors"
                >
                  {formatSlug(segments[1])}
                </Link>
              </Button>
            </>
          )}
        </>
      )}
    </div>
  )
}
