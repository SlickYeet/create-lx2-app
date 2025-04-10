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

  // Environment Variables
  "@t3-oss/env-nextjs": "^0.12.0",
  zod: "^3.24.2",

  // Prettier
  prettier: "^3.5.3",
  "prettier-plugin-tailwindcss": "^0.6.11",
  "@ianvs/prettier-plugin-sort-imports": "^4.4.1",

  // ESLint
  eslint: "^9",
  "eslint-config-next": "^15.2.4",
  "@eslint/eslintrc": "^3.3.1",

  // TypeScript
  typescript: "^5.8.2",
  "@types/node": "^22",
  "@types/react": "^19",
  "@types/react-dom": "^19",

  // Payload CMS
  payload: "^3.33.0",
  "@payloadcms/next": "^3.33.0",
  "@payloadcms/payload-cloud": "^3.33.0",
  "@payloadcms/richtext-lexical": "^3.33.0",
  "@payloadcms/db-vercel-postgres": "^3.33.0",
  "@payloadcms/db-sqlite": "^3.33.0",
  graphql: "^16.10.0",
  sharp: "^0.34.1",
} as const
export type AvailableDependencies = keyof typeof dependencyVersionMap
