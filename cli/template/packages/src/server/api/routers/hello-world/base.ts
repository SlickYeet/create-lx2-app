import z from "zod"

import { createTRPCRouter, publicProcedure } from "@/server/api/init"

export const helloWorldRouter = createTRPCRouter({
  greeting: publicProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query(({ input }) => {
      return `Hello ${input.text}`
    }),
})
