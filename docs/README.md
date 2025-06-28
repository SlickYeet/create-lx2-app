# Create TNT Stack Documentation Site

Welcome to the official documentation site for **Create TNT Stack**! This site
is built with **Next.js** and **MDX** to provide a seamless experience for
learning how to use the TNT-Powered stack to build modern web applications.

## Outline

- [Features](#features)
- [Run Site Locally](#run-site-locally)
- [Command Cheat Sheet](#command-cheat-sheet)
- [Customize This Site](#customize-this-site)
  - [Sidebar Navigation](#sidebar-navigation)
  - [CSS Styling](#css-styling)
  - [Code Block Customization](#code-block-customization)

## Features

- ✅ **MDX support** for combining Markdown and React components
- ✅ **Responsive design** with Tailwind CSS
- ✅ **Sidebar navigation** for easy exploration
- ✅ **Dark mode** with shadcn-style theming
- ✅ **Customizable code blocks** with syntax highlighting
- ✅ **Built with Next.js** for fast and scalable performance

## Run Site Locally

To run the documentation site locally, follow these steps:

```bash
git clone https://github.com/SlickYeet/create-tnt-stack.git
cd create-tnt-stack/docs
pnpm install
pnpm dev
```

This will start the development server at `http://localhost:3000`.

## Command Cheat Sheet

All commands are run from the `docs` directory of the project.

| Command        | Action                                            |
| -------------- | ------------------------------------------------- |
| `pnpm install` | Installs dependencies                             |
| `pnpm dev`     | Starts the development server at `localhost:3000` |
| `pnpm build`   | Builds the production site to `.next/`            |
| `pnpm lint`    | Lints the code                                    |
| `pnpm format`  | Formats the code                                  |

## Customize This Site

### Sidebar Navigation

The sidebar navigation is defined in `src/constants/index.ts` under the
`SIDEBAR_NAVIGATION` constant. You can customize the structure by modifying this
object. Here’s an example of the current structure:

```ts title="SIDEBAR_NAVIGATION"
export const SIDEBAR_NAVIGATION = [
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
  // Deployment
  {
    title: "Deployment",
    slug: "deployment",
    items: [
      { slug: "vercel", title: "Vercel" },
      { slug: "netlify", title: "Netlify" },
    ],
  },
  // Roadmap
  {
    title: "Roadmap",
    slug: "roadmap",
    items: [{ slug: "v1", title: "Version 1" }],
  },
] as const
```

To add or remove sections, simply update this array.

### CSS Styling

The bulk of the CSS styling is handled via **Tailwind CSS**. Global styles and
theming are defined in `globals.css`. For example, you can customize the color
scheme or typography by modifying the Tailwind configuration.

### Code Block Customization

Code blocks in the documentation are composed of three main components:

1. `figcaption`: Displays the title of the code block.
2. `pre`: Handles the primary block styles.
3. `code`: Used for inline code blocks or when no language is provided.

Some data-driven styles for these components are defined in `globals.css`. For
example:

```css title="globals.css"
/* Code Extras */
@layer utilities {
  .mdx pre [data-line] {
    @apply px-5;
  }
  .mdx figure:has(figcaption) pre {
    @apply rounded-t-none;
  }
  .mdx span .highlighted-word {
    @apply bg-muted-foreground/20 text-foreground -mx-1 rounded-sm px-1 py-0.5;
  }
  .mdx span.diff.remove::before {
    content: "-";
    @apply absolute left-1.5 text-red-500;
  }
  .mdx span.diff.remove {
    @apply !bg-red-500/10;
  }
  .mdx span.diff.add::before {
    content: "+";
    @apply absolute left-1.5 text-emerald-500;
  }
  .mdx span.diff.add {
    @apply !bg-emerald-500/10;
  }
  .mdx span.highlighted {
    @apply !bg-muted-foreground/10;
  }
}
```

## Contribution Guidelines

We 💖 contributors! If you’d like to contribute to the documentation, please
refer to the
[Contribution Guidelines](https://github.com/SlickYeet/create-tnt-stack/blob/main/CONTRIBUTING.md).
It includes detailed instructions on setting up your environment, making
changes, and submitting pull requests.

Thank you for visiting the Create TNT Stack documentation site! If you have any
questions or feedback, feel free to open an issue or join the discussion on
[GitHub](https://github.com/SlickYeet/create-tnt-stack).
