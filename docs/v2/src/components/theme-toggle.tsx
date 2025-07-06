"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useCallback } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ThemeToggle({
  className,
}: React.ComponentProps<typeof Button>) {
  const { setTheme, resolvedTheme } = useTheme()

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }, [resolvedTheme, setTheme])

  return (
    <Button
      onClick={toggleTheme}
      size="icon"
      variant="ghost"
      className={cn("group/toggle extend-touch-target size-8", className)}
      title="Toggle theme"
    >
      <Sun className="size-4 scale-100 rotate-0 fill-current transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute size-4 scale-0 rotate-90 fill-current transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
