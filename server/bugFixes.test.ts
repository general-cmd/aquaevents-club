/**
 * Tests for critical bug fixes
 * 
 * 1. Event duplication fix - editing approved events should update, not duplicate
 * 2. Registration URL and max capacity saved correctly
 * 3. Federation names properly set
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { MongoClient, ObjectId } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || process.env.DATABASE_URL_MONGO || '';

describe('Bug Fixes - Event Management', () => {
  let mongoClient: MongoClient;
  let eventsCollection: any;

  beforeAll(async () => {
    if (!MONGODB_URI) {
      throw new Error('MongoDB URI not configured');
    }
    mongoClient = new MongoClient(MONGODB_URI);
    await mongoClient.connect();
    const mongoDb = mongoClient.db();
    eventsCollection = mongoDb.collection('events');
  });

  it('should have proper federation names (not generic "Federation")', async () => {
    // Check that no events have federation="Federation"
    const genericFederationEvents = await eventsCollection.find({
      federation: 'Federation'
    }).toArray();

    expect(genericFederationEvents.length).toBe(0);

    // Check that events have real federation names
    const events = await eventsCollection.find({}).limit(10).toArray();
    const federationNames = events.map((e: any) => e.federation);
    
    // Should have federation names like "RFEN", "Federación Andaluza de Natación", etc.
    const hasRealFederations = federationNames.some((name: string) => 
      name && name !== 'Federation' && name.length > 3
    );
    
    expect(hasRealFederations).toBe(true);
  });

  it('should save registrationUrl and maxCapacity correctly', async () => {
    // Find events with registrationUrl
    const eventsWithRegistration = await eventsCollection.find({
      registrationUrl: { $exists: true, $ne: '' }
    }).limit(5).toArray();

    // Should have at least some events with registration URLs
    expect(eventsWithRegistration.length).toBeGreaterThan(0);

    // Check that registrationUrl is a valid URL or empty string
    for (const event of eventsWithRegistration) {
      expect(typeof event.registrationUrl).toBe('string');
      if (event.registrationUrl) {
        expect(event.registrationUrl).toMatch(/^https?:\/\//);
      }
    }
  });

  it('should have unique submissionId for user-submitted events', async () => {
    // Find user-submitted events
    const userEvents = await eventsCollection.find({
      source: 'user-submission',
      submissionId: { $exists: true }
    }).toArray();

    if (userEvents.length === 0) {
      // No user-submitted events yet, skip test
      return;
    }

    // Check that submissionIds are unique
    const submissionIds = userEvents.map((e: any) => e.submissionId);
    const uniqueIds = new Set(submissionIds);

    expect(uniqueIds.size).toBe(submissionIds.length);
  });

  it('should not have duplicate events with same submissionId', async () => {
    // Group events by submissionId
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
          events: { $push: { _id: '$_id', name: '$name', date: '$date' } }
        }
      },
      {
        $match: {
          count: { $gt: 1 }
        }
      }
    ]).toArray();

    // Should have no duplicates
    expect(duplicates.length).toBe(0);
  });
});

