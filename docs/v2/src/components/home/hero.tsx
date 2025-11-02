"use client"

import { ArrowRight, ArrowUpRight } from "lucide-react"
import { motion } from "motion/react"
import Link from "next/link"

import { CodeBlock } from "@/components/code-block"
import { TerminalDemo } from "@/components/home/terminal-demo"
import { Icons } from "@/components/icons"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/config"
import { cn, formatVersionText, type VersionConfig } from "@/lib/utils"

interface HeroProps {
  npmVersion?: string
  versionConfig?: VersionConfig
}

export function Hero({ npmVersion, versionConfig }: HeroProps) {
  const displayText =
    npmVersion && versionConfig
      ? formatVersionText(versionConfig.text, npmVersion, siteConfig.name)
      : `${siteConfig.name} v${npmVersion} is now available!`

  const isBeta =
    npmVersion?.includes("beta") || versionConfig?.showBeta === true

  return (
    <section id="create-lx2-app" className="relative py-8 md:py-16">
      <div className="from-muted/30 absolute bottom-0 left-0 h-25 w-full bg-linear-0 to-transparent" />

      <div className="z-10 container px-4">
        <div className="@container flex flex-col items-center text-center md:items-start md:text-left">
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.2 }}
            className="mb-6"
          >
            <a
              href={`https://www.npmjs.com/package/create-lx2-app/v/${npmVersion}`}
              target="_blank"
            >
              <Badge
                className={cn(
                  "rounded-full border transition-colors",
                  "border-primary/50 bg-primary/10 text-primary hover:border-primary/80",
                  isBeta &&
                    "border-secondary/50 bg-secondary/10 text-secondary hover:border-secondary/80",
                )}
              >
                {displayText}
              </Badge>
            </a>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="mb-6 text-5xl font-bold tracking-tight text-balance md:text-6xl lg:text-7xl"
          >
            <span className="from-primary to-secondary bg-linear-to-r bg-clip-text text-transparent">
              The Most Opinionated <br className="hidden sm:block" /> Way To
              Build Next.js Apps
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.2 }}
            className="flex w-full max-w-sm flex-col items-center justify-center"
          >
            <div className="flex w-full flex-col gap-4 @sm:flex-row @sm:items-center @sm:justify-center">
              <Button
                size="lg"
                variant="default"
                className="group min-h-[3.5rem] flex-1 text-base md:text-lg"
                asChild
              >
                <Link href={siteConfig.navItems[0].href}>
                  <span>Get Started</span>
                  <ArrowRight className="ml-2 size-4 transition-transform group-focus-within:translate-x-1 group-hover:translate-x-1 md:stroke-3" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="group min-h-[3.5rem] flex-1 text-base md:text-lg"
                asChild
              >
                <a href={siteConfig.links.github} target="_blank">
                  <Icons.github className="mr-2 size-4" />
                  <span>GitHub</span>
                  <ArrowUpRight className="ml-2 size-4 transition-transform group-focus-within:translate-x-1 group-focus-within:-translate-y-1 group-hover:translate-x-1 group-hover:-translate-y-1 md:stroke-3" />
                </a>
              </Button>
            </div>

            <div className="w-full text-start md:px-4">
              <CodeBlock
                code={`npm create lx2-app@${isBeta ? "beta" : "latest"}`}
                command={false}
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative mt-12 md:mt-24"
        >
          <div className="from-primary via-accent to-secondary absolute -inset-1 rounded-lg bg-linear-to-r opacity-50 blur-lg" />
          <div className="relative overflow-hidden rounded-lg">
            <TerminalDemo />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
