import path from "path"
import fs from "fs-extra"
import { type PackageJson } from "type-fest"

import { PKG_ROOT } from "@/constants.js"
import { type Installer } from "@/installers/index.js"
import { addPackageDependency } from "@/utils/add-package-dependency.js"

export const prismaInstaller: Installer = ({
  projectDir,
  packages,
  databaseProvider,
}) => {
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
    `${packages?.authjs.inUse ? "with-authjs" : "base"}.prisma`
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

  // Add postinstall and push script to package.json
  const packageJsonPath = path.join(projectDir, "package.json")

  /**
   * TODO: Add db:seed script
   */
  const packageJsonContent = fs.readJSONSync(packageJsonPath) as PackageJson
  packageJsonContent.scripts = {
    ...packageJsonContent.scripts,
    postinstall: "prisma generate",
    "db:push": "prisma db push",
    "db:studio": "prisma studio",
    "db:generate": "prisma migrate dev",
    "db:migrate": "prisma migrate deploy",
  }

  fs.writeJSONSync(packageJsonPath, packageJsonContent, {
    spaces: 2,
  })
}
