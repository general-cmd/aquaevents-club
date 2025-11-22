import { describe, it, expect, beforeAll } from 'vitest';
import { appRouter } from '../server/routers';
import { getDb } from '../server/db';
import { eventSubmissions } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

describe('Event Submission Management', () => {
  let testSubmissionId: string;
  const mockUserId = 'test-user-123';
  const mockAdminId = 'admin-user-456';

  const createMockContext = (userId: string, role: 'user' | 'admin' = 'user') => ({
    user: {
      id: userId,
      name: 'Test User',
      email: 'test@example.com',
      role,
      emailConsent: null,
    },
    req: {} as any,
    res: {} as any,
  });

  beforeAll(async () => {
    const db = await getDb();
    if (!db) {
      throw new Error('Database not available for testing');
    }

    // Create a test submission
    await db.insert(eventSubmissions).values({
      id: 'test-submission-001',
      title: 'Test Event for Management',
      discipline: 'Natación',
      region: 'Test Region',
      city: 'Test City',
      startDate: new Date('2026-06-01'),
      contactEmail: 'test@example.com',
      submittedBy: mockUserId,
      status: 'pending',
      createdAt: new Date(),
    });

    testSubmissionId = 'test-submission-001';
  });

  it('should allow user to update their own submission', async () => {
    const caller = appRouter.createCaller(createMockContext(mockUserId));

    const result = await caller.eventSubmissions.update({
      id: testSubmissionId,
      title: 'Updated Test Event',
      city: 'Updated City',
    });

    expect(result.success).toBe(true);

    // Verify the update
    const db = await getDb();
    if (db) {
      const submissions = await db
        .select()
        .from(eventSubmissions)
        .where(eq(eventSubmissions.id, testSubmissionId))
        .limit(1);

      expect(submissions[0].title).toBe('Updated Test Event');
      expect(submissions[0].city).toBe('Updated City');
    }
  });

  it('should reset published event to pending when edited', async () => {
    const db = await getDb();
    if (!db) throw new Error('Database not available');

    // Mark the submission as published
    await db
      .update(eventSubmissions)
      .set({
        status: 'approved',
        publishedAt: new Date(),
        reviewedAt: new Date(),
        reviewedBy: mockAdminId,
      })
      .where(eq(eventSubmissions.id, testSubmissionId));

    const caller = appRouter.createCaller(createMockContext(mockUserId));

    const result = await caller.eventSubmissions.update({
      id: testSubmissionId,
      title: 'Re-edited Event',
    });

    expect(result.success).toBe(true);
    expect(result.requiresReapproval).toBe(true);

    // Verify status reset to pending
    const submissions = await db
      .select()
      .from(eventSubmissions)
      .where(eq(eventSubmissions.id, testSubmissionId))
      .limit(1);

    expect(submissions[0].status).toBe('pending');
    expect(submissions[0].publishedAt).toBeNull();
    expect(submissions[0].reviewedAt).toBeNull();
  });

  it('should not allow user to update another user\'s submission', async () => {
    const caller = appRouter.createCaller(createMockContext('different-user-789'));

    await expect(
      caller.eventSubmissions.update({
        id: testSubmissionId,
        title: 'Unauthorized Update',
      })
    ).rejects.toThrow('Unauthorized');
  });

  it('should allow admin to update any submission', async () => {
    const caller = appRouter.createCaller(createMockContext(mockAdminId, 'admin'));

    const result = await caller.eventSubmissions.update({
      id: testSubmissionId,
      title: 'Admin Updated Event',
    });

    expect(result.success).toBe(true);
  });

  it('should allow user to delete their own submission', async () => {
    const db = await getDb();
    if (!db) throw new Error('Database not available');

    // Create a new submission for deletion test
    await db.insert(eventSubmissions).values({
      id: 'test-submission-delete',
      title: 'Event to Delete',
      discipline: 'Waterpolo',
      region: 'Test Region',
      city: 'Test City',
      startDate: new Date('2026-07-01'),
      contactEmail: 'test@example.com',
      submittedBy: mockUserId,
      status: 'pending',
      createdAt: new Date(),
    });

    const caller = appRouter.createCaller(createMockContext(mockUserId));

    const result = await caller.eventSubmissions.deleteOwn({
      id: 'test-submission-delete',
    });

    expect(result.success).toBe(true);

    // Verify deletion
    const submissions = await db
      .select()
      .from(eventSubmissions)
      .where(eq(eventSubmissions.id, 'test-submission-delete'))
      .limit(1);

    expect(submissions.length).toBe(0);
  });

  it('should not allow user to delete another user\'s submission', async () => {
    const caller = appRouter.createCaller(createMockContext('different-user-789'));

    await expect(
      caller.eventSubmissions.deleteOwn({
        id: testSubmissionId,
      })
    ).rejects.toThrow('Unauthorized');
  });

  it('should allow admin to delete any submission', async () => {
    const db = await getDb();
    if (!db) throw new Error('Database not available');

    // Create a submission for admin deletion test
    await db.insert(eventSubmissions).values({
      id: 'test-submission-admin-delete',
      title: 'Event for Admin Delete',
      discipline: 'Triatlón',
      region: 'Test Region',
      city: 'Test City',
      startDate: new Date('2026-08-01'),
      contactEmail: 'other@example.com',
      submittedBy: 'other-user-999',
      status: 'pending',
      createdAt: new Date(),
    });

    const caller = appRouter.createCaller(createMockContext(mockAdminId, 'admin'));

    const result = await caller.eventSubmissions.deleteOwn({
      id: 'test-submission-admin-delete',
    });

    expect(result.success).toBe(true);
  });
});

