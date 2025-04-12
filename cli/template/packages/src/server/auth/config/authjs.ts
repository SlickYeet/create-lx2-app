import { NextAuthConfig } from "next-auth"
import Discord from "next-auth/providers/discord"

import { env } from "@/env"

/**
 * This is the Auth.js configuration for the application.
 *
 * @see https://authjs.dev/getting-started/installation
 */
export const authConfig: NextAuthConfig = {
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
