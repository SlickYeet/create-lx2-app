import path from "path"
import fs from "fs-extra"

import { PKG_ROOT } from "@/constants.js"
import { type InstallerOptions } from "@/installers/index.js"

type SelectBoilerplateOoptions = Required<
  Pick<InstallerOptions, "packages" | "projectDir">
>

// Select which layout file to use based on the selected packages
export function selectLayoutFile({
  packages,
  projectDir,
}: SelectBoilerplateOoptions) {
  const layoutFileDir = path.join(PKG_ROOT, "template/packages/src/app/layout")

  /**
   * TODO: Add NextAuth layout file
   */
  // const usingNextAuth = packages.nextAuth.inUse
  const usingPayload = packages.payload.inUse

  let layoutFile = "base.tsx"
  if (usingPayload) {
    layoutFile = "base.tsx" // We can use the same layout file for Payload
    // layoutFile = "with-payload.tsx"
  }

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
}: SelectBoilerplateOoptions) {
  const pageFileDir = path.join(PKG_ROOT, "template/packages/src/app/page")

  /**
   * TODO: Add NextAuth page file
   */
  // const usingNextAuth = packages.nextAuth.inUse
  const usingPayload = packages.payload.inUse

  let pageFile = "base.tsx"
  if (usingPayload) {
    pageFile = "with-payload.tsx"
  }

  const pageSrc = path.join(pageFileDir, pageFile)
  const pageDest = path.join(
    projectDir,
    `src/app/${usingPayload ? "(frontend)" : ""}/page.tsx`
  )
  fs.copySync(pageSrc, pageDest)
}

export function selectGlobals({
  packages,
  projectDir,
}: SelectBoilerplateOoptions) {
  const globalsCSSDir = path.join(PKG_ROOT, "template/packages/src/app/globals")

  const usingPayload = packages.payload.inUse

  let globalsCSSFile = "base.css"
  if (usingPayload) {
    globalsCSSFile = "base.css" // We can use the same globals file for Payload
    // globalsCSSFile = "with-payload.css"
  }

  const globalsCSSSrc = path.join(globalsCSSDir, globalsCSSFile)
  const globalsCSSDest = path.join(
    projectDir,
    `src/app/${usingPayload ? "(frontend)" : ""}/globals.css`
  )
  fs.copySync(globalsCSSSrc, globalsCSSDest)
}
