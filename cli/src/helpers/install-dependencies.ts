import chalk from "chalk"
import { execa, type StdoutStderrOption } from "execa"
import ora, { type Ora } from "ora"

import {
  getUserPkgManager,
  type PackageManager,
} from "@/utils/get-user-pkg-manager.js"
import { logger } from "@/utils/logger.js"

const execWithSpinner = async (
  projectDir: string,
  pkgManager: PackageManager,
  options: {
    args?: string[]
    stdout?: StdoutStderrOption
    onDataHandle?: (spinner: Ora) => (data: Buffer) => void
  }
) => {
  const { onDataHandle, args = ["install"], stdout = "pipe" } = options

  const spinner = ora(`Running ${pkgManager} install...`).start()
  const subprocess = execa(pkgManager, args, { cwd: projectDir, stdout })

  await new Promise<void>((res, rej) => {
    if (onDataHandle) {
      subprocess.stdout?.on("data", onDataHandle(spinner))
    }

    void subprocess.on("error", (e) => rej(e))
    void subprocess.on("close", () => res())
  })

  return spinner
}

// Get the install arguments for a package manager
const getInstallArgs = (
  pkgManager: PackageManager,
  withPayload: boolean
): string[] => {
  if (!withPayload) {
    return ["install"]
  }

  switch (pkgManager) {
    case "npm":
      return ["install", "--legacy-peer-deps"]
    case "pnpm":
      return ["install", "--strict-peer-dependencies=false"]
    case "yarn":
      // Yarn v1 uses --ignore-engines, Yarn v2+ handles peer deps differently
      return ["install"]
    case "bun":
      return ["install"]
  }
}

const runInstallCommand = async (
  pkgManager: PackageManager,
  projectDir: string,
  withPayload: boolean
): Promise<Ora | null> => {
  const installArgs = getInstallArgs(pkgManager, withPayload)

  switch (pkgManager) {
    // When using npm, inherit the stderr stream so that the progress bar is shown
    case "npm":
      await execa(pkgManager, installArgs, {
        cwd: projectDir,
        stderr: "inherit",
      })

      return null
    // When using yarn or pnpm, use the stdout stream and ora spinner to show the progress
    case "pnpm":
      return execWithSpinner(projectDir, pkgManager, {
        args: installArgs,
        onDataHandle: (spinner) => (data) => {
          const text = data.toString()

          if (text.includes("Progress")) {
            spinner.text = text.includes("|")
              ? (text.split(" | ")[1] ?? "")
              : text
          }
        },
      })
    case "yarn":
      return execWithSpinner(projectDir, pkgManager, {
        args: installArgs,
        onDataHandle: (spinner) => (data) => {
          spinner.text = data.toString()
        },
      })
    // When using bun, the stdout stream is ignored and the spinner is shown
    case "bun":
      return execWithSpinner(projectDir, pkgManager, {
        args: installArgs,
        stdout: "ignore",
      })
  }
}

export const installDependencies = async ({
  projectDir,
  withPayload = false,
}: {
  projectDir: string
  withPayload?: boolean
}) => {
  logger.info("Installing dependencies...")
  const pkgManager = getUserPkgManager()

  const installSpinner = await runInstallCommand(
    pkgManager,
    projectDir,
    withPayload
  )

  // If the spinner was used to show the progress, use succeed method on it
  // If not, use the succeed on a new spinner
  ;(installSpinner ?? ora()).succeed(
    chalk.green("Successfully installed dependencies!\n")
  )
}
