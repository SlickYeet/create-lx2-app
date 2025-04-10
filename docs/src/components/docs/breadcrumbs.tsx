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
import { RELATIVE_INITIAL_DOCS_PATH } from "@/constants"
import { cn } from "@/lib/utils"

function Seperator() {
  return <span className="text-muted-foreground mx-3">/</span>
}

export function Breadcrumbs() {
  const pathname = usePathname()

  const [open, setOpen] = useState<boolean>(false)

  const segments = pathname.split("/").filter(Boolean)

  const currentPage = segments[0]

  const formatSlug = (slug: string) => {
    switch (slug) {
      case "faq":
        return "FAQ"
      case "roadmap":
        return "Roadmap"
      default:
        return "Docs"
    }
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

      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button size="sm" variant="ghost" aria-label="Select Section">
            {formatSlug(currentPage)}
            <ChevronDownIcon className="size-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {["docs", "faq", "roadmap"].map((item) => (
            <DropdownMenuItem key={item} asChild>
              <Link
                href={`${item === "docs" ? RELATIVE_INITIAL_DOCS_PATH : `/${item}`}`}
                onClick={() => setOpen(false)}
                className={cn(
                  "w-full cursor-pointer",
                  currentPage === item && "font-medium",
                )}
              >
                {formatSlug(item)}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Seperator />

      <Button size="sm" variant="ghost" aria-label="Select Segment" asChild>
        <Link
          href={`/${currentPage}`}
          className="hover:text-foreground transition-colors"
        >
          {currentPage
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
        </Link>
      </Button>
    </div>
  )
}
