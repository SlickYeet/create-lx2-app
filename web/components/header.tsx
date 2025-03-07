"use client"

import { FileCodeIcon, HomeIcon, MenuIcon, StarIcon, XIcon } from "lucide-react"
import { motion } from "motion/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { GITHUB_CREATE_TNT_APP_REPO } from "@/constants"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/docs", label: "Docs", icon: FileCodeIcon },
]

export function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)

  return (
    <header className="bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur-sm">
      <div className="container flex h-16 items-center gap-2">
        <Logo containerClassName="mr-6" />

        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="hidden gap-6 md:flex"
        >
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "hover:text-foreground/80 relative flex items-center gap-2 text-sm font-medium transition-colors",
                pathname === href ? "text-foreground" : "text-foreground/60"
              )}
            >
              <Icon className="size-4" />
              {label}
              {pathname === href && (
                <motion.div
                  layoutId="activeNav"
                  className="bg-primary absolute right-0 -bottom-[21px] left-0 h-[2px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </Link>
          ))}
        </motion.nav>

        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="ml-auto hidden items-center gap-2 md:flex"
        >
          <Button size="sm" variant="outline" asChild>
            <Link href={GITHUB_CREATE_TNT_APP_REPO} target="_blank">
              <StarIcon className="size-4 fill-yellow-500 stroke-yellow-500 dark:fill-yellow-400 dark:stroke-yellow-400" />
              Star on GitHub
            </Link>
          </Button>
          <ThemeToggle />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="ml-auto md:hidden"
        >
          <Button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            size="icon"
            variant="ghost"
          >
            {mobileMenuOpen ? (
              <XIcon className="size-5" />
            ) : (
              <MenuIcon className="size-5" />
            )}
          </Button>
        </motion.div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="border-b md:hidden"
        >
          <div className="container flex flex-col gap-4 py-4">
            <nav className="flex flex-col gap-2">
              {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "hover:bg-muted flex items-center gap-2 rounded-md p-2 text-sm font-medium transition-colors",
                    pathname === href
                      ? "bg-muted text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  <Icon className="size-4" />
                  {label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-2 border-t pt-2">
              <Button
                size="sm"
                variant="outline"
                className="w-full justify-start"
                asChild
              >
                <Link href={GITHUB_CREATE_TNT_APP_REPO} target="_blank">
                  <StarIcon className="size-4 fill-yellow-500 stroke-yellow-500 dark:fill-yellow-400 dark:stroke-yellow-400" />
                  Star on GitHub
                </Link>
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </motion.div>
      )}
    </header>
  )
}
