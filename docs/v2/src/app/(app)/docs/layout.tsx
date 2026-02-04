import { ScrollToTop } from "@/components/docs/scroll-to-top"
import { DocsSidebar } from "@/components/docs/sidebar"
import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"
import { SidebarProvider } from "@/components/ui/sidebar"
import { source } from "@/lib/source"

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header className="block lg:hidden" />
      <div className="flex flex-1 flex-col">
        <SidebarProvider>
          <DocsSidebar tree={source.pageTree} />
          <div className="size-full flex-1">
            <div className="min-h-svh">{children}</div>
            <Footer />
          </div>
        </SidebarProvider>
      </div>
      <ScrollToTop />
    </>
  )
}
