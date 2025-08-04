"use client"

import { ArrowRight } from "lucide-react"
import { motion } from "motion/react"
import Link from "next/link"

import { CodeBlock } from "@/components/code-block"
import { Button } from "@/components/ui/button"

export function Usage() {
  return (
    <section id="usage" className="relative py-20">
      <div className="from-muted/30 absolute top-0 left-0 h-25 w-full bg-linear-180 to-transparent" />

      <div className="container px-4">
        <div className="mb-16 text-center md:text-left">
          <motion.h2
            initial={{ opacity: 0, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-4 text-3xl font-bold md:text-4xl"
          >
            Simple to Use
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-muted-foreground max-w-2xl text-xl"
          >
            Get started with just a few commands
          </motion.p>
        </div>

        <div className="flex flex-col items-center gap-12 lg:flex-row">
          <div className="w-full flex-1">
            <motion.div
              initial={{ opacity: 0, y: 25, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <CodeBlock code="npm create lx2-app@latest my-app" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 25, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <CodeBlock code="cd my-app && npm run dev" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 25, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <CodeBlock code="npx create-lx2-app@latest" />
            </motion.div>
          </div>

          <div className="relative mt-6 w-full flex-1">
            <div className="from-primary via-accent to-secondary absolute -inset-1 rounded-lg bg-linear-to-r opacity-50 blur-lg" />

            <motion.div
              initial={{ opacity: 0, y: 25, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-background relative space-y-4 rounded-lg p-6"
            >
              <h3 className="font-heading text-2xl font-bold">
                Available Flags
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <div className="bg-primary mr-2 size-2 shrink-0 rounded-full" />
                  <span>
                    <code>--CI</code> - Set the CLI to run in CI
                  </span>
                </li>
                <li className="flex items-center">
                  <div className="bg-secondary mr-2 size-2 shrink-0 rounded-full" />
                  <span>
                    <code>--backend [framework]</code> - Choose which backend
                    framework to use
                  </span>
                </li>
                <li className="flex items-center">
                  <div className="bg-accent mr-2 size-2 shrink-0 rounded-full" />
                  <span>
                    <code>--authProvider [provider]</code> - Choose an auth
                    provider
                  </span>
                </li>
                <li className="flex items-center">
                  <div className="mr-2 size-2 shrink-0 rounded-full bg-purple-500" />
                  <span>
                    <code>--databaseORM [orm]</code> - Choose a database ORM
                  </span>
                </li>
                <li className="flex items-center">
                  <div className="bg-accent mr-2 size-2 shrink-0 rounded-full" />
                  <span>
                    <code>--dbProvider [provider]</code> - Set the database
                    provider
                  </span>
                </li>
              </ul>

              <div className="pt-4">
                <Button className="group" asChild>
                  <Link href="/docs/getting-started#experimental-ci-flags">
                    View Full Documentation
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
