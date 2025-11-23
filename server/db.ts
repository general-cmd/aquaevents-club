import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, federations, blogPosts, InsertBlogPost, eventSubmissions, InsertEventSubmission, userFavorites, InsertUserFavorite, eventReminders, InsertEventReminder, newsletterSubscribers, InsertNewsletterSubscriber } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.id) {
    throw new Error("User ID is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      id: user.id,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role === undefined) {
      if (user.id === ENV.ownerId) {
        user.role = 'admin';
        values.role = 'admin';
        updateSet.role = 'admin';
      }
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    // When updating existing user, only update the fields that were explicitly provided
    // This prevents overwriting userType, preferredDisciplines, etc. when only updating lastSignedIn
    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUser(id: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Federation queries
export async function getAllFederations() {
  const db = await getDb();
  if (!db) return [];
  
  const result = await db.select().from(federations);
  return result;
}

export async function getFederationById(id: string) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(federations).where(eq(federations.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// Blog post queries
export async function getPublishedBlogPosts() {
  const db = await getDb();
  if (!db) return [];
  
  const result = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.status, "published"))
    .orderBy(blogPosts.publishedAt);
  
  return result;
}

export async function getBlogPostBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getAllBlogPosts() {
  const db = await getDb();
  if (!db) return [];
  
  const result = await db.select().from(blogPosts).orderBy(blogPosts.createdAt);
  return result;
}

export async function createBlogPost(post: InsertBlogPost) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(blogPosts).values(post);
  return post;
}

export async function updateBlogPost(id: string, updates: Partial<InsertBlogPost>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(blogPosts).set(updates).where(eq(blogPosts.id, id));
}

// Event submission queries
export async function createEventSubmission(submission: InsertEventSubmission) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(eventSubmissions).values(submission);
  return submission;
}

export async function getAllEventSubmissions() {
  const db = await getDb();
  if (!db) return [];
  
  const result = await db.select().from(eventSubmissions).orderBy(eventSubmissions.createdAt);
  return result;
}

export async function getPendingEventSubmissions() {
  const db = await getDb();
  if (!db) return [];
  
  const result = await db
    .select()
    .from(eventSubmissions)
    .where(eq(eventSubmissions.status, "pending"))
    .orderBy(eventSubmissions.createdAt);
  return result;
}

export async function getUserEventSubmissions(userId: string) {
  const db = await getDb();
  if (!db) return [];
  
  const result = await db
    .select()
    .from(eventSubmissions)
    .where(eq(eventSubmissions.submittedBy, userId))
    .orderBy(eventSubmissions.createdAt);
  
  return result;
}

export async function getEventSubmissionById(id: string) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(eventSubmissions).where(eq(eventSubmissions.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateEventSubmission(id: string, updates: Partial<InsertEventSubmission>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(eventSubmissions).set(updates).where(eq(eventSubmissions.id, id));
}

export async function deleteEventSubmission(id: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.delete(eventSubmissions).where(eq(eventSubmissions.id, id));
}

// User favorites queries
export async function addUserFavorite(favorite: InsertUserFavorite) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  // Check if favorite already exists to prevent duplicate key errors
  const alreadyFavorited = await isEventFavorited(favorite.userId, favorite.eventId);
  
  if (alreadyFavorited) {
    // Already favorited, just return success without inserting
    return favorite;
  }
  
  await db.insert(userFavorites).values(favorite);
  return favorite;
}

export async function removeUserFavorite(userId: string, eventId: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const { and } = await import("drizzle-orm");
  await db.delete(userFavorites)
    .where(and(
      eq(userFavorites.userId, userId),
      eq(userFavorites.eventId, eventId)
    ));
}

export async function getUserFavorites(userId: string) {
  const db = await getDb();
  if (!db) return [];
  
  const result = await db
    .select()
    .from(userFavorites)
    .where(eq(userFavorites.userId, userId))
    .orderBy(userFavorites.createdAt);
  
  return result;
}

export async function isEventFavorited(userId: string, eventId: string): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  
  const { and } = await import("drizzle-orm");
  const result = await db
    .select()
    .from(userFavorites)
    .where(and(
      eq(userFavorites.userId, userId),
      eq(userFavorites.eventId, eventId)
    ))
    .limit(1);
  
  return result.length > 0;
}

// User profile updates
export async function updateUserProfile(userId: string, updates: Partial<InsertUser>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(users).set(updates).where(eq(users.id, userId));
}


// MongoDB connection for events (existing database)
import { MongoClient } from 'mongodb';

let mongoClient: MongoClient | null = null;

async function getMongoDb() {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.warn("[MongoDB] MONGODB_URI not configured");
    return null;
  }

  if (!mongoClient) {
    try {
      mongoClient = new MongoClient(mongoUri);
      await mongoClient.connect();
      console.log("[MongoDB] Connected successfully");
    } catch (error) {
      console.error("[MongoDB] Connection failed:", error);
      mongoClient = null;
      return null;
    }
  }

  return mongoClient.db();
}

export async function getEvents(limit?: number, discipline?: string, region?: string) {
  const db = await getMongoDb();
  if (!db) return [];

  try {
    const collection = db.collection('events');
    const query: any = {
      date: { $gte: new Date().toISOString().split('T')[0] } // Only upcoming events
    };

    if (discipline) {
      query.discipline = discipline;
    }

    if (region) {
      query['location.region'] = region;
    }

    const events = await collection
      .find(query)
      .sort({ date: 1 })
      .limit(limit || 100)
      .toArray();

    return events;
  } catch (error) {
    console.error("[MongoDB] Error fetching events:", error);
    return [];
  }
}

