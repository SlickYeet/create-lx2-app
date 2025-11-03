"use client"

import type { DialogProps } from "@radix-ui/react-dialog"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { Command as CommandPrimitive } from "cmdk"
import type { Item } from "fumadocs-core/page-tree"
import {
  ChevronRight,
  CommandIcon,
  CornerDownLeftIcon,
  SearchIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useRef, useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CommandEmpty, CommandItem } from "@/components/ui/command"
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { InputGroup, InputGroupAddon } from "@/components/ui/input-group"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
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

  const [selectedType, setSelectedType] = useState<
    "page" | "command" | "theme" | null
  >(null)
  const [copyPayload, setCopyPayload] = useState<string>("")

  const packageManager = config.packageManager

  const { tree, className, ...rest } = props

  const handlePageHighlight = useCallback(
    (type: typeof selectedType, name?: string) => {
      if (type === "command") {
        const commandName = name?.toString() ? name.toString().trim() : ""
        setSelectedType("command")
        setCopyPayload(`${packageManager} ${commandName}`)
      } else if (type === "theme") {
        setSelectedType("theme")
        setCopyPayload("")
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
    <DialogPrimitive.Root open={open} onOpenChange={setOpen} data-slot="dialog">
      <DialogPrimitive.Trigger data-slot="dialog-trigger" asChild>
        <div>
          <Button
            variant="secondary"
            className={cn(
              "bg-muted hover:bg-muted/80 text-muted-foreground relative hidden h-8 w-full items-center justify-start pl-2.5 font-normal shadow-none sm:pr-12 md:flex md:w-64",
              className,
            )}
            {...rest}
          >
            <SearchIcon className="size-4" />
            <span className="inline-flex">Search docs...</span>
            <div className="absolute top-1/2 right-1.5 flex -translate-y-1/2 gap-1">
              <KbdGroup>
                <Kbd className="bg-background border">
                  {isMac ? <CommandIcon className="size-3" /> : "Ctrl"}
                </Kbd>
                <Kbd className="bg-background border">K</Kbd>
              </KbdGroup>
            </div>
          </Button>

          <Button
            variant="secondary"
            className="bg-card hover:bg-card/80 text-muted-foreground flex border shadow-none md:hidden"
          >
            <SearchIcon className="size-5" />
            <Kbd className="hidden py-3 text-base sm:inline-flex">/</Kbd>
          </Button>
        </div>
      </DialogPrimitive.Trigger>

      <DialogPrimitive.Portal data-slot="dialog-portal">
        <DialogPrimitive.Overlay
          data-slot="dialog-overlay"
          className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        />

        <DialogPrimitive.Content
          data-slot="dialog-content"
          className="fixed top-8 left-1/2 z-50 w-full max-w-[calc(100%-2rem)] -translate-x-1/2 translate-y-0 [--search-footer-height:calc(var(--spacing)*10)] lg:top-1/2 lg:max-w-3xl lg:-translate-y-1/2"
        >
          <DialogHeader className="sr-only">
            <DialogTitle>Search documentation...</DialogTitle>
            <DialogDescription>
              Search for a command to run...
            </DialogDescription>
          </DialogHeader>

          <CommandPrimitive
            data-slot="command"
            className="text-popover-foreground"
          >
            <InputGroup className="bg-popover dark:bg-popover h-16">
              <InputGroupAddon>
                <SearchIcon className="size-5" />
              </InputGroupAddon>

              <CommandPrimitive.Input
                data-slot="input-group-control"
                placeholder="Search docs..."
                className="placeholder:text-muted-foreground h-full flex-1 outline-none placeholder:text-lg"
              />

              <InputGroupAddon align="inline-end" className="shrink-0 pr-4">
                <Kbd className="bg-background border font-mono">ESC</Kbd>
              </InputGroupAddon>
            </InputGroup>

            <div className="bg-popover border-input mt-2 rounded-md border pb-(--search-footer-height) shadow-xs">
              <CommandPrimitive.List
                data-slot="command-list"
                className="max-h-[400px] overflow-auto lg:max-h-[500px]"
              >
                <CommandEmpty className="text-muted-foreground py-12 text-center text-sm">
                  No results found.
                </CommandEmpty>

                <CommandMenuItem
                  value="Go to Home"
                  item={{ type: "page", name: "Home" }}
                  tag="Root"
                  keywords={["home"]}
                  onHighlight={() => handlePageHighlight("page", "Home")}
                  onSelect={() => runCommand(() => router.push("/"))}
                />

                {tree.children.map(
                  (group) =>
                    group.type === "folder" &&
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
                            item={child}
                            tag={
                              group.name === "Create Lx2 App"
                                ? "Root"
                                : group.name
                            }
                            keywords={["page", "docs", `${child.description}`]}
                            onHighlight={() =>
                              handlePageHighlight(
                                "page",
                                child.name?.toString(),
                              )
                            }
                            onSelect={() => {
                              runCommand(() => router.push(child.url))
                            }}
                          />
                        )
                      }
                      return null
                    }),
                )}

                <CommandMenuItem
                  value={`${packageManager} create lx2-app@latest`}
                  tag="Command"
                  keywords={["install", "package"]}
                  onHighlight={() =>
                    handlePageHighlight("command", "create lx2-app@latest")
                  }
                  onSelect={() =>
                    runCommand(async () => {
                      setSelectedType("command")
                      setCopyPayload(`${packageManager} create lx2-app@latest`)
                      await navigator.clipboard.writeText(copyPayload)
                    })
                  }
                >
                  {packageManager} create lx2-app@latest
                </CommandMenuItem>

                <CommandMenuItem
                  value="Light"
                  item={{ name: "Light" }}
                  tag="Theme"
                  keywords={["light theme", "light"]}
                  onHighlight={() => handlePageHighlight("theme", "light")}
                  onSelect={() => runCommand(() => setTheme("light"))}
                />
                <CommandMenuItem
                  value="Dark"
                  item={{ name: "Dark" }}
                  tag="Theme"
                  keywords={["dark theme", "dark"]}
                  onHighlight={() => handlePageHighlight("theme", "dark")}
                  onSelect={() => runCommand(() => setTheme("dark"))}
                />
                <CommandMenuItem
                  value="System"
                  item={{ name: "System" }}
                  tag="Theme"
                  keywords={["system theme", "system"]}
                  onHighlight={() => handlePageHighlight("theme", "system")}
                  onSelect={() => runCommand(() => setTheme("system"))}
                />
              </CommandPrimitive.List>

              <div className="text-muted-foreground bg-popover border-input absolute inset-x-0 bottom-0 flex h-(--search-footer-height) items-center gap-2 rounded-b-md border px-4 text-xs font-medium">
                <div className="flex items-center gap-2">
                  <Kbd className="bg-background border">
                    <CornerDownLeftIcon />
                  </Kbd>{" "}
                  {selectedType === "page"
                    ? "Go to Page"
                    : selectedType === "theme"
                      ? "Change Theme"
                      : null}
                </div>
                {copyPayload && (
                  <>
                    <Separator orientation="vertical" className="h-4!" />
                    <div className="flex items-center gap-1">
                      <KbdGroup>
                        <Kbd className="bg-background border">
                          {isMac ? <CommandIcon className="size-3" /> : "Ctrl"}
                        </Kbd>
                        <Kbd className="bg-background border">C</Kbd>
                      </KbdGroup>
                      {copyPayload}
                    </div>
                  </>
                )}
              </div>
            </div>
          </CommandPrimitive>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}

