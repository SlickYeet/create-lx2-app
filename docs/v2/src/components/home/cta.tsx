"use client"

import { ArrowRight } from "lucide-react"
import { motion } from "motion/react"
import Link from "next/link"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/config"

export function CTA() {
  return (
    <section id="cta" className="container px-4 py-20">
      <div className="relative">
        <div className="from-primary via-accent to-secondary absolute -inset-1 rounded-lg bg-linear-to-r opacity-50 blur-lg" />
        <motion.div
          initial={{ opacity: 0, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          viewport={{ once: true }}
          className="bg-background relative rounded-lg p-8 text-center text-balance md:p-12 md:text-left"
        >
          <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">
            Your Next<small className="text-sm">.js</small> App.{" "}
            <span className="from-primary to-secondary bg-linear-to-r bg-clip-text text-transparent">
              Done Right.
            </span>
          </h2>
          <p className="text-muted-foreground mb-8 max-w-3xl text-xl">
            Highly opinionated defaults, TypeScript, Next.js, Tailwind, and all
            the tools you need.
          </p>

          <div className="flex flex-wrap justify-center gap-4 md:justify-start">
            <Button size="lg" className="group" asChild>
              <Link href={siteConfig.navItems[0].href}>
                <span>Read the Docs</span>
                <ArrowRight className="size-4 transition-transform group-focus-within:translate-x-1 group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button size="lg" variant="ghost" className="group" asChild>
              <Link href={siteConfig.links.github} target="_blank">
                <Icons.github className="size-4" />
                <span>Star on GitHub</span>
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
