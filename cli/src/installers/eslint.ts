import path from "path"
import fs from "fs-extra"
import { type PackageJson } from "type-fest"

import { PKG_ROOT } from "@/constants.js"
import { AvailableDependencies } from "@/installers/dependency-version-map.js"
import { Installer } from "@/installers/index.js"
import { addPackageDependency } from "@/utils/add-package-dependency.js"

export const eslintInstaller: Installer = ({ projectDir, packages }) => {
  const usingESLint = packages?.["eslint/prettier"].inUse

  const deps: AvailableDependencies[] = []
  if (usingESLint) {
    deps.push("eslint")
    deps.push("eslint-config-next")
    deps.push("@eslint/eslintrc")
    deps.push("prettier")
    deps.push("prettier-plugin-tailwindcss")
    deps.push("@ianvs/prettier-plugin-sort-imports")
  }

  addPackageDependency({
    projectDir,
    dependencies: deps,
    devMode: true,
  })

  const eslintConfigSrc = path.join(
    PKG_ROOT,
    "template/packages/config",
    "eslint.config.mjs"
  )
  const prettierConfigSrc = path.join(
    PKG_ROOT,
    "template/packages/config",
    "prettier.config.mjs"
  )
  const eslintConfigDest = path.join(projectDir, "eslint.config.mjs")
  const prettierConfigDest = path.join(projectDir, "prettier.config.mjs")

  // Add lint and push script to package.json
  const packageJsonPath = path.join(projectDir, "package.json")

  const packageJsonContent = fs.readJSONSync(packageJsonPath) as PackageJson
  packageJsonContent.scripts = {
    ...packageJsonContent.scripts,
    lint: "next lint",
  }

  fs.copyFileSync(eslintConfigSrc, eslintConfigDest)
  fs.writeJSONSync(packageJsonPath, packageJsonContent, {
    spaces: 2,
  })
  fs.copyFileSync(prettierConfigSrc, prettierConfigDest)
}
