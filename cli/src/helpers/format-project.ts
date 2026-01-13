import chalk from "chalk"
import { execa } from "execa"
import ora from "ora"

import { type PackageManager } from "@/utils/get-user-pkg-manager.js"
import { logger } from "@/utils/logger.js"

interface FormatProjectOpts {
  projectDir: string
  pkgManager: PackageManager
  eslint: boolean
  biome: boolean
}

export async function formatProject({
  projectDir,
  pkgManager,
  eslint,
  biome,
}: FormatProjectOpts) {
  logger.info(
    `Formatting project with ${chalk.bold(eslint ? "prettier" : "biome")}...`
  )
  const spinner = ora("Running formatter\n").start()

  if (eslint) {
    await execa(pkgManager, ["run", "format"], {
      cwd: projectDir,
    })
  } else if (biome) {
    await execa(pkgManager, ["run", "lint:unsafe"], {
      cwd: projectDir,
    })
  }

  spinner.succeed(`${chalk.green("Project formatted successfully\n")}`)
}
