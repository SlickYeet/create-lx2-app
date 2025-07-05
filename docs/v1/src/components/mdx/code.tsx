import { type ComponentProps } from "react"

import { cn } from "../../lib/utils"
import { CodeBlockCommand } from "../code-block"
import { CopyButton } from "../copy-button"

interface ShadcnCodeProps extends ComponentProps<"code"> {
  __raw__?: string
  __npm__?: string
  __yarn__?: string
  __pnpm__?: string
  __bun__?: string
}

export function Code(props: ShadcnCodeProps) {
  const { className, __raw__, __npm__, __yarn__, __pnpm__, __bun__, ...rest } =
    props

  //Inline code
  if (typeof props.children === "string") {
    return (
      <code
        className={cn(
          "bg-muted relative rounded-md px-[0.3rem] py-[0.2rem] font-mono text-[0.8rem] outline-none",
          className,
        )}
        {...rest}
      />
    )
  }

  // Command block
  const hasCommand = __npm__ && __yarn__ && __pnpm__ && __bun__
  if (hasCommand) {
    return (
      <CodeBlockCommand
        __npm__={__npm__}
        __yarn__={__yarn__}
        __pnpm__={__pnpm__}
        __bun__={__bun__}
      />
    )
  }

  // Default codeblock
  return (
    <>
      {__raw__ && <CopyButton value={__raw__} />}
      <code {...rest} />
    </>
  )
}
