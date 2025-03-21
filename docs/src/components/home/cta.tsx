"use client"

import { ArrowRightIcon, StarIcon } from "lucide-react"
import { motion } from "motion/react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { GITHUB_CREATE_TNT_APP_REPO } from "@/constants"

export function CTA() {
  return (
    <section className="container py-16 md:py-24">
      <div className="from-primary/10 via-highlight/10 to-accent/10 relative overflow-hidden rounded-xl bg-linear-to-r p-8 md:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative mx-auto max-w-3xl text-center"
        >
          <h2 className="font-heading mb-6 text-3xl font-bold tracking-tight md:text-4xl">
            Ready to <span className="gradient-text">Ignite</span> Your
            Development?
          </h2>
          <p className="text-muted-foreground mb-8 text-xl">
            Start building with the TNT stack today and experience the power of
            TypeScript, Next.js, and Tailwind CSS combined with today&apos;s
            most popular tools.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="group" asChild>
              <Link href="/docs/create-tnt-stack/introduction">
                <span>Read the Docs</span>
                <ArrowRightIcon className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button size="lg" variant="outline" asChild>
              <Link href={GITHUB_CREATE_TNT_APP_REPO} target="_blank">
                <StarIcon className="mr-2 size-4 fill-yellow-500 stroke-yellow-500 dark:fill-yellow-400 dark:stroke-yellow-400" />
                Star on GitHub
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
