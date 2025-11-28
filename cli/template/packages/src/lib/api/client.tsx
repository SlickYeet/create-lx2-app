"use client"

import { QueryClientProvider, type QueryClient } from "@tanstack/react-query"
import { httpBatchStreamLink, loggerLink } from "@trpc/client"
import { createTRPCReact } from "@trpc/react-query"
import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server"
import React from "react"
import superjson from "superjson"

import { getBaseUrl } from "@/lib/utils"
import { type AppRouter } from "@/server/api/root"

import { createQueryClient } from "./query-client"

let clientQueryClientSingleton: QueryClient | undefined = undefined
function getQueryClient() {
  if (typeof window === "undefined") {
    // Server: always make a new query client
    return createQueryClient()
  }

  // Browser: use singleton pattern to keep the same query client
  clientQueryClientSingleton ??= createQueryClient()
  return clientQueryClientSingleton
}

export const api = createTRPCReact<AppRouter>()

/**
 * Inference helper for inputs.
 *
 * @example type HelloInput = RouterInputs["helloWorld"]["hello"]
 */
export type RouterInputs = inferRouterInputs<AppRouter>

/**
 * Inference helper for outputs.
 *
 * @example type HelloOutput = RouterOutputs["helloWorld"]["hello"]
 */
export type RouterOutputs = inferRouterOutputs<AppRouter>

export function TRPCReactProvider({ children }: React.PropsWithChildren) {
  const queryClient = getQueryClient()

  const [trpcClient] = React.useState(() =>
    api.createClient({
      links: [
        /**
         * The loggerLink is useful for debugging, but can be very noisy.
         * You can disable Query logging by commenting out the process.env.NODE_ENV check.
         *
         * @example
         * loggerLink({
         *   enabled: (opts) =>
         *     // process.env.NODE_ENV === "development" ||
         *     opts.direction === "down" && opts.result instanceof Error,
         * }),
         */
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        httpBatchStreamLink({
          transformer: superjson,
          url: `${getBaseUrl()}/api/trpc`,
          headers() {
            const headers = new Headers()
            headers.set("x-trpc-source", "nextjs-react")
            return headers
          },
        }),
      ],
    })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        {children}
      </api.Provider>
    </QueryClientProvider>
  )
}
