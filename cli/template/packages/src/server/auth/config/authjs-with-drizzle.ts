import { DrizzleAdapter } from "@auth/drizzle-adapter"
import type { NextAuthConfig } from "next-auth"
import Discord from "next-auth/providers/discord"

import { env } from "@/env"
import { db } from "@/server/db"
import {
  account,
  authenticator,
  session,
  user,
  verificationToken,
} from "@/server/db/schema"

/**
 * This is the Auth.js configuration for the application.
 *
 * @see https://authjs.dev/getting-started/installation
 */
export const authConfig: NextAuthConfig = {
  adapter: DrizzleAdapter(db, {
    /**
     * The Auth.js Drizzle adapter expects plural table names in code and singular in the database.
     * Here, for consistency, we're explicitly mapping to our singular table names.
     * Without this mapping, it would look for tables named "users", "accounts", etc.
     * You do not need to define models here that are not used by Auth.js.
     *
     * @see https://authjs.dev/getting-started/adapters/drizzle#passing-your-own-schemas
     */
    usersTable: user,
    accountsTable: account,
    sessionsTable: session,
    verificationTokensTable: verificationToken,
    authenticatorsTable: authenticator,
  }),
  providers: [
    Discord({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the Auth.js docs for the provider you want to use. Example:
     *
     * @see https://authjs.dev/getting-started/providers/github
     */
  ],
}
