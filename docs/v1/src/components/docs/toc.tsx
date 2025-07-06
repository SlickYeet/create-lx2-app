"use client"

import { ArrowUpCircleIcon, MessageSquareIcon, PenIcon } from "lucide-react"
import { motion } from "motion/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

import { H3 } from "@/components/mdx/headings"
import { GITHUB_CREATE_TNT_APP_REPO, SIDEBAR_NAVIGATION } from "@/constants"
import { cn } from "@/lib/utils"

interface Heading {
  id: string
  text: string
  level: number
}

export function DocsTOC() {
  const pathname = usePathname()

  // Extract the visible path and find the matched slug
  const visiblePath = pathname
  const matchedSlug = SIDEBAR_NAVIGATION.find((section) =>
    section.items.some((item) => visiblePath.includes(item.slug)),
  )?.slug.replace(/^\//, "")

  // Construct the repo path
  const repoPath = `${GITHUB_CREATE_TNT_APP_REPO}/blob/main/docs/src/app/(content)/${
    matchedSlug ? `(${matchedSlug})` : ""
  }${visiblePath}/page.mdx`

  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const mdxContent = document.getElementById("mdx")
    if (!mdxContent) return

    const headingElements = Array.from(
      mdxContent.querySelectorAll("h1, h2, h3, h4, h5, h6"),
    )

    const extractedHeadings = headingElements.map((heading) => ({
      id: heading.id,
      text: heading.textContent || "",
      // Parse the heading level from the tagName
      level: parseInt(heading.tagName.charAt(1)),
    }))

    setHeadings(extractedHeadings)
  }, [pathname])

  // Intersection Observer for active section tracking
  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting)
        if (visibleEntry) {
          setActiveId(visibleEntry.target.id)
          history.replaceState(null, "", `#${visibleEntry.target.id}`)
        }
      },
      {
        rootMargin: "0px 0px -70% 0px",
        threshold: 0.1,
      },
    )

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [headings, pathname])

  // Scroll event listener for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      const halfwayPoint = window.innerHeight / 2
      setShowBackToTop(window.scrollY > halfwayPoint)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="sticky top-20">
      <H3 className="mb-4 text-xl">On This Page</H3>

      <nav>
        <ul>
          {headings.map((heading) => {
            const isActive = activeId === heading.id

            return (
              <li key={heading.id}>
                <Link
                  href={`#${heading.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    const targetElement = document.getElementById(heading.id)
                    if (targetElement) {
                      targetElement.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      })
                      history.pushState(null, "", `#${heading.id}`)
                      setTimeout(() => {
                        setActiveId(heading.id)
                      }, 300)
                    }
                  }}
                  className="group block focus:outline-none"
                >
                  <div className="relative">
                    {isActive && (
                      <motion.div
                        layoutId="tocActiveItem"
                        className={cn(
                          "bg-primary/10 border-primary absolute inset-0 border-l-2",
                          "group-focus:bg-primary/10 group-focus:border-primary",
                        )}
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
                        "group-focus:text-primary group-focus:bg-primary/5 group-focus:border-primary/50",
                        isActive
                          ? "text-primary font-medium"
                          : "text-muted-foreground",
                      )}
                      style={{ paddingLeft: `${heading.level * 10}px` }}
                    >
                      {heading.text}
                    </span>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <H3 className="my-4 text-xl">More</H3>

      <ul className="space-y-2">
        <li>
          <Link
            href={repoPath}
            target="_blank"
            className="text-muted-foreground hover:text-primary focus:text-primary flex items-center gap-1.5 text-sm transition-colors hover:underline focus:underline focus:outline-none"
          >
            <PenIcon className="size-3.5 fill-current" />
            Edit this page
          </Link>
        </li>
        <li>
          <Link
            href={`${GITHUB_CREATE_TNT_APP_REPO}/issues/new/choose`}
            target="_blank"
            className="text-muted-foreground hover:text-primary focus:text-primary flex items-center gap-1.5 text-sm transition-colors hover:underline focus:underline focus:outline-none"
          >
            <MessageSquareIcon className="size-3.5 fill-current" />
            Give feedback
          </Link>
        </li>
        <li>
          <button
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className={cn(
              "text-muted-foreground hover:text-primary focus:text-primary flex items-center gap-1.5 text-sm opacity-0 transition-all hover:underline focus:underline focus:outline-none",
              showBackToTop && "opacity-100",
            )}
            aria-label="Back to Top"
          >
            <ArrowUpCircleIcon className="size-3.5" />
            Back to top
          </button>
        </li>
      </ul>
    </div>
  )
}
