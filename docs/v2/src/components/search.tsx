"use client"

import type { DialogProps } from "@radix-ui/react-dialog"
import {
  ArrowRight,
  Code,
  CornerDownLeftIcon,
  Moon,
  SearchIcon,
  Sun,
  SunMoon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useRef, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { useConfig } from "@/hooks/use-config"
import { useIsMac } from "@/hooks/use-is-mac"
import { useMutationObserver } from "@/hooks/use-mutation-observer"
import { useSearch } from "@/hooks/use-search"
import { source } from "@/lib/source"
import { cn } from "@/lib/utils"

interface SearchProps extends DialogProps {
  tree: typeof source.pageTree
  className?: string
}

export function Search(props: SearchProps) {
  const router = useRouter()
  const isMac = useIsMac()
  const [config] = useConfig()
  const [open, setOpen] = useSearch()
  const { setTheme } = useTheme()

  const [selectedType, setSelectedType] = useState<"page" | "command" | null>(
    null,
  )
  const [copyPayload, setCopyPayload] = useState<string>("")

  const packageManager = config.packageManager

  const { tree, className, ...rest } = props

  const handlePageHighlight = useCallback(
    (isCommand: boolean, name?: string) => {
      if (isCommand) {
        const commandName = name?.toString() ? name.toString().trim() : ""
        setSelectedType("command")
        setCopyPayload(`${packageManager} ${commandName}`)
      } else {
        setSelectedType("page")
        setCopyPayload("")
      }
    },
    [packageManager, setSelectedType, setCopyPayload],
  )

  const runCommand = useCallback(
    (command: () => unknown) => {
      setOpen(false)
      command()
    },
    [setOpen],
  )

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return
        }

        e.preventDefault()
        setOpen(true)
      }

      if (e.key === "c" && (e.metaKey || e.ctrlKey)) {
        runCommand(async () => {
          if (selectedType === "command") {
            await navigator.clipboard.writeText(copyPayload)
          }
        })
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [copyPayload, setOpen, runCommand, selectedType, packageManager])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setOpen(true)}
          variant="secondary"
          className={cn(
            "bg-muted hover:bg-muted/80 text-muted-foreground relative h-8 w-full items-center justify-start pl-2.5 font-normal shadow-none sm:pr-12 md:w-40 lg:w-56 xl:w-64",
            className,
          )}
          {...rest}
        >
          <SearchIcon className="size-4" />
          <span className="hidden lg:inline-flex">Search docs...</span>
          <span className="inline-flex lg:hidden">Search...</span>
          <div className="absolute top-1/2 right-1.5 hidden -translate-y-1/2 gap-1 sm:flex">
            <CommandMenuKbd>{isMac ? "⌘" : "Ctrl"}</CommandMenuKbd>
            <CommandMenuKbd className="aspect-square">K</CommandMenuKbd>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="ring-border rounded-xl border-none bg-clip-padding p-2 pb-11 shadow-2xl ring-4"
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Search documentation...</DialogTitle>
          <DialogDescription>Search for a command to run...</DialogDescription>
        </DialogHeader>
        <Command className="**:data-[slot=command-input-wrapper]:bg-input/50 **:data-[slot=command-input-wrapper]:border-input rounded-none bg-transparent **:data-[slot=command-input]:!h-9 **:data-[slot=command-input]:py-0 **:data-[slot=command-input-wrapper]:mb-0 **:data-[slot=command-input-wrapper]:!h-9 **:data-[slot=command-input-wrapper]:rounded-md **:data-[slot=command-input-wrapper]:border">
          <CommandInput placeholder="Search documentation..." />
          <CommandList className="no-scrollbar min-h-80 scroll-pt-2 scroll-pb-1.5">
            <CommandEmpty className="text-muted-foreground py-12 text-center text-sm">
              No results found.
            </CommandEmpty>
            {tree.children.map((group) => (
              <CommandGroup
                key={group.$id}
                heading={group.name}
                className="!p-0 [&_[cmdk-group-heading]]:scroll-mt-16 [&_[cmdk-group-heading]]:!p-3 [&_[cmdk-group-heading]]:!pb-1"
              >
                {group.type === "folder" &&
                  group.children.map((child) => {
                    if (child.type === "page") {
                      return (
                        <CommandMenuItem
                          key={child.url}
                          value={
                            child.name?.toString()
                              ? `${group.name} ${child.name}`
                              : ""
                          }
                          keywords={undefined}
                          onHighlight={() =>
                            handlePageHighlight(false, child.name?.toString())
                          }
                          onSelect={() => {
                            runCommand(() => router.push(child.url))
                          }}
                        >
                          <ArrowRight />
                          {child.name}
                        </CommandMenuItem>
                      )
                    }
                    return null
                  })}
              </CommandGroup>
            ))}

            <CommandGroup
              heading="Home"
              className="!p-0 [&_[cmdk-group-heading]]:scroll-mt-16 [&_[cmdk-group-heading]]:!p-3 [&_[cmdk-group-heading]]:!pb-1"
            >
              <CommandMenuItem
                value="Go to Home"
                keywords={["home"]}
                onHighlight={() => handlePageHighlight(false, "Home")}
                onSelect={() => runCommand(() => router.push("/"))}
              >
                <ArrowRight />
                Home
              </CommandMenuItem>
            </CommandGroup>

            <CommandGroup
              heading="Commands"
              className="!p-0 [&_[cmdk-group-heading]]:scroll-mt-16 [&_[cmdk-group-heading]]:!p-3 [&_[cmdk-group-heading]]:!pb-1"
            >
              <CommandMenuItem
                value={`${packageManager} create lx2-app@latest`}
                keywords={["install", "package", "dlx"]}
                onHighlight={() =>
                  handlePageHighlight(true, "create lx2-app@latest")
                }
                onSelect={() =>
                  runCommand(async () => {
                    setSelectedType("command")
                    setCopyPayload(`${packageManager} create lx2-app@latest`)
                    await navigator.clipboard.writeText(copyPayload)
                  })
                }
              >
                <Code />
                {packageManager} create lx2-app@latest
              </CommandMenuItem>
            </CommandGroup>

            <CommandGroup
              heading="Themes"
              className="!p-0 [&_[cmdk-group-heading]]:scroll-mt-16 [&_[cmdk-group-heading]]:!p-3 [&_[cmdk-group-heading]]:!pb-1"
            >
              <CommandMenuItem
                value="Light"
                keywords={["light theme", "light"]}
                onHighlight={() => handlePageHighlight(false, "light")}
                onSelect={() => runCommand(() => setTheme("light"))}
              >
                <Sun className="fill-current" />
                Light
              </CommandMenuItem>
              <CommandMenuItem
                value="Dark"
                keywords={["dark theme", "dark"]}
                onHighlight={() => handlePageHighlight(false, "dark")}
                onSelect={() => runCommand(() => setTheme("dark"))}
              >
                <Moon className="fill-current" />
                Dark
              </CommandMenuItem>
              <CommandMenuItem
                value="System"
                keywords={["system theme", "system"]}
                onHighlight={() => handlePageHighlight(false, "system")}
                onSelect={() => runCommand(() => setTheme("system"))}
              >
                <SunMoon className="fill-current" />
                System
              </CommandMenuItem>
            </CommandGroup>
          </CommandList>
        </Command>
        <div className="text-muted-foreground bg-input/30 border-t-input absolute inset-x-0 bottom-0 z-20 flex h-10 items-center gap-2 rounded-b-xl border-t px-4 text-xs font-medium">
          <div className="flex items-center gap-2">
            <CommandMenuKbd>
              <CornerDownLeftIcon />
            </CommandMenuKbd>{" "}
            {selectedType === "page" ? "Go to Page" : null}
          </div>
          {copyPayload && (
            <>
              <Separator orientation="vertical" className="h-4!" />
              <div className="flex items-center gap-1">
                <CommandMenuKbd>{isMac ? "⌘" : "Ctrl"}</CommandMenuKbd>
                <CommandMenuKbd>C</CommandMenuKbd>
                {copyPayload}
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

type CommandMenuItemProps = React.ComponentProps<typeof CommandItem> & {
  onHighlight?: () => void
  "data-selected"?: string
  "aria-selected"?: string
}

function CommandMenuItem(props: CommandMenuItemProps) {
  const ref = useRef<HTMLDivElement>(null)

  const { children, className, onHighlight, ...rest } = props

  useMutationObserver(ref, (mutation) => {
    mutation.forEach((mutation) => {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "aria-selected" &&
        ref.current?.getAttribute("aria-selected") === "true"
      ) {
        onHighlight?.()
      }
    })
  })

  return (
    <CommandItem
      ref={ref}
      className={cn(
        "data-[selected=true]:border-input data-[selected=true]:bg-input/50 h-9 rounded-md border border-transparent !px-3 font-medium",
        className,
      )}
      {...rest}
    >
      {children}
    </CommandItem>
  )
}

function CommandMenuKbd(props: React.ComponentProps<"kbd">) {
  const { className, ...rest } = props

  return (
    <kbd
      className={cn(
        "bg-background text-muted-foreground pointer-events-none flex h-5 items-center justify-center gap-1 rounded border px-1 font-sans text-[0.7rem] font-medium select-none [&_svg:not([class*='size-'])]:size-3",
        className,
      )}
      {...rest}
    />
  )
}
