"use client"

import {
  AlertTriangleIcon,
  FileCodeIcon,
  GithubIcon,
  HandHeartIcon,
  HeartIcon,
} from "lucide-react"
import { motion } from "motion/react"
import Link from "next/link"
import { useEffect, useState } from "react"

import { Logo } from "@/components/logo"
import { Badge } from "@/components/ui/badge"
import { GITHUB_CREATE_TNT_APP_REPO } from "@/constants"

export function Footer() {
  const [version, setVersion] = useState<string>("1.0.0")

  // In a real implementation, you would fetch this from GitHub API
  useEffect(() => {
    const fetchVersion = async () => {
      try {
        // Replace with actual GitHub API call
        // const response = await fetch("https://api.github.com/repos/SlickYeet/create-tnt-stack/releases/latest")
        // const data = await response.json()
        // setVersion(data.tag_name)

        // Simulating a fetch delay
        await new Promise((resolve) => setTimeout(resolve, 500))
        setVersion("1.2.3")
      } catch (error) {
        console.error("Failed to fetch version:", error)
      }
    }

    fetchVersion()
  }, [])

  return (
    <footer className="border-t py-6 md:py-10">
      <div className="container flex flex-col gap-6 lg:flex-row lg:justify-between lg:gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-2"
        >
          <div className="flex flex-col items-start gap-1.5 sm:flex-row sm:items-center">
            <Logo
              textClassName="font-space text-base"
              size={14}
              animate={false}
            />
            <p className="text-muted-foreground text-sm">
              &copy; {new Date().getFullYear()} HHN. MIT License.
            </p>
          </div>
          <p className="text-muted-foreground text-sm">
            Made with{" "}
            <HeartIcon className="inline size-4 text-rose-600 dark:text-rose-500" />{" "}
            by the{" "}
            <Link href="https://github.com/famlam-ca" target="_blank">
              HHN Team
            </Link>
            .
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-muted-foreground flex flex-col gap-4 text-sm sm:flex-row lg:gap-6"
        >
          <Link
            href="/docs"
            className="hover:text-foreground flex items-center gap-2"
          >
            <FileCodeIcon className="text-primary size-4" />
            Documentation
          </Link>
          <Link
            href="/docs#contributing"
            className="hover:text-foreground flex items-center gap-2"
          >
            <HandHeartIcon className="size-4 text-rose-600 dark:text-rose-500" />
            Contributing
          </Link>
          <Link
            href={`${GITHUB_CREATE_TNT_APP_REPO}/issues/new`}
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground flex items-center gap-2"
          >
            <AlertTriangleIcon className="text-highlight size-4" />
            Report Issue
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex gap-4"
        >
          <Link
            href={GITHUB_CREATE_TNT_APP_REPO}
            target="_blank"
            rel="noreferrer"
            className="group text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm transition-colors"
          >
            <GithubIcon className="size-5" />
            <span>GitHub</span>
            <Badge className="bg-primary/10 text-primary group-hover:bg-primary/40 group-hover:text-foreground rounded-full text-xs">
              v{version}
            </Badge>
          </Link>
        </motion.div>
      </div>
    </footer>
  )
}
