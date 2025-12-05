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
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Start date must be in YYYY-MM-DD format"),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "End date must be in YYYY-MM-DD format").optional().or(z.literal("")),
  city: z.string().optional(),
  region: z.string().optional(),
  venue: z.string().optional(),
  organizer: z.string().optional(),
  organizerType: z.enum(["club", "federation", "other"]).optional().or(z.literal("")),
  website: z.string().url().optional().or(z.literal("")),
  registrationUrl: z.string().url().optional().or(z.literal("")),
  contactEmail: z.string().email().optional().or(z.literal("")),
  contactPhone: z.string().optional(),
  price: z.string().optional(),
  maxCapacity: z.string().optional(),
  categories: z.string().optional(),
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
          // Check if event already exists (by name and startDate)
          const existing = await eventsCollection.findOne({
            "name.es": eventData.name,
            startDate: new Date(eventData.startDate),
          });

          if (existing) {
            results.skipped++;
            continue;
          }

          // Generate SEO-friendly slug
          const slug = eventData.name
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // Remove accents
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')
            .substring(0, 80);
          
          const canonicalUrl = `https://aquaevents.club/eventos/${slug}-${eventData.city?.toLowerCase().replace(/\s+/g, '-')}-${new Date(eventData.startDate).getFullYear()}`;

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
            startDate: new Date(eventData.startDate),
            endDate: eventData.endDate ? new Date(eventData.endDate) : undefined,
            date: new Date(eventData.startDate), // Keep for backward compatibility
            location: {
              city: eventData.city || "",
              region: eventData.region || "",
              venue: eventData.venue || "",
              address: "",
            },
            organizer: eventData.organizer || "",
            organizerType: eventData.organizerType || "other",
            website: eventData.website || "",
            registrationUrl: eventData.registrationUrl || "",
            contactEmail: eventData.contactEmail || "",
            contactPhone: eventData.contactPhone || "",
            price: eventData.price || "",
            maxCapacity: eventData.maxCapacity ? parseInt(eventData.maxCapacity) : undefined,
            categories: eventData.categories ? eventData.categories.split(";").map((c: string) => c.trim()) : [],
            seo: {
              canonical: canonicalUrl,
              metaTitle: `${eventData.name} - ${eventData.city} ${new Date(eventData.startDate).getFullYear()}`,
              metaDescription: eventData.description?.substring(0, 160) || `${eventData.name} en ${eventData.city}, ${eventData.region}. ${eventData.discipline}.`,
              keywords: [
                eventData.name,
                eventData.discipline,
                eventData.city || "",
                eventData.region || "",
                `eventos ${eventData.discipline}`,
                `competiciones ${eventData.city}`,
              ].filter(Boolean),
            },
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
        "startDate",
        "endDate",
        "city",
        "region",
        "venue",
        "organizer",
        "organizerType",
        "website",
        "registrationUrl",
        "contactEmail",
        "contactPhone",
        "price",
        "maxCapacity",
        "categories",
        "description",
      ],
      example: [
        {
          name: "EXAMPLE - Override this row with your event data",
          discipline: "natacion",
          startDate: "2026-03-15",
          endDate: "2026-03-17",
          city: "Madrid",
          region: "Madrid",
          venue: "Centro Acuático M-86",
          organizer: "RFEN",
          organizerType: "federation",
          website: "https://rfen.es",
          registrationUrl: "https://rfen.es/inscripciones",
          contactEmail: "info@rfen.es",
          contactPhone: "+34 912 345 678",
          price: "25€ (Federados) / 35€ (No federados)",
          maxCapacity: "200",
          categories: "Infantil; Juvenil; Absoluto; Master",
          description: "Campeonato nacional de natación en piscina corta. Incluye todas las categorías.",
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
      organizerTypes: ["club", "federation", "other"],
      note: "The first row is an EXAMPLE. Replace it with your actual event data. Leave endDate empty for single-day events. Separate multiple categories with semicolons (;).",
    };
  }),
});
