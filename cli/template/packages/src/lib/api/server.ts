import "server-only"

import { createHydrationHelpers } from "@trpc/react-query/rsc"
import { headers } from "next/headers"
import React from "react"

import { createTRPCContext } from "@/server/api/init"
import { createCaller, type AppRouter } from "@/server/api/root"

import { createQueryClient } from "./query-client"

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = React.cache(async () => {
  const heads = new Headers(await headers())
  heads.set("x-trpc-source", "rsc")

  return createTRPCContext({
    headers: heads,
  })
})

const caller = createCaller(createContext)
const getQueryClient = React.cache(createQueryClient)

export const { trpc: api, HydrateClient } = createHydrationHelpers<AppRouter>(
  caller,
  getQueryClient,
)
