import { z } from "zod"

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/init"

let post = {
  id: 1,
  name: "Hello World",
}

export const postRouter = createTRPCRouter({
  greeting: publicProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query(({ input }) => {
      return `Hello ${input.text}`
    }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
      })
    )
    .mutation(async ({ input }) => {
      post = { id: post.id + 1, name: input.name }
      return post
    }),

  getLatest: protectedProcedure.query(async () => {
    return post
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!"
  }),
})
