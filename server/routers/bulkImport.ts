import { z } from "zod";
import { adminProcedure, router } from "../_core/trpc";
import { getEventsCollection } from "../services/mongodb";

/**
 * Bulk CSV Import Router
 * Admin-only tool for importing multiple events from CSV data
 */

const csvEventSchema = z.object({
  name: z.string().min(1, "Event name is required"),
  discipline: z.string().min(1, "Discipline is required"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  city: z.string().optional(),
  region: z.string().optional(),
  venue: z.string().optional(),
  organizer: z.string().optional(),
  website: z.string().url().optional().or(z.literal("")),
  description: z.string().optional(),
});

export const bulkImportRouter = router({
  /**
   * Import events from CSV data
   * Accepts array of event objects parsed from CSV
   */
  importEvents: adminProcedure
    .input(
      z.object({
        events: z.array(csvEventSchema),
      })
    )
    .mutation(async ({ input }) => {
      const eventsCollection = await getEventsCollection();
      const results = {
        total: input.events.length,
        imported: 0,
        skipped: 0,
        errors: [] as Array<{ row: number; error: string }>,
      };

      for (let i = 0; i < input.events.length; i++) {
        const eventData = input.events[i];
        
        try {
          // Check if event already exists (by name and date)
          const existing = await eventsCollection.findOne({
            "name.es": eventData.name,
            date: new Date(eventData.date),
          });

          if (existing) {
            results.skipped++;
            continue;
          }

          // Create event document
          const event = {
            name: {
              es: eventData.name,
              ca: eventData.name, // Will be translated by AI when viewed
              eu: eventData.name,
              gl: eventData.name,
              va: eventData.name,
              en: eventData.name,
            },
            description: {
              es: eventData.description || "",
              ca: eventData.description || "",
              eu: eventData.description || "",
              gl: eventData.description || "",
              va: eventData.description || "",
              en: eventData.description || "",
            },
            discipline: eventData.discipline,
            date: new Date(eventData.date),
            city: eventData.city || "",
            region: eventData.region || "",
            venue: eventData.venue || "",
            organizer: eventData.organizer || "",
            website: eventData.website || "",
            status: "published" as const,
            createdAt: new Date(),
            updatedAt: new Date(),
          };

          await eventsCollection.insertOne(event as any);
          results.imported++;
        } catch (error) {
          results.errors.push({
            row: i + 1,
            error: error instanceof Error ? error.message : "Unknown error",
          });
        }
      }

      return results;
    }),

  /**
   * Get CSV template with column headers
   */
  getTemplate: adminProcedure.query(() => {
    return {
      headers: [
        "name",
        "discipline",
        "date",
        "city",
        "region",
        "venue",
        "organizer",
        "website",
        "description",
      ],
      example: [
        {
          name: "Campeonato de España de Natación",
          discipline: "natacion",
          date: "2026-03-15",
          city: "Madrid",
          region: "Madrid",
          venue: "Centro Acuático M-86",
          organizer: "RFEN",
          website: "https://rfen.es",
          description: "Campeonato nacional de natación en piscina corta",
        },
      ],
      disciplines: [
        "natacion",
        "natacion-sincronizada",
        "saltos",
        "waterpolo",
        "aguas-abiertas",
        "triatlon",
      ],
    };
  }),
});
