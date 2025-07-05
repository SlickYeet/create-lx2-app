"use client"

import { motion, useAnimation, type Variants } from "motion/react"
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  type HTMLAttributes,
} from "react"

import { cn } from "../lib/utils"

export interface TerminalIconHandle {
  startAnimation: () => void
  stopAnimation: () => void
}

interface TerminalIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number
  alwaysAnimate?: boolean
}

const lineVariants: Variants = {
  normal: { opacity: 1 },
  animate: {
    opacity: [1, 0, 1],
    transition: {
      duration: 0.8,
      repeat: Infinity,
      ease: "linear",
    },
  },
}

const TerminalIcon = forwardRef<TerminalIconHandle, TerminalIconProps>(
  (
    {
      onMouseEnter,
      onMouseLeave,
      className,
      size = 28,
      alwaysAnimate = false,
      ...props
    },
    ref,
  ) => {
    const controls = useAnimation()
    const isControlledRef = useRef(false)

    useImperativeHandle(ref, () => {
      isControlledRef.current = true

      return {
        startAnimation: () => controls.start("animate"),
        stopAnimation: () => controls.start("normal"),
      }
    })

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current && !alwaysAnimate) {
          controls.start("animate")
        } else {
          onMouseEnter?.(e)
        }
      },
      [controls, onMouseEnter, alwaysAnimate],
    )

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current && !alwaysAnimate) {
          controls.start("normal")
        } else {
          onMouseLeave?.(e)
        }
      },
      [controls, onMouseLeave, alwaysAnimate],
    )

    useEffect(() => {
      if (alwaysAnimate) {
        controls.start("animate")
      } else {
        controls.start("normal")
      }
    }, [alwaysAnimate, controls])

    return (
      <div
        className={cn(
          `flex items-center justify-center rounded-md p-2 transition-colors duration-200 select-none`,
          alwaysAnimate === false && "cursor-pointer",
          className,
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="4 17 10 11 4 5" />
          <motion.line
            x1="12"
            x2="20"
            y1="19"
            y2="19"
            variants={lineVariants}
            animate={controls}
            initial="normal"
          />
        </svg>
      </div>
    )
  },
)

TerminalIcon.displayName = "TerminalIcon"

export { TerminalIcon }
