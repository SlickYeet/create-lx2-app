import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { nextCookies } from "better-auth/next-js"

import { env } from "@/env"
import { db } from "@/server/db"

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "sqlite",
  }),
  baseURL: env.NEXT_PUBLIC_URL,
  socialProviders: {
    discord: {
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    },
  },
  plugins: [nextCookies()], // make sure nextCookies() is the last plugin in the array
})
