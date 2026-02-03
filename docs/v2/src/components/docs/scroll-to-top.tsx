"use client"

import { ArrowUpIcon } from "lucide-react"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null

    function toggleVisibility() {
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

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <Button
      onClick={scrollToTop}
      size="icon-lg"
      variant="outline"
      className={cn(
        "fixed right-4 bottom-4.5 z-50 cursor-pointer rounded-full shadow-lg transition-all duration-300 xl:hidden",
        "bg-card backdrop-blur-md",
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
      <ArrowUpIcon className="size-5" />
    </Button>
  )
}
