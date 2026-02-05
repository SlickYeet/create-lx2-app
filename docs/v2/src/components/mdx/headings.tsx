import { LinkIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export const H1 = ({ className, ...props }: React.ComponentProps<"h1">) => (
  <h1
    className={cn(
      "group mt-2 scroll-m-28 text-3xl font-bold tracking-tight",
      className,
    )}
    {...props}
  >
    <a href={`#${props.id}`}>{props.children}</a>
    <LinkIcon className="text-muted-foreground ml-2 inline size-5 opacity-0 transition group-hover:opacity-100" />
  </h1>
)
export const H2 = ({ className, ...props }: React.ComponentProps<"h2">) => (
  <h2
    className={cn(
      "group font-heading mt-12 scroll-m-28 text-2xl font-medium tracking-tight first:mt-0 [&+p]:mt-4! *:[code]:text-2xl",
      className,
    )}
    {...props}
  >
    <a href={`#${props.id}`}>{props.children}</a>
    <LinkIcon className="text-muted-foreground ml-2 inline size-4 opacity-0 transition group-hover:opacity-100" />
  </h2>
)
export const H3 = ({ className, ...props }: React.ComponentProps<"h3">) => (
  <h3
    className={cn(
      "group mt-8 scroll-m-28 text-xl font-semibold tracking-tight *:[code]:text-xl",
      className,
    )}
    {...props}
  >
    <a href={`#${props.id}`}>{props.children}</a>
    <LinkIcon className="text-muted-foreground ml-2 inline size-3.5 opacity-0 transition group-hover:opacity-100" />
  </h3>
)
export const H4 = ({ className, ...props }: React.ComponentProps<"h4">) => (
  <h4
    className={cn(
      "group font-heading mt-8 scroll-m-28 text-lg font-medium tracking-tight",
      className,
    )}
    {...props}
  >
    <a href={`#${props.id}`}>{props.children}</a>
    <LinkIcon className="text-muted-foreground ml-2 inline size-4 opacity-0 transition group-hover:opacity-100" />
  </h4>
)
export const H5 = ({ className, ...props }: React.ComponentProps<"h5">) => (
  <h5
    className={cn(
      "group mt-8 scroll-m-28 text-lg font-medium tracking-tight",
      className,
    )}
    {...props}
  >
    <a href={`#${props.id}`}>{props.children}</a>
    <LinkIcon className="text-muted-foreground ml-2 inline size-4 opacity-0 transition group-hover:opacity-100" />
  </h5>
)
export const H6 = ({ className, ...props }: React.ComponentProps<"h6">) => (
  <h6
    className={cn(
      "group mt-8 scroll-m-28 text-base font-medium tracking-tight",
      className,
    )}
    {...props}
  >
    <a href={`#${props.id}`}>{props.children}</a>
    <LinkIcon className="text-muted-foreground ml-2 inline size-3.5 opacity-0 transition group-hover:opacity-100" />
  </h6>
)
