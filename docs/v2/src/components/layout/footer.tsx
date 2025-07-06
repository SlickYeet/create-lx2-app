import {
  AlertCircleIcon,
  BookOpenIcon,
  CodeIcon,
  MapIcon,
  MessageCircleQuestionIcon,
} from "lucide-react"
import Link from "next/link"

import { DiscordLink } from "@/components/discord-link"
import { Icons } from "@/components/icons"
import { Anchor } from "@/components/mdx/anchor"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/config"
import { getNpmVersion } from "@/lib/utils"

export async function Footer() {
  const npmVersionLatest = await getNpmVersion("latest")
  const npmVersionBeta = await getNpmVersion("beta")

  return (
    <footer className="mt-auto border-t py-12">
      <div className="container">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo and GitHub buttons */}
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center gap-2">
                <Icons.logo className="size-5 shrink-0 stroke-3" />
                <span className="text-lg font-bold">{siteConfig.name}</span>
              </Link>
            </div>
            <p className="text-muted-foreground max-w-xs text-sm">
              A powerful web application scaffolding CLI tool to jumpstart your
              projects with explosive speed.
            </p>

            <div className="flex gap-1">
              <Button size="icon" variant="ghost" asChild>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <Icons.github className="size-4" />
                </a>
              </Button>

              <DiscordLink size="icon" variant="ghost" />
            </div>
          </div>

          {/* Create TNT Stack links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Create TNT Stack</h3>
            <ul className="space-y-2">
              <li>
                <Anchor href={siteConfig.navItems[0].href}>Introduction</Anchor>
              </li>
              <li>
                <Anchor href="/getting-started">Getting Started</Anchor>
              </li>
              <li>
                <Anchor href="/why">Why?</Anchor>
              </li>
            </ul>
          </div>

          {/* Community links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Community</h3>
            <ul className="space-y-2">
              <li>
                <Anchor
                  href={`${siteConfig.links.github}/blob/main/CONTRIBUTING.md`}
                >
                  <div className="flex items-center gap-1.5">
                    <CodeIcon className="size-4" />
                    <span>Contributing Guidelines</span>
                  </div>
                </Anchor>
              </li>
              <li>
                <Anchor
                  href={`${siteConfig.links.github}/issues/new?template=bug_report.yml`}
                >
                  <div className="flex items-center gap-1.5">
                    <AlertCircleIcon className="size-4" />
                    <span>Report an Issue</span>
                  </div>
                </Anchor>
              </li>
              <li>
                <Anchor href={siteConfig.navItems[0].href}>
                  <div className="flex items-center gap-1.5">
                    <BookOpenIcon className="size-4" />
                    <span>Documentation</span>
                  </div>
                </Anchor>
              </li>
              <li>
                <Anchor href={siteConfig.links.discord}>
                  <div className="flex items-center gap-1.5">
                    <Icons.discord className="size-4" />
                    <span>Join our Discord</span>
                  </div>
                </Anchor>
              </li>
            </ul>
          </div>

          {/* Resources links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Anchor href="/faq">
                  <div className="flex items-center gap-1.5">
                    <MessageCircleQuestionIcon className="size-4" />
                    <span>FAQ</span>
                  </div>
                </Anchor>
              </li>
              <li>
                <Anchor href="/roadmap">
                  <div className="flex items-center gap-1.5">
                    <MapIcon className="size-4" />
                    <span>Roadmap</span>
                  </div>
                </Anchor>
              </li>
              <li>
                <Anchor href="https://lasse.famlam.ca">Portfolio</Anchor>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between border-t pt-8 md:flex-row">
          <div className="text-muted-foreground text-center text-sm md:text-left">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All right
            reserved.
          </div>
          <div className="mt-4 flex flex-col items-center text-center max-sm:space-y-4 sm:flex-row sm:gap-4 sm:text-left md:mt-0">
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              <a
                href={`https://www.npmjs.com/package/create-tnt-stack/v/${npmVersionLatest}`}
                target="_blank"
                className="text-muted-foreground text-sm hover:underline"
              >
                Latest: v{npmVersionLatest}
              </a>
              <a
                href={`https://www.npmjs.com/package/create-tnt-stack/v/${npmVersionBeta}`}
                target="_blank"
                className="text-muted-foreground text-sm hover:underline"
              >
                Beta: v{npmVersionBeta}
              </a>
            </div>

            <span className="text-muted-foreground hidden text-sm sm:block">
              |
            </span>

            <a
              href={`${siteConfig.links.github}/blob/main/LICENSE.md`}
              target="_blank"
              className="text-muted-foreground block text-sm hover:underline"
            >
              MIT License
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
