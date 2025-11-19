import { describe, it, expect } from 'vitest';
import { MongoClient } from 'mongodb';

describe('MongoDB Connection', () => {
  it('should connect to MongoDB and verify events collection', async () => {
    const uri = process.env.MONGODB_URI;
    
    expect(uri).toBeDefined();
    expect(uri).toContain('mongodb');
    
    const client = new MongoClient(uri!);
    
    try {
      await client.connect();
      
      const db = client.db('aquaevents_db');
      const collections = await db.listCollections().toArray();
      
      expect(collections.length).toBeGreaterThan(0);
      
      const eventsCollection = db.collection('events');
      const eventCount = await eventsCollection.countDocuments();
      
      expect(eventCount).toBeGreaterThan(0);
      console.log(`✓ Connected to MongoDB: ${eventCount} events found`);
      
    } finally {
      await client.close();
    }
  }, 10000);
});

