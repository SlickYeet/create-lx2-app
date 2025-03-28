import { GithubIcon, StarIcon } from "lucide-react"
import Link from "next/link"

import { Logo } from "@/components/logo"
import { Anchor } from "@/components/mdx/anchor"
import { Button } from "@/components/ui/button"
import {
  GITHUB_CREATE_TNT_APP_REPO,
  RELATIVE_INITIAL_DOCS_PATH,
} from "@/constants"

export function Footer() {
  return (
    <footer className="border-t py-6 md:pt-8">
      <div className="container flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2">
          <Link href="/">
            <Logo animate={false} ping={false} textClassName="inline-block" />
          </Link>
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} TNT-Powered CLI.{" "}
            <a
              href={`${GITHUB_CREATE_TNT_APP_REPO}/blob/main/LICENSE.md`}
              target="_blank"
              className="hover:underline"
            >
              MIT License
            </a>
            .
          </p>
        </div>

        <div className="text-muted-foreground flex flex-col items-start gap-4 text-sm md:flex-row md:items-center md:justify-between md:gap-6">
          <div className="flex flex-col gap-2 md:flex-row md:gap-4">
            <Anchor
              href={RELATIVE_INITIAL_DOCS_PATH}
              className="text-muted-foreground hover:underline"
            >
              Documentation
            </Anchor>
            <Anchor
              href={`${GITHUB_CREATE_TNT_APP_REPO}/blob/main/CONTRIBUTING.md`}
              className="text-muted-foreground hover:underline"
            >
              Contributing
            </Anchor>
            <Anchor
              href={`${GITHUB_CREATE_TNT_APP_REPO}/issues/new?template=bug_report.yml`}
              className="text-muted-foreground hover:underline"
            >
              Report Issue
            </Anchor>
          </div>

          <div className="flex items-center gap-2">
            <Button size="icon" variant="outline" asChild>
              <Link
                href={GITHUB_CREATE_TNT_APP_REPO}
                target="_blank"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon className="size-4" />
              </Link>
            </Button>

            <Button variant="outline" asChild>
              <Link href={GITHUB_CREATE_TNT_APP_REPO} target="_blank">
                <StarIcon className="size-4 fill-yellow-500 stroke-yellow-500 dark:fill-yellow-400 dark:stroke-yellow-400" />
                Star on GitHub
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}
