import path from "path"
import fs from "fs-extra"

import { PKG_ROOT } from "@/constants.js"
import { type AvailableDependencies } from "@/installers/dependency-version-map.js"
import { type Installer } from "@/installers/index.js"
import { addPackageDependency } from "@/utils/add-package-dependency.js"

export const authjsInstaller: Installer = ({ projectDir, packages }) => {
  const usingPrisma = packages?.prisma.inUse
  const usingDrizzle = packages?.drizzle.inUse

  const deps: AvailableDependencies[] = ["next-auth"]
  if (usingPrisma) deps.push("@auth/prisma-adapter")
  if (usingDrizzle) deps.push("@auth/drizzle-adapter")

  addPackageDependency({
    projectDir,
    dependencies: deps,
    devMode: false,
  })

  const packagesDir = path.join(PKG_ROOT, "template/packages")

  const apiHandlerFile = "src/app/api/auth/[...nextauth]/route.ts"

  const apiHandlerSrc = path.join(packagesDir, apiHandlerFile)
  const apiHandlerDest = path.join(projectDir, apiHandlerFile)

  const authConfigSrc = path.join(
    packagesDir,
    "src/server/auth/config",
    usingPrisma
      ? "authjs-with-prisma.ts"
      : usingDrizzle
        ? "authjs-with-drizzle.ts"
        : "authjs.ts"
  )
  const authConfigDest = path.join(projectDir, "src/server/auth/config.ts")

  const authIndexSrc = path.join(packagesDir, "src/server/auth/authjs.ts")
  const authIndexDest = path.join(projectDir, "src/server/auth/index.ts")

  fs.copySync(apiHandlerSrc, apiHandlerDest)
  fs.copySync(authConfigSrc, authConfigDest)
  fs.copySync(authIndexSrc, authIndexDest)
}
