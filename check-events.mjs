import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://manusdbuser:bh2*klmnjP09@aquaevents.i1zdgpx.mongodb.net/aquaevents_db';
const client = new MongoClient(uri);

try {
  await client.connect();
  const db = client.db('aquaevents_db');
  const events = db.collection('events');
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const upcomingEvents = await events.find({
    date: { $gte: today.toISOString() }
  }).sort({ date: 1 }).limit(10).toArray();
  
  console.log(`\nTotal upcoming events: ${upcomingEvents.length}`);
  console.log('\nFirst 10 upcoming events:');
  upcomingEvents.forEach(event => {
    console.log(`- ${event.name?.es || event.name} | ${event.date} | ${event.location?.city}`);
  });
  
  // Also check total events
  const totalEvents = await events.countDocuments();
  console.log(`\nTotal events in database: ${totalEvents}`);
  
} catch (error) {
  console.error('Error:', error.message);
} finally {
  await client.close();
}
