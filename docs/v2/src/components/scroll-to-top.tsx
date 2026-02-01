"use client"

import { ArrowUp } from "lucide-react"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null

    const toggleVisibility = () => {
      // Throttle the visibility check for better performance
      if (timeoutId) return

      timeoutId = setTimeout(() => {
        // Show button when page is scrolled down 300px
        if (window.scrollY > 300) {
          setIsVisible(true)
        } else {
          setIsVisible(false)
        }
        timeoutId = null
      }, 100)
    }

    window.addEventListener("scroll", toggleVisibility, { passive: true })
    // Sync initial visibility in case the page loads already scrolled
    toggleVisibility()

    return () => {
      window.removeEventListener("scroll", toggleVisibility)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <Button
      onClick={scrollToTop}
      size="icon"
      variant="outline"
      className={cn(
        "fixed right-6 bottom-6 z-50 rounded-full shadow-lg transition-all duration-300 lg:hidden",
        "backdrop-blur-md bg-background/80 dark:bg-card/80",
        "hover:bg-background/90 dark:hover:bg-card/90",
        "border-border/50 dark:border-border",
        isVisible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
      )}
      aria-label="Scroll to top"
      tabIndex={isVisible ? 0 : -1}
      aria-hidden={!isVisible}
    >
      <ArrowUp className="size-5" />
    </Button>
  )
}
