"use client"

import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type { ComponentProps } from "react"

import { Icons } from "@/components/icons"
import { Search } from "@/components/search"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { siteConfig } from "@/lib/config"
import { source } from "@/lib/source"
import { cn } from "@/lib/utils"

interface DocsSidebarProps extends ComponentProps<typeof Sidebar> {
  tree: typeof source.pageTree
}

export function DocsSidebar(props: DocsSidebarProps) {
  const pathname = usePathname()

  const { tree, ...rest } = props

  return (
    <Sidebar
      collapsible="none"
      className={cn(
        "sticky top-0 z-30 hidden h-svh w-(--sidebar-width) border-r bg-transparent lg:flex",
      )}
      {...rest}
    >
      <div className="mb-4 flex flex-col gap-6 px-4 pt-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Icons.logo className="size-6 shrink-0 stroke-3" />
            <span className="line-clamp-1 text-lg font-bold">
              {siteConfig.name}
            </span>
          </Link>
          <ThemeToggle />
        </div>
        <Search tree={tree} className="h-10 w-full!" />
      </div>
      <SidebarContent className="no-scrollbar justify-between">
        <div className="h-(--top-spacing) shrink-0 px-2">
          {tree.children.map((item) => (
            <SidebarGroup key={item.$id}>
              <SidebarGroupLabel className="text-foreground px-0 text-sm font-medium uppercase">
                {item.name}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                {item.type === "folder" && (
                  <SidebarMenu className="gap-0">
                    {item.children.map(
                      (child) =>
                        child.type === "page" && (
                          <SidebarMenuItem key={child.url}>
                            <SidebarMenuButton
                              isActive={child.url === pathname}
                              className={cn(
                                "h-10 rounded-l-none rounded-r-lg border-l-2 pl-4 text-base transition-colors",
                                "text-muted-foreground hover:text-foreground",
                                "hover:text-primary hover:border-primary/50 hover:bg-primary/15",
                                "focus-visible:text-primary focus-visible:border-primary/50 focus-visible:bg-primary/15 focus-visible:ring-0 focus-visible:outline-none",
                                "data-[active=true]:text-primary data-[active=true]:border-primary data-[active=true]:bg-primary/25 data-[active=true]:font-medium",
                              )}
                              asChild
                            >
                              <Link href={child.url}>{child.name}</Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ),
                    )}
                  </SidebarMenu>
                )}
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </div>
      </SidebarContent>

      <div className="border-t-2">
        <SidebarMenu className="gap-0">
          <SidebarMenuItem>
            <SidebarMenuButton
              className={cn(
                "rounded-none px-4 py-5 transition-colors",
                "hover:text-primary hover:bg-primary/15",
                "focus-visible:text-primary focus-visible:bg-primary/15 focus-visible:ring-0 focus-visible:outline-none",
              )}
              asChild
            >
              <Link href={siteConfig.links.github} target="_blank">
                GitHub <ArrowUpRight />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              className={cn(
                "rounded-none px-4 py-5 transition-colors",
                "hover:text-primary hover:bg-primary/15",
                "focus-visible:text-primary focus-visible:bg-primary/15 focus-visible:ring-0 focus-visible:outline-none",
              )}
              asChild
            >
              <Link href={siteConfig.links.discord} target="_blank">
                Discord <ArrowUpRight />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </div>
    </Sidebar>
  )
}
