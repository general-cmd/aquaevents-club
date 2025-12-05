import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import { getEventsCollection } from "./services/mongodb";

export const widgetRouter = router({
  /**
   * Get events for widget with filters
   */
  getEvents: publicProcedure
    .input(
      z.object({
        federationId: z.string().optional(),
        mode: z.enum(['all', 'own']).default('all'),
        discipline: z.string().optional(),
        region: z.string().optional(),
        limit: z.number().min(1).max(100).default(20),
      })
    )
    .query(async ({ input }) => {
      try {
        const eventsCollection = await getEventsCollection();
        if (!eventsCollection) {
          return { events: [], total: 0 };
        }

        // Build MongoDB filter
        const filter: any = {};
        
        // Filter for future events (handle both Date objects and ISO strings)
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        filter.$or = [
          { date: { $gte: today } }, // Date objects
          { date: { $gte: today.toISOString() } } // ISO strings
        ];

        // If mode is 'own', only show federation's events
        if (input.mode === 'own' && input.federationId) {
          filter['organizer.name'] = { $regex: input.federationId, $options: 'i' };
        }

        // Discipline filter
        if (input.discipline && input.discipline !== 'Todos') {
          filter.discipline = input.discipline;
        }

        // Region filter
        if (input.region && input.region !== 'Todas') {
          filter.region = input.region;
        }

        // Fetch events
        const events = await eventsCollection
          .find(filter)
          .sort({ date: 1 })
          .limit(input.limit)
          .toArray();

        // Mark federation's own events if mode is 'all'
        const eventsWithHighlight = events.map((event) => {
          const isOwnEvent = input.federationId 
            ? event.organizer?.name?.toLowerCase().includes(input.federationId.toLowerCase())
            : false;

          return {
            ...event,
            _id: event._id.toString(),
            isOwnEvent,
          };
        });

        return {
          events: eventsWithHighlight,
          total: eventsWithHighlight.length,
        };
      } catch (error) {
        console.error('[Widget] Error fetching events:', error);
        return { events: [], total: 0 };
      }
    }),
});
