import path from "path"
import fs from "fs-extra"

import { PKG_ROOT } from "@/constants.js"
import { AvailableDependencies } from "@/installers/dependency-version-map.js"
import { Installer } from "@/installers/index.js"
import { addPackageDependency } from "@/utils/add-package-dependency.js"

export const prettierInstaller: Installer = ({ projectDir, packages }) => {
  const usingPrettier = packages?.prettier.inUse

  const deps: AvailableDependencies[] = []
  if (usingPrettier) {
    deps.push("prettier")
    deps.push("prettier-plugin-tailwindcss")
    deps.push("@ianvs/prettier-plugin-sort-imports")
  }

  addPackageDependency({
    projectDir,
    dependencies: deps,
    devMode: true,
  })

  const prettierConfigSrc = path.join(
    PKG_ROOT,
    "template/packages/config",
    "prettier.config.mjs"
  )
  const prettierConfigDest = path.join(projectDir, "prettier.config.mjs")
  fs.copyFileSync(prettierConfigSrc, prettierConfigDest)
}
