// This is an example schema for PostgreSQL using Drizzle ORM.
// Learn more at https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm"
import { index, sqliteTableCreator } from "drizzle-orm/sqlite-core"

/**
 * Below is an example of how to create a table with a prefix.
 * This is useful for multi-tenant applications where you want to separate data by tenant.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator((name) => `project1_${name}`)

export const post = createTable(
  "post",
  (d) => ({
    id: d.integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
    name: d.text({ length: 255 }).notNull(),
    createdAt: d
      .integer({ mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: d.integer({ mode: "timestamp" }).$onUpdate(() => new Date()),
  }),
  (t) => [index("post_name_idx").on(t.name)]
)

export const user = createTable(
  "user",
  (d) => ({
    id: d.text().primaryKey(),
    name: d.text().notNull(),
    email: d.text().notNull().unique(),
    emailVerified: d
      .integer({ mode: "boolean" })
      .$defaultFn(() => false)
      .notNull(),
    image: d.text(),
    createdAt: d
      .integer({ mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: d.integer({ mode: "timestamp" }).$onUpdate(() => new Date()),
  }),
  (t) => [
    index("user_name_idx").on(t.name),
    index("user_email_idx").on(t.email),
  ]
)

export const session = createTable(
  "session",
  (d) => ({
    id: d.text().primaryKey(),
    token: d.text().notNull().unique(),
    ipAddress: d.text(),
    userAgent: d.text(),
    userId: d
      .text()
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    expiresAt: d.integer({ mode: "timestamp" }).notNull(),
    createdAt: d
      .integer({ mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: d.integer({ mode: "timestamp" }).$onUpdate(() => new Date()),
  }),
  (t) => [index("session_userId_idx").on(t.userId)]
)

export const account = createTable(
  "account",
  (d) => ({
    id: d.text().primaryKey(),
    accountId: d.text().notNull(),
    providerId: d.text().notNull(),
    idToken: d.text(),
    scope: d.text(),
    password: d.text(),
    accessToken: d.text(),
    refreshToken: d.text(),
    accessTokenExpiresAt: d.integer({ mode: "timestamp" }),
    refreshTokenExpiresAt: d.integer({ mode: "timestamp" }),
    userId: d
      .text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    createdAt: d
      .integer({ mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: d.integer({ mode: "timestamp" }).$onUpdate(() => new Date()),
  }),
  (t) => [index("account_userId_idx").on(t.userId)]
)

export const verification = createTable(
  "verification",
  (d) => ({
    id: d.text().primaryKey(),
    identifier: d.text().notNull(),
    value: d.text().notNull(),
    expiresAt: d.integer({ mode: "timestamp" }).notNull(),
    createdAt: d
      .integer({ mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: d.integer({ mode: "timestamp" }).$onUpdate(() => new Date()),
  }),
  (t) => [index("verification_identifier_idx").on(t.identifier)]
)
