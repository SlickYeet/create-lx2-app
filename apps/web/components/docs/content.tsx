"use client"

import { InfoIcon } from "lucide-react"
import { motion } from "motion/react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function DocsContent({ children }: { children: React.ReactNode }) {
  const container = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    initial: { opacity: 0, y: 10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  }

  return (
    <motion.div
      variants={container}
      initial="initial"
      animate="animate"
      className="min-w-0 flex-1 scroll-mt-20"
    >
      <div className="space-y-10">
        <Alert variant="info" className="mb-6">
          <InfoIcon className="size-4" />
          <AlertTitle>Note</AlertTitle>
          <AlertDescription>
            The docs are currently placeholder content and will be updated once
            the CTL is ready.
          </AlertDescription>
        </Alert>

        <motion.div variants={item}>{children}</motion.div>
      </div>
    </motion.div>
  )
}
