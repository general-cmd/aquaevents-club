import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

async function testUpdatedFilter() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db('aquaevents_db');
  
  // Get mix of events including duathlons
  const events = await db.collection('events')
    .find({}, { projection: { name: 1, discipline: 1 } })
    .limit(20)
    .toArray();
  
  const swimmingKeywords = ['natacion', 'natación', 'triathlon', 'triatlon', 'triatlón', 'aquatlon', 'travesia', 'waterpolo', 'sincronizada', 'saltos', 'piscina', 'master', 'copa', 'campeonato'];
  const nonSwimmingKeywords = ['duatl', 'duathlon', 'carrera', 'running', 'trail', 'ciclismo', 'cycling', 'btt', 'mtb'];
  
  console.log('\nUpdated Filter Logic Test:\n');
  events.forEach(e => {
    const name = (e.name?.es || e.name || '').toLowerCase();
    const disc = (e.discipline || '').toLowerCase();
    
    const isNonSwimming = nonSwimmingKeywords.some(k => name.includes(k) || disc.includes(k));
    const isSwimming = swimmingKeywords.some(k => disc.includes(k) || name.includes(k));
    
    const shouldShow = !isNonSwimming && isSwimming;
    const status = shouldShow ? '✅ SHOW' : '❌ HIDE';
    const eventName = (e.name?.es || e.name || '').substring(0, 60);
    console.log(`${status} | ${e.discipline || 'N/A'} | ${eventName}`);
  });
  
  await client.close();
}

testUpdatedFilter().catch(console.error);
