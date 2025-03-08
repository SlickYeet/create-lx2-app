import { envVariablesInstaller } from "@/installers/env-vars.js"
import { nextAuthInstaller } from "@/installers/next-auth.js"
import { prismaInstaller } from "@/installers/prisma.js"
import { PackageManager } from "@/utils/get-user-pkg-manager.js"

// Turning this into a const allows the list to be iterated over for programmatically creating prompt options
// Should increase extensibility in the future
export const availablePackages = ["nextAuth", "prisma", "envVariables"] as const
export type AvailablePackages = (typeof availablePackages)[number]

export const databaseProviders = ["sqlite", "mysql", "postgresql"] as const
export type DatabaseProvider = (typeof databaseProviders)[number]

export interface InstallerOptions {
  projectDir: string
  projectName: string
  pkgManager: PackageManager
  noInstall: boolean
  packages?: PkgInstallerMap
  scopedAppName: string
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
})
