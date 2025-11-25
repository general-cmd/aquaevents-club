import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error('❌ MONGODB_URI not found in environment');
  process.exit(1);
}

// Mapping from English to Spanish discipline values
const disciplineMap = {
  'swimming': 'natacion',
  'triathlon': 'triatlon',
  'waterpolo': 'waterpolo',
  'open-water': 'aguas-abiertas',
  'synchronized-swimming': 'natacion-sincronizada',
  'diving': 'saltos',
  'lifesaving': 'salvamento-socorrismo',
};

async function fixDisciplines() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB\n');
    
    const db = client.db();
    const eventsCollection = db.collection('events');
    
    // Find all events
    const events = await eventsCollection.find({}).toArray();
    console.log(`📊 Found ${events.length} events\n`);
    
    let updatedCount = 0;
    
    for (const event of events) {
      const oldDiscipline = event.discipline;
      
      // Check if discipline needs to be mapped
      if (disciplineMap[oldDiscipline]) {
        const newDiscipline = disciplineMap[oldDiscipline];
        
        await eventsCollection.updateOne(
          { _id: event._id },
          { $set: { discipline: newDiscipline } }
        );
        
        console.log(`✏️  Updated event: "${event.name?.es || event.name}"`);
        console.log(`   "${oldDiscipline}" → "${newDiscipline}"\n`);
        updatedCount++;
      } else {
        console.log(`✓ Event OK: "${event.name?.es || event.name}" (discipline: "${oldDiscipline}")`);
      }
    }
    
    console.log(`\n✅ Updated ${updatedCount} events`);
    console.log(`✓ ${events.length - updatedCount} events already had correct discipline values`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    await client.close();
  }
}

fixDisciplines();

