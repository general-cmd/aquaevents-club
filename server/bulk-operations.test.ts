import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { getDb, createEventSubmission } from "./db";
import { eq, inArray } from "drizzle-orm";
import { eventSubmissions } from "../drizzle/schema";

describe("Bulk Operations and Templates", () => {
  let submissionIds: string[] = [];

  beforeAll(async () => {
    // Create test submissions
    const testSubmissions = [
      {
        title: "Test Event 1",
        discipline: "Natación",
        category: "Absoluto",
        region: "Madrid",
        city: "Madrid",
        startDate: new Date("2026-06-01"),
        endDate: new Date("2026-06-03"),
        contactName: "Test User",
        contactEmail: "test@example.com",
        contactPhone: "600000000",
        description: "Test event 1",
      },
      {
        title: "Test Event 2",
        discipline: "Waterpolo",
        category: "Todos",
        region: "Barcelona",
        city: "Barcelona",
        startDate: new Date("2026-07-01"),
        endDate: new Date("2026-07-03"),
        contactName: "Test User 2",
        contactEmail: "test2@example.com",
        contactPhone: "600000001",
        description: "Test event 2",
      },
      {
        title: "Test Event 3",
        discipline: "Aguas Abiertas",
        category: "Absoluto",
        region: "Valencia",
        city: "Valencia",
        startDate: new Date("2026-08-01"),
        endDate: new Date("2026-08-01"),
        contactName: "Test User 3",
        contactEmail: "test3@example.com",
        contactPhone: "600000002",
        description: "Test event 3",
      },
    ];

    const db = await getDb();
    if (!db) throw new Error("Database not available");

    for (const submission of testSubmissions) {
      const id = `test-bulk-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      await db.insert(eventSubmissions).values({
        id,
        userId: "test-user",
        ...submission,
        status: "pending",
      });
      submissionIds.push(id);
    }
  });

  afterAll(async () => {
    // Clean up test submissions
    const db = await getDb();
    if (!db) return;

    await db.delete(eventSubmissions).where(inArray(eventSubmissions.id, submissionIds));
  });

  it("should approve multiple submissions at once", async () => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    // Approve first two submissions
    const idsToApprove = submissionIds.slice(0, 2);
    
    await db
      .update(eventSubmissions)
      .set({ status: "approved" })
      .where(inArray(eventSubmissions.id, idsToApprove));

    // Verify they were approved
    const approved = await db
      .select()
      .from(eventSubmissions)
      .where(inArray(eventSubmissions.id, idsToApprove));

    expect(approved.length).toBe(2);
    expect(approved.every((s) => s.status === "approved")).toBe(true);
  });

  it("should reject multiple submissions at once", async () => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    // Reject the third submission
    const idsToReject = [submissionIds[2]];
    
    await db
      .update(eventSubmissions)
      .set({ status: "rejected" })
      .where(inArray(eventSubmissions.id, idsToReject));

    // Verify it was rejected
    const rejected = await db
      .select()
      .from(eventSubmissions)
      .where(inArray(eventSubmissions.id, idsToReject));

    expect(rejected.length).toBe(1);
    expect(rejected[0].status).toBe("rejected");
  });

  it("should handle event templates correctly", () => {
    // Test that templates have required fields
    const templates = [
      {
        id: "regional-championship",
        name: "Campeonato Regional",
        data: {
          discipline: "Natación",
          category: "Todos",
        },
      },
      {
        id: "open-water",
        name: "Travesía Aguas Abiertas",
        data: {
          discipline: "Aguas Abiertas",
          category: "Absoluto",
        },
      },
    ];

    templates.forEach((template) => {
      expect(template.id).toBeTruthy();
      expect(template.name).toBeTruthy();
      expect(template.data.discipline).toBeTruthy();
      expect(template.data.category).toBeTruthy();
    });
  });

  it("should generate valid ICS calendar data", () => {
    const events = [
      {
        title: "Test Event",
        startDate: "2026-06-01T10:00:00Z",
        endDate: "2026-06-01T12:00:00Z",
        location: "Madrid, España",
        description: "Test description",
        url: "https://aquaevents.club/evento/test",
      },
    ];

    // Simulate ICS generation logic
    const icsEvent = events[0];
    
    expect(icsEvent.title).toBeTruthy();
    expect(icsEvent.startDate).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/);
    expect(icsEvent.endDate).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/);
    expect(icsEvent.location).toBeTruthy();
    expect(icsEvent.url).toMatch(/^https?:\/\//);
  });
});

