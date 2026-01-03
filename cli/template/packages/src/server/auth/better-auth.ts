import { betterAuth } from "better-auth"
import { nextCookies } from "better-auth/next-js"
import Database from "better-sqlite3"

import { env } from "@/env"

export const auth = betterAuth({
  database: new Database("./db.sqlite"),
  baseURL: env.NEXT_PUBLIC_BETTER_AUTH_URL,
  socialProviders: {
    discord: {
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    },
  },
  plugins: [nextCookies()], // make sure nextCookies() is the last plugin in the array
})
