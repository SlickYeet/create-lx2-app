import { codeToHtml, type ShikiTransformer } from "shiki"

export const transformers = [
  {
    code(node) {
      if (node.tagName === "code") {
        const raw = this.source
        node.properties["__raw__"] = raw

        if (raw.startsWith("npm install")) {
          node.properties["__npm__"] = raw
          node.properties["__yarn__"] = raw.replace("npm install", "yarn add")
          node.properties["__pnpm__"] = raw.replace("npm install", "pnpm add")
          node.properties["__bun__"] = raw.replace("npm install", "bun add")
        }

        if (raw.startsWith("npx create-")) {
          node.properties["__npm__"] = raw
          node.properties["__yarn__"] = raw.replace(
            "npx create-",
            "yarn create ",
          )
          node.properties["__pnpm__"] = raw.replace(
            "npx create-",
            "pnpm create ",
          )
          node.properties["__bun__"] = raw.replace("npx", "bunx --bun")
        }

        // npm create.
        if (raw.startsWith("npm create")) {
          node.properties["__npm__"] = raw
          node.properties["__yarn__"] = raw.replace("npm create", "yarn create")
          node.properties["__pnpm__"] = raw.replace("npm create", "pnpm create")
          node.properties["__bun__"] = raw.replace("npm create", "bun create")
        }

        // npx.
        if (raw.startsWith("npx")) {
          node.properties["__npm__"] = raw
          node.properties["__yarn__"] = raw.replace("npx", "yarn")
          node.properties["__pnpm__"] = raw.replace("npx", "pnpm dlx")
          node.properties["__bun__"] = raw.replace("npx", "bunx --bun")
        }

        // npm run.
        if (raw.startsWith("npm run")) {
          node.properties["__npm__"] = raw
          node.properties["__yarn__"] = raw.replace("npm run", "yarn")
          node.properties["__pnpm__"] = raw.replace("npm run", "pnpm")
          node.properties["__bun__"] = raw.replace("npm run", "bun")
        }
      }
    },
  },
] as ShikiTransformer[]

export interface PackageManagerTransforms {
  __npm__: string
  __yarn__: string
  __pnpm__: string
  __bun__: string
}

export function applyPackageManagerTransformations(
  code: string,
): PackageManagerTransforms {
  const transformations: PackageManagerTransforms = {
    __npm__: code,
    __yarn__: code,
    __pnpm__: code,
    __bun__: code,
  }

  // npm install
  if (code.startsWith("npm install")) {
    transformations.__npm__ = code
    transformations.__yarn__ = code.replace("npm install", "yarn add")
    transformations.__pnpm__ = code.replace("npm install", "pnpm add")
    transformations.__bun__ = code.replace("npm install", "bun add")
  }

  // yarn add
  if (code.startsWith("npx create-")) {
    transformations.__npm__ = code
    transformations.__yarn__ = code.replace("npx create-", "yarn create ")
    transformations.__pnpm__ = code.replace("npx create-", "pnpm create ")
    transformations.__bun__ = code.replace("npx", "bunx --bun")
  }

  // npm create
  if (code.startsWith("npm create")) {
    transformations.__npm__ = code
    transformations.__yarn__ = code.replace("npm create", "yarn create")
    transformations.__pnpm__ = code.replace("npm create", "pnpm create")
    transformations.__bun__ = code.replace("npm create", "bun create")
  }

  // npx
  if (code.startsWith("npx")) {
    transformations.__npm__ = code
    transformations.__yarn__ = code.replace("npx", "yarn")
    transformations.__pnpm__ = code.replace("npx", "pnpm dlx")
    transformations.__bun__ = code.replace("npx", "bunx --bun")
  }

  // npm run
  if (code.startsWith("npm run")) {
    transformations.__npm__ = code
    transformations.__yarn__ = code.replace("npm run", "yarn")
    transformations.__pnpm__ = code.replace("npm run", "pnpm")
    transformations.__bun__ = code.replace("npm run", "bun")
  }

  // npx
  if (code.startsWith("npx")) {
    transformations.__npm__ = code
    transformations.__yarn__ = code.replace("npx", "yarn")
    transformations.__pnpm__ = code.replace("npx", "pnpm dlx")
    transformations.__bun__ = code.replace("npx", "bunx --bun")
  }

  return transformations
}

export async function highlightCode(code: string, language: string = "tsx") {
  const html = await codeToHtml(code, {
    lang: language,
    themes: {
      dark: "dracula",
      light: "github-light",
    },
    transformers: [
      {
        pre(node) {
          node.properties["class"] =
            "no-scrollbar min-w-0 overflow-x-auto px-4 py-3.5 outline-none has-[[data-highlighted-line]]:px-0 has-[[data-line-numbers]]:px-0 has-[[data-slot=tabs]]:p-0 !bg-transparent"
        },
        code(node) {
          node.properties["data-line-numbers"] = ""
        },
        line(node) {
          node.properties["data-line"] = ""
        },
      },
    ],
  })

  return html
}
