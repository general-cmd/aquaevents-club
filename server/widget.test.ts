import { describe, it, expect, beforeAll } from 'vitest';
import { getEventsCollection } from './services/mongodb';

describe('Widget Router Tests', () => {
  beforeAll(async () => {
    // Ensure MongoDB connection is available
    const collection = await getEventsCollection();
    expect(collection).toBeDefined();
  });

  it('should fetch all events without filters', async () => {
    const collection = await getEventsCollection();
    if (!collection) {
      throw new Error('Events collection not available');
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const events = await collection
      .find({
        $or: [
          { date: { $gte: today } },
          { date: { $gte: today.toISOString() } }
        ]
      })
      .sort({ date: 1 })
      .limit(20)
      .toArray();

    expect(events).toBeDefined();
    expect(Array.isArray(events)).toBe(true);
    expect(events.length).toBeGreaterThan(0);
  });

  it('should filter events by discipline', async () => {
    const collection = await getEventsCollection();
    if (!collection) {
      throw new Error('Events collection not available');
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const events = await collection
      .find({
        $or: [
          { date: { $gte: today } },
          { date: { $gte: today.toISOString() } }
        ],
        discipline: 'natacion'
      })
      .sort({ date: 1 })
      .limit(20)
      .toArray();

    expect(events).toBeDefined();
    expect(Array.isArray(events)).toBe(true);
    
    // All events should have discipline 'natacion'
    events.forEach((event: any) => {
      expect(event.discipline).toBe('natacion');
    });
  });

  it('should filter events by region', async () => {
    const collection = await getEventsCollection();
    if (!collection) {
      throw new Error('Events collection not available');
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const events = await collection
      .find({
        $or: [
          { date: { $gte: today } },
          { date: { $gte: today.toISOString() } }
        ],
        region: 'Madrid'
      })
      .sort({ date: 1 })
      .limit(20)
      .toArray();

    expect(events).toBeDefined();
    expect(Array.isArray(events)).toBe(true);
    
    // All events should be in Madrid region
    events.forEach((event: any) => {
      expect(event.region || event.location?.region).toBe('Madrid');
    });
  });

  it('should handle federation filtering in own mode', async () => {
    const collection = await getEventsCollection();
    if (!collection) {
      throw new Error('Events collection not available');
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const federationName = 'RFEN';
    const events = await collection
      .find({
        $or: [
          { date: { $gte: today } },
          { date: { $gte: today.toISOString() } }
        ],
        'organizer.name': { $regex: federationName, $options: 'i' }
      })
      .sort({ date: 1 })
      .limit(20)
      .toArray();

    expect(events).toBeDefined();
    expect(Array.isArray(events)).toBe(true);
    
    // All events should have RFEN in organizer name
    events.forEach((event: any) => {
      const organizerName = event.organizer?.name || event.federation || '';
      expect(organizerName.toLowerCase()).toContain(federationName.toLowerCase());
    });
  });

  it('should mark federation events correctly in all mode', async () => {
    const collection = await getEventsCollection();
    if (!collection) {
      throw new Error('Events collection not available');
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const events = await collection
      .find({
        $or: [
          { date: { $gte: today } },
          { date: { $gte: today.toISOString() } }
        ]
      })
      .sort({ date: 1 })
      .limit(20)
      .toArray();

    const federationId = 'RFEN';
    const eventsWithHighlight = events.map((event: any) => {
      const organizerName = event.organizer?.name || event.federation || '';
      const isOwnEvent = organizerName.toLowerCase().includes(federationId.toLowerCase());
      
      return {
        ...event,
        _id: event._id.toString(),
        isOwnEvent,
      };
    });

    expect(eventsWithHighlight).toBeDefined();
    expect(Array.isArray(eventsWithHighlight)).toBe(true);
    
    // Check that isOwnEvent flag is set correctly
    eventsWithHighlight.forEach((event: any) => {
      expect(typeof event.isOwnEvent).toBe('boolean');
    });
  });

  it('should sort events by date ascending', async () => {
    const collection = await getEventsCollection();
    if (!collection) {
      throw new Error('Events collection not available');
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const events = await collection
      .find({
        $or: [
          { date: { $gte: today } },
          { date: { $gte: today.toISOString() } }
        ]
      })
      .sort({ date: 1 })
      .limit(20)
      .toArray();

    expect(events.length).toBeGreaterThan(1);
    
    // Check that events are sorted by date
    for (let i = 0; i < events.length - 1; i++) {
      const currentDate = new Date(events[i].date);
      const nextDate = new Date(events[i + 1].date);
      expect(currentDate.getTime()).toBeLessThanOrEqual(nextDate.getTime());
    }
  });

  it('should respect limit parameter', async () => {
    const collection = await getEventsCollection();
    if (!collection) {
      throw new Error('Events collection not available');
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const limit = 5;
    const events = await collection
      .find({
        $or: [
          { date: { $gte: today } },
          { date: { $gte: today.toISOString() } }
        ]
      })
      .sort({ date: 1 })
      .limit(limit)
      .toArray();

    expect(events).toBeDefined();
    expect(Array.isArray(events)).toBe(true);
    expect(events.length).toBeLessThanOrEqual(limit);
  });

  it('should handle combined filters (discipline + region)', async () => {
    const collection = await getEventsCollection();
    if (!collection) {
      throw new Error('Events collection not available');
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const events = await collection
      .find({
        $or: [
          { date: { $gte: today } },
          { date: { $gte: today.toISOString() } }
        ],
        discipline: 'natacion',
        region: 'Galicia'
      })
      .sort({ date: 1 })
      .limit(20)
      .toArray();

    expect(events).toBeDefined();
    expect(Array.isArray(events)).toBe(true);
    
    // All events should match both filters
    events.forEach((event: any) => {
      expect(event.discipline).toBe('natacion');
      expect(event.region || event.location?.region).toBe('Galicia');
    });
  });

  it('should return empty array when no events match filters', async () => {
    const collection = await getEventsCollection();
    if (!collection) {
      throw new Error('Events collection not available');
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const events = await collection
      .find({
        $or: [
          { date: { $gte: today } },
          { date: { $gte: today.toISOString() } }
        ],
        discipline: 'nonexistent-discipline-xyz'
      })
      .sort({ date: 1 })
      .limit(20)
      .toArray();

    expect(events).toBeDefined();
    expect(Array.isArray(events)).toBe(true);
    expect(events.length).toBe(0);
  });

  it('should handle events with registration URLs', async () => {
    const collection = await getEventsCollection();
    if (!collection) {
      throw new Error('Events collection not available');
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const events = await collection
      .find({
        $or: [
          { date: { $gte: today } },
          { date: { $gte: today.toISOString() } }
        ],
        registrationUrl: { $exists: true, $ne: null, $ne: '' }
      })
      .sort({ date: 1 })
      .limit(20)
      .toArray();

    expect(events).toBeDefined();
    expect(Array.isArray(events)).toBe(true);
    
    // All events should have registration URLs
    events.forEach((event: any) => {
      expect(event.registrationUrl).toBeDefined();
      expect(event.registrationUrl).not.toBe('');
    });
  });
});
