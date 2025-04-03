import { cn } from "@/lib/utils"

interface ListProps {
  children: React.ReactNode
  className?: string
}

export function UL({ children, className }: ListProps) {
  return <ul className={cn("mb-4 list-disc pl-6", className)}>{children}</ul>
}

export function OL({ children, className }: ListProps) {
  return <ol className={cn("mb-4 list-decimal pl-6", className)}>{children}</ol>
}

export function LI({ children, className }: ListProps) {
  return <li className={cn("my-3", className)}>{children}</li>
}
