#!/user/bin/env node
import path from "path"
import { execa } from "execa"
import fs from "fs-extra"
import { type PackageJson } from "type-fest"

import { runCli } from "@/cli/index.js"
import { createProject } from "@/helpers/create-project.js"
import { initializeGit } from "@/helpers/git.js"
import { installDependencies } from "@/helpers/install-dependencies.js"
import { logNextSteps } from "@/helpers/log-next-steps.js"
import { setImportAlias } from "@/helpers/set-import-alias.js"
import { buildPkgInstallerMap } from "@/installers/index.js"
import { getVersion } from "@/utils/get-tnt-version.js"
import { getUserPkgManager } from "@/utils/get-user-pkg-manager.js"
import { logger } from "@/utils/logger.js"
import { parseNameAndPath } from "@/utils/parse-name-and-path.js"
import { renderTitle } from "@/utils/render-title.js"
import {
  getNpmVersion,
  renderVersionWarning,
} from "@/utils/render-version-warning.js"

type CTNTAPackageJSON = PackageJson & {
  ctntaMetadata?: {
    initVersion: string
  }
}

async function main() {
  const npmVersion = await getNpmVersion()
  const pkgManager = getUserPkgManager()
  renderTitle()

  if (npmVersion) {
    renderVersionWarning(npmVersion)
  }

  const {
    appName,
    databaseProvider,
    flags: { noGit, noInstall, importAlias },
    packages,
  } = await runCli()

  const usePackages = buildPkgInstallerMap(packages)

  // e.g. dir/@mono/app returns ["@mono/app", "dir/app"]
  const [scopedAppName, appDir] = parseNameAndPath(appName)

  const projectDir = await createProject({
    projectName: appDir,
    scopedAppName,
    packages: usePackages,
    noInstall,
    databaseProvider,
  })

  // Write name to package.json
  const pkgJson = fs.readJSONSync(
    path.join(projectDir, "package.json")
  ) as CTNTAPackageJSON
  pkgJson.name = scopedAppName
  pkgJson.ctntaMetadata = { initVersion: getVersion() }

  // ? Bun doesn't support this field (yet)
  if (pkgManager !== "bun") {
    const { stdout } = await execa(pkgManager, ["-v"], {
      cwd: projectDir,
    })
    pkgJson.packageManager = `${pkgManager}@${stdout.trim()}`
  }

  fs.writeJSONSync(path.join(projectDir, "package.json"), pkgJson, {
    spaces: 2,
  })

  // update import alias in any generated files if not using the default
  if (importAlias !== "@/") {
    setImportAlias(projectDir, importAlias)
  }

  if (!noInstall) {
    await installDependencies({ projectDir })
  }

  if (!noGit) {
    await initializeGit(projectDir)
  }

  await logNextSteps({
    projectDir,
    projectName: appDir,
    packages: usePackages,
    noInstall,
    databaseProvider,
  })

  process.exit(0)
}

main().catch((error) => {
  logger.error("Aborting installation...")
  if (error instanceof Error) {
    logger.error(error)
  } else {
    logger.error(
      "An unknown error occurred. Please open an issue on GitHub with the below:"
    )
    console.log(error)
  }
  process.exit(1)
})
