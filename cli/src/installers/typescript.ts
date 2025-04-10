import path from "path"
import fs from "fs-extra"

import { PKG_ROOT } from "@/constants.js"
import { AvailableDependencies } from "@/installers/dependency-version-map.js"
import { Installer } from "@/installers/index.js"
import { addPackageDependency } from "@/utils/add-package-dependency.js"

export const typescriptInstaller: Installer = ({ projectDir, packages }) => {
  const usingTS = packages?.typescript.inUse

  const deps: AvailableDependencies[] = []
  if (usingTS) {
    deps.push("typescript")
    deps.push("@types/node")
    deps.push("@types/react")
    deps.push("@types/react-dom")
  }

  addPackageDependency({
    projectDir,
    dependencies: deps,
    devMode: true,
  })

  const tsConfigSrc = path.join(
    PKG_ROOT,
    "template/packages/config/tsconfig",
    "with-payload.json"
  )
  const tsConfigDest = path.join(projectDir, "tsconfig.json")

  fs.copyFileSync(tsConfigSrc, tsConfigDest)
}
