"use client"

import { ArrowUpCircleIcon, MessageSquareIcon, PenIcon } from "lucide-react"
import { motion } from "motion/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

import { Heading } from "@/components/mdx/headings"
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
  const visiblePath = pathname.replace(/^\/docs\/\(([^)]+)\)/, "/docs")
  const matchedSlug = SIDEBAR_NAVIGATION.find((section) =>
    section.items.some((item) => visiblePath.includes(item.slug)),
  )?.slug

  // Construct the repo path
  const repoPath = `${GITHUB_CREATE_TNT_APP_REPO}/blob/main/docs/src/app/docs/${
    matchedSlug ? `(${matchedSlug})` : ""
  }${visiblePath.replace("/docs", "")}/page.mdx`

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

    // Set first heading as active default
    if (extractedHeadings.length > 0) {
      setActiveId(extractedHeadings[0].id)
    }
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
        rootMargin: "0px 0px -30% 0px",
        threshold: 1,
      },
    )

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [headings, pathname])

  // First heading should be active when scrolling to top
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0 && headings.length > 0) {
        setActiveId(headings[0].id)
        history.replaceState(null, "", `#${headings[0].id}`)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [headings, pathname])

  useEffect(() => {
    const handleScroll = () => {
      const halfwayPoint = window.innerHeight / 2
      setShowBackToTop(window.scrollY > halfwayPoint)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="sticky top-20 hidden lg:block">
      <Heading depth={3} className="text-xl">
        On This Page
      </Heading>

      <nav>
        <ul>
          {headings.map((heading) => {
            const isActive = activeId === heading.id

            return (
              <li key={heading.id}>
                <Link
                  href={`#${heading.id}`}
                  className="block"
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
                >
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

      <Heading depth={3} className="mt-4 text-xl">
        More
      </Heading>

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
        <li>
          <button
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className={cn(
              "text-muted-foreground hover:text-primary flex items-center gap-1.5 text-sm opacity-0 transition-all hover:underline",
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
