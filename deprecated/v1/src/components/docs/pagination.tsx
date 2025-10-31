"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import { SIDEBAR_NAVIGATION } from "@/constants"
import { cn } from "@/lib/utils"

function getPaginationData(pathname: string) {
  const flatItems = SIDEBAR_NAVIGATION.flatMap((section) => section.items || [])
  const currentIndex = flatItems.findIndex((item) => item.slug === pathname)

  const previous = currentIndex > 0 ? flatItems[currentIndex - 1] : null
  const next =
    currentIndex < flatItems.length - 1 ? flatItems[currentIndex + 1] : null

  return { previous, next }
}

export function Pagination() {
  const pathname = usePathname()
  const { previous, next } = getPaginationData(pathname)

  return (
    <div className="mt-16">
      <div className="bg-muted mb-6 hidden h-px w-full md:block" />

      <div className="flex flex-col items-center justify-between gap-2 sm:flex-row md:gap-4 lg:gap-6">
        <Button
          variant="outline"
          className={cn("h-16 w-full flex-1 shrink-0", !previous && "hidden")}
          asChild
          aria-disabled={!previous}
        >
          <Link
            href={previous ? previous.slug : "#"}
            className="flex flex-col items-start justify-center gap-y-0"
          >
            <span className="text-muted-foreground flex items-center gap-x-1 text-xs">
              <ChevronLeft className="text-muted-foreground -ml-1 size-4" />
              Previous page
            </span>
            <span className="text-primary text-base lg:text-lg">
              {previous && previous.title}
            </span>
          </Link>
        </Button>
        <Button
          variant="outline"
          className={cn("h-16 w-full flex-1 shrink-0", !next && "hidden")}
          asChild
          aria-disabled={!next}
        >
          <Link
            href={next ? next.slug : "#"}
            className="flex flex-col items-end justify-center gap-y-0"
          >
            <span className="text-muted-foreground flex items-center gap-x-1 text-xs">
              Next page
              <ChevronRight className="text-muted-foreground -mr-1 size-4" />
            </span>
            <span className="text-primary text-base lg:text-lg">
              {next && next.title}
            </span>
          </Link>
        </Button>
      </div>
    </div>
  )
}
