// This is an example schema for PostgreSQL using Drizzle ORM.
// Learn more at https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm"
import { index, mysqlTableCreator, primaryKey } from "drizzle-orm/mysql-core"
import { type AdapterAccountType } from "next-auth/adapters"

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
    id: d
      .varchar({ length: 255 })
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: d.varchar({ length: 255 }).notNull(),
    email: d.varchar({ length: 255 }).notNull().unique(),
    emailVerified: d.timestamp({ mode: "date", fsp: 3 }),
    image: d.varchar({ length: 255 }),
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
    sessionToken: d.varchar({ length: 255 }).primaryKey(),
    userId: d
      .varchar({ length: 255 })
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    expires: d.timestamp({ mode: "date" }).notNull(),
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
    provider: d.varchar({ length: 255 }).notNull(),
    providerAccountId: d.varchar({ length: 255 }).notNull(),
    id_token: d.varchar({ length: 2048 }),
    scope: d.varchar({ length: 255 }),
    password: d.text(),
    type: d.varchar({ length: 255 }).$type<AdapterAccountType>().notNull(),
    token_type: d.varchar({ length: 255 }),
    session_state: d.varchar({ length: 255 }),
    access_token: d.varchar({ length: 255 }),
    refresh_token: d.varchar({ length: 255 }),
    userId: d
      .varchar({ length: 255 })
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    expires_at: d.int(),
  }),
  (t) => [
    index("account_userId_idx").on(t.userId),
    primaryKey({ columns: [t.provider, t.providerAccountId] }),
  ]
)

export const verificationToken = createTable(
  "verificationToken",
  (d) => ({
    identifier: d.varchar({ length: 255 }).notNull(),
    token: d.varchar({ length: 255 }).notNull(),
    expires: d.timestamp({ mode: "date" }).notNull(),
  }),
  (t) => [
    index("verification_identifier_idx").on(t.identifier),
    primaryKey({ columns: [t.identifier, t.token] }),
  ]
)

export const authenticator = createTable(
  "authenticator",
  (d) => ({
    counter: d.int().notNull(),
    transports: d.varchar({ length: 255 }),
    credentialID: d.varchar({ length: 255 }).notNull().unique(),
    credentialPublicKey: d.varchar({ length: 255 }).notNull(),
    credentialDeviceType: d.varchar({ length: 255 }).notNull(),
    credentialBackedUp: d.boolean().notNull(),
    providerAccountId: d.varchar({ length: 255 }).notNull(),
    userId: d
      .varchar({ length: 255 })
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  }),
  (t) => [
    index("authenticators_userId_idx").on(t.userId),
    primaryKey({ columns: [t.userId, t.credentialID] }),
  ]
)
