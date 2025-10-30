import path from "path"
import fs from "fs-extra"

import { PKG_ROOT } from "@/constants.js"
import { type Installer } from "@/installers/index.js"
import { addPackageDependency } from "@/utils/add-package-dependency.js"
import { addPackageScript } from "@/utils/add-package-script.js"

export const prismaInstaller: Installer = ({
  projectDir,
  packages,
  databaseProvider,
}) => {
  const usingAuthjs = packages?.authjs.inUse
  const usingBetterAuth = packages?.betterAuth.inUse

  addPackageDependency({
    projectDir,
    dependencies: ["prisma"],
    devMode: true,
  })
  addPackageDependency({
    projectDir,
    dependencies: ["@prisma/client"],
    devMode: false,
  })

  const packagesDir = path.join(PKG_ROOT, "template/packages")

  const schemaSrc = path.join(
    packagesDir,
    "prisma/schema",
    `${usingAuthjs ? "with-authjs" : usingBetterAuth ? "with-better-auth" : "base"}.prisma`
  )
  let schemaText = fs.readFileSync(schemaSrc, "utf-8")
  if (databaseProvider !== "sqlite") {
    schemaText = schemaText.replace(
      'provider = "sqlite"',
      `provider = "${
        {
          mysql: "mysql",
          postgresql: "postgresql",
        }[databaseProvider]
      }"`
    )
    if (["mysql"].includes(databaseProvider)) {
      schemaText = schemaText.replace("// @db.Text", "@db.Text")
    }
  }
  const schemaDest = path.join(projectDir, "prisma/schema.prisma")
  fs.mkdirSync(path.dirname(schemaDest), { recursive: true })
  fs.writeFileSync(schemaDest, schemaText)

  const clientSrc = path.join(packagesDir, "src/server/db/db-prisma.ts")
  const clientDest = path.join(projectDir, "src/server/db/index.ts")
  fs.mkdirSync(path.dirname(clientDest), { recursive: true })
  fs.writeFileSync(clientDest, fs.readFileSync(clientSrc, "utf-8"))

  /**
   * TODO: Add db:seed script
   */
  addPackageScript({
    projectDir,
    scripts: {
      postinstall: "prisma generate",
      "db:push": "prisma db push",
      "db:studio": "prisma studio",
      "db:generate": "prisma migrate dev",
      "db:migrate": "prisma migrate deploy",
    },
  })
}
