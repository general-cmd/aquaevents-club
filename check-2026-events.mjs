#!/usr/bin/env node
import { MongoClient } from 'mongodb';

async function main() {
  const mongoUri = process.env.MONGODB_URI;
  const client = new MongoClient(mongoUri);
  
  try {
    await client.connect();
    const db = client.db('aquaevents_db');
    const eventsCollection = db.collection('events');
    
    // Get all 2026 events
    const events2026 = await eventsCollection.find({
      date: {
        $gte: '2026-01-01',
        $lte: '2026-12-31'
      }
    }).sort({ date: 1 }).toArray();
    
    console.log(`Total 2026 events: ${events2026.length}\n`);
    
    if (events2026.length === 0) {
      console.log('No 2026 events found. Checking date format...\n');
      
      // Sample some events to see date format
      const samples = await eventsCollection.find().limit(10).toArray();
      console.log('Sample event dates:');
      samples.forEach(e => {
        console.log(`- ${e.date} (${typeof e.date}) - ${e.name?.es}`);
      });
      return;
    }
    
    // Group by month
    const byMonth = {};
    events2026.forEach(event => {
      const month = event.date.substring(0, 7); // YYYY-MM
      if (!byMonth[month]) byMonth[month] = [];
      byMonth[month].push(event);
    });
    
    console.log('=== 2026 Events by Month ===');
    Object.keys(byMonth).sort().forEach(month => {
      console.log(`${month}: ${byMonth[month].length} events`);
    });
    
    console.log('\n=== Sample Q2 & Q3 2026 Events ===');
    const q2q3 = events2026.filter(e => {
      const month = e.date.substring(5, 7);
      return month >= '04' && month <= '09';
    });
    
    console.log(`Q2 & Q3 total: ${q2q3.length} events\n`);
    
    q2q3.slice(0, 10).forEach(e => {
      console.log(`${e.date} | ${e.location?.city}, ${e.location?.region} | ${e.name?.es}`);
    });
    
  } finally {
    await client.close();
  }
}

main();
