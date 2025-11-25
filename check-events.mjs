import { MongoClient } from 'mongodb';

const MONGO_URI = "mongodb+srv://manusdbuser:bh2*klmnjP09@aquaevents.i1zdgpx.mongodb.net/";
const client = new MongoClient(MONGO_URI);

async function checkEvents() {
  try {
    await client.connect();
    const db = client.db('aquaevents_db');
    const events = await db.collection('events').find({}).sort({ date: 1 }).toArray();
    
    console.log(`\n📊 Total events: ${events.length}\n`);
    
    events.forEach((e, i) => {
      console.log(`${i+1}. ${e.name.es}`);
      console.log(`   📅 ${e.date}`);
      console.log(`   📍 ${e.location.city}, ${e.location.region}`);
      console.log(`   📧 ${e.contact.email || e.contact.website || e.contact.phone || 'No contact'}`);
      console.log('');
    });
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

checkEvents();
