import { describe, it, expect, beforeAll } from 'vitest';
import { getDb, createEventSubmission, updateEventSubmission, getUserEventSubmissions } from './db';
import { publishEventToMongo } from './publishEvent';
import { nanoid } from 'nanoid';
import { MongoClient } from 'mongodb';

const TEST_USER_ID = 'test-user-' + nanoid();
const TEST_SUBMISSION_ID = 'test-submission-' + nanoid();

describe('Auto-publish and Tracking Features', () => {
  beforeAll(async () => {
    // Ensure database is available
    const db = await getDb();
    expect(db).toBeDefined();
  });

  it('should create event submission and retrieve by user', async () => {
    // Create a test event submission
    const submission = await createEventSubmission({
      id: TEST_SUBMISSION_ID,
      title: 'Test Event for Auto-Publish',
      discipline: 'Natación',
      category: 'Absoluto',
      region: 'Madrid',
      city: 'Madrid',
      startDate: new Date('2026-06-15'),
      endDate: new Date('2026-06-16'),
      contactName: 'Test User',
      contactEmail: 'test@example.com',
      contactPhone: '+34 600 000 000',
      website: 'https://test.com',
      description: 'Test event for auto-publish feature',
      submittedBy: TEST_USER_ID,
      status: 'pending',
    });

    expect(submission).toBeDefined();
    expect(submission.id).toBe(TEST_SUBMISSION_ID);
    expect(submission.status).toBe('pending');

    // Retrieve user's submissions
    const userSubmissions = await getUserEventSubmissions(TEST_USER_ID);
    expect(userSubmissions.length).toBeGreaterThan(0);
    
    const foundSubmission = userSubmissions.find(s => s.id === TEST_SUBMISSION_ID);
    expect(foundSubmission).toBeDefined();
    expect(foundSubmission?.title).toBe('Test Event for Auto-Publish');
  });

  it('should approve event submission', async () => {
    // Approve the submission
    await updateEventSubmission(TEST_SUBMISSION_ID, {
      status: 'approved',
      reviewedAt: new Date(),
      reviewedBy: 'admin-test',
      adminNotes: 'Test approval',
    });

    // Verify approval
    const userSubmissions = await getUserEventSubmissions(TEST_USER_ID);
    const approvedSubmission = userSubmissions.find(s => s.id === TEST_SUBMISSION_ID);
    
    expect(approvedSubmission?.status).toBe('approved');
    expect(approvedSubmission?.reviewedBy).toBe('admin-test');
    expect(approvedSubmission?.adminNotes).toBe('Test approval');
  });

  it('should publish approved event to MongoDB', async () => {
    // Publish to MongoDB
    const result = await publishEventToMongo(TEST_SUBMISSION_ID);
    
    expect(result.success).toBe(true);
    expect(result.eventId).toBeDefined();

    // Verify publishedAt timestamp was set
    const userSubmissions = await getUserEventSubmissions(TEST_USER_ID);
    const publishedSubmission = userSubmissions.find(s => s.id === TEST_SUBMISSION_ID);
    
    expect(publishedSubmission?.publishedAt).toBeDefined();

    // Verify event exists in MongoDB
    if (process.env.MONGODB_URI) {
      const mongoClient = new MongoClient(process.env.MONGODB_URI);
      await mongoClient.connect();
      
      const mongoDb = mongoClient.db();
      const eventsCollection = mongoDb.collection('events');
      
      const mongoEvent = await eventsCollection.findOne({
        submissionId: TEST_SUBMISSION_ID
      });
      
      expect(mongoEvent).toBeDefined();
      expect(mongoEvent?.name?.es).toBe('Test Event for Auto-Publish');
      expect(mongoEvent?.source).toBe('user-submission');
      
      await mongoClient.close();
    }
  });

  it('should not publish non-approved submissions', async () => {
    // Create a pending submission
    const pendingId = 'test-pending-' + nanoid();
    await createEventSubmission({
      id: pendingId,
      title: 'Pending Event',
      discipline: 'Waterpolo',
      region: 'Barcelona',
      city: 'Barcelona',
      startDate: new Date('2026-07-01'),
      contactEmail: 'pending@example.com',
      submittedBy: TEST_USER_ID,
      status: 'pending',
    });

    // Try to publish (should fail)
    const result = await publishEventToMongo(pendingId);
    
    expect(result.success).toBe(false);
    expect(result.error).toContain('approved');
  });

  it('should track multiple submissions for a user', async () => {
    // Create multiple submissions
    const submission2Id = 'test-submission-2-' + nanoid();
    const submission3Id = 'test-submission-3-' + nanoid();

    await createEventSubmission({
      id: submission2Id,
      title: 'Second Test Event',
      discipline: 'Triatlón',
      region: 'Valencia',
      city: 'Valencia',
      startDate: new Date('2026-08-01'),
      contactEmail: 'test2@example.com',
      submittedBy: TEST_USER_ID,
      status: 'approved',
    });

    await createEventSubmission({
      id: submission3Id,
      title: 'Third Test Event',
      discipline: 'Aguas Abiertas',
      region: 'Málaga',
      city: 'Málaga',
      startDate: new Date('2026-09-01'),
      contactEmail: 'test3@example.com',
      submittedBy: TEST_USER_ID,
      status: 'rejected',
      adminNotes: 'Test rejection reason',
    });

    // Get all user submissions
    const allSubmissions = await getUserEventSubmissions(TEST_USER_ID);
    
    expect(allSubmissions.length).toBeGreaterThanOrEqual(3);
    
    const statuses = allSubmissions.map(s => s.status);
    expect(statuses).toContain('approved');
    expect(statuses).toContain('rejected');
    expect(statuses).toContain('pending');
  });
});

