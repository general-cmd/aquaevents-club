import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { 
  getDb, 
  createEventSubmission, 
  createEventReminder,
  getUserReminders,
  deleteEventReminder
} from './db';
import { nanoid } from 'nanoid';

describe('Event Registration Integration', () => {
  let testUserId: string;
  let testSubmissionId: string;

  beforeAll(async () => {
    testUserId = `test-user-${nanoid()}`;
    testSubmissionId = `test-submission-${nanoid()}`;
  });

  it('should create event submission with registration fields', async () => {
    const submission = await createEventSubmission({
      id: testSubmissionId,
      title: 'Test Event with Registration',
      discipline: 'Natación',
      category: 'Absoluto',
      region: 'Madrid',
      city: 'Madrid',
      startDate: new Date('2026-06-15'),
      endDate: new Date('2026-06-16'),
      contactName: 'Test Organizer',
      contactEmail: 'test@example.com',
      contactPhone: '+34 600 000 000',
      website: 'https://example.com',
      description: 'Test event with registration',
      registrationUrl: 'https://inscripciones.example.com',
      maxCapacity: '200',
      submittedBy: testUserId,
      status: 'pending',
    });

    expect(submission).toBeDefined();
    expect(submission.registrationUrl).toBe('https://inscripciones.example.com');
    expect(submission.maxCapacity).toBe('200');
  });

  it('should handle unlimited capacity', async () => {
    const unlimitedSubmissionId = `test-submission-unlimited-${nanoid()}`;
    const submission = await createEventSubmission({
      id: unlimitedSubmissionId,
      title: 'Test Event Unlimited',
      discipline: 'Natación',
      region: 'Barcelona',
      city: 'Barcelona',
      startDate: new Date('2026-07-01'),
      contactEmail: 'test@example.com',
      maxCapacity: 'ilimitado',
      submittedBy: testUserId,
      status: 'pending',
    });

    expect(submission.maxCapacity).toBe('ilimitado');
  });

  afterAll(async () => {
    // Cleanup test data
    const db = await getDb();
    if (db) {
      try {
        await db.execute(`DELETE FROM eventSubmissions WHERE id LIKE 'test-submission-%'`);
      } catch (error) {
        console.error('Cleanup error:', error);
      }
    }
  });
});

