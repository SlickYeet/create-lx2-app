import {
  CodeIcon,
  DatabaseIcon,
  GithubIcon,
  LucideIcon,
  PaletteIcon,
  RocketIcon,
  ZapIcon,
} from "lucide-react"

export const RELATIVE_INITIAL_DOCS_PATH = "/docs/introduction"

export const GITHUB_CREATE_TNT_APP_REPO =
  "https://github.com/SlickYeet/create-tnt-stack"

export const MAIN_NAVIGATION: {
  href: string
  label: string
}[] = [
  { href: "/", label: "Home" },
  { href: "/docs", label: "Docs" },
]

export type NavigationSection = {
  title: string
  slug: string
  items: {
    slug: string
    title: string
  }[]
}

export const SIDEBAR_NAVIGATION: NavigationSection[] = [
  // Create TNT Stack
  {
    title: "Create TNT Stack",
    slug: "create-tnt-stack",
    items: [
      { slug: "introduction", title: "Introduction" },
      { slug: "getting-started", title: "Getting Started" },
      { slug: "why", title: "Why?" },
    ],
  },
  // Usage
  {
    title: "Usage",
    slug: "usage",
    items: [
      { slug: "first-steps", title: "First Steps" },
      { slug: "nextjs", title: "Next.js" },
      { slug: "payloadcms", title: "Payload CMS" },
    ],
  },
  // Deploymeny
  //   {
  //     title: "Deployment",
  //     slug: "deployment",
  //     items: [
  //       { slug: "vercel", title: "Vercel" },
  //       { slug: "netlify", title: "Netlify" },
  //     ],
  //   },
  // Roadmap
  {
    title: "Roadmap",
    slug: "roadmap",
    items: [{ slug: "v1", title: "Version 1" }],
  },
] as const

export type FeatureType = {
  title: string
  description: string
  icon: LucideIcon
  color: "blue" | "purple" | "pink" | "amber" | "emerald" | "red"
}

export const FEATURES: FeatureType[] = [
  {
    title: "TNT Stack",
    description:
      "Full-stack typesafe boilerplate with TypeScript, Next.js, and Tailwind CSS",
    icon: RocketIcon,
    color: "blue",
  },
  {
    title: "Payload CMS Included",
    description:
      "Build beautiful content based applications with Payload CMS the backend to build the modern web.",
    icon: DatabaseIcon,
    color: "purple",
  },
  {
    title: "Fully Customizable",
    description:
      "Choose only the packages and tools you need and customize the stack to fit your needs.",
    icon: PaletteIcon,
    color: "pink",
  },
  {
    title: "Developer Experience",
    description:
      "Well-documented and easy to use, TNT Stack is designed from the ground up to make your life easier.",
    icon: CodeIcon,
    color: "amber",
  },
  {
    title: "Performance Optimized",
    description:
      "With Next.js at its core, TNT Stack is optimized for performance and SEO out of the box.",
    icon: ZapIcon,
    color: "emerald",
  },
  {
    title: "Open Source",
    description:
      "Fully open-sourced under MIT/GNU license. Contributions are welcome!",
    icon: GithubIcon,
    color: "red",
  },
]
