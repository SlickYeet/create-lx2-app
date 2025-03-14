/**
 * This maps the necessary packages to a version.
 * This improves performance significantly over fetching it from the npm registry.
 */
export const dependencyVersionMap = {
  // NextAuth.js
  "next-auth": "^4.24.11",
  "@auth/prisma-adapter": "^2.8.0",

  // Prisma
  prisma: "^6.5.0",
  "@prisma/client": "^6.5.0",
} as const
export type AvailableDependencies = keyof typeof dependencyVersionMap
