import path from "path"
import fs from "fs-extra"

import { PKG_ROOT } from "@/constants.js"
import { type AvailableDependencies } from "@/installers/dependency-version-map.js"
import { type Installer } from "@/installers/index.js"
import { addPackageDependency } from "@/utils/add-package-dependency.js"

export const betterAuthInstaller: Installer = ({ projectDir, packages }) => {
  const usingPrisma = packages?.prisma.inUse

  const deps: AvailableDependencies[] = ["better-auth"]
  const devDeps: AvailableDependencies[] = []
  if (!usingPrisma) deps.push("better-sqlite3")
  if (!usingPrisma) devDeps.push("@types/better-sqlite3")

  addPackageDependency({
    projectDir,
    dependencies: deps,
    devMode: false,
  })
  addPackageDependency({
    projectDir,
    dependencies: devDeps,
    devMode: true,
  })

  const packagesDir = path.join(PKG_ROOT, "template/packages")

  const apiHandlerSrc = path.join(
    packagesDir,
    "src/app/api/auth/[...betterauth]/route.ts"
  )
  const apiHandlerDest = path.join(
    projectDir,
    "src/app/api/auth/[...all]/route.ts"
  )

  const authIndexSrc = path.join(
    packagesDir,
    "src/server/auth/config",
    usingPrisma ? "better-auth-with-prisma.ts" : "better-auth.ts"
  )
  const authIndexDest = path.join(projectDir, "src/server/auth/index.ts")

  const authClientSrc = path.join(
    packagesDir,
    "src/lib/auth/better-auth-client.ts"
  )
  const authClientDest = path.join(projectDir, "src/lib/auth/client.ts")

  fs.copySync(apiHandlerSrc, apiHandlerDest)
  fs.copySync(authIndexSrc, authIndexDest)
  fs.copySync(authClientSrc, authClientDest)
}
