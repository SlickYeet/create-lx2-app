import {
  CodeIcon,
  DatabaseIcon,
  GithubIcon,
  LucideIcon,
  PaletteIcon,
  RocketIcon,
  ZapIcon,
} from "lucide-react"

export const GITHUB_CREATE_TNT_APP_REPO =
  "https://github.com/SlickYeet/create-tnt-app"

export type FeatureType = {
  title: string
  description: string
  icon: LucideIcon
  color: "blue" | "purple" | "pink" | "amber" | "emerald" | "red"
}

export const FEATURES: FeatureType[] = [
  {
    title: "TNT Stack Integration",
    description:
      "Seamlessly integrates TypeScript, Next.js, and Tailwind CSS in optimized starter templates.",
    icon: RocketIcon,
    color: "blue",
  },
  {
    title: "Payload CMS Ready",
    description:
      "Pre-configured templates with Payload CMS integration for powerful content management.",
    icon: DatabaseIcon,
    color: "purple",
  },
  {
    title: "Customizable Templates",
    description:
      "Choose from various templates or customize them to fit your specific project needs.",
    icon: PaletteIcon,
    color: "pink",
  },
  {
    title: "Developer Experience",
    description:
      "Optimized for the best developer experience with sensible defaults and best practices.",
    icon: CodeIcon,
    color: "amber",
  },
  {
    title: "Performance Optimized",
    description:
      "Templates are built with performance in mind, ensuring fast load times and smooth user experiences.",
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
