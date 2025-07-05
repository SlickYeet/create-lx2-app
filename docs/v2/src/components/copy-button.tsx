"use client"

import { Check, Clipboard } from "lucide-react"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface CopyButtonProps extends React.ComponentProps<typeof Button> {
  value: string
}

export function CopyButton(props: CopyButtonProps) {
  const { value, variant = "ghost", className, ...rest } = props

  const [hasCopied, setHasCopied] = useState<boolean>(false)

  useEffect(() => {
    setTimeout(() => {
      setHasCopied(false)
    }, 2000)
  }, [])

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={() => {
            navigator.clipboard.writeText(value)
            setHasCopied(true)
          }}
          size="icon"
          variant={variant}
          className={cn(
            "absolute top-3 right-2 z-10 size-7 opacity-70 hover:opacity-100 focus-visible:opacity-100",
            className,
          )}
          data-slot="copy-button"
          {...rest}
        >
          {hasCopied ? <Check /> : <Clipboard />}
          <span className="sr-only">Copy</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {hasCopied ? "Copied" : "Copy to Clipboard"}
      </TooltipContent>
    </Tooltip>
  )
}
