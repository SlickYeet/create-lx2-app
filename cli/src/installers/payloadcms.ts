import path from "path"
import fs from "fs-extra"
import { type PackageJson } from "type-fest"

import { PKG_ROOT } from "@/constants.js"
import { AvailableDependencies } from "@/installers/dependency-version-map.js"
import { type Installer } from "@/installers/index.js"
import { addPackageDependency } from "@/utils/add-package-dependency.js"

export const payloadCMSInstaller: Installer = ({
  projectDir,
  packages,
  databaseProvider,
}) => {
  const deps: AvailableDependencies[] = []
  const databaseDeps: AvailableDependencies[] = []
  if (packages?.payload.inUse) {
    deps.push("payload")
    deps.push("@payloadcms/next")
    deps.push("@payloadcms/payload-cloud")
    deps.push("@payloadcms/richtext-lexical")
    deps.push("graphql")

    switch (databaseProvider) {
      case "sqlite":
        databaseDeps.push("@payloadcms/db-sqlite")
        break
      case "postgresql":
        databaseDeps.push("@payloadcms/db-vercel-postgres")
        break
    }
  }

  addPackageDependency({
    projectDir,
    dependencies: deps,
    devMode: false,
  })
  addPackageDependency({
    projectDir,
    dependencies: databaseDeps,
    devMode: false,
  })

  const packagesDir = path.join(PKG_ROOT, "template/packages")

  // Copy the payload config file
  const configSrc = path.join(
    packagesDir,
    "config/payload",
    `${databaseProvider === "postgresql" ? "with-postgres" : "with-sqlite"}.ts`
  )
  const configDest = path.join(projectDir, "payload.config.ts")
  fs.copyFileSync(configSrc, configDest)

  // Copy payload default collections
  const collectionsSrc = path.join(packagesDir, "src/payload/collections")
  const collectionsDest = path.join(projectDir, "src/collections")
  fs.mkdirSync(collectionsDest, { recursive: true })
  fs.copyFileSync(
    path.join(collectionsSrc, "Media.ts"),
    path.join(collectionsDest, "Media.ts")
  )
  fs.copyFileSync(
    path.join(collectionsSrc, "Users.ts"),
    path.join(collectionsDest, "Users.ts")
  )

  // Copy the payload files
  const payloadSrc = path.join(packagesDir, "src/app/(payload)")
  const payloadDest = path.join(projectDir, "src/app/(payload)")
  fs.mkdirSync(payloadDest, { recursive: true })
  fs.copySync(payloadSrc, payloadDest)

  // Add payload scripts to package.json
  const packageJsonPath = path.join(projectDir, "package.json")

  const packageJsonContent = fs.readJSONSync(packageJsonPath) as PackageJson
  packageJsonContent.scripts = {
    ...packageJsonContent.scripts,
    payload: "payload",
    "generate:importmap": "payload generate:importmap",
    "generate:types": "payload generate:types",
  }

  fs.writeJSONSync(packageJsonPath, packageJsonContent, {
    spaces: 2,
  })
}
