import path from "path"
import fs from "fs-extra"
import { sortPackageJson } from "sort-package-json"
import type { PackageJson } from "type-fest"

export function addPackageScript(opts: {
  scripts: Record<string, string>
  projectDir: string
}) {
  const { scripts, projectDir } = opts

  const packageJsonPath = path.join(projectDir, "package.json")
  const packageJsonContent = fs.readJSONSync(packageJsonPath) as PackageJson

  packageJsonContent.scripts = {
    ...packageJsonContent.scripts,
    ...scripts,
  }

  const sortedPackageJson = sortPackageJson(packageJsonContent)

  fs.writeJSONSync(packageJsonPath, sortedPackageJson, {
    spaces: 2,
  })
}
