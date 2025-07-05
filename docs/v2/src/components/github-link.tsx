import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/config"

interface GithubLinkProps extends React.ComponentProps<typeof Button> {
  withText?: boolean
}

export function GithubLink({
  size = "icon",
  variant = "ghost",
  withText = false,
}: GithubLinkProps) {
  return (
    <Button size={withText ? "default" : size} variant={variant} asChild>
      <a
        href={siteConfig.links.github}
        rel="noopener noreferrer"
        target="_blank"
      >
        <Icons.github />
        {withText && (
          <span className="hidden text-sm font-medium md:inline-flex">
            Star on GitHub
          </span>
        )}
      </a>
    </Button>
  )
}
