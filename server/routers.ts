import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { getEventById, getEvents, getEventStats, getAllFederations, getFederationById, getPublishedBlogPosts, getBlogPostBySlug, getAllBlogPosts, createBlogPost, updateBlogPost } from "./db";
import { protectedProcedure } from "./_core/trpc";
import { nanoid } from "nanoid";

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

  federations: router({
    list: publicProcedure.query(async () => {
      const federations = await getAllFederations();
      return {
        success: true,
        federations,
      };
    }),

    getById: publicProcedure
      .input(z.object({
        id: z.string(),
      }))
      .query(async ({ input }) => {
        const federation = await getFederationById(input.id);
        if (!federation) {
          return {
            success: false,
            error: 'Federation not found',
          };
        }
        return {
          success: true,
          federation,
        };
      }),

    getEvents: publicProcedure
      .input(z.object({
        federationId: z.string(),
      }))
      .query(async ({ input }) => {
        // Get events for this federation from MongoDB
        const events = await getEvents(500);
        const federationEvents = events.filter((e: any) => e.federation_id === input.federationId);
        return {
          success: true,
          events: federationEvents,
        };
      }),
  }),

  blog: router({
    list: publicProcedure.query(async () => {
      const posts = await getPublishedBlogPosts();
      return {
        success: true,
        posts,
      };
    }),

    getBySlug: publicProcedure
      .input(z.object({
        slug: z.string(),
      }))
      .query(async ({ input }) => {
        const post = await getBlogPostBySlug(input.slug);
        if (!post) {
          return {
            success: false,
            error: 'Post not found',
          };
        }
        return {
          success: true,
          post,
        };
      }),

    adminList: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== 'admin') {
        throw new Error('Unauthorized');
      }
      const posts = await getAllBlogPosts();
      return {
        success: true,
        posts,
      };
    }),

    create: protectedProcedure
      .input(z.object({
        title: z.string(),
        slug: z.string(),
        excerpt: z.string().optional(),
        content: z.string(),
        coverImage: z.string().optional(),
        category: z.string().optional(),
        tags: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        const post = await createBlogPost({
          id: nanoid(),
          ...input,
          authorId: ctx.user.id,
          status: ctx.user.role === 'admin' ? 'published' : 'pending',
          publishedAt: ctx.user.role === 'admin' ? new Date() : undefined,
        });
        return {
          success: true,
          post,
        };
      }),

    updateStatus: protectedProcedure
      .input(z.object({
        id: z.string(),
        status: z.enum(['draft', 'pending', 'published', 'archived']),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== 'admin') {
          throw new Error('Unauthorized');
        }
        await updateBlogPost(input.id, {
          status: input.status,
          publishedAt: input.status === 'published' ? new Date() : undefined,
        });
        return {
          success: true,
        };
      }),
  }),
});

export type AppRouter = typeof appRouter;
