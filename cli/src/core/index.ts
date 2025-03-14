import { confirm, input, select } from "@inquirer/prompts"
import { Command } from "commander"

import { CREATE_TNT_STACK, DEFAULT_APP_NAME } from "@/constants.js"
import {
  databaseProviders,
  type AvailablePackages,
  type DatabaseProvider,
} from "@/installers/index.js"
import { getVersion } from "@/utils/get-tnt-version.js"
import { getUserPkgManager } from "@/utils/get-user-pkg-manager.js"
import { IsTTYError } from "@/utils/Is-tty-error.js"
import { logger } from "@/utils/logger.js"
import { validateAppName } from "@/utils/validate-app-name.js"
import { validateImportAlias } from "@/utils/validate-import-alias.js"

interface CliFlags {
  noGit: boolean
  noInstall: boolean
  default: boolean

  /** @internal Used in CI. */
  CI: boolean
  /** @internal Used in CI. */
  nextAuth: boolean
  /** @internal Used in CI. */
  prisma: boolean
  /** @internal Used in CI. */
  importAlias: string
  /** @internal Used in CI. */
  dbProvider: DatabaseProvider
}

interface CliResults {
  appName: string
  packages: AvailablePackages[]
  flags: CliFlags
  databaseProvider: DatabaseProvider
}

const defaultOptions: CliResults = {
  appName: DEFAULT_APP_NAME,
  packages: [],
  flags: {
    noGit: false,
    noInstall: false,
    default: false,
    CI: false,
    nextAuth: false,
    prisma: false,
    importAlias: "@/",
    dbProvider: "sqlite",
  },
  databaseProvider: "sqlite",
}

