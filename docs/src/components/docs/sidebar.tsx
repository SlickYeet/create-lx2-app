"use client"

import { motion } from "motion/react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { H3 } from "@/mdx-components"

const NAVIGATION = [
  // Create TNT Stack
  {
    title: "Create TNT Stack",
    items: [
      { slug: "introduction", title: "Introduction" },
      { slug: "getting-started", title: "Getting Started" },
      { slug: "why", title: "Why?" },
    ],
  },
  // Usage
  {
    title: "Usage",
    items: [
      { slug: "first-steps", title: "First Steps" },
      { slug: "nextjs", title: "Next.js" },
      { slug: "payloadcms", title: "Payload CMS" },
    ],
  },
  // Deploymeny
  {
    title: "Deployment",
    items: [
      { slug: "vercel", title: "Vercel" },
      { slug: "netlify", title: "Netlify" },
    ],
  },
]

export function DocsSidebar() {
  const pathname = usePathname()

  return (
    <div className="sticky top-20 hidden md:block">
      <ScrollArea className="h-[calc(100vh-7rem)]">
        <aside>
          {NAVIGATION.map((page) => (
            <div key={page.title}>
              {/* First child should not have a margin top of 4 */}
              <H3 className="text-xl">{page.title}</H3>
              <ul className="mb-4 ml-4">
                {page.items.map((item) => {
                  const isActive = pathname.includes(item.slug)
                  return (
                    <li key={item.slug}>
                      <Link href={`/docs/${item.slug}`} className="block">
                        <div className="relative">
                          {isActive && (
                            <motion.div
                              layoutId="sidebarActiveItem"
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
                              "relative z-10 block px-4 py-2",
                              "hover:text-primary hover:bg-primary/5",
                              "border-primary/20 hover:border-primary/50 border-l-2",
                              isActive
                                ? "text-primary"
                                : "text-muted-foreground",
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
            </div>
          ))}
        </aside>
      </ScrollArea>
    </div>
  )
}
