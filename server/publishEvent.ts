import { MongoClient, ObjectId } from 'mongodb';
import { getDb } from './db';
import { eq } from 'drizzle-orm';
import { eventSubmissions } from '../drizzle/schema';

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

    // 3. Create event document for MongoDB
    const eventDoc = {
      name: {
        es: submission.title,
        en: submission.title
      },
      date: submission.startDate.toISOString().split('T')[0], // Format: YYYY-MM-DD
      endDate: submission.endDate ? submission.endDate.toISOString().split('T')[0] : undefined,
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
        es: submission.description || '',
        en: submission.description || ''
      },
      registrationUrl: submission.website || '',
      seo: {
        canonical: `${submission.title.toLowerCase().replace(/\s+/g, '-')}-${submission.city.toLowerCase()}-${submission.startDate.toISOString().split('T')[0]}`,
        metaTitle: `${submission.title} - ${submission.city}, ${submission.region}`,
        metaDescription: submission.description || `${submission.title} en ${submission.city}, ${submission.region}. ${submission.discipline}.`
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      source: 'user-submission',
      submissionId: submissionId
    };

    // 4. Insert into MongoDB
    const result = await eventsCollection.insertOne(eventDoc);

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
      eventId: result.insertedId.toString()
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

    // Delete the event by _id
    const result = await eventsCollection.deleteOne({ _id: new ObjectId(eventId) });

    await mongoClient.close();

    if (result.deletedCount === 0) {
      return { success: false, error: 'Event not found' };
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

