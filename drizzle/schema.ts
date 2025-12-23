import { boolean, decimal, int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */export const users = mysqlTable("users", {
  id: varchar("id", { length: 64 }).primaryKey(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  password: varchar("password", { length: 255 }), // Bcrypt hashed password (for email/password auth)
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  userType: varchar("userType", { length: 50 }), // "swimmer", "club", "federation"
  preferredDisciplines: text("preferredDisciplines"), // JSON array stored as text
  emailConsent: timestamp("emailConsent"), // Timestamp when user consented to emails (GDPR)
  
  // Organization profile fields (for clubs and federations)
  organizationName: text("organizationName"),
  organizationLogo: text("organizationLogo"),
  organizationWebsite: text("organizationWebsite"),
  organizationPhone: varchar("organizationPhone", { length: 50 }),
  organizationAddress: text("organizationAddress"),
  organizationLegalId: varchar("organizationLegalId", { length: 50 }), // CIF/NIF for Spain
  organizationDescription: text("organizationDescription"),
  
  // Verification status (for clubs and federations)
  verified: mysqlEnum("verified", ["yes", "no"]).default("no").notNull(),
  verifiedAt: timestamp("verifiedAt"),
  verificationStatus: mysqlEnum("verificationStatus", ["pending", "approved", "rejected"]).default("pending"),
  verificationNotes: text("verificationNotes"), // Admin notes for call scheduling, rejection reasons
  
  createdAt: timestamp("createdAt").defaultNow(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Event reminders table
export const eventReminders = mysqlTable("eventReminders", {
  id: varchar("id", { length: 64 }).primaryKey(),
  userId: varchar("userId", { length: 64 }).notNull(),
  eventId: varchar("eventId", { length: 255 }).notNull(), // MongoDB event ID
  eventTitle: text("eventTitle").notNull(),
  eventDate: timestamp("eventDate").notNull(),
  reminderType: mysqlEnum("reminderType", ["1_week", "3_days", "1_day", "same_day"]).notNull(),
  reminderDate: timestamp("reminderDate").notNull(),
  sent: boolean("sent").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type EventReminder = typeof eventReminders.$inferSelect;
export type InsertEventReminder = typeof eventReminders.$inferInsert;

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
  updatedAt: timestamp("updatedAt").defaultNow(),
  reviewedAt: timestamp("reviewedAt"),
  reviewedBy: varchar("reviewedBy", { length: 64 }), // Admin user ID
  publishedAt: timestamp("publishedAt"), // When event was published to MongoDB
  registrationUrl: text("registrationUrl"), // URL for event registration
  maxCapacity: varchar("maxCapacity", { length: 20 }), // Maximum participants (can be number or "unlimited")
  currentRegistrations: varchar("currentRegistrations", { length: 20 }).default("0"), // Current number of registrations
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

// Newsletter subscribers table
export const newsletterSubscribers = mysqlTable("newsletterSubscribers", {
  id: varchar("id", { length: 64 }).primaryKey(),
  email: varchar("email", { length: 320 }).notNull(),
  name: text("name"),
  userType: mysqlEnum("userType", ["club", "swimmer", "federation", "other"]),
  source: varchar("source", { length: 100 }).default("website"), // Where they signed up from
  systemeioSynced: boolean("systemeioSynced").default(false).notNull(), // Whether synced to systeme.io
  systemeioContactId: varchar("systemeioContactId", { length: 100 }), // systeme.io contact ID
  systemeioError: text("systemeioError"), // Last sync error if any
  subscribedAt: timestamp("subscribedAt").defaultNow(),
  unsubscribedAt: timestamp("unsubscribedAt"),
});

export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;
export type InsertNewsletterSubscriber = typeof newsletterSubscribers.$inferInsert;

// Swimming cap pricing table (admin-managed)
export const capPricing = mysqlTable("capPricing", {
  id: varchar("id", { length: 64 }).primaryKey(),
  capType: varchar("capType", { length: 50 }).notNull(), // "silicona", "latex", "gamuza", "pelo-largo", "tela-polyester", "tela-lycra"
  colorCount: int("colorCount").notNull(), // 1, 2, 3, etc.
  minQuantity: int("minQuantity").notNull(), // Minimum quantity for this tier (50, 100, 250, 500, 1000, 1500)
  maxQuantity: int("maxQuantity"), // Maximum quantity for this tier (null for unlimited)
  pricePerUnit: decimal("pricePerUnit", { precision: 10, scale: 2 }).notNull(), // Price per unit in EUR
  currency: varchar("currency", { length: 3 }).default("EUR").notNull(),
  active: boolean("active").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export type CapPricing = typeof capPricing.$inferSelect;
export type InsertCapPricing = typeof capPricing.$inferInsert;

// Swimming cap testimonials table
export const capTestimonials = mysqlTable("capTestimonials", {
  id: varchar("id", { length: 64 }).primaryKey(),
  customerName: varchar("customerName", { length: 255 }).notNull(),
  clubName: varchar("clubName", { length: 255 }).notNull(),
  quote: text("quote").notNull(),
  photo: text("photo"), // URL to customer/club photo
  capType: varchar("capType", { length: 50 }), // Which cap type this testimonial is for (null = show on all)
  rating: int("rating").default(5), // 1-5 stars
  featured: boolean("featured").default(false).notNull(), // Show on homepage
  active: boolean("active").default(true).notNull(),
  displayOrder: int("displayOrder").default(0), // For manual ordering
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export type CapTestimonial = typeof capTestimonials.$inferSelect;
export type InsertCapTestimonial = typeof capTestimonials.$inferInsert;
