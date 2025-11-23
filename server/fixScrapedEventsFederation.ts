/**
 * Script to update scraped events with proper federation names
 * 
 * All scraped events currently have federation="Federation"
 * This script updates them to have the actual federation name from the source
 */

import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || process.env.DATABASE_URL_MONGO || '';

async function fixScrapedEventsFederation() {
  if (!MONGODB_URI) {
    console.error('MongoDB URI not configured');
    return;
  }

  const mongoClient = new MongoClient(MONGODB_URI);
  await mongoClient.connect();
  console.log('[Fix Federation] Connected to MongoDB');

  const mongoDb = mongoClient.db();
  const eventsCollection = mongoDb.collection('events');

  // Get all events with federation="Federation" or missing federation
  const scrapedEvents = await eventsCollection.find({
    $or: [
      { federation: 'Federation' },
      { federation: { $exists: false } }
    ]
  }).toArray();

  console.log(`[Fix Federation] Found ${scrapedEvents.length} events to update`);

  let updated = 0;
  for (const event of scrapedEvents) {
    // Determine federation based on event source or other fields
    let newFederation = 'RFEN'; // Default to Real Federación Española de Natación

    // If event has a source field, use it to determine federation
    if (event.source) {
      if (event.source.includes('rfen')) {
        newFederation = 'RFEN';
      } else if (event.source.includes('triathlon')) {
        newFederation = 'FETRI';
      } else if (event.source.includes('regional') || event.source.includes('autonomica')) {
        // Map regional federations based on location
        const region = event.location?.region;
        if (region) {
          const regionFederationMap: Record<string, string> = {
            'Andalucía': 'Federación Andaluza de Natación',
            'Cataluña': 'Federació Catalana de Natació',
            'Madrid': 'Federación Madrileña de Natación',
            'Valencia': 'Federació de Natació de la Comunitat Valenciana',
            'Galicia': 'Federación Galega de Natación',
            'País Vasco': 'Euskal Igeri Federazioa',
            'Canarias': 'Federación Canaria de Natación',
            'Castilla y León': 'Federación de Castilla y León de Natación',
            'Murcia': 'Federación de Natación de la Región de Murcia',
            'Aragón': 'Federación Aragonesa de Natación',
            'Asturias': 'Federación de Natación del Principado de Asturias',
            'Baleares': 'Federació Balear de Natació',
            'Cantabria': 'Federación Cántabra de Natación',
            'Castilla-La Mancha': 'Federación de Natación de Castilla-La Mancha',
            'Extremadura': 'Federación Extremeña de Natación',
            'La Rioja': 'Federación Riojana de Natación',
            'Navarra': 'Federación Navarra de Natación',
            'Ceuta': 'Federación de Natación de Ceuta',
            'Melilla': 'Federación de Natación de Melilla',
          };
          newFederation = regionFederationMap[region] || 'RFEN';
        }
      }
    }

    // Update the event
    await eventsCollection.updateOne(
      { _id: event._id },
      { $set: { federation: newFederation, updatedAt: new Date() } }
    );
    updated++;
  }

  console.log(`[Fix Federation] Updated ${updated} events`);

  await mongoClient.close();
  console.log('[Fix Federation] Done');
}

// Run if called directly
fixScrapedEventsFederation()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('[Fix Federation] Error:', error);
    process.exit(1);
  });

export { fixScrapedEventsFederation };

