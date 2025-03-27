"use client"

import { ChevronDownIcon, ChevronRightIcon } from "lucide-react"
import { motion } from "motion/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

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
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <>
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

      <div
        className={cn(
          "fixed top-16 left-0 z-10 hidden w-full max-md:block",
          !isOpen
            ? "bg-background/80 border-b backdrop-blur-sm"
            : "bg-background",
        )}
      >
        <button
          onClick={toggleMobileMenu}
          className="container flex h-10 w-full cursor-pointer items-center"
        >
          {isOpen ? (
            <ChevronDownIcon className="size-5" />
          ) : (
            <ChevronRightIcon className="size-5" />
          )}
          <span className="ml-1.5">Menu</span>
        </button>
      </div>

      {isOpen && (
        <ScrollArea className="h-[calc(100vh-6.5rem)] pt-8 pb-2">
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
      )}
    </>
  )
}
