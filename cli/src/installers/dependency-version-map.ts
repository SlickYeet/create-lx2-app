/**
 * This maps the necessary packages to a version.
 * This improves performance significantly over fetching it from the npm registry.
 */
export const dependencyVersionMap = {
  // Auth.js
  "next-auth": "^5.0.0-beta.25",
  "@auth/prisma-adapter": "^2.11.1",
  "@auth/drizzle-adapter": "^1.11.1",

  // Better-Auth
  "better-auth": "^1.4.1",
  "better-sqlite3": "^12.4.6",
  "@types/better-sqlite3": "^7.6.13",

  // Prisma
  prisma: "^7.0.0",
  "@prisma/client": "^7.0.0",

  // Drizzle ORM
  "drizzle-orm": "^0.44.7",
  "drizzle-kit": "^0.31.7",
  "@libsql/client": "^0.15.15",
  mysql2: "^3.15.3",
  postgres: "^3.4.7",

  // tRPC
  "@trpc/server": "^11.7.2",
  "@trpc/client": "^11.7.2",
  "@trpc/react-query": "^11.7.2",
  "@tanstack/react-query": "^5.90.10",
  "server-only": "^0.0.1",
  superjson: "^2.2.5",

  // Environment Variables
  "@t3-oss/env-nextjs": "^0.13.8",
  zod: "^4.1.13",

  // Prettier
  prettier: "^3.6.2",
  "prettier-plugin-tailwindcss": "^0.7.1",
  "@ianvs/prettier-plugin-sort-imports": "^4.7.0",

  // ESLint
  eslint: "^9.39.1",
  "eslint-config-next": "^16.0.4",
  "@eslint/eslintrc": "^3.3.1",

  // Biome
  "@biomejs/biome": "^2.3.7",

  // TypeScript
  typescript: "^5.9.3",
  "@types/node": "^24.9.2",
  "@types/react": "^19.2.2",
  "@types/react-dom": "^19.2.2",

  // Payload CMS
  payload: "^3.64.0",
  "@payloadcms/next": "^3.64.0",
  "@payloadcms/payload-cloud": "^3.64.0",
  "@payloadcms/richtext-lexical": "^3.64.0",
  "@payloadcms/db-vercel-postgres": "^3.64.0",
  "@payloadcms/db-sqlite": "^3.64.0",
  graphql: "^16.12.0",
  sharp: "^0.34.5",
} as const
export type AvailableDependencies = keyof typeof dependencyVersionMap
