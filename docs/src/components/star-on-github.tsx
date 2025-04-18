import { StarIcon } from "lucide-react"

import { Button, ButtonProps } from "@/components/ui/button"
import { GITHUB_CREATE_TNT_APP_REPO } from "@/constants"
import { cn } from "@/lib/utils"

export function StarOnGithub({
  size = "default",
  variant = "outline",
  className,
}: ButtonProps) {
  return (
    <Button size={size} variant={variant} className={cn(className)} asChild>
      <a
        href={GITHUB_CREATE_TNT_APP_REPO}
        rel="noopener noreferrer"
        target="_blank"
      >
        <StarIcon className="size-4 fill-yellow-500 stroke-yellow-500 dark:fill-yellow-400 dark:stroke-yellow-400" />
        Star on GitHub
      </a>
    </Button>
  )
}