type CommandMenuItemProps = React.ComponentProps<typeof CommandItem> & {
  item?: Partial<Item>
  tag?: React.ReactNode
  onHighlight?: () => void
  "data-selected"?: string
  "aria-selected"?: string
}

function CommandMenuItem(props: CommandMenuItemProps) {
  const ref = useRef<HTMLDivElement>(null)

  const { item, children, tag, className, onHighlight, ...rest } = props

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
    <CommandPrimitive.Item
      ref={ref}
      className={cn(
        "data-[selected=true]:bg-input/50 dark:data-[selected=true]:bg-muted/50 flex cursor-pointer items-center justify-between p-3 font-medium lg:p-4",
        className,
      )}
      {...rest}
    >
      <div className="flex flex-col">
        <div className="flex flex-col items-start gap-2 lg:flex-row lg:items-center">
          <span className="order-2 lg:order-1">
            {children ? children : item && item.name}
          </span>
          {tag && (
            <Badge className="bg-muted text-foreground/80 order-1 px-1 py-0 capitalize lg:order-2">
              {tag}
            </Badge>
          )}
        </div>
        {item && item.description && (
          <div className="text-muted-foreground line-clamp-1 text-sm font-normal">
            {item.description}
          </div>
        )}
      </div>
      {item && item.type === "page" && (
        <ChevronRight className="text-muted-foreground size-5 shrink-0" />
      )}
    </CommandPrimitive.Item>
  )
}
