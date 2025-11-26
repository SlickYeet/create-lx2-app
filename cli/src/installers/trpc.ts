import path from "path"
import fs from "fs-extra"

import { PKG_ROOT } from "@/constants.js"
import type { Installer } from "@/installers/index.js"
import { addPackageDependency } from "@/utils/add-package-dependency.js"

export const trpcInstaller: Installer = ({ projectDir, packages }) => {
  // const usingPayload = packages?.payload.inUse
  const usingAuthjs = packages?.authjs.inUse
  const usingBetterAuth = packages?.betterAuth.inUse
  const usingPrisma = packages?.prisma.inUse
  const usingDrizzle = packages?.drizzle.inUse
  const usingDatabase = usingPrisma || usingDrizzle

  addPackageDependency({
    projectDir,
    dependencies: [
      "@trpc/server",
      "@trpc/client",
      "@trpc/react-query",
      "@tanstack/react-query",
      "server-only",
      "superjson",
    ],
    devMode: false,
  })

  const packagesDir = path.join(PKG_ROOT, "template/packages")

  const routeHandlerFile = "src/app/api/trpc/[trpc]/route.ts"
  // TODO: Add PayloadCMS support
  // const routeHandlerFile = usingPayload
  //   ? "src/app/(frontend)/api/trpc/[trpc]/route.ts"
  //   : "src/app/api/trpc/[trpc]/route.ts"

  const routeHandlerSrc = path.join(packagesDir, routeHandlerFile)
  const routeHandlerDest = path.join(projectDir, routeHandlerFile)

  const initFile = (() => {
    if (usingAuthjs && usingDatabase) return "with-authjs-db.ts"
    if (usingAuthjs) return "with-authjs.ts"
    if (usingBetterAuth && usingDatabase) return "with-betterauth-db.ts"
    if (usingBetterAuth) return "with-betterauth.ts"
    if (usingDatabase) return "with-db.ts"
    return "base.ts"
  })()

  const initSrc = path.join(packagesDir, "src/server/api/init", initFile)
  const initDest = path.join(projectDir, "src/server/api/init.ts")

  const rootSrc = path.join(packagesDir, "src/server/api/root.ts")
  const rootDest = path.join(projectDir, "src/server/api/root.ts")

  function getRouterFile({
    usingAuthjs,
    usingBetterAuth,
    usingPrisma,
    usingDrizzle,
  }: {
    usingAuthjs?: boolean
    usingBetterAuth?: boolean
    usingPrisma?: boolean
    usingDrizzle?: boolean
  }): string {
    if ((usingAuthjs || usingBetterAuth) && usingPrisma) {
      return "with-auth-prisma.ts"
    }
    if ((usingAuthjs || usingBetterAuth) && usingDrizzle) {
      return "with-auth-drizzle.ts"
    }
    if (usingAuthjs || usingBetterAuth) return "with-auth.ts"
    if (usingPrisma) return "with-prisma.ts"
    if (usingDrizzle) return "with-drizzle.ts"
    return "base.ts"
  }

  const routerFile = getRouterFile({
    usingAuthjs,
    usingBetterAuth,
    usingPrisma,
    usingDrizzle,
  })

  const routerSrc = path.join(
    packagesDir,
    "src/server/api/routers/hello-world",
    routerFile
  )
  const routerDest = path.join(
    projectDir,
    "src/server/api/routers/hello-world.ts"
  )

  const utilsSrc = path.join(packagesDir, "src/lib/utils.ts")
  const utilsDest = path.join(projectDir, "src/lib/utils.ts")

  const copySrcDest: [string, string][] = [
    [routeHandlerSrc, routeHandlerDest],
    [initSrc, initDest],
    [rootSrc, rootDest],
    [routerSrc, routerDest],
    [utilsSrc, utilsDest],
  ]

  const packagesLibDir = path.join(packagesDir, "src/lib/api")
  const projectLibDir = path.join(projectDir, "src/lib/api")
  copySrcDest.push(
    [
      path.join(packagesLibDir, "client.tsx"),
      path.join(projectLibDir, "client.tsx"),
    ],
    [
      path.join(packagesLibDir, "query-client.ts"),
      path.join(projectLibDir, "query-client.ts"),
    ],
    [
      path.join(packagesLibDir, "server.ts"),
      path.join(projectLibDir, "server.ts"),
    ],
    [
      path.join(packagesDir, "src/components/greeting.tsx"),
      path.join(projectDir, "src/components/greeting.tsx"),
    ]
  )

  copySrcDest.forEach(([src, dest]) => {
    fs.copySync(src, dest)
  })
}

/**
 * tRPC files to write:
 *
 * ## Init files
 * - [ ] with-authjs-db.ts
 * - [ ] with-authjs.ts
 * - [ ] with-betterauth-db.ts
 * - [ ] with-betterauth.ts
 * - [ ] with-db.ts
 * - [x] base.ts
 *
 * ## Root file
 * - [x] root.ts
 *
 * ## Router files
 * - [ ] with-auth-prisma.ts
 * - [ ] with-auth-drizzle.ts
 * - [ ] with-auth.ts
 * - [ ] with-prisma.ts
 * - [ ] with-drizzle.ts
 * - [x] base.ts
 *
 * ## Lib files
 * - [x] client.tsx
 * - [x] query-client.ts
 * - [x] server.ts
 *
 * ## Route handler file
 * - [x] route.ts
 */
