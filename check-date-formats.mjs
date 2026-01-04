#!/usr/bin/env node
import { MongoClient } from 'mongodb';

async function main() {
  const mongoUri = process.env.MONGODB_URI;
  const client = new MongoClient(mongoUri);
  
  try {
    await client.connect();
    const db = client.db('aquaevents_db');
    const eventsCollection = db.collection('events');
    
    // Get sample of events with different date patterns
    console.log('=== Checking Date Formats ===\n');
    
    // Check for events with "2026" anywhere in the date field
    const events2026 = await eventsCollection.find({
      $or: [
        { date: /2026/ },
        { date: { $gte: '2026-01-01', $lte: '2026-12-31' } }
      ]
    }).limit(20).toArray();
    
    console.log(`Found ${events2026.length} events with 2026 in date\n`);
    
    if (events2026.length > 0) {
      console.log('Sample dates:');
      events2026.forEach(e => {
        console.log(`${e.date} | ${e.location?.city} | ${e.name?.es?.substring(0, 50)}`);
      });
    }
    
    // Try searching for June 2026 events with regex
    console.log('\n=== Searching for June 2026 (various formats) ===\n');
    
    const june2026Patterns = [
      { date: /^2026-06/ },  // YYYY-MM-DD
      { date: /^06.*2026/ }, // DD/MM/YYYY or MM/DD/YYYY
      { date: /2026-06/ },   // Anywhere
    ];
    
    for (const pattern of june2026Patterns) {
      const count = await eventsCollection.countDocuments(pattern);
      console.log(`Pattern ${JSON.stringify(pattern)}: ${count} events`);
    }
    
    // Sample all events to see date format
    console.log('\n=== Sample of ALL event dates ===\n');
    const samples = await eventsCollection.find().limit(10).sort({ _id: -1 }).toArray();
    samples.forEach(e => {
      console.log(`${e.date} (${typeof e.date}) | ${e.name?.es?.substring(0, 40)}`);
    });
    
  } finally {
    await client.close();
  }
}

main();
