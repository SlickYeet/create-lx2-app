import { cn } from "@/lib/utils"

export function Ul({ className, ...props }: React.ComponentProps<"ul">) {
  return <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
}

export function Ol({ className, ...props }: React.ComponentProps<"ol">) {
  return <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
}

export function Li({ className, ...props }: React.ComponentProps<"li">) {
  return <li className={cn("marker:text-primary mt-2", className)} {...props} />
}
