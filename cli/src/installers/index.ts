import { typescriptInstaller } from "@/installers/typescript.js"
import { type PackageManager } from "@/utils/get-user-pkg-manager.js"

import { envVariablesInstaller } from "./env-vars.js"
import { eslintInstaller } from "./eslint.js"
import { nextAuthInstaller } from "./next-auth.js"
import { prettierInstaller } from "./prettier.js"
import { prismaInstaller } from "./prisma.js"

// Turning this into a const allows the list to be iterated over for programmatically creating prompt options
// Should increase extensibility in the future
export const availablePackages = [
  "nextAuth",
  "prisma",
  "envVariables",
  "prettier",
  "eslint",
  "typescript",
] as const
export type AvailablePackages = (typeof availablePackages)[number]

export const databaseProviders = ["sqlite", "mysql", "postgresql"] as const
export type DatabaseProvider = (typeof databaseProviders)[number]

export interface InstallerOptions {
  projectDir: string
  projectName: string
  scopedAppName: string
  pkgManager: PackageManager
  packages?: PkgInstallerMap
  noInstall: boolean
  databaseProvider: DatabaseProvider
}

export type Installer = (opts: InstallerOptions) => void

export type PkgInstallerMap = {
  [pkg in AvailablePackages]: {
    inUse: boolean
    installer: Installer
  }
}

export const buildPkgInstallerMap = (
  packages: AvailablePackages[]
): PkgInstallerMap => ({
  nextAuth: {
    inUse: packages.includes("nextAuth"),
    installer: nextAuthInstaller,
  },
  prisma: {
    inUse: packages.includes("prisma"),
    installer: prismaInstaller,
  },
  envVariables: {
    inUse: true,
    installer: envVariablesInstaller,
  },
  prettier: {
    inUse: packages.includes("prettier"),
    installer: prettierInstaller,
  },
  eslint: {
    inUse: true,
    installer: eslintInstaller,
  },
  typescript: {
    inUse: true,
    installer: typescriptInstaller,
  },
})
