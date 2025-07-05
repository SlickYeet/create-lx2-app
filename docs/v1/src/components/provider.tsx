"use client"

import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from "next-themes"
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

interface WrapLinesContextProps {
  wrapLines: boolean
  toggleWrapLines: () => void
}

const WrapLinesContext = createContext<WrapLinesContextProps | undefined>(
  undefined,
)

export function WrapLinesProvider({ children }: { children: ReactNode }) {
  const [wrapLines, setWrapLines] = useState<boolean>(false)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    const storedValue = localStorage.getItem("data-wrap-lines") === "true"
    setWrapLines(storedValue)
    setIsHydrated(true)
  }, [])

  const toggleWrapLines = () => {
    setWrapLines((prev) => !prev)
    localStorage.setItem("data-wrap-lines", (!wrapLines).toString())
  }

  if (!isHydrated) {
    return null
  }

  return (
    <WrapLinesContext.Provider value={{ wrapLines, toggleWrapLines }}>
      {children}
    </WrapLinesContext.Provider>
  )
}

export function useWrapLines() {
  const context = useContext(WrapLinesContext)
  if (!context) {
    throw new Error("useWrapLines must be used within a WrapLinesProvider")
  }
  return context
}
