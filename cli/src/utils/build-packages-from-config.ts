import {
  availablePackages,
  type AuthProvider,
  type AvailablePackages,
  type BackendFramework,
  type DatabaseORM,
  type DatabaseProvider,
  type Linter,
} from "@/installers/index.js"

/**
 * Some options may need to be made optional
 */
export interface PackageConfig {
  backend: BackendFramework
  trpc: boolean
  authentication: AuthProvider
  orm: DatabaseORM
  linter: Linter
  dbProvider: DatabaseProvider
}

function isAvailablePackage(value: string): value is AvailablePackages {
  return availablePackages.includes(value as AvailablePackages)
}

/**
 * Builds the packages array and determines the database provider
 */
export function buildPackagesFromConfig(config: PackageConfig): {
  packages: AvailablePackages[]
  databaseProvider: DatabaseProvider
} {
  const packages: AvailablePackages[] = []

  // Backend
  if (config.backend !== "nextjs" && isAvailablePackage(config.backend)) {
    packages.push(config.backend)
  }

  // TRPC
  if (config.trpc) packages.push("trpc")

  // Authentication
  if (
    config.authentication !== "none" &&
    isAvailablePackage(config.authentication)
  ) {
    packages.push(config.authentication)
  }

  // ORM - databaseORM values match package names directly
  if (config.orm !== "none" && isAvailablePackage(config.orm)) {
    packages.push(config.orm)
  }

  // Linter
  if (isAvailablePackage(config.linter)) {
    packages.push(config.linter)
  }

  // Database provider
  const databaseProvider =
    packages.includes("prisma") || packages.includes("drizzle")
      ? config.dbProvider
      : "sqlite"

  return { packages, databaseProvider }
}
