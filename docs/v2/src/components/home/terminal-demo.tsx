"use client"

import { TerminalIcon } from "lucide-react"
import { useEffect } from "react"

import "asciinema-player/dist/bundle/asciinema-player.css"

export function TerminalDemo() {
  useEffect(() => {
    import("asciinema-player").then(({ create }) => {
      const container = document.getElementById("demo-player")
      if (!container) {
        console.error("Demo container not found.")
        return
      }

      container.innerHTML = ""

      create("/demo.cast", container, {
        rows: 22,
        autoPlay: true,
        preload: true,
        loop: true,
        speed: 1.5,
        theme: "ctnts",
        fit: "width",
        controls: "auto",
        terminalFontSize: "large",
        terminalFontFamily: "Cascadia Mono, monospace",
        terminalLineHeight: 1.2,
      })
    })

    return () => {
      const container = document.getElementById("demo-player")
      if (container) container.innerHTML = ""
    }
  }, [])

  return (
    <div className="min-h-full overflow-hidden bg-black px-4 pt-4 md:min-h-[400px] 2xl:min-h-[600px]">
      <div className="mb-4 flex items-center gap-2">
        <div className="size-3 rounded-full bg-red-500" />
        <div className="size-3 rounded-full bg-yellow-500" />
        <div className="size-3 rounded-full bg-green-500" />
        <TerminalIcon className="ml-2 size-4 text-gray-300" />
      </div>
      <div className="-mx-4">
        <div id="demo-player" />
      </div>
    </div>
  )
}
