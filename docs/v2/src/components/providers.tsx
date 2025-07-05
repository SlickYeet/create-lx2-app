"use client"

import { NextProvider } from "fumadocs-core/framework/next"
import { Provider as JotaiProvider } from "jotai"
import { ThemeProvider } from "next-themes"
import type { ReactNode } from "react"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <JotaiProvider>
        <NextProvider>{children}</NextProvider>
      </JotaiProvider>
    </ThemeProvider>
  )
}