describe('Event Reminder System', () => {
  let testUserId: string;
  let testEventId: string;
  let testReminderId: string;

  beforeAll(async () => {
    testUserId = `test-user-${nanoid()}`;
    testEventId = `test-event-${nanoid()}`;
  });

  it('should create event reminder with 1 week notice', async () => {
    const eventDate = new Date('2026-08-15T10:00:00Z');
    const reminderId = `test-reminder-${nanoid()}`;
    
    // Calculate reminder date (7 days before event)
    const reminderDate = new Date(eventDate);
    reminderDate.setDate(reminderDate.getDate() - 7);
    
    const reminder = await createEventReminder({
      id: reminderId,
      userId: testUserId,
      eventId: testEventId,
      eventTitle: 'Test Championship',
      eventDate: eventDate,
      reminderType: '1_week',
      reminderDate: reminderDate,
      sent: false,
    });

    expect(reminder).not.toBeNull();
    expect(reminder?.reminderType).toBe('1_week');
    expect(reminder?.eventTitle).toBe('Test Championship');
    
    // Check that reminder date is 7 days before event
    const actualReminderDate = new Date(reminder!.reminderDate);
    const expectedDate = new Date(eventDate);
    expectedDate.setDate(expectedDate.getDate() - 7);
    
    expect(actualReminderDate.toISOString().split('T')[0]).toBe(expectedDate.toISOString().split('T')[0]);
    
    testReminderId = reminder!.id;
  });

  it('should create reminder with 3 days notice', async () => {
    const eventDate = new Date('2026-09-01T10:00:00Z');
    const reminderDate = new Date(eventDate);
    reminderDate.setDate(reminderDate.getDate() - 3);
    
    const reminder = await createEventReminder({
      id: `test-reminder-${nanoid()}`,
      userId: testUserId,
      eventId: `${testEventId}-2`,
      eventTitle: 'Test Event 2',
      eventDate: eventDate,
      reminderType: '3_days',
      reminderDate: reminderDate,
      sent: false,
    });

    expect(reminder).not.toBeNull();
    expect(reminder?.reminderType).toBe('3_days');
    
    const actualReminderDate = new Date(reminder!.reminderDate);
    const expectedDate = new Date(eventDate);
    expectedDate.setDate(expectedDate.getDate() - 3);
    
    expect(actualReminderDate.toISOString().split('T')[0]).toBe(expectedDate.toISOString().split('T')[0]);
  });

  it('should create reminder with 1 day notice', async () => {
    const eventDate = new Date('2026-09-15T10:00:00Z');
    const reminderDate = new Date(eventDate);
    reminderDate.setDate(reminderDate.getDate() - 1);
    
    const reminder = await createEventReminder({
      id: `test-reminder-${nanoid()}`,
      userId: testUserId,
      eventId: `${testEventId}-3`,
      eventTitle: 'Test Event 3',
      eventDate: eventDate,
      reminderType: '1_day',
      reminderDate: reminderDate,
      sent: false,
    });

    expect(reminder).not.toBeNull();
    expect(reminder?.reminderType).toBe('1_day');
    
    const actualReminderDate = new Date(reminder!.reminderDate);
    const expectedDate = new Date(eventDate);
    expectedDate.setDate(expectedDate.getDate() - 1);
    
    expect(actualReminderDate.toISOString().split('T')[0]).toBe(expectedDate.toISOString().split('T')[0]);
  });

  it('should create reminder for same day', async () => {
    const eventDate = new Date('2026-10-01T10:00:00Z');
    const reminderDate = new Date(eventDate);
    reminderDate.setHours(8, 0, 0, 0);
    
    const reminder = await createEventReminder({
      id: `test-reminder-${nanoid()}`,
      userId: testUserId,
      eventId: `${testEventId}-4`,
      eventTitle: 'Test Event 4',
      eventDate: eventDate,
      reminderType: 'same_day',
      reminderDate: reminderDate,
      sent: false,
    });

    expect(reminder).not.toBeNull();
    expect(reminder?.reminderType).toBe('same_day');
    
    // Same day reminder should be set to 8 AM on event day
    const actualReminderDate = new Date(reminder!.reminderDate);
    const expectedDate = new Date(eventDate);
    expectedDate.setHours(8, 0, 0, 0);
    
    expect(actualReminderDate.getDate()).toBe(expectedDate.getDate());
  });

  it('should retrieve user reminders', async () => {
    const reminders = await getUserReminders(testUserId);
    
    expect(reminders).toBeDefined();
    expect(reminders.length).toBeGreaterThan(0);
    expect(reminders.some(r => r.eventId === testEventId)).toBe(true);
  });

  it('should delete reminder', async () => {
    if (!testReminderId) {
      throw new Error('Test reminder ID not set');
    }

    const result = await deleteEventReminder(testReminderId);
    expect(result).toBe(true);

    // Verify deletion
    const reminders = await getUserReminders(testUserId);
    expect(reminders.some(r => r.id === testReminderId)).toBe(false);
  });

  afterAll(async () => {
    // Cleanup test data
    const db = await getDb();
    if (db) {
      try {
        await db.execute(`DELETE FROM eventReminders WHERE userId LIKE 'test-user-%'`);
      } catch (error) {
        console.error('Cleanup error:', error);
      }
    }
  });
});

describe('Federation Dashboard', () => {
  let testFederationUserId: string;
  let testSubmissionId: string;

  beforeAll(async () => {
    testFederationUserId = `test-federation-${nanoid()}`;
    testSubmissionId = `test-fed-submission-${nanoid()}`;
  });

  it('should track federation event submissions', async () => {
    const submission = await createEventSubmission({
      id: testSubmissionId,
      title: 'Federation Championship',
      discipline: 'Natación',
      region: 'Cataluña',
      city: 'Barcelona',
      startDate: new Date('2026-11-01'),
      contactEmail: 'federation@example.com',
      submittedBy: testFederationUserId,
      status: 'pending',
    });

    expect(submission).toBeDefined();
    expect(submission.submittedBy).toBe(testFederationUserId);
    expect(submission.status).toBe('pending');
  });

  afterAll(async () => {
    // Cleanup test data
    const db = await getDb();
    if (db) {
      try {
        await db.execute(`DELETE FROM eventSubmissions WHERE id LIKE 'test-fed-submission-%'`);
      } catch (error) {
        console.error('Cleanup error:', error);
      }
    }
  });
});

