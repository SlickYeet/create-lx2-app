"use client"

import { motion } from "motion/react"
import Link from "next/link"

import { TerminalIcon as AnimatedTerminalIcon } from "@/components/terminal-icon"
import { cn } from "@/lib/utils"

interface LogoProps {
  containerClassName?: string
  textClassName?: string
  size?: number
  animate?: boolean
  ping?: boolean
}

export function Logo({
  containerClassName,
  textClassName,
  size = 20,
  animate = true,
  ping = true,
}: LogoProps) {
  return (
    <Link
      href="/"
      className={cn("flex items-center gap-2", containerClassName)}
    >
      <motion.div
        initial={
          animate
            ? { scale: 0.8, opacity: 0, rotate: 0 }
            : { scale: 1, opacity: 1, rotate: 360 }
        }
        animate={{ scale: 1, opacity: 1, rotate: 360 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className={cn(
          "from-primary/50 to-accent/50 flex items-center justify-center rounded-lg bg-linear-to-r",
        )}
      >
        <AnimatedTerminalIcon size={size} alwaysAnimate />
        {ping && (
          <motion.span
            initial={
              animate ? { scale: 0.8, opacity: 0 } : { scale: 1, opacity: 1 }
            }
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="absolute -top-1 -right-1 flex size-3"
          >
            <span className="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
            <span className="from-primary to-accent relative inline-flex size-3 rounded-full bg-linear-to-r" />
          </motion.span>
        )}
      </motion.div>
      <motion.span
        initial={animate ? { x: -10, opacity: 0 } : { x: 0, opacity: 1 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className={cn(
          "font-heading inline-block text-xl font-bold",
          textClassName,
        )}
      >
        TNT-Powered
      </motion.span>
    </Link>
  )
}
