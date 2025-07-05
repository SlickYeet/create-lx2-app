"use client"

import { Check, Clipboard, TerminalIcon } from "lucide-react"
import { useCallback, useEffect, useMemo, useState } from "react"
import type { BundledLanguage } from "shiki"

import { Code } from "@/components/mdx/code"
import { Figure } from "@/components/mdx/figure"
import { Pre } from "@/components/mdx/pre"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useConfig } from "@/hooks/use-config"
import { applyPackageManagerTransformations } from "@/lib/highlight-code"

interface CodeBlockProps extends React.ComponentProps<"pre"> {
  code: string
  language?: BundledLanguage
}

export function CodeBlock({ code, language = "bash" }: CodeBlockProps) {
  const transforms = applyPackageManagerTransformations(code)

  return (
    <Figure data-rehype-pretty-code-figure="">
      <Pre data-language={language}>
        <Code data-language={language}>
          <CodeBlockCommand
            __npm__={transforms.__npm__}
            __yarn__={transforms.__yarn__}
            __pnpm__={transforms.__pnpm__}
            __bun__={transforms.__bun__}
          />
        </Code>
      </Pre>
    </Figure>
  )
}

interface CodeBlockCommandProps extends React.ComponentProps<"div"> {
  __npm__?: string
  __yarn__?: string
  __pnpm__?: string
  __bun__?: string
}

export function CodeBlockCommand(props: CodeBlockCommandProps) {
  const { __npm__, __yarn__, __pnpm__, __bun__ } = props
  const [config, setConfig] = useConfig()

  const [hasCopied, setHasCopied] = useState<boolean>(false)

  useEffect(() => {
    if (hasCopied) {
      const timer = setTimeout(() => setHasCopied(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [hasCopied])

  const packageManager = config.packageManager
  const tabs = useMemo(() => {
    return {
      npm: __npm__,
      yarn: __yarn__,
      pnpm: __pnpm__,
      bun: __bun__,
    }
  }, [__npm__, __yarn__, __pnpm__, __bun__])

  const copyCommand = useCallback(() => {
    const command = tabs[packageManager]
    if (!command) return

    navigator.clipboard.writeText(command)

    setHasCopied(true)
  }, [tabs, packageManager])

  return (
    <div className="overflow-x-auto">
      <Tabs
        value={packageManager}
        onValueChange={(value) => {
          setConfig({
            ...config,
            packageManager: value as "npm" | "yarn" | "pnpm" | "bun",
          })
        }}
        className="gap-0"
      >
        <div className="border-input flex items-center gap-2 border-b px-3 py-1">
          <div className="bg-foreground flex size-4 items-center justify-center rounded-[1px] opacity-70">
            <TerminalIcon className="text-background size-3" />
          </div>
          <TabsList className="rounded-none bg-transparent p-0">
            {Object.entries(tabs).map(([key]) => (
              <TabsTrigger
                key={key}
                value={key}
                className="data-[state=active]:bg-accent data-[state=active]:border-input h-7 border border-transparent pt-0.5 data-[state=active]:shadow-none"
              >
                {key}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <div className="no-scrollbar overflow-x-auto">
          {Object.entries(tabs).map(([key, value]) => (
            <TabsContent key={key} value={key} className="mt-0 px-4 py-3.5">
              <pre>
                <code
                  data-language="bash"
                  className="relative font-mono text-sm leading-none"
                >
                  {value}
                </code>
              </pre>
            </TabsContent>
          ))}
        </div>
      </Tabs>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={copyCommand}
            size="icon"
            variant="ghost"
            className="absolute top-2 right-2 z-10 size-7 opacity-70 hover:opacity-100 focus-visible:opacity-100"
            data-slot="copy-button"
          >
            {hasCopied ? <Check /> : <Clipboard />}
            <span className="sr-only">Copy</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {hasCopied ? "Copied" : "Copy to Clipboard"}
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
