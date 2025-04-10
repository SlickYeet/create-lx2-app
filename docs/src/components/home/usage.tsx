"use client"

import { ArrowRightIcon } from "lucide-react"
import { motion } from "motion/react"
import Link from "next/link"

import { CodeBlock } from "@/components/code-block"
import { Button } from "@/components/ui/button"

export function Usage() {
  return (
    <section id="usage" className="py-20">
      <div className="container">
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-4 text-3xl font-bold md:text-4xl"
          >
            Simple to Use
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-muted-foreground mx-auto max-w-2xl text-xl"
          >
            Get started with just a few commands
          </motion.p>
        </div>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <CodeBlock
                code="npm create tnt-stack@latest my-app"
                data-language="bash"
                title="Create a new project"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <CodeBlock
                code="cd my-app && npm run dev"
                data-language="bash"
                title="Start the development server"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <CodeBlock
                code="npm create tnt-stack@latest my-app --CI --prisma --dbProvider postgresql"
                data-language="bash"
                title="Create a new project with CI flags"
              />
            </motion.div>
          </div>

          <div className="glow-card rounded-xl p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="space-y-4"
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
                  <div className="bg-highlight mr-2 size-2 shrink-0 rounded-full" />
                  <span>
                    <code>--nextAuth</code> - Add NextAuth.js to the project
                  </span>
                </li>
                <li className="flex items-center">
                  <div className="bg-secondary mr-2 size-2 shrink-0 rounded-full" />
                  <span>
                    <code>--prisma</code> - Add Prisma ORM to the project
                  </span>
                </li>
                <li className="flex items-center">
                  <div className="mr-2 size-2 rounded-full bg-emerald-500" />
                  <span>
                    <code>--prettier</code> - Add Prettier to the project
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
                  <Link href="/getting-started#experimental-ci-flags">
                    View Full Documentation
                    <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
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
