import { drizzle } from "drizzle-orm/mysql2";
import { eq } from "drizzle-orm";
import { users } from "./drizzle/schema.ts";

const db = drizzle(process.env.DATABASE_URL);

const result = await db.select().from(users).where(eq(users.email, 'general@bruandyou.com')).limit(1);

if (result.length > 0) {
  const user = result[0];
  console.log("User found:");
  console.log("  ID:", user.id);
  console.log("  Name:", user.name);
  console.log("  Email:", user.email);
  console.log("  Role:", user.role);
  console.log("  UserType:", user.userType);
  console.log("  PreferredDisciplines:", user.preferredDisciplines);
  console.log("  EmailConsent:", user.emailConsent);
  console.log("  Verified:", user.verified);
  console.log("  VerificationStatus:", user.verificationStatus);
} else {
  console.log("User not found");
}

process.exit(0);
