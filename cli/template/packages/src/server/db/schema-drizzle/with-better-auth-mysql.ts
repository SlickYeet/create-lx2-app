// This is an example schema for PostgreSQL using Drizzle ORM.
// Learn more at https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm"
import { index, mysqlTableCreator } from "drizzle-orm/mysql-core"

/**
 * Below is an example of how to create a table with a prefix.
 * This is useful for multi-tenant applications where you want to separate data by tenant.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = mysqlTableCreator((name) => `project1_${name}`)

export const post = createTable(
  "post",
  (d) => ({
    id: d.bigint({ mode: "number" }).primaryKey().autoincrement(),
    name: d.varchar({ length: 255 }).notNull(),
    createdAt: d
      .timestamp()
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d.timestamp().$onUpdate(() => new Date()),
  }),
  (t) => [index("post_name_idx").on(t.name)]
)

export const user = createTable(
  "user",
  (d) => ({
    id: d.varchar({ length: 36 }).primaryKey(),
    name: d.varchar({ length: 255 }).notNull(),
    email: d.varchar({ length: 255 }).notNull().unique(),
    emailVerified: d
      .boolean()
      .$defaultFn(() => false)
      .notNull(),
    image: d.text(),
    createdAt: d
      .timestamp()
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d.timestamp().$onUpdate(() => new Date()),
  }),
  (t) => [
    index("user_name_idx").on(t.name),
    index("user_email_idx").on(t.email),
  ]
)

export const session = createTable(
  "session",
  (d) => ({
    id: d.varchar({ length: 36 }).primaryKey(),
    token: d.varchar({ length: 255 }).notNull().unique(),
    ipAddress: d.text(),
    userAgent: d.text(),
    userId: d
      .varchar({ length: 36 })
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    expiresAt: d.timestamp().notNull(),
    createdAt: d
      .timestamp()
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d.timestamp().$onUpdate(() => new Date()),
  }),
  (t) => [index("session_userId_idx").on(t.userId)]
)

export const account = createTable(
  "account",
  (d) => ({
    id: d.varchar({ length: 36 }).primaryKey(),
    accountId: d.text().notNull(),
    providerId: d.text().notNull(),
    idToken: d.text(),
    scope: d.text(),
    password: d.text(),
    accessToken: d.text(),
    refreshToken: d.text(),
    accessTokenExpiresAt: d.timestamp(),
    refreshTokenExpiresAt: d.timestamp(),
    userId: d
      .varchar({ length: 36 })
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    createdAt: d
      .timestamp()
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d.timestamp().$onUpdate(() => new Date()),
  }),
  (t) => [index("account_userId_idx").on(t.userId)]
)

export const verification = createTable(
  "verification",
  (d) => ({
    id: d.varchar({ length: 36 }).primaryKey(),
    identifier: d.varchar({ length: 255 }).notNull(),
    value: d.text().notNull(),
    expiresAt: d.timestamp().notNull(),
    createdAt: d
      .timestamp()
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d.timestamp().$onUpdate(() => new Date()),
  }),
  (t) => [index("verification_identifier_idx").on(t.identifier)]
)
