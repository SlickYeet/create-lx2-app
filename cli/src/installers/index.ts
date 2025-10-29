import { type PackageManager } from "@/utils/get-user-pkg-manager.js"

import { authjsInstaller } from "./authjs.js"
import { betterAuthInstaller } from "./better-auth.js"
import { biomeInstaller } from "./biome.js"
import { drizzleInstaller } from "./drizzle.js"
import { envVariablesInstaller } from "./env-vars.js"
import { eslintInstaller } from "./eslint.js"
import { payloadCMSInstaller } from "./payloadcms.js"
import { prismaInstaller } from "./prisma.js"
import { typescriptInstaller } from "./typescript.js"

// Turning this into a const allows the list to be iterated over for programmatically creating prompt options
// Should increase extensibility in the future
export const availablePackages = [
  "authjs",
  "betterAuth",
  "prisma",
  "drizzle",
  "envVariables",
  "eslint/prettier",
  "biome",
  "typescript",
  "payload",
] as const
export type AvailablePackages = (typeof availablePackages)[number]

export const backendFrameworks = ["nextjs", "payload"] as const
export type BackendFramework = (typeof backendFrameworks)[number]

export const authProviders = ["none", "authjs", "betterAuth"] as const
export type AuthProvider = (typeof authProviders)[number]

export const databaseORM = ["none", "prisma", "drizzle"] as const
export type DatabaseORM = (typeof databaseORM)[number]

export const databaseProviders = ["sqlite", "mysql", "postgresql"] as const
export type DatabaseProvider = (typeof databaseProviders)[number]

export const linters = ["eslint/prettier", "biome"] as const
export type Linter = (typeof linters)[number]

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
  authjs: {
    inUse: packages.includes("authjs"),
    installer: authjsInstaller,
  },
  betterAuth: {
    inUse: packages.includes("betterAuth"),
    installer: betterAuthInstaller,
  },
  prisma: {
    inUse: packages.includes("prisma"),
    installer: prismaInstaller,
  },
  drizzle: {
    inUse: packages.includes("drizzle"),
    installer: drizzleInstaller,
  },
  envVariables: {
    inUse: true,
    installer: envVariablesInstaller,
  },
  "eslint/prettier": {
    inUse: packages.includes("eslint/prettier"),
    installer: eslintInstaller,
  },
  biome: {
    inUse: packages.includes("biome"),
    installer: biomeInstaller,
  },
  typescript: {
    inUse: true,
    installer: typescriptInstaller,
  },
  payload: {
    inUse: packages.includes("payload"),
    installer: payloadCMSInstaller,
  },
})
