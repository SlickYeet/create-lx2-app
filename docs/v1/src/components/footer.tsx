import {
  AlertCircleIcon,
  BookOpenIcon,
  CodeIcon,
  MapIcon,
  MessageCircleQuestionIcon,
} from "lucide-react"
import Link from "next/link"

import {
  DISCORD_LINK,
  GITHUB_CREATE_TNT_APP_REPO,
  RELATIVE_INITIAL_DOCS_PATH,
} from "../constants"
import { getNpmVersion } from "../lib/utils"
import { DiscordLink } from "./discord-link"
import { Logo } from "./logo"
import { Anchor } from "./mdx/anchor"
import { Button } from "./ui/button"

export async function Footer() {
  const npmVersionLatest = await getNpmVersion("latest")
  const npmVersionBeta = await getNpmVersion("beta")

  return (
    <footer className="mt-auto border-t py-12">
      <div className="container">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo and GitHub buttons */}
          <div className="flex flex-col items-start gap-6">
            <div className="flex items-center gap-2">
              <Link href="/">
                <Logo
                  animate={false}
                  ping={false}
                  textClassName="inline-block"
                />
              </Link>
            </div>
            <p className="text-muted-foreground max-w-xs text-sm">
              A powerful web application scaffolding CLI tool to jumpstart your
              projects with explosive speed.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" asChild>
                <a
                  href={GITHUB_CREATE_TNT_APP_REPO}
                  rel="noopener noreferrer"
                  target="_blank"
                  aria-label="GitHub"
                >
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 1024 1024"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
                      transform="scale(64)"
                      fill="currentColor"
                    />
                  </svg>
                  <span>Repository</span>
                </a>
              </Button>

              <DiscordLink withText />
            </div>
          </div>

          {/* Create TNT Stack links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Create TNT Stack</h3>
            <ul className="space-y-2">
              <li>
                <Anchor href={RELATIVE_INITIAL_DOCS_PATH}>Introduction</Anchor>
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
                  href={`${GITHUB_CREATE_TNT_APP_REPO}/blob/main/CONTRIBUTING.md`}
                >
                  <div className="flex items-center gap-1.5">
                    <CodeIcon className="size-4" />
                    <span>Contributing Guidelines</span>
                  </div>
                </Anchor>
              </li>
              <li>
                <Anchor
                  href={`${GITHUB_CREATE_TNT_APP_REPO}/issues/new?template=bug_report.yml`}
                >
                  <div className="flex items-center gap-1.5">
                    <AlertCircleIcon className="size-4" />
                    <span>Report an Issue</span>
                  </div>
                </Anchor>
              </li>
              <li>
                <Anchor href={RELATIVE_INITIAL_DOCS_PATH}>
                  <div className="flex items-center gap-1.5">
                    <BookOpenIcon className="size-4" />
                    <span>Documentation</span>
                  </div>
                </Anchor>
              </li>
              <li>
                <Anchor href={DISCORD_LINK}>
                  <div className="flex items-center gap-1.5">
                    <svg
                      viewBox="0 0 256 199"
                      width="1em"
                      height="1em"
                      xmlns="http://www.w3.org/2000/svg"
                      preserveAspectRatio="xMidYMid"
                    >
                      <path
                        d="M216.856 16.597A208.502 208.502 0 0 0 164.042 0c-2.275 4.113-4.933 9.645-6.766 14.046-19.692-2.961-39.203-2.961-58.533 0-1.832-4.4-4.55-9.933-6.846-14.046a207.809 207.809 0 0 0-52.855 16.638C5.618 67.147-3.443 116.4 1.087 164.956c22.169 16.555 43.653 26.612 64.775 33.193A161.094 161.094 0 0 0 79.735 175.3a136.413 136.413 0 0 1-21.846-10.632 108.636 108.636 0 0 0 5.356-4.237c42.122 19.702 87.89 19.702 129.51 0a131.66 131.66 0 0 0 5.355 4.237 136.07 136.07 0 0 1-21.886 10.653c4.006 8.02 8.638 15.67 13.873 22.848 21.142-6.58 42.646-16.637 64.815-33.213 5.316-56.288-9.08-105.09-38.056-148.36ZM85.474 135.095c-12.645 0-23.015-11.805-23.015-26.18s10.149-26.2 23.015-26.2c12.867 0 23.236 11.804 23.015 26.2.02 14.375-10.148 26.18-23.015 26.18Zm85.051 0c-12.645 0-23.014-11.805-23.014-26.18s10.148-26.2 23.014-26.2c12.867 0 23.236 11.804 23.015 26.2 0 14.375-10.148 26.18-23.015 26.18Z"
                        stroke="currentColor"
                        strokeWidth="20"
                      />
                    </svg>
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
          <div className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} TNT-Powered. All right reserved.
          </div>
          <div className="mt-4 flex flex-col items-center text-center max-sm:space-y-4 sm:flex-row sm:gap-4 sm:text-left md:mt-0">
            <div className="space-x-1.5">
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

            <span className="text-muted-foreground hidden text-sm md:block">
              |
            </span>

            <a
              href={`${GITHUB_CREATE_TNT_APP_REPO}/blob/main/LICENSE.md`}
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