export async function runCli(): Promise<CliResults> {
  const cliResults = defaultOptions

  const program = new Command()
    .name(CREATE_TNT_STACK)
    .description("CLI for scaffolding new web apps with the TNT-Powered stack")
    .version(getVersion(), "-v, --version", "Output the current version of TNT")
    .argument(
      "[dir]",
      "The name of the application, as well as the name of the directory to create"
    )
    .option(
      "--noGit",
      "Explicitly tell the CLI to not initialize a new git repo in the project",
      false
    )
    .option(
      "--noInstall",
      "Explicitly tell the CLI to not run the package manager's install command",
      false
    )
    .option(
      "-y, --default",
      "Bypass the CLI and use all default options to bootstrap a new tnt-stack",
      false
    )
    /** START CI-FLAGS */
    /**
     * @experimental Used for CI E2E tests. If any of the following option-flags are provided, we
     *               skip prompting.
     */
    .option("--CI", "Boolean value if we're running in CI", false)
    /** @experimental Used for CI E2E tests. Used in conjunction with `--CI` to skip prompting. */
    .option(
      "--nextAuth [boolean]",
      "Experimental: Boolean value if we should install NextAuth.js. Must be used in conjunction with `--CI`.",
      (value) => !!value && value !== "false"
    )
    /** @experimental - Used for CI E2E tests. Used in conjunction with `--CI` to skip prompting. */
    .option(
      "--prisma [boolean]",
      "Experimental: Boolean value if we should install Prisma. Must be used in conjunction with `--CI`.",
      (value) => !!value && value !== "false"
    )
    /** @experimental - Used for CI E2E tests. Used in conjunction with `--CI` to skip prompting. */
    .option(
      "-i, --import-alias [alias]",
      "Explicitly tell the CLI to use a custom import alias",
      defaultOptions.flags.importAlias
    )
    /** @experimental - Used for CI E2E tests. Used in conjunction with `--CI` to skip prompting. */
    .option(
      "--dbProvider [provider]",
      `Choose a database provider to use. Possible values: ${databaseProviders.join(
        ", "
      )}`,
      defaultOptions.flags.dbProvider
    )
    /** END CI-FLAGS */
    .parse(process.argv)

  if (process.env.npm_config_user_agent?.startsWith("yarn/3")) {
    logger.warn(`  WARNING: It looks like you are using Yarn 3. This is currently not supported,
      and likely to result in a crash. Please run create-tnt-stack with another
      package manager such as pnpm, npm, or Yarn Classic.
      See: https://github.com/t3-oss/create-t3-app/issues/57`)
  }

  // Needs to be separated outside the if statement to correctly infer the type as string | undefined
  const cliProvidedName = program.args[0]
  if (cliProvidedName) {
    cliResults.appName = cliProvidedName
  }

  cliResults.flags = program.opts()

  /** @internal Used for CI E2E tests. */
  if (cliResults.flags.CI) {
    if (cliResults.flags.nextAuth) cliResults.packages.push("nextAuth")
    if (cliResults.flags.prisma) cliResults.packages.push("prisma")
    if (databaseProviders.includes(cliResults.flags.dbProvider) === false) {
      logger.warn(
        `Incompatible database provided. Use: ${databaseProviders.join(", ")}. Exiting.`
      )
      process.exit(0)
    }

    cliResults.databaseProvider = cliResults.packages.includes("prisma")
      ? cliResults.flags.dbProvider
      : "sqlite"

    return cliResults
  }

  if (cliResults.flags.default) {
    return cliResults
  }

  // Explained below why this is in a try/catch block
  try {
    // The url `https://create.tntstack.org/installation#experimental-usage` is not yet available
    if (process.env.TERM_PROGRAM?.toLowerCase().includes("mintty")) {
      logger.warn(`  WARNING: It looks like you are using MinTTY, which is non-interactive. This is most likely because you are
          using Git Bash. If that's that case, please use Git Bash from another terminal, such as Windows Terminal. Alternatively, you
          can provide the arguments from the CLI directly: https://create.tntstack.org/installation#experimental-usage to skip the prompts.`)

      throw new IsTTYError("Non-interactive environment")
    }

    const pkgManager = getUserPkgManager()

    type ProjectConfig = {
      name?: string
      authentication: string
      database: string
      databaseProvider?: DatabaseProvider
      git?: boolean
      noInstall?: boolean
      importAlias: string
    }

    const project: Partial<ProjectConfig> = {}
    if (!cliProvidedName) {
      project.name = await input({
        message: "What will your project be called?",
        default: DEFAULT_APP_NAME,
        validate: (value) => validateAppName(value),
      })
    }
    project.authentication = await select({
      message: "What authentication provider would you like to use?",
      choices: [
        { value: "none", name: "None" },
        { value: "nextAuth", name: "NextAuth.js" },
      ],
      default: "none",
    })
    project.database = await select({
      message: "What database ORM would you like to use?",
      choices: [
        { value: "none", name: "None" },
        { value: "prisma", name: "Prisma" },
      ],
      default: "none",
    })
    if (project.database !== "none") {
      project.databaseProvider = await select({
        message: "What database provider would you like to use?",
        choices: [
          { value: "sqlite", name: "SQLite" },
          { value: "mysql", name: "MySQL" },
          { value: "postgresql", name: "PostgreSQL" },
        ],
        default: "sqlite",
      })
    }
    if (!cliResults.flags.noGit) {
      project.git = await confirm({
        message: "Should we initialize a Git repository and stage the changes?",
        default: !defaultOptions.flags.noGit,
      })
    }
    if (!cliResults.flags.noInstall) {
      project.noInstall = await confirm({
        message:
          `Should we run '${pkgManager}` +
          (pkgManager === "yarn" ? `'?` : ` install' for you?`),
        default: !defaultOptions.flags.noInstall,
      })
    }
    project.importAlias = await input({
      message: "What import alias would you like to use?",
      default: defaultOptions.flags.importAlias,
      validate: validateImportAlias,
    })

    const packages: AvailablePackages[] = []
    if (project.authentication === "nextAuth") packages.push("nextAuth")
    if (project.database === "prisma") packages.push("prisma")

    return {
      appName: project.name ?? cliResults.appName,
      packages,
      flags: {
        ...cliResults.flags,
        noGit: !project.git || cliResults.flags.noGit,
        noInstall: !project.noInstall || cliResults.flags.noInstall,
        importAlias: project.importAlias ?? cliResults.flags.importAlias,
      },
      databaseProvider: project.databaseProvider || "sqlite",
    }
  } catch (error) {
    // If the user is not calling create-tnt-stack from an interactive terminal, inquirer will throw an IsTTYError
    // If this happens, we catch the error, tell the user what has happened, and then continue to run the program with a default tnt app
    if (error instanceof IsTTYError) {
      logger.warn(`${CREATE_TNT_STACK} needs an interactive terminal to run.`)

      const shouldContinue = await confirm({
        message: "Continue scaffolding with default options?",
        default: true,
      })
      if (!shouldContinue) {
        logger.info("Exiting...")
        process.exit(0)
      }

      logger.info(`Scaffolding default tnt app in ./${cliResults.appName}`)
    } else {
      throw error
    }
  }

  return cliResults
}
