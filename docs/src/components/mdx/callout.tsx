import {
  AlertCircle,
  AlertTriangleIcon,
  CheckCircleIcon,
  InfoIcon,
  LightbulbIcon,
  type LucideIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

interface CalloutProps {
  children: React.ReactNode
  type?: "default" | "error" | "info" | "warning" | "success"
  title?: string
}

export function Callout({ children, type = "default", title }: CalloutProps) {
  const iconMap: Record<typeof type, LucideIcon> = {
    default: LightbulbIcon,
    error: AlertCircle,
    info: InfoIcon,
    warning: AlertTriangleIcon,
    success: CheckCircleIcon,
  }
  const Icon = iconMap[type]

  const classes: Record<typeof type, string> = {
    default:
      "border-neutral-200 bg-neutral-100 text-neutral-900 dark:border-neutral-500/10 dark:bg-neutral-900/30 dark:text-neutral-200",
    error:
      "border-red-200 bg-red-100 text-red-900 dark:border-red-500/10 dark:bg-red-900/30 dark:text-red-200",
    info: "border-blue-200 bg-blue-100 text-blue-900 dark:border-blue-500/10 dark:bg-blue-900/30 dark:text-blue-200",
    warning:
      "border-yellow-200 bg-yellow-100 text-yellow-900 dark:border-yellow-500/10 dark:bg-yellow-900/30 dark:text-yellow-200",
    success:
      "border-green-200 bg-green-100 text-green-900 dark:border-green-500/10 dark:bg-green-900/30 dark:text-green-200",
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
        <Icon className={cn("size-5", title ? "mt-0.5" : "mt-1")} />
      </div>
      <div>
        {title && <span className="text-base font-semibold">{title}</span>}
        <div className="w-full min-w-0 leading-7">{children}</div>
      </div>
    </div>
  )
}
