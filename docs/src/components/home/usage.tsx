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
                code="npx create-tnt-app my-app"
                filename="Create a new project"
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
                filename="Start the development server"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <CodeBlock
                code="create-tnt-app my-app --template tnt-basic"
                filename="Using a specific template"
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
                Available Templates
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <div className="bg-primary mr-2 size-2 rounded-full" />
                  <span>
                    <code>tnt-basic</code> - Basic TNT stack setup
                  </span>
                </li>
                <li className="flex items-center">
                  <div className="bg-secondary mr-2 size-2 rounded-full" />
                  <span>
                    <code>tnt-payload</code> - TNT with Payload CMS
                  </span>
                </li>
                <li className="flex items-center">
                  <div className="bg-accent mr-2 size-2 rounded-full" />
                  <span>
                    <code>tnt-auth</code> - TNT with authentication
                  </span>
                </li>
                <li className="flex items-center">
                  <div className="bg-destructive mr-2 size-2 rounded-full" />
                  <span>
                    <code>tnt-full</code> - Complete TNT stack with all features
                  </span>
                </li>
              </ul>

              <div className="pt-4">
                <Button className="group" asChild>
                  <Link href="/docs">
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
