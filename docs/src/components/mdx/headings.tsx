import { cn } from "@/lib/utils"

interface HeadingProps {
  children: React.ReactNode
  id?: string
  className?: string
}

export function H1({ children, id, className }: HeadingProps) {
  return (
    <h1
      id={id}
      className={cn(
        "mb-4 scroll-m-20 text-4xl font-bold tracking-tight",
        className,
      )}
    >
      {children}
    </h1>
  )
}

export function H2({ children, id, className }: HeadingProps) {
  return (
    <h2
      id={id}
      className={cn(
        "mb-4 scroll-m-20 border-b pb-2 text-3xl font-bold tracking-tight",
        className,
      )}
    >
      {children}
    </h2>
  )
}

export function H3({ children, id, className }: HeadingProps) {
  return (
    <h3
      id={id}
      className={cn(
        "mb-3 scroll-m-20 text-2xl font-bold tracking-tight",
        className,
      )}
    >
      {children}
    </h3>
  )
}

export function H4({ children, id, className }: HeadingProps) {
  return (
    <h4
      id={id}
      className={cn(
        "mb-2 scroll-m-20 text-xl font-bold tracking-tight",
        className,
      )}
    >
      {children}
    </h4>
  )
}

export function H5({ children, id, className }: HeadingProps) {
  return (
    <h5
      id={id}
      className={cn(
        "mb-2 scroll-m-20 text-lg font-bold tracking-tight",
        className,
      )}
    >
      {children}
    </h5>
  )
}

export function H6({ children, id, className }: HeadingProps) {
  return (
    <h6
      id={id}
      className={cn(
        "mb-2 scroll-m-20 text-base font-bold tracking-tight",
        className,
      )}
    >
      {children}
    </h6>
  )
}
