import path from "path"
import fs from "fs-extra"
import sortPackageJson from "sort-package-json"
import { type PackageJson } from "type-fest"

import {
  dependencyVersionMap,
  type AvailableDependencies,
} from "@/installers/dependency-version-map.js"

export const addPackageDependency = (opts: {
  projectDir: string
  dependencies: AvailableDependencies[]
  devMode: boolean
}) => {
  const { dependencies, devMode, projectDir } = opts

  const pkgJson = fs.readJsonSync(
    path.join(projectDir, "package.json")
  ) as PackageJson

  dependencies.forEach((pkgName) => {
    const version = dependencyVersionMap[pkgName]

    if (devMode && pkgJson.devDependencies) {
      pkgJson.devDependencies[pkgName] = version
    } else if (pkgJson.dependencies) {
      pkgJson.dependencies[pkgName] = version
    }
  })
  const sortedPkgJson = sortPackageJson(pkgJson)

  fs.writeJsonSync(path.join(projectDir, "package.json"), sortedPkgJson, {
    spaces: 2,
  })
}
