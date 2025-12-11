import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { widgetRouter } from "./widgetRouter";
import { translationRouter } from "./routers/translation";
import { bulkImportRouter } from "./routers/bulkImport";
import { emailAuthRouter } from "./routers/emailAuth";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { 
  getEventById, getEvents, getEventStats, getAllFederations, getFederationById, 
  getPublishedBlogPosts, getBlogPostBySlug, getAllBlogPosts, createBlogPost, updateBlogPost,
  createEventSubmission, getAllEventSubmissions, getPendingEventSubmissions, getUserEventSubmissions, updateEventSubmission, deleteEventSubmission,
  addUserFavorite, removeUserFavorite, getUserFavorites, isEventFavorited,
  updateUserProfile, getDb,
  createEventReminder, getUserReminders, getEventReminders, deleteEventReminder
} from "./db";
import { eventSubmissions } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import { publishEventToMongo, deleteEventFromMongo, createEventDirectly } from "./publishEvent";
import { generateEventContent } from "./_core/eventContentGenerator";
import { sendEventSubmissionConfirmation, sendEventApprovalNotification, sendEventRejectionNotification, createOrUpdateContact, addTagToContact } from "./_core/systemeio";
import { protectedProcedure } from "./_core/trpc";
import { nanoid } from "nanoid";

