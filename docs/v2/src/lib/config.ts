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
  description:
    "Build modern web applications with today's most popular tools. Launch your TypeScript, Next.js, and Tailwind CSS projects with a bang.",
  url: "https://create.lx2.dev",
  ogImage:
    "https://opengraph.b-cdn.net/production/images/3db2fef4-89b2-482a-bf11-29259d3f1bda.png?token=9qAl6n5l1iI8IaST_CyAfcGDnPbQNM-mk-7PxwveB2Q&height=675&width=1200&expires=33287835224",
  links: {
    github: "https://github.com/SlickYeet/create-lx2-app",
    discord: "https://lx2.dev/discord",
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
    title: "Lx2 App",
    description:
      "Full-stack typesafe boilerplate with TypeScript, Next.js, and Tailwind CSS",
    icon: Rocket,
    color: "blue",
  },
  {
    title: "Choose Your Backend",
    description:
      "Control your the entire stack and your application with your choice of backend.",
    icon: Database,
    color: "purple",
  },
  {
    title: "Fully Customizable",
    description:
      "Choose only the packages and tools you need and customize the stack to fit your needs.",
    icon: Palette,
    color: "pink",
  },
  {
    title: "Developer Experience",
    description:
      "Well-documented and easy to use, Lx2 App is designed from the ground up to make your life easier.",
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
