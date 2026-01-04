import { PrismaLibSql } from "@prisma/adapter-libsql"

import { env } from "@/env"
import { PrismaClient } from "@/generated/prisma"

const adapter = new PrismaLibSql({
  url: env.DATABASE_URL,
})

const createPrismaClient = () =>
  new PrismaClient({
    adapter,
    log:
      env.NODE_ENV === "development"
        ? [
            // "query",
            "error",
            "warn",
          ]
        : ["error"],
  })

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined
}

export const db = globalForPrisma.prisma ?? createPrismaClient()

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db
