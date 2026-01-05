import { confirm, input, select } from "@inquirer/prompts"
import { Command } from "commander"

import {
  compatibilityMatrix,
  CREATE_LX2_APP,
  DEFAULT_APP_NAME,
} from "@/constants.js"
import {
  authProviders,
  backendFrameworks,
  databaseORM,
  databaseProviders,
  type AuthProvider,
  type AvailablePackages,
  type BackendFramework,
  type DatabaseORM,
  type DatabaseProvider,
  type Linter,
} from "@/installers/index.js"
import {
  buildPackagesFromConfig,
  type PackageConfig,
} from "@/utils/build-packages-from-config.js"
import { getVersion } from "@/utils/get-lx2-version.js"
import { getUserPkgManager } from "@/utils/get-user-pkg-manager.js"
import { IsTTYError } from "@/utils/Is-tty-error.js"
import { logger } from "@/utils/logger.js"
import { validateAppName } from "@/utils/validate-app-name.js"
import { validateImportAlias } from "@/utils/validate-import-alias.js"

interface CliFlags {
  git: boolean
  install: boolean
  default: boolean

  /** @internal Used in CI. */
  CI: boolean
  /** @internal Used in CI. */
  trpc: boolean
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
    git: false,
    install: false,
    default: false,
    CI: false,
    trpc: false,
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
      "--git",
      "Boolean flag to explicitly tell the CLI to initialize a new git repo in the project",
      false
    )
    .option(
      "--install",
      "Boolean flag to explicitly tell the CLI to run the package manager's install command",
      false
    )
    .option(
      "-d, --default",
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
      `Choose a backend framework to use. Possible values: ${backendFrameworks.join(", ")}`,
      defaultOptions.flags.backend
    )
    /** @experimental Used for CI E2E tests. Used in conjunction with `--CI` to skip prompting. */
    .option(
      "--trpc [boolean]",
      "Boolean flag to explicitly tell the CLI to set up tRPC in the project",
      (value) => !!value && value !== "false"
    )
    /** @experimental - Used for CI E2E tests. Used in conjunction with `--CI` to skip prompting. */
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
    const { packages, databaseProvider } = buildPackagesFromConfig({
      backend: cliResults.flags.backend,
      trpc: cliResults.flags.trpc,
      authentication: cliResults.flags.authentication,
      orm: cliResults.flags.orm,
      linter: cliResults.flags.linter,
      dbProvider: cliResults.flags.dbProvider,
    })

    cliResults.packages = packages

    if (
      cliResults.packages.includes("authjs") &&
      cliResults.packages.includes("betterAuth")
    ) {
      logger.warn(
        `Incompatible authentication providers provided. Use either ${authProviders.join(", or ")}. Exiting.`
      )
      process.exit(0)
    }
    if (
      cliResults.packages.includes("prisma") &&
      cliResults.packages.includes("drizzle")
    ) {
      logger.warn(
        `Incompatible database ORMs provided. Use either ${databaseORM.join(", or ")}. Exiting.`
      )
      process.exit(0)
    }
    if (databaseProviders.includes(cliResults.flags.dbProvider) === false) {
      logger.warn(
        `Incompatible database provided. Use either ${databaseProviders.join(", or ")}. Exiting.`
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
    if (
      cliResults.packages.includes("eslint/prettier") &&
      cliResults.packages.includes("biome")
    ) {
      logger.warn(
        `Incompatible linters provided. Use either ${defaultOptions.flags.linter}. Exiting.`
      )
      process.exit(0)
    }

    cliResults.databaseProvider = databaseProvider

    return cliResults
  }

  if (cliResults.flags.default) {
    const { packages, databaseProvider } = buildPackagesFromConfig({
      backend: cliResults.flags.backend,
      trpc: cliResults.flags.trpc,
      authentication: cliResults.flags.authentication,
      orm: cliResults.flags.orm,
      linter: cliResults.flags.linter,
      dbProvider: cliResults.flags.dbProvider,
    })

    cliResults.packages = packages
    cliResults.databaseProvider = databaseProvider

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

    type ProjectConfig = PackageConfig & {
      name?: string
      git?: boolean
      install?: boolean
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
      default: defaultOptions.flags.backend,
    })
    if (project.backend === "payload") {
      project.dbProvider = await select({
        message: "What database provider would you like to use?",
        choices: [
          { value: "sqlite", name: "SQLite" },
          { value: "postgresql", name: "PostgreSQL" },
        ],
        default: defaultOptions.flags.dbProvider as Exclude<
          DatabaseProvider,
          "mysql"
        >,
      })
    }

    if (project.backend === "nextjs") {
      project.trpc = await confirm({
        message: "Would you like to use tRPC?",
        default: !defaultOptions.flags.trpc,
      })
      project.authentication = await select({
        message: "What authentication provider would you like to use?",
        choices: [
          { value: "none", name: "None" },
          { value: "authjs", name: "Auth.js" },
          { value: "betterAuth", name: "Better Auth" },
        ],
        default: defaultOptions.flags.authentication,
      })
      project.orm = await select({
        message: "What database ORM would you like to use?",
        choices: [
          { value: "none", name: "None" },
          { value: "prisma", name: "Prisma" },
          { value: "drizzle", name: "Drizzle" },
        ],
        default: defaultOptions.flags.orm,
      })
      if (project.orm !== "none") {
        project.dbProvider = await select({
          message: "What database provider would you like to use?",
          choices: [
            { value: "sqlite", name: "SQLite" },
            { value: "mysql", name: "MySQL" },
            { value: "postgresql", name: "PostgreSQL" },
          ],
          default: defaultOptions.flags.dbProvider,
        })
      }
    }

    project.linter = await select({
      message: "What linter and formatter would you like to use?",
      choices: [
        { value: "eslint/prettier", name: "ESLint/Prettier" },
        { value: "biome", name: "Biome" },
      ],
      default: defaultOptions.flags.linter,
    })
    if (!cliResults.flags.git) {
      project.git = await confirm({
        message: "Should we initialize a Git repository and stage the changes?",
        default: !defaultOptions.flags.git,
      })
    }
    if (!cliResults.flags.install) {
      project.install = await confirm({
        message:
          `Should we run '${pkgManager}` +
          (pkgManager === "yarn" ? `'?` : ` install' for you?`),
        default: !defaultOptions.flags.install,
      })
    }
    project.importAlias = await input({
      message: "What import alias would you like to use?",
      default: defaultOptions.flags.importAlias,
      validate: validateImportAlias,
    })

    const { packages, databaseProvider } = buildPackagesFromConfig({
      backend: project.backend,
      trpc: project.trpc ?? false,
      authentication: project.authentication ?? "none",
      orm: project.orm ?? "none",
      linter: project.linter,
      dbProvider: project.dbProvider ?? "sqlite",
    })

    // Restrict TRPC combinations for now
    const selectedPackages = [
      ...(cliResults.packages || []),
      ...(packages || []),
    ]
    const uniquePackages = Array.from(new Set(selectedPackages))
    const hasTRPC = uniquePackages.includes("trpc")

    if (hasTRPC) {
      const matrix = compatibilityMatrix.find((c) =>
        c.packages.includes("trpc")
      )
      if (matrix) {
        const incompatiblePkgs = uniquePackages.filter(
          (pkg) => matrix.packages.includes(pkg) && pkg !== "trpc"
        )

        if (incompatiblePkgs.length > 0) {
          logger.warn(
            "As of right now, Create Lx2 App only supports TRPC with certain combinations of packages. Exiting."
          )
          process.exit(0)
        }
      }
    }

    return {
      appName: project.name ?? cliResults.appName,
      packages,
      flags: {
        ...cliResults.flags,
        git: project.git ?? cliResults.flags.git,
        install: project.install ?? cliResults.flags.install,
        importAlias: project.importAlias ?? cliResults.flags.importAlias,
      },
      databaseProvider,
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
