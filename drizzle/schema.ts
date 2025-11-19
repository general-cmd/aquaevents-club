import { mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  id: varchar("id", { length: 64 }).primaryKey(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  userType: mysqlEnum("userType", ["club", "swimmer", "federation", "other"]),
  preferredDisciplines: text("preferredDisciplines"), // JSON array stored as text
  emailConsent: timestamp("emailConsent"), // Timestamp when user consented to emails (GDPR)
  createdAt: timestamp("createdAt").defaultNow(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Federations table
export const federations = mysqlTable("federations", {
  id: varchar("id", { length: 64 }).primaryKey(),
  name: text("name").notNull(),
  acronym: varchar("acronym", { length: 20 }),
  description: text("description"),
  logo: text("logo"),
  website: text("website"),
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 50 }),
  address: text("address"),
  region: varchar("region", { length: 100 }),
  type: mysqlEnum("type", ["national", "regional", "club"]).default("regional").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export type Federation = typeof federations.$inferSelect;
export type InsertFederation = typeof federations.$inferInsert;

// Blog posts table
export const blogPosts = mysqlTable("blogPosts", {
  id: varchar("id", { length: 64 }).primaryKey(),
  title: text("title").notNull(),
  slug: varchar("slug", { length: 255 }).notNull(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  coverImage: text("coverImage"),
  featuredImage: text("featuredImage"),
  metaDescription: text("metaDescription"),
  authorId: varchar("authorId", { length: 64 }).notNull(),
  status: mysqlEnum("status", ["draft", "pending", "published", "archived"]).default("draft").notNull(),
  category: varchar("category", { length: 100 }),
  tags: text("tags"), // JSON array stored as text
  publishedAt: timestamp("publishedAt"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = typeof blogPosts.$inferInsert;

// Event submissions table (for user-submitted events pending admin approval)
export const eventSubmissions = mysqlTable("eventSubmissions", {
  id: varchar("id", { length: 64 }).primaryKey(),
  title: text("title").notNull(),
  discipline: varchar("discipline", { length: 100 }).notNull(),
  category: varchar("category", { length: 100 }),
  region: varchar("region", { length: 100 }).notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  startDate: timestamp("startDate").notNull(),
  endDate: timestamp("endDate"),
  contactName: varchar("contactName", { length: 255 }),
  contactEmail: varchar("contactEmail", { length: 320 }).notNull(),
  contactPhone: varchar("contactPhone", { length: 50 }),
  website: text("website"),
  description: text("description"),
  submittedBy: varchar("submittedBy", { length: 64 }), // User ID
  status: mysqlEnum("status", ["pending", "approved", "rejected"]).default("pending").notNull(),
  adminNotes: text("adminNotes"),
  createdAt: timestamp("createdAt").defaultNow(),
  reviewedAt: timestamp("reviewedAt"),
  reviewedBy: varchar("reviewedBy", { length: 64 }), // Admin user ID
});

export type EventSubmission = typeof eventSubmissions.$inferSelect;
export type InsertEventSubmission = typeof eventSubmissions.$inferInsert;

// User favorites table (for saving favorite events)
export const userFavorites = mysqlTable("userFavorites", {
  id: varchar("id", { length: 64 }).primaryKey(),
  userId: varchar("userId", { length: 64 }).notNull(),
  eventId: varchar("eventId", { length: 64 }).notNull(), // MongoDB event ID
  createdAt: timestamp("createdAt").defaultNow(),
});

export type UserFavorite = typeof userFavorites.$inferSelect;
export type InsertUserFavorite = typeof userFavorites.$inferInsert;
