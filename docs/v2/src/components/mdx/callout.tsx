import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Info,
  Lightbulb,
  type LucideIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

interface CalloutProps {
  title?: string
  type: "default" | "error" | "info" | "warning" | "success"
  children: React.ReactNode
}

export function Callout(props: CalloutProps) {
  const { title, type, children } = props

  const iconMap: Record<typeof type, LucideIcon> = {
    default: Lightbulb,
    error: AlertCircle,
    info: Info,
    warning: AlertTriangle,
    success: CheckCircle,
  }
  const Icon = iconMap[type]

  const classes: Record<typeof type, string> = {
    default:
      "border-border dark:border-muted bg-muted dark:bg-muted/30 text-foreground/90",
    error:
      "border-rose-300 bg-rose-100 text-rose-900 dark:border-rose-500/30 dark:bg-rose-900/30 dark:text-rose-200",
    info: "border-sky-300 bg-sky-100 text-sky-900 dark:border-sky-500/30 dark:bg-sky-900/30 dark:text-sky-200",
    warning:
      "border-amber-400 bg-amber-100 text-amber-900 dark:border-amber-500/30 dark:bg-amber-900/30 dark:text-amber-200",
    success:
      "border-emerald-300 bg-emerald-100 text-emerald-900 dark:border-emerald-500/30 dark:bg-emerald-900/30 dark:text-emerald-200",
  }

  return (
    <div
      className={cn(
        "my-6 flex overflow-x-auto rounded-lg border py-2 pe-4",
        "contrast-more:border-current",
        classes[type],
      )}
    >
      <div
        className="ps-3 pe-2 text-sm select-none"
        style={{
          fontFamily:
            '"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        }}
      >
        <Icon className="mt-0.5 size-5" />
      </div>
      <div>
        {title && <span className="text-base font-semibold">{title}</span>}
        <div className="w-full min-w-0 leading-7">{children}</div>
      </div>
    </div>
  )
}
