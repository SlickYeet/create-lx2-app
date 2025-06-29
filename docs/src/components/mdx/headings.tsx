import { type ComponentProps } from "react"

import { cn } from "@/lib/utils"

export const H1 = ({ className, ...props }: ComponentProps<"h1">) => (
  <h1
    className={cn(
      "mt-2 scroll-m-28 text-3xl font-bold tracking-tight",
      className,
    )}
    {...props}
  />
)
export const H2 = ({ className, ...props }: ComponentProps<"h2">) => (
  <h2
    id={props.children
      ?.toString()
      .replace(/ /g, "-")
      .replace(/'/g, "")
      .replace(/\?/g, "")
      .toLowerCase()}
    className={cn(
      "font-heading mt-12 scroll-m-28 text-2xl font-medium tracking-tight first:mt-0 lg:mt-20 [&+p]:!mt-4 *:[code]:text-2xl",
      className,
    )}
    {...props}
  />
)
export const H3 = ({ className, ...props }: ComponentProps<"h3">) => (
  <h3
    className={cn(
      "mt-8 scroll-m-28 text-xl font-semibold tracking-tight *:[code]:text-xl",
      className,
    )}
    {...props}
  />
)
export const H4 = ({ className, ...props }: ComponentProps<"h4">) => (
  <h4
    className={cn(
      "font-heading mt-8 scroll-m-28 text-lg font-medium tracking-tight",
      className,
    )}
    {...props}
  />
)
export const H5 = ({ className, ...props }: ComponentProps<"h5">) => (
  <h5
    className={cn(
      "mt-8 scroll-m-28 text-lg font-medium tracking-tight",
      className,
    )}
    {...props}
  />
)
export const H6 = ({ className, ...props }: ComponentProps<"h6">) => (
  <h6
    className={cn(
      "mt-8 scroll-m-28 text-base font-medium tracking-tight",
      className,
    )}
    {...props}
  />
)
