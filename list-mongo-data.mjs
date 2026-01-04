#!/usr/bin/env node
import { MongoClient } from 'mongodb';

async function main() {
  const mongoUri = process.env.MONGODB_URI;
  console.log('MongoDB URI:', mongoUri?.substring(0, 50) + '...\n');
  
  const client = new MongoClient(mongoUri);
  
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB\n');
    
    // List all databases
    const adminDb = client.db().admin();
    const dbs = await adminDb.listDatabases();
    
    console.log('=== Available Databases ===');
    for (const db of dbs.databases) {
      console.log(`- ${db.name} (${(db.sizeOnDisk / 1024 / 1024).toFixed(2)} MB)`);
    }
    console.log();
    
    // Check the aquaevents database
    const db = client.db('aquaevents_db');
    const collections = await db.listCollections().toArray();
    
    console.log('=== Collections in "aquaevents_db" database ===');
    for (const coll of collections) {
      const count = await db.collection(coll.name).countDocuments();
      console.log(`- ${coll.name}: ${count} documents`);
    }
    console.log();
    
    // Sample one event if exists
    const eventsCollection = db.collection('events');
    const sampleEvent = await eventsCollection.findOne();
    
    if (sampleEvent) {
      console.log('=== Sample Event Structure ===');
      console.log(JSON.stringify(sampleEvent, null, 2));
    } else {
      console.log('No events found in "events" collection');
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

main();
