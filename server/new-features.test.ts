import { describe, it, expect } from 'vitest';
import { getDb, upsertUser, getUser } from '../server/db';
import { users, eventSubmissions, userFavorites } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

describe('User Profile and Favorites Features', () => {
  it('should create user with profile fields', async () => {
    const db = await getDb();
    if (!db) {
      console.warn('Database not available, skipping test');
      return;
    }

    const testUser = {
      id: 'test-user-' + Date.now(),
      name: 'Test User',
      email: 'test@example.com',
      userType: 'swimmer' as const,
      preferredDisciplines: JSON.stringify(['Natación', 'Triatlón']),
      emailConsent: new Date(),
    };

    await upsertUser(testUser);
    const savedUser = await getUser(testUser.id);

    expect(savedUser).toBeDefined();
    expect(savedUser?.name).toBe(testUser.name);
    expect(savedUser?.email).toBe(testUser.email);
    
    // Cleanup
    await db.delete(users).where(eq(users.id, testUser.id));
  });

  it('should store event submission with all required fields', async () => {
    const db = await getDb();
    if (!db) {
      console.warn('Database not available, skipping test');
      return;
    }

    const submissionId = 'test-submission-' + Date.now();
    const submission = {
      id: submissionId,
      title: 'Test Swimming Event',
      discipline: 'Natación',
      category: 'Absoluto',
      region: 'Madrid',
      city: 'Madrid',
      startDate: new Date('2026-06-01'),
      endDate: new Date('2026-06-03'),
      description: 'Test event description',
      contactEmail: 'organizer@test.com',
      contactName: 'Test Organizer',
      contactPhone: '+34 600 000 000',
      website: 'https://test-event.com',
      status: 'pending' as const,
      submittedBy: 'test-user-' + Date.now(),
    };

    await db.insert(eventSubmissions).values(submission);

    // Verify it was saved
    const saved = await db.select().from(eventSubmissions).where(eq(eventSubmissions.id, submissionId));
    expect(saved.length).toBeGreaterThan(0);

    // Cleanup
    await db.delete(eventSubmissions).where(eq(eventSubmissions.id, submissionId));
  });

  it('should add and remove event from favorites', async () => {
    const db = await getDb();
    if (!db) {
      console.warn('Database not available, skipping test');
      return;
    }

    const userId = 'test-user-' + Date.now();
    const eventId = 'test-event-123';

    // Create test user first
    await upsertUser({
      id: userId,
      name: 'Test User',
      email: 'test@example.com',
    });

    // Add to favorites
    const favoriteId = 'test-favorite-' + Date.now();
    await db.insert(userFavorites).values({
      id: favoriteId,
      userId,
      eventId,
    });

    // Verify it was added
    const favorites = await db.select().from(userFavorites).where(eq(userFavorites.userId, userId));
    expect(favorites.length).toBe(1);
    expect(favorites[0].eventId).toBe(eventId);

    // Remove from favorites
    await db.delete(userFavorites).where(eq(userFavorites.userId, userId));

    // Verify it was removed
    const afterDelete = await db.select().from(userFavorites).where(eq(userFavorites.userId, userId));
    expect(afterDelete.length).toBe(0);

    // Cleanup user
    await db.delete(users).where(eq(users.id, userId));
  });

  it('should update user profile preferences', async () => {
    const db = await getDb();
    if (!db) {
      console.warn('Database not available, skipping test');
      return;
    }

    const userId = 'test-user-' + Date.now();

    // Create user
    await upsertUser({
      id: userId,
      name: 'Test User',
      email: 'test@example.com',
      userType: 'swimmer',
      preferredDisciplines: JSON.stringify(['Natación']),
    });

    // Update preferences
    await db.update(users)
      .set({
        userType: 'club',
        preferredDisciplines: JSON.stringify(['Natación', 'Waterpolo', 'Triatlón']),
        emailConsent: new Date(),
      })
      .where(eq(users.id, userId));

    // Verify update
    const updated = await getUser(userId);
    expect(updated?.userType).toBe('club');
    expect(updated?.emailConsent).toBeDefined();

    // Cleanup
    await db.delete(users).where(eq(users.id, userId));
  });

  it('should handle event submission approval workflow', async () => {
    const db = await getDb();
    if (!db) {
      console.warn('Database not available, skipping test');
      return;
    }

    const submissionId = 'test-approval-' + Date.now();
    const submission = {
      id: submissionId,
      title: 'Test Event for Approval',
      discipline: 'Natación',
      region: 'Madrid',
      city: 'Madrid',
      startDate: new Date('2026-07-01'),
      contactEmail: 'test@example.com',
      status: 'pending' as const,
      submittedBy: 'test-user',
    };

    await db.insert(eventSubmissions).values(submission);

    // Approve submission
    await db.update(eventSubmissions)
      .set({
        status: 'approved',
        reviewedAt: new Date(),
        adminNotes: 'Test approval',
      })
      .where(eq(eventSubmissions.id, submissionId));

    // Verify approval
    const approved = await db.select().from(eventSubmissions).where(eq(eventSubmissions.id, submissionId));
    expect(approved[0].status).toBe('approved');
    expect(approved[0].reviewedAt).toBeDefined();
    expect(approved[0].adminNotes).toBe('Test approval');

    // Cleanup
    await db.delete(eventSubmissions).where(eq(eventSubmissions.id, submissionId));
  });

  it('should handle event submission rejection', async () => {
    const db = await getDb();
    if (!db) {
      console.warn('Database not available, skipping test');
      return;
    }

    const submissionId = 'test-rejection-' + Date.now();
    const submission = {
      id: submissionId,
      title: 'Test Event for Rejection',
      discipline: 'Natación',
      region: 'Madrid',
      city: 'Madrid',
      startDate: new Date('2026-08-01'),
      contactEmail: 'test@example.com',
      status: 'pending' as const,
      submittedBy: 'test-user',
    };

    await db.insert(eventSubmissions).values(submission);

    // Reject submission
    await db.update(eventSubmissions)
      .set({
        status: 'rejected',
        reviewedAt: new Date(),
        adminNotes: 'Duplicate event',
      })
      .where(eq(eventSubmissions.id, submissionId));

    // Verify rejection
    const rejected = await db.select().from(eventSubmissions).where(eq(eventSubmissions.id, submissionId));
    expect(rejected[0].status).toBe('rejected');
    expect(rejected[0].reviewedAt).toBeDefined();
    expect(rejected[0].adminNotes).toBe('Duplicate event');

    // Cleanup
    await db.delete(eventSubmissions).where(eq(eventSubmissions.id, submissionId));
  });
});

