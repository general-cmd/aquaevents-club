#!/usr/bin/env node
import { MongoClient } from 'mongodb';

async function main() {
  const mongoUri = process.env.MONGODB_URI;
  const client = new MongoClient(mongoUri);
  
  try {
    await client.connect();
    const db = client.db('aquaevents');
    const eventsCollection = db.collection('events');
    
    // Get total count
    const total = await eventsCollection.countDocuments();
    console.log(`Total events in database: ${total}\n`);
    
    // Get date range
    const oldest = await eventsCollection.find().sort({ date: 1 }).limit(1).toArray();
    const newest = await eventsCollection.find().sort({ date: -1 }).limit(1).toArray();
    
    if (oldest.length > 0 && newest.length > 0) {
      console.log(`Oldest event: ${oldest[0].date.toISOString().split('T')[0]} - ${oldest[0].name?.es}`);
      console.log(`Newest event: ${newest[0].date.toISOString().split('T')[0]} - ${newest[0].name?.es}\n`);
    }
    
    // Check 2026 events
    const events2026 = await eventsCollection.countDocuments({
      date: {
        $gte: new Date('2026-01-01'),
        $lte: new Date('2026-12-31')
      }
    });
    console.log(`Events in 2026: ${events2026}`);
    
    // Check Q2 & Q3 2026
    const q2q3 = await eventsCollection.countDocuments({
      date: {
        $gte: new Date('2026-04-01'),
        $lte: new Date('2026-09-30')
      }
    });
    console.log(`Events in Q2 & Q3 2026 (Apr-Sep): ${q2q3}`);
    
  } finally {
    await client.close();
  }
}

main();