export async function getEventById(id: string) {
  const db = await getMongoDb();
  if (!db) return null;

  try {
    const collection = db.collection('events');
    
    // Try to find by slug that matches the end of canonical URL
    let event = await collection.findOne({
      'seo.canonical': { $regex: `/${id}$`, $options: 'i' }
    });
    
    if (!event) {
      // Try exact match on full canonical URL
      event = await collection.findOne({ 'seo.canonical': id });
    }
    
    if (!event) {
      // Try to find by MongoDB ObjectId
      const { ObjectId } = require('mongodb');
      try {
        event = await collection.findOne({ _id: new ObjectId(id) });
      } catch (err) {
        // Invalid ObjectId format, try one more search
        // Search by event name (case insensitive)
        event = await collection.findOne({
          'name.es': { $regex: id.replace(/-/g, ' '), $options: 'i' }
        });
      }
    }

    return event;
  } catch (error) {
    console.error("[MongoDB] Error fetching event by ID:", error);
    return null;
  }
}

export async function getEventStats() {
  const db = await getMongoDb();
  if (!db) {
    return {
      total: 0,
      upcoming: 0,
      byDiscipline: []
    };
  }

  try {
    const collection = db.collection('events');
    const today = new Date().toISOString().split('T')[0];

    const [total, upcoming, byDiscipline] = await Promise.all([
      collection.countDocuments(),
      collection.countDocuments({ date: { $gte: today } }),
      collection.aggregate([
        { $match: { date: { $gte: today } } },
        { $group: { _id: '$discipline', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]).toArray()
    ]);

    return {
      total,
      upcoming,
      byDiscipline
    };
  } catch (error) {
    console.error("[MongoDB] Error fetching stats:", error);
    return {
      total: 0,
      upcoming: 0,
      byDiscipline: []
    };
  }
}


// ===== Event Reminders =====

export async function createEventReminder(reminder: InsertEventReminder) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create reminder: database not available");
    return null;
  }

  try {
    await db.insert(eventReminders).values(reminder);
    return reminder;
  } catch (error) {
    console.error("[Database] Failed to create reminder:", error);
    return null;
  }
}

export async function getUserReminders(userId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get reminders: database not available");
    return [];
  }

  try {
    const reminders = await db
      .select()
      .from(eventReminders)
      .where(eq(eventReminders.userId, userId))
      .orderBy(eventReminders.reminderDate);
    
    return reminders;
  } catch (error) {
    console.error("[Database] Failed to get reminders:", error);
    return [];
  }
}

export async function getEventReminders(userId: string, eventId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get event reminders: database not available");
    return [];
  }

  try {
    const reminders = await db
      .select()
      .from(eventReminders)
      .where(eq(eventReminders.userId, userId));
    
    return reminders.filter(r => r.eventId === eventId);
  } catch (error) {
    console.error("[Database] Failed to get event reminders:", error);
    return [];
  }
}

export async function deleteEventReminder(id: string, userId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot delete reminder: database not available");
    return false;
  }

  try {
    const result = await db
      .delete(eventReminders)
      .where(eq(eventReminders.id, id));
    
    // Verify it belonged to the user (security check done in tRPC)
    
    return true;
  } catch (error) {
    console.error("[Database] Failed to delete reminder:", error);
    return false;
  }
}

export async function getPendingReminders() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get pending reminders: database not available");
    return [];
  }

  try {
    const now = new Date();
    const reminders = await db
      .select()
      .from(eventReminders)
      .where(eq(eventReminders.sent, false));
    
    // Filter by date (should use SQL comparison in production)
    return reminders.filter(r => r.reminderDate <= now);
  } catch (error) {
    console.error("[Database] Failed to get pending reminders:", error);
    return [];
  }
}




// Newsletter Subscribers
export async function createNewsletterSubscriber(subscriber: InsertNewsletterSubscriber) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create newsletter subscriber: database not available");
    return null;
  }

  try {
    await db.insert(newsletterSubscribers).values(subscriber);
    return subscriber;
  } catch (error) {
    console.error("[Database] Failed to create newsletter subscriber:", error);
    throw error;
  }
}

export async function getNewsletterSubscriberByEmail(email: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get newsletter subscriber: database not available");
    return null;
  }

  const result = await db.select().from(newsletterSubscribers).where(eq(newsletterSubscribers.email, email)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function getAllNewsletterSubscribers() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get newsletter subscribers: database not available");
    return [];
  }

  return await db.select().from(newsletterSubscribers).orderBy(newsletterSubscribers.subscribedAt);
}

export async function updateNewsletterSubscriberSyncStatus(
  id: string,
  synced: boolean,
  contactId?: string,
  error?: string
) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update newsletter subscriber: database not available");
    return;
  }

  const updateData: any = {
    systemeioSynced: synced,
  };

  if (contactId) {
    updateData.systemeioContactId = contactId;
  }

  if (error !== undefined) {
    updateData.systemeioError = error;
  }

  await db.update(newsletterSubscribers)
    .set(updateData)
    .where(eq(newsletterSubscribers.id, id));
}

