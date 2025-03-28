"use client"

import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import { SIDEBAR_NAVIGATION } from "@/constants"
import { cn } from "@/lib/utils"

function getPaginationData(pathname: string) {
  const normalizedPathname = pathname.replace(/^\/docs\//, "/")

  const flatItems = SIDEBAR_NAVIGATION.flatMap((section) => section.items)
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
    <div className="mt-16 flex items-center justify-between gap-2 md:gap-8">
      <Button
        variant="outline"
        className={cn(
          "group h-16 flex-1 shrink-0 justify-start",
          !previous && "pointer-events-none opacity-50",
        )}
        asChild
      >
        <Link href={previous ? `/docs/${previous.slug}` : "#"}>
          <ArrowLeftIcon className="ml-2 size-4 transition-all group-hover:-translate-x-2 md:size-6" />
          <span className="text-sm md:text-base lg:text-2xl">
            {previous ? previous.title : "Previous"}
          </span>
        </Link>
      </Button>
      <Button
        variant="outline"
        className={cn(
          "group h-16 flex-1 shrink-0 justify-end",
          !next && "pointer-events-none opacity-50",
        )}
        asChild
      >
        <Link href={next ? `/docs/${next.slug}` : "#"}>
          <span className="text-sm md:text-base lg:text-2xl">
            {next ? next.title : "Next"}
          </span>
          <ArrowRightIcon className="mr-2 size-4 transition-all group-hover:translate-x-2 md:size-6" />
        </Link>
      </Button>
    </div>
  )
}
