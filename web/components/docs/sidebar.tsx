"use client"

import { motion } from "motion/react"
import Link from "next/link"
import { useEffect, useState } from "react"

import { SECTIONS } from "@/constants"
import { cn } from "@/lib/utils"

export function DocsSidebar() {
  const [activeItem, setActiveItem] = useState("getting-started")

  // Get the active hash on scroll
  useEffect(() => {
    const handleScroll = () => {
      const itemElements = SECTIONS.flatMap((section) =>
        section.items.map((item) => ({
          id: item.id,
          element: document.getElementById(item.id),
        }))
      ).filter((item) => item.element)

      const currentItem = itemElements.find((item) => {
        if (!item.element) return false
        const rect = item.element.getBoundingClientRect()
        return rect.top <= 100 && rect.bottom > 100
      })

      if (currentItem) {
        setActiveItem(currentItem.id)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleClick = (id: string) => {
    setActiveItem(id)
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
      className="w-full overflow-y-auto border-r py-6 pr-4 lg:sticky lg:top-16 lg:h-[calc(100vh-8rem)] lg:w-64 lg:shrink-0"
    >
      <nav className="space-y-8">
        {SECTIONS.map((section, i) => (
          <div key={i} className="space-y-2">
            <h4 className="text-foreground text-sm font-medium tracking-wide uppercase">
              <Link
                href={`#${section.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  document
                    .getElementById(section.id)
                    ?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                {section.label}
              </Link>
            </h4>

            <ul className="space-y-1">
              {section.items.map((item, j) => {
                const isActive = activeItem === item.id

                return (
                  <li key={j} className="relative">
                    {isActive && (
                      <motion.div
                        layoutId="sidebar-bg-indicator"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className="bg-primary/10 absolute inset-0 rounded-md"
                      />
                    )}
                    <Link
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault()
                        handleClick(item.id)
                      }}
                      className={cn(
                        "relative block px-3 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      {item.label}{" "}
                      <span className="sr-only">
                        {isActive ? "(current)" : ""}
                      </span>
                      {isActive && (
                        <motion.div
                          layoutId="sidebar-indicator"
                          className="bg-primary absolute top-0 left-0 h-full w-1 rounded-r-md"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>
    </motion.div>
  )
}
