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
  name: "Create TNT Stack",
  description:
    "Build modern web applications with today's most popular tools. Launch your TypeScript, Next.js, and Tailwind CSS projects with a bang.",
  url: "https://create.tntstack.org",
  ogImage:
    "https://opengraph.b-cdn.net/production/images/bbb17c9b-78ff-461f-a1a0-62bfb26d0004.png?token=VFzXyXk-G1Rzpf7kQNL9CrkqP4irm5n5ud7C-UPmrsU&height=645&width=1200&expires=33280994199",
  links: {
    github: "https://github.com/SlickYeet/create-tnt-stack",
    discord: "https://tntstack.org/discord",
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
    title: "TNT Stack",
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
      "Well-documented and easy to use, TNT Stack is designed from the ground up to make your life easier.",
    icon: Code,
    color: "amber",
  },
  {
    title: "Performance Optimized",
    description:
      "With Next.js at its core, TNT Stack is optimized for performance and SEO out of the box.",
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
