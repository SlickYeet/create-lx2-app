"use client"

import React, {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

const TabsContext = createContext<
  { activeTab: string; setActiveTab: (title: string) => void } | undefined
>(undefined)

interface TabsProps {
  items: string[]
  defaultIndex?: number
  children: ReactNode
}

function Tabs({ items, defaultIndex = 0, children }: TabsProps) {
  const [activeTab, setActiveTab] = useState<string>(items[defaultIndex] || "")

  useEffect(() => {
    if (defaultIndex < 0 || defaultIndex >= items.length) {
      function resetActiveTab() {
        setActiveTab(items[0])
      }
      resetActiveTab()
    } else {
      function setDefaultActiveTab() {
        setActiveTab(items[defaultIndex])
      }
      setDefaultActiveTab()
    }
  }, [defaultIndex, items])

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="mt-4">
        <ScrollArea className="border-b">
          <div className="flex gap-2">
            {items.map((item, index) => (
              <button
                key={index}
                className={cn(
                  "z-10 shrink-0 cursor-pointer border-b px-4 py-2 text-sm font-medium transition-colors",
                  activeTab === item
                    ? "border-primary text-primary"
                    : "text-muted-foreground hover:text-muted-foreground/80 border-transparent",
                )}
                onClick={() => setActiveTab(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="h-0" />
        </ScrollArea>
        <div className="mt-6 mb-12">
          {React.Children.map(children, (child, index) => {
            if (React.isValidElement(child) && items[index] === activeTab) {
              return child
            }
            return null
          })}
        </div>
      </div>
    </TabsContext.Provider>
  )
}
Tabs.displayName = "Tabs"

interface TabProps {
  children: ReactNode
}

function Tab({ children }: TabProps) {
  return <div>{children}</div>
}
Tabs.Tab = Tab
Tab.displayName = "Tab"

export { Tab, Tabs }
