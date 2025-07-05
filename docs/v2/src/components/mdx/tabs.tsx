"use client"

import React, { createContext, useEffect, useState } from "react"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
  Tabs as ShadcnTabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

const TabsContext = createContext<
  { activeTab: string; setActiveTab: (title: string) => void } | undefined
>(undefined)

interface TabsProps {
  items: string[]
  defaultIndex?: number
  children: React.ReactNode
}

function Tabs({ items, defaultIndex = 0, children }: TabsProps) {
  const [activeTab, setActiveTab] = useState<string>(items[defaultIndex] || "")

  useEffect(() => {
    if (defaultIndex < 0 || defaultIndex >= items.length) {
      setActiveTab(items[0])
    } else {
      setActiveTab(items[defaultIndex])
    }
  }, [defaultIndex, items])

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <ShadcnTabs value={activeTab} className="relative mt-6 w-full">
        <ScrollArea>
          <TabsList className="justify-start gap-4 rounded-none bg-transparent px-2 md:px-0">
            {items.map((item, index) => (
              <TabsTrigger
                key={index}
                value={item}
                onClick={() => setActiveTab(item)}
                className={cn(
                  "text-muted-foreground data-[state=active]:text-primary! hover:text-muted-foreground/80! text-base data-[state=active]:shadow-none dark:data-[state=active]:border-transparent dark:data-[state=active]:bg-transparent",
                )}
              >
                {item}
              </TabsTrigger>
            ))}
          </TabsList>
          <ScrollBar orientation="horizontal" className="h-0" />
        </ScrollArea>
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            const isActive = items[index] === activeTab
            return (
              <TabsContent
                key={items[index]}
                value={items[index]}
                hidden={!isActive}
                className="relative [&_h3]:text-base [&_h3]:font-medium *:[figure]:first:mt-0 [&>.steps]:mt-6"
              >
                {child}
              </TabsContent>
            )
          }
          return null
        })}
      </ShadcnTabs>
    </TabsContext.Provider>
  )
}
Tabs.displayName = "Tabs"

function Tab({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn(className)} {...props} />
}
Tabs.Tab = Tab
Tab.displayName = "Tab"

export { Tab, Tabs }
