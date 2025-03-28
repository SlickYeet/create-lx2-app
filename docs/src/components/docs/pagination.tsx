"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import { SIDEBAR_NAVIGATION } from "@/constants"
import { cn } from "@/lib/utils"

function getPaginationData(pathname: string) {
  const normalizedPathname = pathname.replace(/^\/docs\//, "/")

  const flatItems = SIDEBAR_NAVIGATION.flatMap((section) => section.items || [])
  const currentIndex = flatItems.findIndex(
    (item) => `/${item.slug}` === normalizedPathname,
  )

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

      <div className="flex items-center justify-between gap-2 md:gap-4 lg:gap-8">
        <Button
          variant="outline"
          className={cn("h-16 flex-[0.5] shrink-0", !previous && "invisible")}
          asChild
          aria-disabled={!previous}
        >
          <Link
            href={previous ? `/docs/${previous.slug}` : "#"}
            className="flex flex-col items-start justify-center gap-y-0"
          >
            <span className="text-muted-foreground text-xs">Previous page</span>
            <span className="text-primary text-base lg:text-lg">
              {previous && previous.title}
            </span>
          </Link>
        </Button>
        <Button
          variant="outline"
          className={cn("h-16 flex-[0.5] shrink-0", !next && "invisible")}
          asChild
          aria-disabled={!next}
        >
          <Link
            href={next ? `/docs/${next.slug}` : "#"}
            className="flex flex-col items-end justify-center gap-y-0"
          >
            <span className="text-muted-foreground text-xs">Next page</span>
            <span className="text-primary text-base lg:text-lg">
              {next && next.title}
            </span>
          </Link>
        </Button>
      </div>
    </div>
  )
}
