"use client"

import { StarIcon } from "lucide-react"
import { motion } from "motion/react"
import Link from "next/link"

import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { GITHUB_CREATE_TNT_APP_REPO } from "@/constants"

export function Header() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="-ml-2 hidden items-center gap-2 md:flex"
    >
      <Button variant="outline" asChild>
        <Link href={GITHUB_CREATE_TNT_APP_REPO} target="_blank">
          <StarIcon className="size-4 fill-yellow-500 stroke-yellow-500 dark:fill-yellow-400 dark:stroke-yellow-400" />
          Star on GitHub
        </Link>
      </Button>
      <ThemeToggle />
    </motion.div>
  )
}
