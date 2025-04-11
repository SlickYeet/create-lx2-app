"use client"

import { TerminalIcon } from "lucide-react"
import { useEffect } from "react"

import { player } from "@/lib/asciinema-player"

import "asciinema-player/dist/bundle/asciinema-player.css"

export function TerminalDemo() {
  useEffect(() => {
    const container = document.getElementById("demo")
    if (!container) {
      console.error("Demo container not found.")
      return
    }

    player(container, {
      cols: 120,
      rows: 22,
      autoplay: true,
      preload: true,
      loop: true,
      speed: 1.5,
      theme: "tango",
    })
  }, [])

  return (
    <div className="h-[450px] overflow-hidden bg-[#121314] p-4 font-mono text-sm">
      <div className="mb-4 flex items-center gap-2">
        <div className="size-3 rounded-full bg-red-500" />
        <div className="size-3 rounded-full bg-yellow-500" />
        <div className="size-3 rounded-full bg-green-500" />
        <TerminalIcon className="ml-2 size-4 text-gray-300" />
      </div>

      <div id="demo" className="-mx-4 h-[calc(100%-1rem)]" />
    </div>
  )
}
