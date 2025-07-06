"use client"

import { NextProvider } from "fumadocs-core/framework/next"
import { Provider as JotaiProvider } from "jotai"
import { ThemeProvider } from "next-themes"

export function Providers({ children }: { children: React.ReactNode }) {
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
