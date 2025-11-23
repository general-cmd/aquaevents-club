import { MongoClient, ObjectId } from 'mongodb';
import { getDb } from './db';
import { eq } from 'drizzle-orm';
import { eventSubmissions } from '../drizzle/schema';
import { enrichEventSEO } from './seoEnrichment';

const MONGODB_URI = process.env.MONGODB_URI || process.env.DATABASE_URL_MONGO || '';

/**
 * Publishes an approved event submission to MongoDB events collection
 * This makes the event visible in the public calendar
 */
export async function publishEventToMongo(submissionId: string): Promise<{ success: boolean; eventId?: string; error?: string }> {
  try {
    // 1. Get the approved submission from MySQL
    const db = await getDb();
    if (!db) {
      return { success: false, error: 'Database not available' };
    }

    const submissions = await db
      .select()
      .from(eventSubmissions)
      .where(eq(eventSubmissions.id, submissionId))
      .limit(1);

    if (submissions.length === 0) {
      return { success: false, error: 'Submission not found' };
    }

    const submission = submissions[0];

    if (submission.status !== 'approved') {
      return { success: false, error: 'Only approved submissions can be published' };
    }

    // 2. Connect to MongoDB
    if (!MONGODB_URI) {
      return { success: false, error: 'MongoDB URI not configured' };
    }

    const mongoClient = new MongoClient(MONGODB_URI);
    await mongoClient.connect();

    const mongoDb = mongoClient.db();
    const eventsCollection = mongoDb.collection('events');

    // 3. Generate AI-enriched SEO metadata
    console.log(`[Publish] Generating AI SEO metadata for: ${submission.title}`);
    const seoData = await enrichEventSEO({
      title: submission.title,
      city: submission.city,
      region: submission.region,
      discipline: submission.discipline,
      startDate: submission.startDate.toISOString(),
      description: submission.description || undefined,
      category: submission.category || undefined
    });

    // 4. Create event document for MongoDB with AI-enriched data
    const eventDoc = {
      name: {
        es: submission.title,
        en: submission.title
      },
      date: submission.startDate.toISOString(), // Full ISO string with time
      endDate: submission.endDate ? submission.endDate.toISOString() : undefined, // Full ISO string with time
      location: {
        city: submission.city,
        region: submission.region,
        venue: '',
        address: ''
      },
      discipline: submission.discipline,
      category: submission.category || 'General',
      federation: 'Usuario',
      contact: {
        email: submission.contactEmail,
        phone: submission.contactPhone || '',
        website: submission.website || ''
      },
      description: {
        es: seoData.richDescription, // AI-enriched description
        en: seoData.richDescription
      },
      registrationUrl: submission.registrationUrl || submission.website || '',
      maxCapacity: submission.maxCapacity ? parseInt(submission.maxCapacity.toString()) : undefined,
      currentRegistrations: submission.currentRegistrations ? parseInt(submission.currentRegistrations.toString()) : undefined,
      seo: {
        canonical: `https://aquaevents.club/eventos/${seoData.slug}`,
        metaTitle: seoData.metaTitle,
        metaDescription: seoData.metaDescription,
        keywords: seoData.keywords
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      source: 'user-submission',
      submissionId: submissionId
    };

    // 5. Check if event already exists (from previous publication)
    const existingEvent = await eventsCollection.findOne({ submissionId: submissionId });
    
    let eventId: string;
    if (existingEvent) {
      // Update existing event
      await eventsCollection.updateOne(
        { _id: existingEvent._id },
        { $set: { ...eventDoc, updatedAt: new Date() } }
      );
      eventId = existingEvent._id.toString();
      console.log(`[Publish] Updated existing event in MongoDB: ${eventId}`);
    } else {
      // Insert new event
      const result = await eventsCollection.insertOne(eventDoc);
      eventId = result.insertedId.toString();
      console.log(`[Publish] Created new event in MongoDB: ${eventId}`);
    }

    await mongoClient.close();

    // 5. Update submission to mark as published
    await db
      .update(eventSubmissions)
      .set({ 
        publishedAt: new Date(),
        updatedAt: new Date()
      })
      .where(eq(eventSubmissions.id, submissionId));

    return {
      success: true,
      eventId: eventId
    };

  } catch (error) {
    console.error('[publishEventToMongo] Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Deletes an event from MongoDB events collection
 * @param eventId - MongoDB _id as string
 */
export async function deleteEventFromMongo(eventId: string): Promise<{ success: boolean; error?: string }> {
  try {
    if (!MONGODB_URI) {
      return { success: false, error: 'MongoDB URI not configured' };
    }

    const mongoClient = new MongoClient(MONGODB_URI);
    await mongoClient.connect();

    const mongoDb = mongoClient.db();
    const eventsCollection = mongoDb.collection('events');

    // First, find the event to get its submissionId
    const event = await eventsCollection.findOne({ _id: new ObjectId(eventId) });
    
    // Delete the event by _id
    const result = await eventsCollection.deleteOne({ _id: new ObjectId(eventId) });

    await mongoClient.close();

    if (result.deletedCount === 0) {
      return { success: false, error: 'Event not found' };
    }

    // If the event had a submissionId, also delete the submission from MySQL
    if (event && event.submissionId) {
      const db = await getDb();
      if (db) {
        await db.delete(eventSubmissions).where(eq(eventSubmissions.id, event.submissionId));
        console.log(`[deleteEventFromMongo] Also deleted submission ${event.submissionId}`);
      }
    }

    return { success: true };

  } catch (error) {
    console.error('[deleteEventFromMongo] Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

