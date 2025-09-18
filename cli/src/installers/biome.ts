import path from "path"
import fs from "fs-extra"

import { PKG_ROOT } from "@/constants.js"
import { type Installer } from "@/installers/index.js"
import { addPackageDependency } from "@/utils/add-package-dependency.js"
import { addPackageScript } from "@/utils/add-package-script.js"

export const biomeInstaller: Installer = ({ projectDir }) => {
  addPackageDependency({
    projectDir,
    dependencies: ["@biomejs/biome"],
    devMode: true,
  })

  const packagesDir = path.join(PKG_ROOT, "template/packages")

  const biomeConfigSrc = path.join(packagesDir, "config/biome.jsonc")
  const biomeConfigDest = path.join(projectDir, "biome.jsonc")

  fs.copyFileSync(biomeConfigSrc, biomeConfigDest)

  addPackageScript({
    projectDir,
    scripts: {
      "lint:unsafe": "biome check --write --unsafe .",
      "lint:write": "biome check --write .",
      lint: "biome check .",
      format: "biome format --write .",
    },
  })
}
