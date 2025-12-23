import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { TRPCError } from "@trpc/server";
import { nanoid } from "nanoid";
import {
  getAllCapPricing,
  getCapPricingByType,
  getCapPricingById,
  createCapPricing,
  updateCapPricing,
  deleteCapPricing,
  getAllCapTestimonials,
  getCapTestimonialsByType,
  getCapTestimonialById,
  createCapTestimonial,
  updateCapTestimonial,
  deleteCapTestimonial,
} from "../db";

// Admin-only procedure
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== 'admin') {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin access required' });
  }
  return next({ ctx });
});

export const capManagementRouter = router({
  // Public endpoints for calculator and display
  pricing: router({
    getAll: publicProcedure.query(async () => {
      return await getAllCapPricing();
    }),

    getByType: publicProcedure
      .input(z.object({ capType: z.string() }))
      .query(async ({ input }) => {
        return await getCapPricingByType(input.capType);
      }),

    calculatePrice: publicProcedure
      .input(z.object({
        capType: z.string(),
        colorCount: z.number(),
        quantity: z.number(),
      }))
      .query(async ({ input }) => {
        const allPricing = await getCapPricingByType(input.capType);
        
        // Filter by color count and quantity range
        const applicable = allPricing.filter((p: any) => 
          p.colorCount === input.colorCount &&
          p.minQuantity <= input.quantity &&
          (p.maxQuantity === null || p.maxQuantity >= input.quantity)
        );

        if (applicable.length === 0) {
          return null;
        }

        // Return the most specific pricing (highest minQuantity)
        const best = applicable.reduce((prev: any, curr: any) => 
          curr.minQuantity > prev.minQuantity ? curr : prev
        );

        return {
          pricePerUnit: parseFloat(best.pricePerUnit),
          totalPrice: parseFloat(best.pricePerUnit) * input.quantity,
          currency: best.currency,
          minQuantity: best.minQuantity,
          maxQuantity: best.maxQuantity,
        };
      }),
  }),

  // Admin endpoints for pricing management
  admin: router({
    pricing: router({
      getAll: adminProcedure.query(async () => {
        return await getAllCapPricing();
      }),

      getById: adminProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ input }) => {
          return await getCapPricingById(input.id);
        }),

      create: adminProcedure
        .input(z.object({
          capType: z.string(),
          colorCount: z.number(),
          minQuantity: z.number(),
          maxQuantity: z.number().nullable(),
          pricePerUnit: z.string(),
          currency: z.string().default("EUR"),
        }))
        .mutation(async ({ input }) => {
          const id = nanoid();
          await createCapPricing({
            id,
            ...input,
            active: true,
          });
          return { success: true, id };
        }),

      update: adminProcedure
        .input(z.object({
          id: z.string(),
          capType: z.string().optional(),
          colorCount: z.number().optional(),
          minQuantity: z.number().optional(),
          maxQuantity: z.number().nullable().optional(),
          pricePerUnit: z.string().optional(),
          currency: z.string().optional(),
          active: z.boolean().optional(),
        }))
        .mutation(async ({ input }) => {
          const { id, ...data } = input;
          await updateCapPricing(id, data);
          return { success: true };
        }),

      delete: adminProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ input }) => {
          await deleteCapPricing(input.id);
          return { success: true };
        }),
    }),

    testimonials: router({
      getAll: adminProcedure.query(async () => {
        return await getAllCapTestimonials();
      }),

      getById: adminProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ input }) => {
          return await getCapTestimonialById(input.id);
        }),

      create: adminProcedure
        .input(z.object({
          customerName: z.string(),
          clubName: z.string(),
          quote: z.string(),
          photo: z.string().nullable().optional(),
          capType: z.string().nullable().optional(),
          rating: z.number().min(1).max(5).default(5),
          featured: z.boolean().default(false),
          displayOrder: z.number().default(0),
        }))
        .mutation(async ({ input }) => {
          const id = nanoid();
          await createCapTestimonial({
            id,
            ...input,
            active: true,
          });
          return { success: true, id };
        }),

      update: adminProcedure
        .input(z.object({
          id: z.string(),
          customerName: z.string().optional(),
          clubName: z.string().optional(),
          quote: z.string().optional(),
          photo: z.string().nullable().optional(),
          capType: z.string().nullable().optional(),
          rating: z.number().min(1).max(5).optional(),
          featured: z.boolean().optional(),
          displayOrder: z.number().optional(),
          active: z.boolean().optional(),
        }))
        .mutation(async ({ input }) => {
          const { id, ...data } = input;
          await updateCapTestimonial(id, data);
          return { success: true };
        }),

      delete: adminProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ input }) => {
          await deleteCapTestimonial(input.id);
          return { success: true };
        }),
    }),
  }),

  // Public testimonials endpoint
  testimonials: router({
    getAll: publicProcedure.query(async () => {
      return await getAllCapTestimonials();
    }),

    getByType: publicProcedure
      .input(z.object({ capType: z.string().nullable() }))
      .query(async ({ input }) => {
        return await getCapTestimonialsByType(input.capType);
      }),
  }),
});
