import path from "path"
import fs from "fs-extra"

import { PKG_ROOT } from "@/constants.js"
import { type Installer } from "@/installers/index.js"
import { addPackageDependency } from "@/utils/add-package-dependency.js"
import { addPackageScript } from "@/utils/add-package-script.js"

export const drizzleInstaller: Installer = ({
  projectDir,
  packages,
  scopedAppName,
  databaseProvider,
}) => {
  const usingAuthjs = packages?.authjs.inUse
  const usingBetterAuth = packages?.betterAuth.inUse

  addPackageDependency({
    projectDir,
    dependencies: ["drizzle-kit"],
    devMode: true,
  })
  addPackageDependency({
    projectDir,
    dependencies: [
      "drizzle-orm",
      (
        {
          sqlite: "@libsql/client",
          mysql: "mysql2",
          postgres: "postgres",
        } as const
      )[databaseProvider],
    ],
    devMode: false,
  })

  const packagesDir = path.join(PKG_ROOT, "template/packages")

  const configSrc = path.join(
    packagesDir,
    "config/drizzle",
    (
      {
        sqlite: "with-sqlite",
        mysql: "with-mysql",
        postgres: "with-postgres",
      } as const
    )[databaseProvider] + ".ts"
  )
  const configDest = path.join(projectDir, "drizzle.config.ts")

  const schemaSrc = path.join(
    packagesDir,
    "src/server/db/schema-drizzle",
    usingAuthjs
      ? `with-authjs-${databaseProvider}.ts`
      : usingBetterAuth
        ? `with-better-auth-${databaseProvider}.ts`
        : `base-${databaseProvider}.ts`
  )
  const schemaDest = path.join(projectDir, "src/server/db/schema.ts")

  // Replace `project1_` prefix with project name
  let schemaContent = fs.readFileSync(schemaSrc, "utf-8")
  schemaContent = schemaContent.replace(
    "project1_${name}",
    `${scopedAppName}_\${name}`
  )

  let configContent = fs.readFileSync(configSrc, "utf-8")
  configContent = configContent.replace("project1_*", `${scopedAppName}_*`)

  const clientSrc = path.join(
    packagesDir,
    `src/server/db/index-drizzle/with-${databaseProvider}.ts`
  )
  const clientDest = path.join(projectDir, "src/server/db/index.ts")

  addPackageScript({
    projectDir,
    scripts: {
      "db:generate": "drizzle-kit generate",
      "db:migrate": "drizzle-kit migrate",
      "db:push": "drizzle-kit push",
      "db:studio": "drizzle-kit studio",
    },
  })

  fs.copySync(configSrc, configDest)
  fs.mkdirSync(path.dirname(schemaDest), { recursive: true })
  fs.writeFileSync(schemaDest, schemaContent)
  fs.writeFileSync(configDest, configContent)
  fs.copySync(clientSrc, clientDest)
}
