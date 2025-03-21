import { type LucideIcon } from "lucide-react"

export interface RenderTitleProps {
  label: string
  icon?: LucideIcon
}

export function RenderTitle({ label, icon: Icon }: RenderTitleProps) {
  return (
    <span className="hover:text-foreground/80 relative flex items-center gap-2 text-sm font-medium transition-colors">
      {Icon && <Icon className="size-4" />}
      {label}
    </span>
  )
}
