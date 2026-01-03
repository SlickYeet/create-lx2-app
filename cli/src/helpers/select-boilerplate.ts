import path from "path"
import fs from "fs-extra"

import { PKG_ROOT } from "@/constants.js"
import { type InstallerOptions } from "@/installers/index.js"

type SelectBoilerplateOptions = Required<
  Pick<InstallerOptions, "packages" | "projectDir">
>

// Select which layout file to use based on the selected packages
export function selectLayoutFile({
  packages,
  projectDir,
}: SelectBoilerplateOptions) {
  const layoutFileDir = path.join(PKG_ROOT, "template/packages/src/app/layout")

  const usingPayload = packages.payload.inUse
  const usingTRPC = packages.trpc.inUse

  let layoutFile = "base.tsx"
  if (usingTRPC) layoutFile = "with-trpc.tsx"

  const layoutSrc = path.join(layoutFileDir, layoutFile)
  const layoutDest = path.join(
    projectDir,
    `src/app/${usingPayload ? "(frontend)" : ""}/layout.tsx`
  )
  fs.copySync(layoutSrc, layoutDest)
}

// Select which page file to use based on the selected packages
export function selectPageFile({
  packages,
  projectDir,
}: SelectBoilerplateOptions) {
  const pageFileDir = path.join(PKG_ROOT, "template/packages/src/app/page")

  const usingPayload = packages.payload.inUse
  const usingAuthjs = packages.authjs.inUse
  const usingBetterAuth = packages.betterAuth.inUse
  const usingTRPC = packages.trpc.inUse
  const usingPrisma = packages.prisma.inUse
  const usingDrizzle = packages.drizzle.inUse

  const rules: { condition: boolean; file: string }[] = [
    // TRPC + Drizzle
    {
      condition: usingTRPC && usingDrizzle && usingBetterAuth,
      file: "with-trpc.tsx",
    },
    {
      condition: usingTRPC && usingDrizzle && usingAuthjs,
      file: "with-trpc.tsx",
    },
    { condition: usingTRPC && usingDrizzle, file: "with-trpc.tsx" },

    // TRPC + Prisma
    {
      condition: usingTRPC && usingPrisma && usingBetterAuth,
      file: "with-trpc.tsx",
    },
    {
      condition: usingTRPC && usingPrisma && usingAuthjs,
      file: "with-trpc.tsx",
    },
    { condition: usingTRPC && usingPrisma, file: "with-trpc.tsx" },

    // Payload
    { condition: usingPayload, file: "with-payload.tsx" },

    // Drizzle
    {
      condition: usingDrizzle && usingBetterAuth,
      file: "with-better-auth-drizzle.tsx",
    },
    { condition: usingDrizzle && usingAuthjs, file: "with-authjs-drizzle.tsx" },
    { condition: usingDrizzle, file: "with-drizzle.tsx" },

    // Prisma
    {
      condition: usingPrisma && usingBetterAuth,
      file: "with-better-auth-prisma.tsx",
    },
    { condition: usingPrisma && usingAuthjs, file: "with-authjs-prisma.tsx" },
    { condition: usingPrisma, file: "with-prisma.tsx" },

    // TRPC
    {
      condition: usingTRPC && usingBetterAuth,
      file: "with-trpc.tsx",
    },
    { condition: usingTRPC && usingAuthjs, file: "with-trpc.tsx" },
    { condition: usingTRPC, file: "with-trpc.tsx" },

    // Auth
    { condition: usingBetterAuth, file: "with-better-auth.tsx" },
    { condition: usingAuthjs, file: "with-authjs.tsx" },

    // Base
    { condition: true, file: "base.tsx" },
  ]

  const pageFile = rules.find((c) => c.condition)?.file || "base.tsx"

  const pageSrc = path.join(pageFileDir, pageFile)
  const pageDest = path.join(
    projectDir,
    `src/app/${usingPayload ? "(frontend)" : ""}/page.tsx`
  )
  fs.copySync(pageSrc, pageDest)
}

export function selectGlobals({ projectDir }: SelectBoilerplateOptions) {
  const globalsCSSDir = path.join(PKG_ROOT, "template/packages/src/styles")

  let globalsCSSFile = "base.css"

  const globalsCSSSrc = path.join(globalsCSSDir, globalsCSSFile)
  const globalsCSSDest = path.join(projectDir, `src/styles/globals.css`)
  fs.copySync(globalsCSSSrc, globalsCSSDest)
}
