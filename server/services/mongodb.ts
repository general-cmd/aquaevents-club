import { MongoClient, Db, ObjectId } from "mongodb";

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI environment variable is not defined");
  }

  const client = new MongoClient(uri);
  await client.connect();
  
  const db = client.db("aquaevents_db");

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

export async function getEventsCollection() {
  const { db } = await connectToDatabase();
  return db.collection("events");
}



export async function getEventBySlug(slug: string) {
  try {
    const collection = await getEventsCollection();
    
    // Try to match by canonical URL first
    let event = await collection.findOne({
      "seo.canonical": { $regex: slug, $options: "i" }
    });
    
    // If not found and slug looks like an ObjectId, try _id
    if (!event && ObjectId.isValid(slug)) {
      event = await collection.findOne({ _id: new ObjectId(slug) });
    }
    
    return event;
  } catch (error) {
    console.error('[MongoDB] Error fetching event by slug:', error);
    return null;
  }
}

