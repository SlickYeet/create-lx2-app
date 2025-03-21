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
  "https://github.com/SlickYeet/create-tnt-stack"

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

// export const SECTIONS = [
//   {
//     id: "introduction",
//     label: "Introduction",
//     items: [
//       {
//         id: "getting-started",
//         label: "Getting Started",
//         href: "/docs#getting-started",
//       },
//       {
//         id: "quick-start",
//         label: "Quick Start",
//         href: "/docs#quick-start",
//       },
//       {
//         id: "installation",
//         label: "Installation",
//         href: "/docs#installation",
//       },
//     ],
//   },
//   {
//     id: "usage",
//     label: "Usage",
//     items: [
//       {
//         id: "create-tnt-stack",
//         label: "create-tnt-stack",
//         href: "/docs#create-tnt-stack",
//       },
//       {
//         id: "templates",
//         label: "Templates",
//         href: "/docs#templates",
//       },
//       {
//         id: "options",
//         label: "Options",
//         href: "/docs#options",
//       },
//       {
//         id: "examples",
//         label: "Examples",
//         href: "/docs#examples",
//       },
//     ],
//   },
//   {
//     id: "configuration",
//     label: "Configuration",
//     items: [
//       {
//         id: "project-structure",
//         label: "Project Structure",
//         href: "/docs#project-structure",
//       },
//       {
//         id: "customization",
//         label: "Customization",
//         href: "/docs#customization",
//       },
//       {
//         id: "environment-variables",
//         label: "Environment Variables",
//         href: "/docs#environment-variables",
//       },
//     ],
//   },
//   {
//     id: "payload-cms",
//     label: "Payload CMS",
//     items: [
//       {
//         id: "setup",
//         label: "Setup",
//         href: "/docs#payload-setup",
//       },
//       {
//         id: "content-models",
//         label: "Content Models",
//         href: "/docs#content-models",
//       },
//       {
//         id: "admin-ui",
//         label: "Admin UI",
//         href: "/docs#admin-ui",
//       },
//     ],
//   },
//   {
//     id: "advanced",
//     label: "Advanced",
//     items: [
//       {
//         id: "troubleshooting",
//         label: "Troubleshooting",
//         href: "/docs#troubleshooting",
//       },
//       {
//         id: "contributing",
//         label: "Contributing",
//         href: "/docs#contributing",
//       },
//       {
//         id: "roadmap",
//         label: "Roadmap",
//         href: "/docs#roadmap",
//       },
//     ],
//   },
// ]

export const SECTIONS = [
  {
    id: "introduction",
    label: "Introduction",
    items: [
      {
        id: "getting-started",
        label: "Getting Started",
        href: "/docs#getting-started",
      },
      {
        id: "installation",
        label: "Installation",
        href: "/docs#installation",
      },
    ],
  },
  {
    id: "usage",
    label: "Usage",
    href: "/docs#usage",
    items: [
      {
        id: "create-tnt-stack",
        label: "create-tnt-stack",
        href: "/docs#create-tnt-stack",
      },
      {
        id: "templates",
        label: "Templates",
        href: "/docs#templates",
      },
    ],
  },
  {
    id: "advanced",
    label: "Advanced",
    items: [
      {
        id: "troubleshooting",
        label: "Troubleshooting",
        href: "/docs#troubleshooting",
      },
      {
        id: "contributing",
        label: "Contributing",
        href: "/docs#contributing",
      },
    ],
  },
  {
    id: "more-coming-soon",
    label: "More Coming Soon",
    items: [
      {
        id: "roadmap",
        label: "Roadmap",
        href: "/docs#roadmap",
      },
    ],
  },
]
