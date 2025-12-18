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
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional().or(z.literal("")),
  city: z.string().optional(),
  region: z.string().optional(),
  venue: z.string().optional(),
  organizer: z.string().optional(),
  organizerType: z.enum(["club", "federation", "other", "private"]).optional().or(z.literal("")),
  website: z.string().refine((val) => !val || val === "" || z.string().url().safeParse(val).success, "Invalid URL").optional(),
  registrationUrl: z.string().refine((val) => !val || val === "" || z.string().url().safeParse(val).success, "Invalid URL").optional(),
  contactEmail: z.string().refine((val) => !val || val === "" || z.string().email().safeParse(val).success, "Invalid email").optional(),
  contactPhone: z.string().optional(),
  price: z.string().optional(),
  maxCapacity: z.string().optional(),
  categories: z.string().optional(),
  description: z.string().optional(),
});

// Map Spanish CSV headers to English field names
const headerMapping: Record<string, string> = {
  "Nombre del Evento": "name",
  "Disciplina": "discipline",
  "Categoría": "categories",
  "Región": "region",
  "Ciudad": "city",
  "Fecha de Inicio": "startDate",
  "Hora de Inicio": "startTime",
  "Fecha de Fin": "endDate",
  "Hora de Fin": "endTime",
  "Descripción del Evento": "description",
  "Nombre de Contacto": "contactName",
  "Email de Contacto": "contactEmail",
  "Teléfono de Contacto": "contactPhone",
  "SitioWeb": "website",
  "URL de Inscripción": "registrationUrl",
  "Capacidad Máxima": "maxCapacity",
};

export const bulkImportRouter = router({
  /**
   * Import events from CSV data
   * Accepts array of event objects parsed from CSV
   */
  importEvents: adminProcedure
    .input(
      z.object({
        events: z.array(z.any()), // Accept any shape, we'll transform it
      })
    )
    .mutation(async ({ input }) => {
      // Transform Spanish headers to English if needed
      const transformedEvents = input.events.map((event: any) => {
        const transformed: any = {};
        
        // Check if this is Spanish format (has "Nombre del Evento")
        const isSpanish = "Nombre del Evento" in event;
        
        if (isSpanish) {
          // Map Spanish headers to English
          Object.keys(event).forEach((key) => {
            const englishKey = headerMapping[key] || key;
            transformed[englishKey] = event[key];
          });
          
          // Combine date + time fields
          if (transformed.startDate && transformed.startTime) {
            transformed.startDate = `${transformed.startDate}T${transformed.startTime}:00`;
          }
          if (transformed.endDate && transformed.endTime) {
            transformed.endDate = `${transformed.endDate}T${transformed.endTime}:00`;
          }
          
          // Normalize discipline
          const disciplineMap: Record<string, string> = {
            "Natación": "natacion",
            "Aguas Abiertas": "aguas-abiertas",
            "Triatlón": "triatlon",
            "Waterpolo": "waterpolo",
            "Saltos": "saltos",
          };
          transformed.discipline = disciplineMap[transformed.discipline] || transformed.discipline?.toLowerCase();
          
          // Set organizerType based on contactName
          if (transformed.contactName?.includes("FMN") || transformed.contactName?.includes("FED")) {
            transformed.organizerType = "federation";
            transformed.organizer = transformed.contactName;
          }
        } else {
          // Already in English format
          Object.assign(transformed, event);
        }
        
        // Validate with schema
        return csvEventSchema.parse(transformed);
      });
      
      input.events = transformedEvents;
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
