import {
  CodeIcon,
  DatabaseIcon,
  GithubIcon,
  PaletteIcon,
  RocketIcon,
  ZapIcon,
  type LucideIcon,
} from "lucide-react"

export const RELATIVE_INITIAL_DOCS_PATH = "/introduction"

export const GITHUB_CREATE_TNT_APP_REPO =
  "https://github.com/SlickYeet/create-tnt-stack"
export const DISCORD_LINK = "https://tntstack.org/discord"

export const SITE_TITLE =
  "Create TNT Stack | TypeScript, Next.js, Tailwind CSS Starter"
export const SITE_DESCRIPTION =
  "Build modern web applications with today's most popular tools. Launch your TypeScript, Next.js, and Tailwind CSS projects with a bang."
export const SITE_IMAGE =
  "https://opengraph.b-cdn.net/production/images/bbb17c9b-78ff-461f-a1a0-62bfb26d0004.png?token=VFzXyXk-G1Rzpf7kQNL9CrkqP4irm5n5ud7C-UPmrsU&height=645&width=1200&expires=33280994199"

export const MAIN_NAVIGATION: {
  href: string
  label: string
}[] = [
  { href: RELATIVE_INITIAL_DOCS_PATH, label: "Docs" },
  { href: "/faq", label: "FAQ" },
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
    slug: "/create-tnt-stack",
    items: [
      { slug: RELATIVE_INITIAL_DOCS_PATH, title: "Introduction" },
      { slug: "/getting-started", title: "Getting Started" },
      { slug: "/why", title: "Why?" },
      { slug: "/faq", title: "FAQ" },
      { slug: "/roadmap", title: "Roadmap" },
    ],
  },
  // Usage
  {
    title: "Usage",
    slug: "/usage",
    items: [
      { slug: "/first-steps", title: "First Steps" },
      { slug: "/nextjs", title: "Next.js" },
      { slug: "/authjs", title: "Auth.js" },
      { slug: "/better-auth", title: "Better Auth" },
      { slug: "/prisma", title: "Prisma ORM" },
      { slug: "/payloadcms", title: "Payload CMS" },
    ],
  },
  // Deployment
  {
    title: "Deployment",
    slug: "/deployment",
    items: [
      { slug: "/vercel", title: "Vercel" },
      // { slug: "/netlify", title: "Netlify" },
    ],
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
    title: "Choose Your Backend",
    description:
      "Control your the entire stack and your application with your choice of backend.",
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
