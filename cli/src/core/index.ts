import { confirm, input, select } from "@inquirer/prompts"
import { Command } from "commander"

import { CREATE_LX2_APP, DEFAULT_APP_NAME } from "@/constants.js"
import {
  authProviders,
  databaseORM,
  databaseProviders,
  type AuthProvider,
  type AvailablePackages,
  type BackendFramework,
  type DatabaseORM,
  type DatabaseProvider,
  type Linter,
} from "@/installers/index.js"
import { getVersion } from "@/utils/get-lx2-version.js"
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
  authentication: AuthProvider
  /** @internal Used in CI. */
  orm: DatabaseORM
  /** @internal Used in CI. */
  linter: Linter
  /** @internal Used in CI. */
  importAlias: string
  /** @internal Used in CI. */
  dbProvider: DatabaseProvider
  /** @internal Used in CI. */
  backend: BackendFramework
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
    authentication: "none",
    orm: "none",
    linter: "eslint/prettier",
    importAlias: "@/",
    dbProvider: "sqlite",
    backend: "nextjs",
  },
  databaseProvider: "sqlite",
}

export async function runCli(): Promise<CliResults> {
  const cliResults = defaultOptions

  const program = new Command()
    .name(CREATE_LX2_APP)
    .description("CLI for scaffolding new web apps with the Lx2 stack")
    .version(
      getVersion(),
      "-v, --version",
      "Output the current version of Create Lx2 App"
    )
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
      "Bypass the CLI and use all default options to bootstrap a new lx2-app",
      false
    )
    /** START CI-FLAGS */
    /**
     * @experimental Used for CI E2E tests. If any of the following option-flags are provided, we
     *               skip prompting.
     */
    .option("--CI", "Boolean value if we're running in CI", false)
    /** @experimental - Used for CI E2E tests. Used in conjunction with `--CI` to skip prompting. */
    .option(
      "--backend [framework]",
      `Choose a backend framework to use. Possible values: ${defaultOptions.flags.backend}`,
      defaultOptions.flags.backend
    )
    /** @experimental Used for CI E2E tests. Used in conjunction with `--CI` to skip prompting. */
    .option(
      "--authProvider [provider]",
      `Choose an authentication provider to use. Possible values: ${authProviders.join(
        ", "
      )}`,
      defaultOptions.flags.authentication
    )
    /** @experimental - Used for CI E2E tests. Used in conjunction with `--CI` to skip prompting. */
    .option(
      "--databaseORM [orm]",
      `Choose a database ORM to use. Possible values: ${databaseORM.join(
        ", "
      )}`,
      defaultOptions.flags.orm
    )
    /** @experimental - Used for CI E2E tests. Used in conjunction with `--CI` to skip prompting. */
    .option(
      "--linter [linter]",
      `Choose what linter and formatter to use. Possible values: ${defaultOptions.flags.linter}`,
      defaultOptions.flags.linter
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
      and likely to result in a crash. Please run create-lx2-app with another
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
    cliResults.packages = []
    switch (cliResults.flags.backend) {
      case "payload":
        cliResults.packages.push("payload")
        break
      default:
        break
    }
    switch (cliResults.flags.authentication) {
      case "authjs":
        cliResults.packages.push("authjs")
        break
      case "betterAuth":
        cliResults.packages.push("betterAuth")
        break
      default:
        break
    }
    switch (cliResults.flags.orm) {
      case "prisma":
        cliResults.packages.push("prisma")
        break
      case "drizzle":
        cliResults.packages.push("drizzle")
        break
      default:
        break
    }
    switch (cliResults.flags.linter) {
      case "eslint/prettier":
        cliResults.packages.push("eslint/prettier")
        break
      default:
        break
    }

    if (databaseProviders.includes(cliResults.flags.dbProvider) === false) {
      logger.warn(
        `Incompatible database provided. Use: ${databaseProviders.join(", ")}. Exiting.`
      )
      process.exit(0)
    }
    if (
      cliResults.flags.backend === "payload" &&
      cliResults.flags.dbProvider === "mysql"
    ) {
      logger.warn("Payload CMS does not support MySQL. Exiting.")
      process.exit(0)
    }

    return cliResults
  }

  if (cliResults.flags.default) {
    return cliResults
  }

  // Explained below why this is in a try/catch block
  try {
    if (process.env.TERM_PROGRAM?.toLowerCase().includes("mintty")) {
      logger.warn(`  WARNING: It looks like you are using MinTTY, which is non-interactive. This is most likely because you are
          using Git Bash. If that's that case, please use Git Bash from another terminal, such as Windows Terminal. Alternatively, you
          can provide the arguments from the CLI directly: https://create.lx2.dev/docs/getting-started#experimental-ci-flags to skip the prompts.`)

      throw new IsTTYError("Non-interactive environment")
    }

    const pkgManager = getUserPkgManager()

    type ProjectConfig = {
      name?: string
      backend: BackendFramework
      authentication: AuthProvider
      orm: DatabaseORM
      databaseProvider?: DatabaseProvider
      linter: Linter
      noGit?: boolean
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
    project.backend = await select({
      message: "What backend framework would you like to use?",
      choices: [
        { value: "nextjs", name: "Next.js" },
        { value: "payload", name: "Payload CMS" },
      ],
      default: !defaultOptions.flags.backend,
    })
    if (project.backend === "payload") {
      project.databaseProvider = await select({
        message: "What database provider would you like to use?",
        choices: [
          { value: "sqlite", name: "SQLite" },
          { value: "postgresql", name: "PostgreSQL" },
        ],
        default: !defaultOptions.flags.dbProvider,
      })
    }

    if (project.backend === "nextjs") {
      project.authentication = await select({
        message: "What authentication provider would you like to use?",
        choices: [
          { value: "none", name: "None" },
          { value: "authjs", name: "Auth.js" },
          { value: "betterAuth", name: "Better Auth" },
        ],
        default: !defaultOptions.flags.authentication,
      })
      project.orm = await select({
        message: "What database ORM would you like to use?",
        choices: [
          { value: "none", name: "None" },
          { value: "prisma", name: "Prisma" },
          { value: "drizzle", name: "Drizzle" },
        ],
        default: !defaultOptions.flags.orm,
      })
      if (project.orm !== "none") {
        project.databaseProvider = await select({
          message: "What database provider would you like to use?",
          choices: [
            { value: "sqlite", name: "SQLite" },
            { value: "mysql", name: "MySQL" },
            { value: "postgresql", name: "PostgreSQL" },
          ],
          default: !defaultOptions.flags.dbProvider,
        })
      }
    }

    project.linter = await select({
      message: "What linter and formatter would you like to use?",
      choices: [{ value: "eslint/prettier", name: "ESLint/Prettier" }],
      default: !defaultOptions.flags.linter,
    })
    if (!cliResults.flags.noGit) {
      project.noGit = await confirm({
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
    switch (project.backend) {
      case "payload":
        packages.push("payload")
        break
      default:
        break
    }
    switch (project.authentication) {
      case "authjs":
        packages.push("authjs")
        break
      case "betterAuth":
        packages.push("betterAuth")
        break
      default:
        break
    }
    switch (project.orm) {
      case "prisma":
        packages.push("prisma")
        break
      case "drizzle":
        packages.push("drizzle")
        break
      default:
        break
    }
    switch (project.linter) {
      case "eslint/prettier":
        packages.push("eslint/prettier")
        break
      default:
        break
    }

    return {
      appName: project.name ?? cliResults.appName,
      packages,
      flags: {
        ...cliResults.flags,
        noGit: !project.noGit || cliResults.flags.noGit,
        noInstall: !project.noInstall || cliResults.flags.noInstall,
        importAlias: project.importAlias ?? cliResults.flags.importAlias,
      },
      databaseProvider: project.databaseProvider || "sqlite",
    }
  } catch (error) {
    // If the user is not calling create-lx2-app from an interactive terminal, inquirer will throw an IsTTYError
    // If this happens, we catch the error, tell the user what has happened, and then continue to run the program with a default lx2 app
    if (error instanceof IsTTYError) {
      logger.warn(`${CREATE_LX2_APP} needs an interactive terminal to run.`)

      const shouldContinue = await confirm({
        message: "Continue scaffolding with default options?",
        default: true,
      })
      if (!shouldContinue) {
        logger.info("Exiting...")
        process.exit(0)
      }

      logger.info(`Scaffolding default lx2 app in ./${cliResults.appName}`)
    } else {
      throw error
    }
  }

  return cliResults
}
