import { cn } from "@/lib/utils"

export const Img = ({
  className,
  alt,
  ...props
}: React.ComponentProps<"img">) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img className={cn("rounded-md", className)} alt={alt} {...props} />
)
