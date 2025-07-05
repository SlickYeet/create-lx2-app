import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/config"

interface DiscordLinkProps extends React.ComponentProps<typeof Button> {
  withText?: boolean
}

export function DiscordLink({
  size = "icon",
  variant = "ghost",
  withText = false,
}: DiscordLinkProps) {
  return (
    <Button size={withText ? "default" : size} variant={variant} asChild>
      <a
        href={siteConfig.links.discord}
        rel="noopener noreferrer"
        target="_blank"
      >
        <Icons.discord />
        {withText && (
          <span className="hidden text-sm font-medium md:inline-flex">
            Join us on Discord
          </span>
        )}
      </a>
    </Button>
  )
}
