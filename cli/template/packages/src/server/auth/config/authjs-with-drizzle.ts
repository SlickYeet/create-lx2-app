import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { NextAuthConfig } from "next-auth"
import Discord from "next-auth/providers/discord"

import { env } from "@/env"
import { db } from "@/server/db"
import {
  account,
  authenticator,
  session,
  user,
  verificationToken,
} from "@/server/db/schema.ts"

/**
 * This is the Auth.js configuration for the application.
 *
 * @see https://authjs.dev/getting-started/installation
 */
export const authConfig: NextAuthConfig = {
  adapter: DrizzleAdapter(db, {
    /**
     * For the `createTable` function to work correctly, we need to
     * specify the table names for Auth.js models here.
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
