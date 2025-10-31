"use client"

import { ArrowRightIcon } from "lucide-react"
import { motion } from "motion/react"
import Link from "next/link"

import { StarOnGithub } from "@/components/star-on-github"
import { Button } from "@/components/ui/button"
import { RELATIVE_INITIAL_DOCS_PATH } from "@/constants"

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
              <Link href={RELATIVE_INITIAL_DOCS_PATH}>
                <span>Read the Docs</span>
                <ArrowRightIcon className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>

            <div className="bg-background rounded-md">
              <StarOnGithub size="lg" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
