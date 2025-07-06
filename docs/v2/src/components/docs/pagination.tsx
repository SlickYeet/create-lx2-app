import { ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"

interface DocsPaginationProps {
  neighbours: {
    previous?: Item
    next?: Item
  }
}

interface Item {
  name: React.ReactNode
  url: string
}

export function DocsPagination(props: DocsPaginationProps) {
  const { neighbours } = props

  return (
    <div className="mx-auto flex h-16 w-full max-w-2xl items-center gap-2 px-4 md:px-0">
      {neighbours.previous && (
        <Button size="sm" asChild className="shadow-none">
          <Link href={neighbours.previous.url}>
            <ArrowLeft /> {neighbours.previous.name}
          </Link>
        </Button>
      )}
      {neighbours.next && (
        <Button size="sm" className="ml-auto shadow-none" asChild>
          <Link href={neighbours.next.url}>
            {neighbours.next.name} <ArrowRight />
          </Link>
        </Button>
      )}
    </div>
  )
}
