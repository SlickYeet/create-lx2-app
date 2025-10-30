import path from "path"
import fs from "fs-extra"

import { PKG_ROOT } from "@/constants.js"
import { AvailableDependencies } from "@/installers/dependency-version-map.js"
import { Installer } from "@/installers/index.js"
import { addPackageDependency } from "@/utils/add-package-dependency.js"
import { addPackageScript } from "@/utils/add-package-script.js"

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

  addPackageScript({
    projectDir,
    scripts: {
      "lint:write": "eslint --fix",
      lint: "eslint",
      format: "prettier --write .",
    },
  })

  fs.copyFileSync(eslintConfigSrc, eslintConfigDest)
  fs.copyFileSync(prettierConfigSrc, prettierConfigDest)
}
