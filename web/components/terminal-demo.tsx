"use client"

import { TerminalIcon } from "lucide-react"
import { motion } from "motion/react"
import { useEffect, useState } from "react"

type TerminalStep = {
  command: string
  output: string[]
  delay: number
}

const terminalSteps: TerminalStep[] = [
  {
    command: "npx create-tnt-app my-app",
    output: ["Creating a new TNT project in ./my-app"],
    delay: 1000,
  },
  {
    command: "Which version of TNT do you want?",
    output: [
      "TNT (Next.js + TypeScript + Tailwind) (default)",
      "TNT-Powered (With Payload CMS)",
    ],
    delay: 1500,
  },
  {
    command: "Setting up your project...",
    output: [
      "Installing dependencies...",
      "TypeScript ✓",
      "Next.js ✓",
      "Tailwind CSS ✓",
      "ESLint ✓",
      "Payload CMS ✓",
      "Project created successfully! 🚀",
    ],
    delay: 2000,
  },
  {
    command: "cd my-app && npm run dev",
    output: [
      "Starting development server...",
      "Ready in 2.8s",
      "➜ Local: http://localhost:3000",
    ],
    delay: 1500,
  },
]

export function TerminalDemo() {
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [typing, setTyping] = useState<boolean>(false)
  const [typedCommand, setTypedCommand] = useState<string>("")
  const [showOutput, setShowOutput] = useState<boolean>(false)
  const [completed, setCompleted] = useState<boolean>(false)

  useEffect(() => {
    if (currentStep >= terminalSteps.length) {
      setCompleted(true)
      setTimeout(() => {
        setCurrentStep(0)
        setTypedCommand("")
        setShowOutput(false)
        setCompleted(false)
      }, 3000)
      return
    }

    const step = terminalSteps[currentStep]

    // Start typing animation
    setTyping(true)
    let typedText = ""
    let charIndex = 0

    const typingInterval = setInterval(() => {
      if (step && charIndex < step.command.length) {
        typedText += step.command[charIndex]
        setTypedCommand(typedText)
        charIndex++
      } else {
        clearInterval(typingInterval)
        setTyping(false)

        // Show output after typing is complete
        setTimeout(() => {
          setShowOutput(true)

          // Move to next step after output is shown
          setTimeout(() => {
            setCurrentStep((prev) => prev + 1)
            setTypedCommand("")
            setShowOutput(false)
          }, step?.delay)
        }, 500)
      }
    }, 50)

    return () => clearInterval(typingInterval)
  }, [currentStep])

  return (
    <div className="h-[400px] overflow-hidden bg-black p-4 font-mono text-sm">
      <div className="mb-4 flex items-center gap-2">
        <div className="size-3 rounded-full bg-red-500" />
        <div className="size-3 rounded-full bg-yellow-500" />
        <div className="size-3 rounded-full bg-green-500" />
        <TerminalIcon className="ml-2 size-4 text-gray-400" />
      </div>

      <div className="text-sm leading-6">
        {currentStep < terminalSteps.length && (
          <>
            <span className="text-white">
              <span className="text-green-400">$ </span>
              {typedCommand}
            </span>
            {typing && (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 1,
                }}
              >
                |
              </motion.span>
            )}

            {showOutput && (
              <div className="text-muted-foreground mt-1 mb-2">
                {terminalSteps[currentStep]?.output.map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {line}
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}

        {completed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-bold text-green-400"
          >
            ✨ Ready to build something amazing! ✨
          </motion.div>
        )}
      </div>
    </div>
  )
}
