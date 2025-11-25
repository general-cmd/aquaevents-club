import { MongoClient } from 'mongodb';

const uri = process.env.DATABASE_URL || process.env.MONGODB_URI;

async function checkDisciplines() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    const db = client.db();
    const events = await db.collection('events').find({}).toArray();
    
    console.log(`\n📊 Found ${events.length} events in database\n`);
    
    events.forEach((event, idx) => {
      console.log(`${idx + 1}. ${event.name?.es || event.name}`);
      console.log(`   Discipline: "${event.discipline}"`);
      console.log(`   Date: ${event.date}`);
      console.log(`   Location: ${event.location?.city}, ${event.location?.region}`);
      console.log('');
    });
    
    const disciplineCounts = {};
    events.forEach(event => {
      const disc = event.discipline || 'undefined';
      disciplineCounts[disc] = (disciplineCounts[disc] || 0) + 1;
    });
    
    console.log('\n📈 Discipline breakdown:');
    Object.entries(disciplineCounts).forEach(([disc, count]) => {
      console.log(`   "${disc}": ${count} events`);
    });
    
  } finally {
    await client.close();
  }
}

checkDisciplines();
