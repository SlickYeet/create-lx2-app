import Link from "next/link"

import { DiscordLink } from "@/components/discord-link"
import { GithubLink } from "@/components/github-link"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/layout/main-nav"
import { MobileNav } from "@/components/layout/mobile-nav"
import { Search } from "@/components/search"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { siteConfig } from "@/lib/config"
import { source } from "@/lib/source"
import { cn } from "@/lib/utils"

export function Header({ className }: { className?: string }) {
  const pageTree = source.pageTree

  return (
    <header
      className={cn(
        "bg-background/80 supports-[backdrop-filter:blur(0)]:bg-background/60 sticky top-0 z-50 w-full backdrop-blur-sm",
        className,
      )}
    >
      <div className="container flex h-16 items-center gap-2 px-4 **:data-[slot=separator]:h-4!">
        <MobileNav
          tree={pageTree}
          items={siteConfig.navItems}
          className="flex lg:hidden"
        />
        <Button
          size="icon"
          variant="ghost"
          className="hidden size-8 lg:flex"
          asChild
        >
          <Link href="/">
            <Icons.logo className="size-5" />
            <span className="sr-only">{siteConfig.name}</span>
          </Link>
        </Button>
        <MainNav items={siteConfig.navItems} className="hidden lg:flex" />
        <div className="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
          <div className="w-full flex-1 md:flex md:w-auto md:flex-none">
            <Search tree={pageTree} />
          </div>
          <Separator orientation="vertical" className="ml-2 hidden lg:block" />
          <GithubLink />
          <DiscordLink />
          <Separator orientation="vertical" className="hidden lg:block" />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
