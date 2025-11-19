import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { getEventById, getEvents, getEventStats } from "./db";

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  events: router({
    list: publicProcedure
      .input(z.object({
        limit: z.number().optional(),
        discipline: z.string().optional(),
        region: z.string().optional(),
      }).optional())
      .query(async ({ input }) => {
        const events = await getEvents(input?.limit, input?.discipline, input?.region);
        return {
          success: true,
          events,
        };
      }),

    getById: publicProcedure
      .input(z.object({
        id: z.string(),
      }))
      .query(async ({ input }) => {
        const event = await getEventById(input.id);
        if (!event) {
          return {
            success: false,
            error: 'Event not found',
          };
        }
        return {
          success: true,
          event,
        };
      }),

    stats: publicProcedure.query(async () => {
      const stats = await getEventStats();
      return {
        success: true,
        stats,
      };
    }),
  }),
});

export type AppRouter = typeof appRouter;
