import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users } from "../drizzle/schema";
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

// TODO: add feature queries here as your schema grows.


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

