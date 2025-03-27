"use client"

import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  FileCode2Icon,
  GithubIcon,
} from "lucide-react"
import { motion } from "motion/react"
import Link from "next/link"

import { CodeBlock } from "@/components/code-block"
import { TerminalDemo } from "@/components/terminal-demo"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  GITHUB_CREATE_TNT_APP_REPO,
  RELATIVE_INITIAL_DOCS_PATH,
} from "@/constants"

export function Hero() {
  return (
    <section
      id="create-tnt-app"
      className="relative overflow-hidden py-20 md:py-28"
    >
      <div className="from-background to-background/50 absolute inset-0 z-0 bg-linear-to-br" />
      <div className="bg-grid-pattern absolute inset-0 z-0 opacity-[0.03]" />

      <div className="relative z-10 container">
        <div className="mx-auto mb-12 flex max-w-4xl flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <Badge className="bg-primary/10 text-primary border-primary/10 hover:border-primary/40 rounded-full border transition-colors">
              Supercharge your Next.js projects
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="gradient-text mb-6 text-4xl font-bold tracking-tight md:text-6xl"
          >
            TNT-Powered
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground mb-8 max-w-2xl text-xl"
          >
            Build modern web applications with todat&apos;s most popular tools.
            Launch your TypeScript, Next.js, and Tailwind CSS projects with a
            bang.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex w-full max-w-sm flex-col gap-4 md:flex-row md:items-center md:justify-center"
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
                <ArrowRightIcon className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="group min-h-[3.5rem] flex-1"
              asChild
            >
              <Link href={GITHUB_CREATE_TNT_APP_REPO} target="_blank">
                <GithubIcon className="mr-2 size-4" />
                <span>GitHub</span>
                <ArrowUpRightIcon className="ml-2 size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-full max-w-sm text-left"
          >
            <CodeBlock
              data-language="bash"
              alwaysShowCopy
              code="npm create tnt-stack@latest"
            />
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
