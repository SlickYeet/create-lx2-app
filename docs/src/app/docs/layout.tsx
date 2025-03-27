"use client"

import { motion } from "motion/react"

import { DocsSidebar } from "@/components/docs/sidebar"
import { DocsTOC } from "@/components/docs/toc"

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="container py-5 lg:py-10"
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-15">
        <div className="hidden lg:col-span-3 lg:block">
          <DocsSidebar />
        </div>
        <div id="mdx" className="mdx col-span-1 lg:col-span-9">
          {children}
        </div>
        <div className="hidden lg:col-span-3 lg:block">
          <DocsTOC />
        </div>
      </div>
    </motion.div>
  )
}
