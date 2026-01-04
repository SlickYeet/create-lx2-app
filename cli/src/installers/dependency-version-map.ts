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
  "better-auth": "^1.4.6",
  "better-sqlite3": "^12.5.0",
  "@types/better-sqlite3": "^7.6.13",

  // Prisma
  prisma: "^7.1.0",
  "@prisma/client": "^7.1.0",
  "@prisma/adapter-better-sqlite3": "^7.2.0",
  "@prisma/adapter-libsql": "^7.2.0",
  "@prisma/adapter-mariadb": "^7.2.0",
  "@prisma/adapter-pg": "^7.2.0",

  // Drizzle ORM
  "drizzle-orm": "^0.45.0",
  "drizzle-kit": "^0.31.8",
  "@libsql/client": "^0.15.15",
  mysql2: "^3.15.3",
  postgres: "^3.4.7",

  // Environment Variables
  "@t3-oss/env-nextjs": "^0.13.8",
  zod: "^4.1.13",

  // Prettier
  prettier: "^3.7.4",
  "prettier-plugin-tailwindcss": "^0.7.2",
  "@ianvs/prettier-plugin-sort-imports": "^4.7.0",

  // ESLint
  eslint: "^9.39.1",
  "eslint-config-next": "^16.0.8",
  "@eslint/eslintrc": "^3.3.3",

  // Biome
  "@biomejs/biome": "^2.3.8",

  // TypeScript
  typescript: "^5.9.3",
  "@types/node": "^24.10.2",
  "@types/react": "^19.2.7",
  "@types/react-dom": "^19.2.3",

  // Payload CMS
  payload: "^3.67.0",
  "@payloadcms/next": "^3.67.0",
  "@payloadcms/payload-cloud": "^3.67.0",
  "@payloadcms/richtext-lexical": "^3.67.0",
  "@payloadcms/db-vercel-postgres": "^3.67.0",
  "@payloadcms/db-sqlite": "^3.67.0",
  graphql: "^16.12.0",
  sharp: "^0.34.5",
} as const
export type AvailableDependencies = keyof typeof dependencyVersionMap
