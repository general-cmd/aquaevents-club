/**
 * Script to find and remove duplicate events with same submissionId
 * Keeps the most recently updated event
 */

import { MongoClient, ObjectId } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || process.env.DATABASE_URL_MONGO || '';

async function removeDuplicateEvents() {
  if (!MONGODB_URI) {
    console.error('MongoDB URI not configured');
    return;
  }

  const mongoClient = new MongoClient(MONGODB_URI);
  await mongoClient.connect();
  console.log('[Remove Duplicates] Connected to MongoDB');

  const mongoDb = mongoClient.db();
  const eventsCollection = mongoDb.collection('events');

  // Find all events with duplicate submissionIds
  const duplicates = await eventsCollection.aggregate([
    {
      $match: {
        submissionId: { $exists: true, $ne: null }
      }
    },
    {
      $group: {
        _id: '$submissionId',
        count: { $sum: 1 },
        events: { 
          $push: { 
            _id: '$_id', 
            name: '$name', 
            date: '$date',
            updatedAt: '$updatedAt',
            createdAt: '$createdAt'
          } 
        }
      }
    },
    {
      $match: {
        count: { $gt: 1 }
      }
    }
  ]).toArray();

  console.log(`[Remove Duplicates] Found ${duplicates.length} submission(s) with duplicates`);

  let removed = 0;
  for (const dup of duplicates) {
    console.log(`\n[Remove Duplicates] Submission ID: ${dup._id}`);
    console.log(`  - ${dup.count} duplicate events found`);
    
    // Sort events by updatedAt (most recent first)
    const events = dup.events.sort((a: any, b: any) => {
      const aTime = a.updatedAt || a.createdAt || new Date(0);
      const bTime = b.updatedAt || b.createdAt || new Date(0);
      return new Date(bTime).getTime() - new Date(aTime).getTime();
    });

    // Keep the first (most recent) event, delete the rest
    const toKeep = events[0];
    const toDelete = events.slice(1);

    console.log(`  - Keeping: ${toKeep.name.es || toKeep.name} (${toKeep._id})`);
    
    for (const event of toDelete) {
      console.log(`  - Deleting: ${event.name.es || event.name} (${event._id})`);
      await eventsCollection.deleteOne({ _id: event._id });
      removed++;
    }
  }

  console.log(`\n[Remove Duplicates] Removed ${removed} duplicate events`);

  await mongoClient.close();
  console.log('[Remove Duplicates] Done');
}

// Run if called directly
removeDuplicateEvents()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('[Remove Duplicates] Error:', error);
    process.exit(1);
  });

export { removeDuplicateEvents };

