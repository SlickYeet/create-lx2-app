import {
  Code,
  Database,
  Github,
  Palette,
  Rocket,
  Zap,
  type LucideIcon,
} from "lucide-react"

export const siteConfig = {
  name: "Create Lx2 App",
  description: "The Most Opinionated Way to Build Next.js Apps",
  url: "https://create.lx2.dev",
  ogImage:
    "https://opengraph.b-cdn.net/production/images/dc4fc423-b479-4749-affc-7d5cde0f5587.png?token=b2Fi8FhjWFLaTtm3lT7_CRZRMf3AjDD78LlkOStxOGk&height=675&width=1200&expires=33294259508",
  links: {
    github: "https://github.com/SlickYeet/create-lx2-app",
    discord: "https://link.lx2.dev/discord",
  },
  navItems: [
    {
      label: "Docs",
      href: "/docs/getting-started",
    },
    {
      label: "FAQ",
      href: "/docs/faq",
    },
  ],
}

export type FeatureType = {
  title: string
  description: string
  icon: LucideIcon
  color: "blue" | "purple" | "pink" | "amber" | "emerald" | "red"
}

export const FEATURES: FeatureType[] = [
  {
    title: "Full-Stack",
    description:
      "Full-stack typesafe boilerplate with TypeScript, Next.js, and Tailwind CSS",
    icon: Rocket,
    color: "blue",
  },
  {
    title: "Choose Your Backend",
    description: "Control your the entire stack with your choice of backend.",
    icon: Database,
    color: "purple",
  },
  {
    title: "Fully Customizable",
    description:
      "Choose only the tools you need and customize the stack to fit you.",
    icon: Palette,
    color: "pink",
  },
  {
    title: "Developer Experience",
    description:
      "Well-documented and opinionated, Lx2 App is designed from the ground up to be developer-friendly.",
    icon: Code,
    color: "amber",
  },
  {
    title: "Performance Optimized",
    description:
      "With Next.js at its core, Lx2 App is optimized for performance and SEO out of the box.",
    icon: Zap,
    color: "emerald",
  },
  {
    title: "Open Source",
    description:
      "Fully open-sourced under MIT/GNU license. Contributions are welcome!",
    icon: Github,
    color: "red",
  },
]
