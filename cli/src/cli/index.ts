import * as p from "@clack/prompts"
import { Command } from "commander"

import { CREATE_TNT_APP, DEFAULT_APP_NAME } from "@/constants.js"
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
  importAlias: string

  /** @internal Used in CI. */
  CI: boolean
  /** @internal Used in CI. */
  prisma: boolean
  /** @internal Used in CI. */
  nextAuth: boolean
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
  packages: ["prisma"],
  flags: {
    noGit: false,
    noInstall: false,
    default: false,
    CI: false,
    prisma: false,
    nextAuth: false,
    importAlias: "@/",
    dbProvider: "sqlite",
  },
  databaseProvider: "sqlite",
}

export async function runCli(): Promise<CliResults> {
  const cliResults = defaultOptions

  const program = new Command()
    .name(CREATE_TNT_APP)
    .description("CLI for scaffolding new web apps with the TNT-Powered stack")
    .version(getVersion(), "-v, --version", "Display the version number")
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
      "Bypass the CLI and use all default options to bootstrap a new tnt-app",
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
      "-i, --import-alias",
      "Explicitly tell the CLI to use a custom import alias",
      defaultOptions.flags.importAlias
    )
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
      and likely to result in a crash. Please run create-tnt-app with another
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
    // The url `https://create.tnt.app/installation#experimental-usage` is not yet available
    if (process.env.TERM_PROGRAM?.toLowerCase().includes("mintty")) {
      logger.warn(`  WARNING: It looks like you are using MinTTY, which is non-interactive. This is most likely because you are
    using Git Bash. If that's that case, please use Git Bash from another terminal, such as Windows Terminal. Alternatively, you
    can provide the arguments from the CLI directly: https://create.tnt.app/installation#experimental-usage to skip the prompts.`)

      throw new IsTTYError("Non-interactive environment")
    }

    // if --CI flag is set, we are running in CI mode and should not prompt the user

    const pkgManager = getUserPkgManager()

    const project = await p.group(
      {
        ...(!cliProvidedName && {
          name: () =>
            p.text({
              message: `What will your project be called? (e.g. ${DEFAULT_APP_NAME})`,
              defaultValue: cliProvidedName || DEFAULT_APP_NAME,
              validate: (input) => validateAppName(input || DEFAULT_APP_NAME),
            }),
        }),
        authentication: () => {
          return p.select({
            message: "What authentication provider would you like to use?",
            options: [
              { value: "none", label: "None" },
              { value: "nextAuth", label: "NextAuth.js" },
              { value: "lucia", label: "Lucia Auth (not a library)" },
            ],
            initialValue: "none",
          })
        },
        database: () => {
          return p.select({
            message: "What database ORM would you like to use?",
            options: [
              { value: "none", label: "None" },
              { value: "prisma", label: "Prisma" },
            ],
            initialValue: "none",
          })
        },
        databaseProvider: ({ results }) => {
          if (results.database === "none") return
          return p.select({
            message: "",
            options: [
              { value: "sqlite", label: "SQLite (LibSQL)" },
              { value: "mysql", label: "MySQL" },
              { value: "postgresql", label: "PostgreSQL" },
            ],
            initialValue: "sqlite",
          })
        },
        ...(!cliResults.flags.noGit && {
          git: () => {
            return p.confirm({
              message:
                "Should be initialize a new Git repository and stage the changes?",
              initialValue: !defaultOptions.flags.noGit,
            })
          },
        }),
        ...(!cliResults.flags.noInstall && {
          install: () => {
            return p.confirm({
              message:
                `Should we run '${pkgManager}` +
                (pkgManager === "yarn" ? `'?` : ` install' for you?`),
              initialValue: !defaultOptions.flags.noInstall,
            })
          },
        }),
        importAlias: () => {
          return p.text({
            message: "What import alias would you like to use?",
            defaultValue: defaultOptions.flags.importAlias,
            placeholder: defaultOptions.flags.importAlias,
            validate: validateImportAlias,
          })
        },
      },
      {
        onCancel() {
          process.exit(1)
        },
      }
    )

    const packages: AvailablePackages[] = []
    if (project.authentication === "nextAuth") packages.push("nextAuth")
    // if (project.authentication === "lucia") packages.push("lucia")
    if (project.database === "prisma") packages.push("prisma")

    return {
      appName: project.name ?? cliResults.appName,
      packages,
      databaseProvider:
        (project.databaseProvider as DatabaseProvider) || "sqlite",
      flags: {
        ...cliResults.flags,
        noGit: !project.git || cliResults.flags.noGit,
        noInstall: !project.install || cliResults.flags.noInstall,
        importAlias: project.importAlias ?? cliResults.flags.importAlias,
      },
    }
  } catch (error) {
    // If the user is not calling create-tnt-app from an interactive terminal, inquirer will throw an IsTTYError
    // If this happens, we catch the error, tell the user what has happened, and then continue to run the program with a default tnt app
    if (error instanceof IsTTYError) {
      logger.warn(`${CREATE_TNT_APP} needs an interactive terminal to run.`)

      const shouldContinue = await p.confirm({
        message: "Continue scaffolding with default options?",
        initialValue: true,
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
