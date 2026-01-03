import z from "zod"

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/init"
import { post } from "@/server/db/schema"

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

  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(post).values({
        name: input.name,
      })
    }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.query.post.findFirst({
      orderBy: (post, { desc }) => [desc(post.createdAt)],
    })

    return post ?? null
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!"
  }),
})
