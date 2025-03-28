"use client"

import { ArrowLeftIcon, HomeIcon } from "lucide-react"
import { motion } from "motion/react"
import Link from "next/link"
import { useEffect, useState } from "react"

import { NotFoundImage } from "@/components/not-found-image"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 300,
    height: 300,
  })

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth < 768) {
        setSize({ width: 250, height: 250 })
      } else {
        setSize({ width: 300, height: 300 })
      }
    }

    updateSize()
    window.addEventListener("resize", updateSize)

    return () => window.removeEventListener("resize", updateSize)
  }, [])

  return (
    <div className="my-6 flex min-h-[60vh] flex-col items-center justify-center px-4 text-center md:my-8 lg:my-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md"
      >
        <div
          className={`relative mx-auto mb-8 aspect-square w-full max-w-[${size.width}px]`}
        >
          <div className="from-primary/30 absolute inset-0 rounded-full bg-gradient-to-br to-purple-500/30 opacity-70 blur-xl" />
          <NotFoundImage size={size} />
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="border-primary/30 absolute inset-0 z-0 rounded-full border-2 border-dashed"
          />
        </div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="from-primary mb-4 bg-gradient-to-br to-purple-900 bg-clip-text text-4xl font-bold text-transparent"
        >
          404 - Explosion Misfired
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-muted-foreground mb-8"
        >
          Oops! The page you&apos;re looking for seems to have detonated or
          never existed. Our TNT experts are investigating the scene.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col justify-center gap-4 sm:flex-row"
        >
          <Button asChild>
            <Link href="/" className="flex items-center gap-2">
              <HomeIcon className="size-4" />
              <span>Return Home</span>
            </Link>
          </Button>

          <Button variant="outline" asChild>
            <Link href="/docs" className="flex items-center gap-2">
              <ArrowLeftIcon className="size-4" />
              <span>View Documentation</span>
            </Link>
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="text-muted-foreground mt-16 text-sm"
      >
        <p>Error Code: TNT-404</p>
      </motion.div>
    </div>
  )
}
