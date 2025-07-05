"use client"

import { ArrowRightIcon, ArrowUpRightIcon, FileCode2Icon } from "lucide-react"
import { motion } from "motion/react"
import Link from "next/link"

import {
  GITHUB_CREATE_TNT_APP_REPO,
  RELATIVE_INITIAL_DOCS_PATH,
} from "../../constants"
import { cn } from "../../lib/utils"
import { TerminalDemo } from "../terminal-demo"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"

export function Hero({ npmVersion }: { npmVersion?: string }) {
  return (
    <section
      id="create-tnt-app"
      className="relative overflow-hidden py-20 md:py-28"
    >
      <div className="from-background to-background/50 absolute inset-0 z-0 bg-linear-to-br" />
      <div className="bg-grid-pattern absolute inset-0 z-0 opacity-[0.03]" />

      <div className="relative z-10 container">
        <div className="@container mx-auto mb-12 flex max-w-4xl flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <Link
              href={`https://www.npmjs.com/package/create-tnt-stack/v/${npmVersion}`}
              target="_blank"
            >
              <Badge
                className={cn(
                  "rounded-full border transition-colors",
                  "border-emerald-600/10 bg-emerald-600/10 text-emerald-600 hover:border-emerald-600/40",
                  "dark:border-emerald-400/10 dark:bg-emerald-400/10 dark:text-emerald-400 dark:hover:border-emerald-400/40",
                  npmVersion?.includes("beta") &&
                    "!border-highlight/10 !bg-highlight/10 !text-highlight !hover:border-highlight/40",
                )}
              >
                {/* Supercharge your Next.js projects */}
                Create TNT Stack v{npmVersion} is now out! 🚀
              </Badge>
            </Link>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="gradient-text mb-6 text-6xl font-bold tracking-tight md:text-8xl"
          >
            TNT-Powered
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground mb-8 max-w-2xl text-xl"
          >
            Build modern web applications with today&apos;s most popular tools.
            Launch your TypeScript, Next.js, and Tailwind CSS projects with a
            bang.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex w-full max-w-sm flex-col gap-4 @sm:flex-row @sm:items-center @sm:justify-center"
          >
            <Button
              size="lg"
              variant="outline"
              className="group min-h-[3.5rem] flex-1"
              asChild
            >
              <Link href={RELATIVE_INITIAL_DOCS_PATH}>
                <FileCode2Icon className="mr-2 size-4" />
                <span>Get Started</span>
                <ArrowRightIcon className="ml-2 size-4 transition-transform group-focus-within:translate-x-1 group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="group min-h-[3.5rem] flex-1"
              asChild
            >
              <Link href={GITHUB_CREATE_TNT_APP_REPO} target="_blank">
                <svg
                  viewBox="0 0 1024 1024"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 size-4"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
                    transform="scale(64)"
                    fill="currentColor"
                  />
                </svg>
                <span>GitHub</span>
                <ArrowUpRightIcon className="ml-2 size-4 transition-transform group-focus-within:translate-x-1 group-focus-within:-translate-y-1 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="relative mx-auto max-w-4xl"
        >
          <div className="from-primary via-highlight to-accent absolute -inset-1 rounded-lg bg-linear-to-r opacity-50 blur-lg" />

          <div className="bg-card relative overflow-hidden rounded-lg border shadow-lg">
            <TerminalDemo />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
