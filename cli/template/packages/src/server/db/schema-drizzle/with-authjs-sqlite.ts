// This is an example schema for PostgreSQL using Drizzle ORM.
// Learn more at https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm"
import { index, primaryKey, sqliteTableCreator } from "drizzle-orm/sqlite-core"
import type { AdapterAccountType } from "next-auth/adapters"

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
    id: d
      .text()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: d.text(),
    email: d.text().unique(),
    emailVerified: d.integer({ mode: "timestamp" }),
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
    sessionToken: d.text().primaryKey(),
    userId: d
      .text()
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    expires: d.integer({ mode: "timestamp" }).notNull(),
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
    provider: d.text().notNull(),
    providerAccountId: d.text().notNull(),
    id_token: d.text(),
    scope: d.text(),
    password: d.text(),
    type: d.text().$type<AdapterAccountType>().notNull(),
    token_type: d.text(),
    session_state: d.text(),
    access_token: d.text(),
    refresh_token: d.text(),
    userId: d
      .text()
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    expires_at: d.integer(),
    createdAt: d
      .integer({ mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: d.integer({ mode: "timestamp" }).$onUpdate(() => new Date()),
  }),
  (t) => [
    index("account_userId_idx").on(t.userId),
    primaryKey({ columns: [t.provider, t.providerAccountId] }),
  ]
)

export const verificationToken = createTable(
  "verificationToken",
  (d) => ({
    identifier: d.text().notNull(),
    token: d.text().notNull(),
    expires: d.integer({ mode: "timestamp_ms" }).notNull(),
    createdAt: d
      .integer({ mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: d.integer({ mode: "timestamp" }).$onUpdate(() => new Date()),
  }),
  (t) => [
    index("verification_identifier_idx").on(t.identifier),
    primaryKey({ columns: [t.identifier, t.token] }),
  ]
)

export const authenticator = createTable(
  "authenticator",
  (d) => ({
    counter: d.integer().notNull(),
    transports: d.text(),
    credentialID: d.text().notNull().unique(),
    credentialPublicKey: d.text().notNull(),
    credentialDeviceType: d.text().notNull(),
    credentialBackedUp: d.integer({ mode: "boolean" }).notNull(),
    providerAccountId: d.text().notNull(),
    userId: d
      .text()
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  }),
  (t) => [
    index("authenticator_userId_idx").on(t.userId),
    primaryKey({ columns: [t.userId, t.credentialID] }),
  ]
)
