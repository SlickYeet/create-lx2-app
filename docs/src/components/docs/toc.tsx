"use client"

import { MessageSquareIcon, PenIcon } from "lucide-react"
import { motion } from "motion/react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { GITHUB_CREATE_TNT_APP_REPO } from "@/constants"
import { cn } from "@/lib/utils"
import { H3 } from "@/mdx-components"

const ITEMS = [
  { slug: "introduction", title: "Introduction" },
  { slug: "getting-started", title: "Getting Started" },
  { slug: "features", title: "Features" },
  { slug: "components", title: "Components" },
  { slug: "layouts", title: "Layouts" },
  { slug: "theming", title: "Theming" },
  { slug: "examples", title: "Examples" },
  { slug: "faq", title: "FAQ" },
]

export function DocsTOC() {
  const pathname = usePathname()
  const pathWithoutPrefix = pathname.replace("/docs/", "")
  const repoPath = `${GITHUB_CREATE_TNT_APP_REPO}/tree/main/docs/src/content/${pathWithoutPrefix}.mdx`

  return (
    <div className="sticky top-24">
      <H3 className="text-xl">On This Page</H3>

      <ul>
        {ITEMS.map((item) => {
          const isActive = pathname.includes(item.slug)
          return (
            <li key={item.slug}>
              <Link href={`/docs/${item.slug}`} className="block">
                <div className="relative">
                  {isActive && (
                    <motion.div
                      layoutId="tocActiveItem"
                      className="bg-primary/10 border-primary absolute inset-0 border-l-2"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                  <span
                    className={cn(
                      "relative z-10 block px-4 py-1 text-sm",
                      "hover:text-primary hover:bg-primary/5",
                      "border-primary/20 hover:border-primary/50 border-l-2",
                      isActive ? "text-primary" : "text-muted-foreground",
                    )}
                  >
                    {item.title}
                  </span>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>

      <H3 className="text-xl">More</H3>

      <ul className="space-y-2">
        <li>
          <Link
            href={repoPath}
            target="_blank"
            className="text-muted-foreground hover:text-primary flex items-center gap-1.5 text-sm transition-colors hover:underline"
          >
            <PenIcon className="size-3.5 fill-current" />
            Edit this page
          </Link>
        </li>
        <li>
          <Link
            href={`${GITHUB_CREATE_TNT_APP_REPO}/issues/new/choose`}
            target="_blank"
            className="text-muted-foreground hover:text-primary flex items-center gap-1.5 text-sm transition-colors hover:underline"
          >
            <MessageSquareIcon className="size-3.5 fill-current" />
            Give feedback
          </Link>
        </li>
      </ul>
    </div>
  )
}
