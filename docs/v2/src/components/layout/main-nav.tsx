"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface MainNavProps extends React.ComponentProps<"nav"> {
  items: { label: string; href: string }[]
}

export function MainNav(props: MainNavProps) {
  const pathname = usePathname()

  const { items, className, ...rest } = props

  return (
    <nav className={cn("items-center gap-0.5", className)} {...rest}>
      {items.map((item) => (
        <Button key={item.href} size="sm" variant="ghost" asChild>
          <Link
            href={item.href}
            className={cn(pathname === item.href && "text-primary")}
          >
            {item.label}
          </Link>
        </Button>
      ))}
    </nav>
  )
}
