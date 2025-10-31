import { ArrowRight } from "lucide-react"

export function LegacyBanner() {
  return (
    <div className="bg-muted text-muted-foreground sticky top-0 z-[100] flex flex-col items-center justify-center gap-1.5 p-1 sm:flex-row">
      <span className="text-sm font-semibold">
        You are viewing the v1 docs.
      </span>
      <a
        href="https://create.lx2.dev"
        className="text-foreground flex items-center gap-1 underline hover:no-underline"
      >
        Switch to latest <ArrowRight className="size-3" />
      </a>
    </div>
  )
}
