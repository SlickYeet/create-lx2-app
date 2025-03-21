import { ArrowLeftIcon } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"

import { DocsContent } from "@/components/docs/content"
import { DocsSidebar } from "@/components/docs/sidebar"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Docs",
  description:
    "Learn how to use TNT-Powered with our comprehensive documentation.",
}

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container py-10">
      <div className="flex flex-col gap-10 md:flex-row">
        <div className="shrink-0 md:w-64">
          <div className="sticky top-20">
            <Button variant="ghost" className="mb-6" asChild>
              <Link href="/" className="flex items-center">
                <ArrowLeftIcon className="mr-2 size-4" />
                Back to Home
              </Link>
            </Button>
            <DocsSidebar />
          </div>
        </div>

        <DocsContent>{children}</DocsContent>
      </div>
    </div>
  )
}
