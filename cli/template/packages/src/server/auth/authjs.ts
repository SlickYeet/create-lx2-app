import NextAuth from "next-auth"

import { authConfig } from "@/server/auth/config"

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig)