export const appRouter = router({
  system: systemRouter,
  widget: widgetRouter,
  translation: translationRouter,
  bulkImport: bulkImportRouter,
  emailAuth: emailAuthRouter,

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

    getRelated: publicProcedure
      .input(z.object({
        eventId: z.string(),
        discipline: z.string(),
        limit: z.number().optional().default(3),
      }))
      .query(async ({ input }) => {
        // Get events with same discipline, excluding current event
        const allEvents = await getEvents(100, input.discipline);
        const relatedEvents = allEvents
          .filter((e: any) => e._id !== input.eventId)
          .slice(0, input.limit);
        return {
          success: true,
          events: relatedEvents,
        };
      }),

    delete: protectedProcedure
      .input(z.object({
        id: z.string(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== 'admin') {
          throw new Error('Unauthorized');
        }
        const result = await deleteEventFromMongo(input.id);
        if (!result.success) {
          throw new Error(result.error || 'Failed to delete event');
        }
        return {
          success: true,
        };
      }),

    bulkUpdate: protectedProcedure
      .input(z.object({
        eventIds: z.array(z.string()),
        field: z.string(),
        value: z.string(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== 'admin') {
          throw new Error('Unauthorized');
        }
        const { getEventsCollection } = await import('./services/mongodb');
        const collection = await getEventsCollection();
        const { ObjectId } = await import('mongodb');
        
        const updateData: any = {};
        if (input.field === 'date') {
          updateData.date = new Date(input.value);
        } else {
          updateData[input.field] = input.value;
        }
        
        await collection.updateMany(
          { _id: { $in: input.eventIds.map(id => new ObjectId(id)) } },
          { $set: updateData }
        );
        
        return { success: true, count: input.eventIds.length };
      }),

    bulkDelete: protectedProcedure
      .input(z.object({
        eventIds: z.array(z.string()),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== 'admin') {
          throw new Error('Unauthorized');
        }
        
        for (const id of input.eventIds) {
          await deleteEventFromMongo(id);
        }
        
        return { success: true, count: input.eventIds.length };
      }),

    generateDescription: protectedProcedure
      .input(z.object({
        eventId: z.string(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== 'admin') {
          throw new Error('Unauthorized');
        }
        
        const { generateEventDescription } = await import('./eventDescriptionGenerator');
        const { getEventsCollection } = await import('./services/mongodb');
        const { ObjectId } = await import('mongodb');
        
        const collection = await getEventsCollection();
        const event = await collection.findOne({ _id: new ObjectId(input.eventId) });
        
        if (!event) {
          throw new Error('Event not found');
        }
        
        const description = await generateEventDescription(event);
        
        await collection.updateOne(
          { _id: new ObjectId(input.eventId) },
          { $set: { description } }
        );
        
        return { success: true, description };
      }),

    updateEvent: protectedProcedure
      .input(z.object({
        eventId: z.string(),
        updates: z.record(z.string(), z.any()),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== 'admin') {
          throw new Error('Unauthorized');
        }
        
        const { getEventsCollection } = await import('./services/mongodb');
        const { ObjectId } = await import('mongodb');
        
        const collection = await getEventsCollection();
        
        const updates: any = { ...input.updates };
        
        // Handle date fields
        if (updates.date && typeof updates.date === 'string') {
          updates.date = new Date(updates.date);
        }
        if (updates.endDate && typeof updates.endDate === 'string') {
          updates.endDate = new Date(updates.endDate);
        }
        
        await collection.updateOne(
          { _id: new ObjectId(input.eventId) },
          { $set: updates }
        );
        
        return { success: true };
      }),

    create: protectedProcedure
      .input(z.object({
        nameEs: z.string(),
        nameEn: z.string(),
        descriptionEs: z.string().optional(),
        descriptionEn: z.string().optional(),
        date: z.string(),
        endDate: z.string().optional(),
        time: z.string().optional(),
        endTime: z.string().optional(),
        city: z.string(),
        region: z.string(),
        venue: z.string().optional(),
        address: z.string().optional(),
        discipline: z.string(),
        category: z.string().optional(),
        organizerType: z.enum(['federation', 'club', 'other']),
        organizerName: z.string(),
        contactEmail: z.string().optional(),
        contactPhone: z.string().optional(),
        contactWebsite: z.string().optional(),
        registrationUrl: z.string().optional(),
        maxCapacity: z.number().optional(),
        currentRegistrations: z.number().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== 'admin') {
          throw new Error('Unauthorized');
        }

        // Generate AI-powered description and FAQ if not provided
        let descriptionEs = input.descriptionEs || '';
        let descriptionEn = input.descriptionEn || '';
        let faqItems: Array<{ question: string; answer: string }> = [];

        if (!input.descriptionEs || !input.descriptionEn) {
          try {
            const generatedContent = await generateEventContent({
              name: input.nameEs,
              nameEn: input.nameEn,
              discipline: input.discipline,
              category: input.category || 'regional',
              city: input.city,
              region: input.region,
              startDate: new Date(input.date),
              endDate: input.endDate ? new Date(input.endDate) : undefined,
              venue: input.venue,
              organizerType: input.organizerType,
              organizerName: input.organizerName,
              description: input.descriptionEs,
              descriptionEn: input.descriptionEn,
            });

            descriptionEs = input.descriptionEs || generatedContent.description;
            descriptionEn = input.descriptionEn || generatedContent.descriptionEn;
            faqItems = generatedContent.faqItems;
          } catch (error) {
            console.error('[Event Creation] AI content generation failed:', error);
            // Continue with manual descriptions if AI fails
          }
        }

        // Create event directly in MongoDB
        const eventData = {
          nameEs: input.nameEs,
          nameEn: input.nameEn,
          descriptionEs,
          descriptionEn,
          faqItems, // Add FAQ to event data
          date: input.date,
          endDate: input.endDate,
          time: input.time || '09:00',
          endTime: input.endTime,
          city: input.city,
          region: input.region,
          venue: input.venue || '',
          address: input.address || '',
          discipline: input.discipline,
          category: input.category || 'regional',
          organizerType: input.organizerType,
          organizerName: input.organizerName,
          contactEmail: input.contactEmail,
          contactPhone: input.contactPhone,
          contactWebsite: input.contactWebsite,
          registrationUrl: input.registrationUrl,
          maxCapacity: input.maxCapacity,
          currentRegistrations: input.currentRegistrations || 0,
        };

        const result = await createEventDirectly(eventData);
        if (!result.success) {
          throw new Error(result.error || 'Failed to create event');
        }

        return {
          success: true,
          eventId: result.eventId,
        };
      }),

    update: protectedProcedure
      .input(z.object({
        id: z.string(),
        nameEs: z.string().optional(),
        nameEn: z.string().optional(),
        descriptionEs: z.string().optional(),
        descriptionEn: z.string().optional(),
        date: z.string().optional(),
        endDate: z.string().optional(),
        time: z.string().optional(),
        endTime: z.string().optional(),
        city: z.string().optional(),
        region: z.string().optional(),
        venue: z.string().optional(),
        address: z.string().optional(),
        discipline: z.string().optional(),
        category: z.string().optional(),
        organizerType: z.enum(['federation', 'club', 'other']).optional(),
        organizerName: z.string().optional(),
        contactEmail: z.string().optional(),
        contactPhone: z.string().optional(),
        contactWebsite: z.string().optional(),
        registrationUrl: z.string().optional(),
        maxCapacity: z.number().optional(),
        currentRegistrations: z.number().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== 'admin') {
          throw new Error('Unauthorized');
        }

        // Update event in MongoDB
        const { MongoClient, ObjectId } = await import('mongodb');
        const client = new MongoClient(process.env.MONGODB_URI!);
        
        try {
          await client.connect();
          const db = client.db('aquaevents_db');
          const eventsCollection = db.collection('events');

          const updateData: any = {};
          if (input.nameEs) updateData['name.es'] = input.nameEs;
          if (input.nameEn) updateData['name.en'] = input.nameEn;
          if (input.descriptionEs) updateData['description.es'] = input.descriptionEs;
          if (input.descriptionEn) updateData['description.en'] = input.descriptionEn;
          if (input.date) updateData.date = input.date;
          if (input.endDate) updateData.endDate = input.endDate;
          if (input.time) updateData.time = input.time;
          if (input.endTime) updateData.endTime = input.endTime;
          if (input.city) updateData['location.city'] = input.city;
          if (input.region) updateData['location.region'] = input.region;
          if (input.venue) updateData['location.venue'] = input.venue;
          if (input.address) updateData['location.address'] = input.address;
          if (input.discipline) updateData.discipline = input.discipline;
          if (input.category) updateData.category = input.category;
          if (input.organizerName) updateData.federation = input.organizerName;
          if (input.contactEmail) updateData['contact.email'] = input.contactEmail;
          if (input.contactPhone) updateData['contact.phone'] = input.contactPhone;
          if (input.contactWebsite) updateData['contact.website'] = input.contactWebsite;
          if (input.registrationUrl) updateData.registrationUrl = input.registrationUrl;
          if (input.maxCapacity !== undefined) updateData.maxCapacity = input.maxCapacity;
          if (input.currentRegistrations !== undefined) updateData.currentRegistrations = input.currentRegistrations;

          updateData.updated_at = new Date().toISOString();
          updateData.updatedAt = new Date().toISOString();

          const result = await eventsCollection.updateOne(
            { _id: new ObjectId(input.id) },
            { $set: updateData }
          );

          if (result.matchedCount === 0) {
            throw new Error('Event not found');
          }

          return {
            success: true,
          };
        } finally {
          await client.close();
        }
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
        status: z.enum(['draft', 'published']),
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

    update: protectedProcedure
      .input(z.object({
        id: z.string(),
        title: z.string().optional(),
        excerpt: z.string().optional(),
        content: z.string().optional(),
        category: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== 'admin') {
          throw new Error('Unauthorized');
        }
        const { id, ...updates } = input;
        await updateBlogPost(id, updates);
        return {
          success: true,
        };
      }),
  }),

  eventSubmissions: router({
    submit: protectedProcedure
      .input(z.object({
        title: z.string().min(1),
        discipline: z.string().min(1),
        category: z.string().optional(),
        region: z.string().min(1),
        city: z.string().min(1),
        startDate: z.string(), // ISO date string
        startTime: z.string().optional(), // HH:mm format
        endDate: z.string().optional(),
        endTime: z.string().optional(), // HH:mm format
        contactPhone: z.string().optional(),
        website: z.string().optional(),
        description: z.string().optional(),
        registrationUrl: z.string().optional(),
        maxCapacity: z.string().optional(),
        currentRegistrations: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        // Require email to be set in profile
        if (!ctx.user.email) {
          throw new Error("Debes completar tu perfil con un email antes de enviar eventos");
        }
        
        // Combine date and time into proper timestamps
        const startDateTime = input.startTime 
          ? new Date(`${input.startDate}T${input.startTime}:00`)
          : new Date(input.startDate);
        
        const endDateTime = input.endDate
          ? (input.endTime 
              ? new Date(`${input.endDate}T${input.endTime}:00`)
              : new Date(input.endDate))
          : undefined;
        
        const submission = await createEventSubmission({
          id: nanoid(),
          title: input.title,
          discipline: input.discipline,
          category: input.category,
          region: input.region,
          city: input.city,
          startDate: startDateTime,
          endDate: endDateTime,
          contactPhone: input.contactPhone,
          website: input.website,
          description: input.description,
          registrationUrl: input.registrationUrl,
          maxCapacity: input.maxCapacity,
          currentRegistrations: input.currentRegistrations || "0",
          contactEmail: ctx.user.email,
          contactName: ctx.user.name || undefined,
          submittedBy: ctx.user.id,
          status: 'pending',
        });
        
        // Create/update contact in Systeme.io and send confirmation email
        try {
          // Create or update contact
          await createOrUpdateContact(
            ctx.user.email,
            {
              name: ctx.user.name || undefined,
              userType: ctx.user.userType || "club", // Event submitters are typically clubs/federations
            }
          );

          // Add "Event Organizer" tag
          await addTagToContact(ctx.user.email, "Event Organizer");

          // Send confirmation email
          await sendEventSubmissionConfirmation(
            ctx.user.email,
            input.title,
            ctx.user.name || undefined
          );
        } catch (error) {
          console.error('[Event Submission] Failed to sync to systeme.io:', error);
          // Don't fail the submission if systeme.io sync fails
        }
        
        return {
          success: true,
          submission,
        };
      }),

    list: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== 'admin') {
        throw new Error('Unauthorized');
      }
      const submissions = await getAllEventSubmissions();
      return {
        success: true,
        submissions,
      };
    }),

    pending: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== 'admin') {
        throw new Error('Unauthorized');
      }
      const submissions = await getPendingEventSubmissions();
      return {
        success: true,
        submissions,
      };
    }),

    mySubmissions: protectedProcedure.query(async ({ ctx }) => {
      const submissions = await getUserEventSubmissions(ctx.user.id);
      return {
        success: true,
        submissions,
      };
    }),

    approve: protectedProcedure
      .input(z.object({
        id: z.string(),
        adminNotes: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== 'admin') {
          throw new Error('Unauthorized');
        }
        
        // Get submission details for email
        const db = await getDb();
        if (db) {
          const submissions = await db.select().from(eventSubmissions).where(eq(eventSubmissions.id, input.id)).limit(1);
          if (submissions.length > 0) {
            const submission = submissions[0];
            
            // Update status
            await updateEventSubmission(input.id, {
              status: 'approved',
              reviewedAt: new Date(),
              reviewedBy: ctx.user.id,
              adminNotes: input.adminNotes,
            });
            
            // Auto-publish approved event to MongoDB
            try {
              const publishResult = await publishEventToMongo(input.id);
              if (publishResult.success) {
                console.log(`[Event Approval] Auto-published event: ${submission.title}`);
              } else {
                console.error(`[Event Approval] Failed to auto-publish: ${publishResult.error}`);
              }
            } catch (error) {
              console.error('[Event Approval] Failed to auto-publish event:', error);
            }
            
            // Send approval email via Systeme.io
            try {
              await sendEventApprovalNotification(
                submission.contactEmail,
                submission.title
              );
            } catch (error) {
              console.error('[Event Approval] Failed to send approval email:', error);
            }
          }
        }
        
        return {
          success: true,
        };
      }),

    reject: protectedProcedure
      .input(z.object({
        id: z.string(),
        adminNotes: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== 'admin') {
          throw new Error('Unauthorized');
        }
        
        // Get submission details for email
        const db = await getDb();
        if (db) {
          const submissions = await db.select().from(eventSubmissions).where(eq(eventSubmissions.id, input.id)).limit(1);
          if (submissions.length > 0) {
            const submission = submissions[0];
            
            // Update status
            await updateEventSubmission(input.id, {
              status: 'rejected',
              reviewedAt: new Date(),
              reviewedBy: ctx.user.id,
              adminNotes: input.adminNotes,
            });
            
            // Send rejection email via Systeme.io
            try {
              await sendEventRejectionNotification(
                submission.contactEmail,
                submission.title,
                input.adminNotes
              );
            } catch (error) {
              console.error('[Event Rejection] Failed to send rejection email:', error);
            }
          }
        }
        
        return {
          success: true,
        };
      }),

    publish: protectedProcedure
      .input(z.object({
        id: z.string(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== 'admin') {
          throw new Error('Unauthorized');
        }
        const result = await publishEventToMongo(input.id);
        if (!result.success) {
          throw new Error(result.error || 'Failed to publish event');
        }
        return {
          success: true,
          eventId: result.eventId,
        };
      }),

    delete: protectedProcedure
      .input(z.object({
        id: z.string(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== 'admin') {
          throw new Error('Unauthorized');
        }
        await deleteEventSubmission(input.id);
        return {
          success: true,
        };
      }),

    update: protectedProcedure
      .input(z.object({
        id: z.string(),
        title: z.string().min(1).optional(),
        discipline: z.string().min(1).optional(),
        category: z.string().optional(),
        region: z.string().min(1).optional(),
        city: z.string().min(1).optional(),
        startDate: z.string().optional(),
        startTime: z.string().optional(),
        endDate: z.string().optional(),
        endTime: z.string().optional(),
        contactPhone: z.string().optional(),
        website: z.string().optional(),
        description: z.string().optional(),
        registrationUrl: z.string().optional(),
        maxCapacity: z.string().optional(),
        currentRegistrations: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        const db = await getDb();
        if (!db) {
          throw new Error('Database not available');
        }

        // Get the submission to verify ownership
        const submissions = await db.select().from(eventSubmissions).where(eq(eventSubmissions.id, input.id)).limit(1);
        if (submissions.length === 0) {
          throw new Error('Submission not found');
        }

        const submission = submissions[0];
        
        // Only allow owner or admin to edit
        if (submission.submittedBy !== ctx.user.id && ctx.user.role !== 'admin') {
          throw new Error('Unauthorized');
        }

        const { id, ...updates } = input;
        const updateData: any = {};

        // Build update object with only provided fields
        if (updates.title) updateData.title = updates.title;
        if (updates.discipline) updateData.discipline = updates.discipline;
        if (updates.category) updateData.category = updates.category;
        if (updates.region) updateData.region = updates.region;
        if (updates.city) updateData.city = updates.city;
        
        // Handle date and time combination
        if (updates.startDate) {
          updateData.startDate = updates.startTime 
            ? new Date(`${updates.startDate}T${updates.startTime}:00`)
            : new Date(updates.startDate);
        }
        if (updates.endDate) {
          updateData.endDate = updates.endTime 
            ? new Date(`${updates.endDate}T${updates.endTime}:00`)
            : new Date(updates.endDate);
        }
        
        if (updates.contactPhone) updateData.contactPhone = updates.contactPhone;
        if (updates.website) updateData.website = updates.website;
        if (updates.description) updateData.description = updates.description;
        if (updates.registrationUrl) updateData.registrationUrl = updates.registrationUrl;
        if (updates.maxCapacity) updateData.maxCapacity = updates.maxCapacity;
        if (updates.currentRegistrations) updateData.currentRegistrations = updates.currentRegistrations;

        // If event was published, reset to pending for re-approval
        if (submission.publishedAt) {
          updateData.status = 'pending';
          updateData.publishedAt = null;
          updateData.reviewedAt = null;
          updateData.reviewedBy = null;
          updateData.adminNotes = null;
        }

        updateData.updatedAt = new Date();

        await updateEventSubmission(id, updateData);

        return {
          success: true,
          requiresReapproval: !!submission.publishedAt,
        };
      }),

    deleteOwn: protectedProcedure
      .input(z.object({
        id: z.string(),
      }))
      .mutation(async ({ input, ctx }) => {
        const db = await getDb();
        if (!db) {
          throw new Error('Database not available');
        }

        // Get the submission to verify ownership
        const submissions = await db.select().from(eventSubmissions).where(eq(eventSubmissions.id, input.id)).limit(1);
        if (submissions.length === 0) {
          throw new Error('Submission not found');
        }

        const submission = submissions[0];
        
        // Only allow owner or admin to delete
        if (submission.submittedBy !== ctx.user.id && ctx.user.role !== 'admin') {
          throw new Error('Unauthorized');
        }

        await deleteEventSubmission(input.id);

        return {
          success: true,
        };
      }),
  }),

  userProfile: router({
    update: protectedProcedure
      .input(z.object({
        userType: z.enum(['club', 'swimmer', 'federation', 'other']).optional(),
        preferredDisciplines: z.array(z.string()).optional(),
        emailConsent: z.boolean().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        const updates: any = {};
        
        if (input.userType) {
          updates.userType = input.userType;
        }
        
        if (input.preferredDisciplines) {
          updates.preferredDisciplines = JSON.stringify(input.preferredDisciplines);
        }
        
        if (input.emailConsent !== undefined) {
          updates.emailConsent = input.emailConsent ? new Date() : null;
        }
        
        await updateUserProfile(ctx.user.id, updates);
        
        // Sync to Systeme.io if user has email consent (either existing or just given)
        const hasConsent = input.emailConsent || ctx.user.emailConsent;
        if (hasConsent && ctx.user.email) {
          try {
            // Create/update contact in Systeme.io
            await createOrUpdateContact(ctx.user.email, {
              name: ctx.user.name || undefined,
              userType: input.userType,
              disciplines: input.preferredDisciplines,
              locale: 'es',
            });
            
            // Add appropriate tag based on user type
            if (input.userType) {
              const tagMap: Record<string, string> = {
                'swimmer': 'Swimmer',
                'club': 'Club Deportivo',
                'federation': 'Federation',
              };
              
              const tag = tagMap[input.userType];
              if (tag) {
                await addTagToContact(ctx.user.email, tag);
                console.log(`[Systeme.io] Added tag "${tag}" to ${ctx.user.email}`);
              }
            }
          } catch (error) {
            // Log error but don't fail the profile update
            console.error('[Systeme.io] Failed to sync user profile:', error);
          }
        }
        
        return {
          success: true,
        };
      }),
  }),

  favorites: router({
    add: protectedProcedure
      .input(z.object({
        eventId: z.string(),
      }))
      .mutation(async ({ input, ctx }) => {
        await addUserFavorite({
          id: nanoid(),
          userId: ctx.user.id,
          eventId: input.eventId,
        });
        return {
          success: true,
        };
      }),

    remove: protectedProcedure
      .input(z.object({
        eventId: z.string(),
      }))
      .mutation(async ({ input, ctx }) => {
        await removeUserFavorite(ctx.user.id, input.eventId);
        return {
          success: true,
        };
      }),

    list: protectedProcedure.query(async ({ ctx }) => {
      const favorites = await getUserFavorites(ctx.user.id);
      return {
        success: true,
        favorites,
      };
    }),

    check: protectedProcedure
      .input(z.object({
        eventId: z.string(),
      }))
      .query(async ({ input, ctx }) => {
        const isFavorited = await isEventFavorited(ctx.user.id, input.eventId);
        return {
          success: true,
          isFavorited,
        };
      }),
  }),

  reminders: router({
    create: protectedProcedure
      .input(z.object({
        eventId: z.string(),
        eventTitle: z.string(),
        eventDate: z.string(),
        reminderType: z.enum(["1_week", "3_days", "1_day", "same_day"]),
      }))
      .mutation(async ({ input, ctx }) => {
        const eventDate = new Date(input.eventDate);
        let reminderDate = new Date(eventDate);
        
        // Calculate reminder date based on type
        switch (input.reminderType) {
          case "1_week":
            reminderDate.setDate(reminderDate.getDate() - 7);
            break;
          case "3_days":
            reminderDate.setDate(reminderDate.getDate() - 3);
            break;
          case "1_day":
            reminderDate.setDate(reminderDate.getDate() - 1);
            break;
          case "same_day":
            reminderDate.setHours(9, 0, 0, 0); // 9 AM on event day
            break;
        }

        const reminder = await createEventReminder({
          id: nanoid(),
          userId: ctx.user.id,
          eventId: input.eventId,
          eventTitle: input.eventTitle,
          eventDate: eventDate,
          reminderType: input.reminderType,
          reminderDate: reminderDate,
          sent: false,
        });

        return {
          success: true,
          reminder,
        };
      }),

    list: protectedProcedure.query(async ({ ctx }) => {
      const reminders = await getUserReminders(ctx.user.id);
      return {
        success: true,
        reminders,
      };
    }),

    listForEvent: protectedProcedure
      .input(z.object({
        eventId: z.string(),
      }))
      .query(async ({ input, ctx }) => {
        const reminders = await getEventReminders(ctx.user.id, input.eventId);
        return {
          success: true,
          reminders,
        };
      }),

    delete: protectedProcedure
      .input(z.object({
        id: z.string(),
      }))
      .mutation(async ({ input, ctx }) => {
        const success = await deleteEventReminder(input.id, ctx.user.id);
        return {
          success,
        };
      }),
  }),

  admin: router({
    // Verify a user (grant verified status)
    verifyUser: protectedProcedure
      .input(z.object({
        userId: z.string(),
        verificationNotes: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        // Only admins can verify users
        if (ctx.user.role !== "admin") {
          throw new Error("Unauthorized");
        }

        const { getDb } = await import("./db");
        const { users } = await import("../drizzle/schema");
        const { eq } = await import("drizzle-orm");
        
        const db = await getDb();
        if (!db) {
          throw new Error("Database not available");
        }

        await db.update(users)
          .set({
            verified: "yes",
            verifiedAt: new Date(),
            verificationStatus: "approved",
            verificationNotes: input.verificationNotes,
          })
          .where(eq(users.id, input.userId));

        return {
          success: true,
          message: "Usuario verificado correctamente",
        };
      }),

    // Revoke verified status
    unverifyUser: protectedProcedure
      .input(z.object({
        userId: z.string(),
        reason: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        // Only admins can unverify users
        if (ctx.user.role !== "admin") {
          throw new Error("Unauthorized");
        }

        const { getDb } = await import("./db");
        const { users } = await import("../drizzle/schema");
        const { eq } = await import("drizzle-orm");
        
        const db = await getDb();
        if (!db) {
          throw new Error("Database not available");
        }

        await db.update(users)
          .set({
            verified: "no",
            verifiedAt: null,
            verificationStatus: "rejected",
            verificationNotes: input.reason,
          })
          .where(eq(users.id, input.userId));

        return {
          success: true,
          message: "Verificación revocada",
        };
      }),
  }),

  newsletter: router({
    subscribe: publicProcedure
      .input(z.object({
        email: z.string().email(),
        name: z.string().optional(),
        userType: z.enum(["club", "swimmer", "federation", "other"]).optional(),
      }))
      .mutation(async ({ input }) => {
        const { createNewsletterSubscriber, getNewsletterSubscriberByEmail, updateNewsletterSubscriberSyncStatus } = await import("./db");
        const { nanoid } = await import("nanoid");
        
        // Check if already subscribed
        const existing = await getNewsletterSubscriberByEmail(input.email);
        if (existing && !existing.unsubscribedAt) {
          return {
            success: true,
            alreadySubscribed: true,
            message: "Ya estás suscrito a nuestro newsletter",
          };
        }

        // Create subscriber in database
        const subscriber = await createNewsletterSubscriber({
          id: nanoid(),
          email: input.email,
          name: input.name || null,
          userType: input.userType || null,
          source: "website",
          systemeioSynced: false,
        });

        if (!subscriber) {
          throw new Error("Failed to create newsletter subscriber");
        }

        // Sync to systeme.io in background
        try {
          const contact = await createOrUpdateContact(
            input.email,
            {
              name: input.name,
              userType: input.userType || "swimmer",
            }
          );

          // Add "swimmer" tag
          await addTagToContact(input.email, input.userType || "swimmer");

          // Update sync status
          await updateNewsletterSubscriberSyncStatus(
            subscriber.id,
            true,
            contact.id?.toString(),
            undefined
          );
        } catch (error: any) {
          console.error("[Newsletter] Failed to sync to systeme.io:", error);
          // Update with error but don't fail the request
          await updateNewsletterSubscriberSyncStatus(
            subscriber.id,
            false,
            undefined,
            error.message
          );
        }

        return {
          success: true,
          alreadySubscribed: false,
          message: "¡Gracias por suscribirte! Revisa tu email para confirmar.",
        };
      }),

    list: protectedProcedure
      .query(async ({ ctx }) => {
        // Only admins can view subscribers
        if (ctx.user.role !== "admin") {
          throw new Error("Unauthorized");
        }

        const { getAllNewsletterSubscribers } = await import("./db");
        const subscribers = await getAllNewsletterSubscribers();
        
        return {
          success: true,
          subscribers,
        };
      }),

    allContacts: protectedProcedure
      .query(async ({ ctx }) => {
        // Only admins can view all contacts
        if (ctx.user.role !== "admin") {
          throw new Error("Unauthorized");
        }

        const { getDb } = await import("./db");
        const { users, newsletterSubscribers, eventSubmissions } = await import("../drizzle/schema");
        
        const db = await getDb();
        if (!db) {
          return {
            success: true,
            contacts: [],
          };
        }

        // Get all users
        const allUsers = await db.select().from(users);
        
        // Get all newsletter subscribers
        const allSubscribers = await db.select().from(newsletterSubscribers);
        
        // Get all event submitters
        const allSubmissions = await db.select().from(eventSubmissions);
        
        // Merge contacts by email
        const contactMap = new Map<string, any>();
        
        // Add users
        for (const user of allUsers) {
          if (user.email) {
            contactMap.set(user.email, {
              userId: user.id,
              email: user.email,
              name: user.name,
              userType: user.userType,
              source: "profile",
              createdAt: user.createdAt,
              emailConsent: !!user.emailConsent,
              preferredDisciplines: user.preferredDisciplines ? JSON.parse(user.preferredDisciplines) : [],
              verified: user.verified || "no",
              verifiedAt: user.verifiedAt,
              verificationStatus: user.verificationStatus,
              hasProfile: true,
              hasNewsletter: false,
              hasSubmittedEvent: false,
            });
          }
        }
        
        // Add newsletter subscribers
        for (const sub of allSubscribers) {
          const existing = contactMap.get(sub.email);
          if (existing) {
            existing.hasNewsletter = true;
            existing.systemeioSynced = sub.systemeioSynced;
            existing.systemeioContactId = sub.systemeioContactId;
            existing.systemeioError = sub.systemeioError;
          } else {
            // Try to find user by email
            const matchingUser = allUsers.find(u => u.email === sub.email);
            contactMap.set(sub.email, {
              userId: matchingUser?.id,
              email: sub.email,
              name: sub.name,
              userType: sub.userType,
              source: "newsletter",
              createdAt: sub.subscribedAt,
              emailConsent: true,
              preferredDisciplines: [],
              verified: matchingUser?.verified || "no",
              hasProfile: false,
              hasNewsletter: true,
              hasSubmittedEvent: false,
              systemeioSynced: sub.systemeioSynced,
              systemeioContactId: sub.systemeioContactId,
              systemeioError: sub.systemeioError,
            });
          }
        }
        
        // Add event submitters
        for (const submission of allSubmissions) {
          if (submission.contactEmail) {
            const existing = contactMap.get(submission.contactEmail);
            if (existing) {
              existing.hasSubmittedEvent = true;
            } else {
              // Try to find user by email
              const matchingUser = allUsers.find(u => u.email === submission.contactEmail);
              contactMap.set(submission.contactEmail, {
                userId: matchingUser?.id,
                email: submission.contactEmail,
                name: submission.contactName,
                userType: "club",
                verified: matchingUser?.verified || "no",
                source: "event_submission",
                createdAt: submission.createdAt,
                emailConsent: true,
                preferredDisciplines: [],
                hasProfile: false,
                hasNewsletter: false,
                hasSubmittedEvent: true,
              });
            }
          }
        }
        
        // Convert map to array and sort by creation date
        const contacts = Array.from(contactMap.values()).sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA; // Most recent first
        });
        
        return {
          success: true,
          contacts,
        };
      }),
  }),

  swimCaps: router({
    sendInquiry: publicProcedure
      .input(z.object({
        name: z.string(),
        email: z.string().email(),
        phone: z.string().optional(),
        organization: z.string().optional(),
        quantity: z.string(),
        colors: z.string(),
        message: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        // Send email to general@aquaevents.club
        const emailSubject = `Nueva Solicitud de Gorros de Natación - ${input.name}`;
        const emailBody = `
          <h2>Nueva Solicitud de Presupuesto - Gorros de Natación</h2>
          <p><strong>Nombre:</strong> ${input.name}</p>
          <p><strong>Email:</strong> ${input.email}</p>
          ${input.phone ? `<p><strong>Teléfono:</strong> ${input.phone}</p>` : ''}
          ${input.organization ? `<p><strong>Organización:</strong> ${input.organization}</p>` : ''}
          <p><strong>Cantidad:</strong> ${input.quantity} unidades</p>
          <p><strong>Número de Colores:</strong> ${input.colors}</p>
          ${input.message ? `<p><strong>Detalles Adicionales:</strong><br/>${input.message.replace(/\n/g, '<br/>')}</p>` : ''}
          <hr/>
          <p><em>Esta solicitud fue enviada desde AquaEvents.club - Página de Gorros de Natación</em></p>
        `;

        try {
          // Use Systeme.io to send email notification to general@aquaevents.club
          // For now, we'll use the notifyOwner function as a temporary solution
          const { notifyOwner } = await import('./_core/notification');
          await notifyOwner({
            title: `Nueva Solicitud de Gorros - ${input.name}`,
            content: `
**Nombre:** ${input.name}
**Email:** ${input.email}
${input.phone ? `**Teléfono:** ${input.phone}` : ''}
${input.organization ? `**Organización:** ${input.organization}` : ''}
**Cantidad:** ${input.quantity} unidades
**Colores:** ${input.colors}
${input.message ? `**Mensaje:** ${input.message}` : ''}
            `.trim(),
          });

          return {
            success: true,
            message: 'Solicitud enviada correctamente',
          };
        } catch (error) {
          console.error('[SwimCaps] Error sending inquiry:', error);
          throw new Error('Error al enviar la solicitud. Por favor intenta de nuevo.');
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
