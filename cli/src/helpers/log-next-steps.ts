import { DEFAULT_APP_NAME } from "@/constants.js"
import { type InstallerOptions } from "@/installers/index.js"
import { getUserPkgManager } from "@/utils/get-user-pkg-manager.js"
import { logger } from "@/utils/logger.js"

import { isInsideGitRepo, isRootGitRepo } from "./git.js"

// This logs the next steps that the user should take in order to advance the project
export const logNextSteps = async ({
  projectName = DEFAULT_APP_NAME,
  packages,
  noInstall,
  projectDir,
  databaseProvider,
}: Pick<
  InstallerOptions,
  "projectDir" | "projectName" | "packages" | "noInstall" | "databaseProvider"
>) => {
  const pkgManager = getUserPkgManager()

  logger.info("Next steps:")
  if (projectName !== ".") {
    logger.info(`  cd ${projectName}`)
  }
  if (noInstall) {
    // To reflect yarn's default behavior of installing packages when no additional args provided
    if (pkgManager === "yarn") {
      logger.info(`  ${pkgManager}`)
    } else {
      logger.info(`  ${pkgManager} install`)
    }
  }

  if (["postgresql", "mysql"].includes(databaseProvider)) {
    logger.info("  Add your database connection string to .env")
  }

  //   The url `https://create.tntstack.org/usage/first-steps` is not yet available
  if (packages?.nextAuth.inUse) {
    logger.info(
      `  Fill in your .env with necessary values. See https://create.tntstack.org/usage/first-steps for more info.`
    )
  }

  if (["npm", "bun"].includes(pkgManager)) {
    logger.info(`  ${pkgManager} run dev`)
  } else {
    logger.info(`  ${pkgManager} dev`)
  }

  if (!(await isInsideGitRepo(projectDir)) && !isRootGitRepo(projectDir)) {
    logger.info(`  git init`)
  }
  logger.info(`  git commit -m "initial commit"`)
}
