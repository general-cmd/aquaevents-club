import { MongoClient, Db } from "mongodb";

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

