#!/usr/bin/env node
/**
 * Bootstrap Script: Create First Admin Account
 * Run this once to create the initial admin account with email/password
 * 
 * Usage: node scripts/create-admin.mjs <email> <password> <name>
 * Example: node scripts/create-admin.mjs admin@aquaevents.club Admin123! "Admin User"
 */

import { drizzle } from "drizzle-orm/mysql2";
import { users } from "../drizzle/schema.js";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";

const [email, password, name] = process.argv.slice(2);

if (!email || !password || !name) {
  console.error("❌ Usage: node scripts/create-admin.mjs <email> <password> <name>");
  console.error("   Example: node scripts/create-admin.mjs admin@aquaevents.club Admin123! \"Admin User\"");
  process.exit(1);
}

// Validate password strength
function validatePassword(password) {
  if (password.length < 8) return "Password must be at least 8 characters long";
  if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter";
  if (!/[a-z]/.test(password)) return "Password must contain at least one lowercase letter";
  if (!/[0-9]/.test(password)) return "Password must contain at least one number";
  return null;
}

// Validate email
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

async function createAdmin() {
  try {
    // Validate inputs
    if (!validateEmail(email)) {
      console.error("❌ Invalid email format");
      process.exit(1);
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      console.error(`❌ ${passwordError}`);
      process.exit(1);
    }

    // Connect to database
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      console.error("❌ DATABASE_URL environment variable not set");
      process.exit(1);
    }

    console.log("🔌 Connecting to database...");
    const db = drizzle(databaseUrl);

    // Check if email already exists
    const existing = await db.select().from(users).where(eq(users.email, email)).limit(1);
    if (existing.length > 0) {
      console.error(`❌ Email ${email} is already registered`);
      process.exit(1);
    }

    // Hash password
    console.log("🔐 Hashing password...");
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create admin user
    console.log("👤 Creating admin account...");
    const userId = nanoid();
    await db.insert(users).values({
      id: userId,
      email,
      password: hashedPassword,
      name,
      loginMethod: "email",
      role: "admin",
      createdAt: new Date(),
      lastSignedIn: new Date(),
    });

    console.log("\n✅ Admin account created successfully!");
    console.log(`📧 Email: ${email}`);
    console.log(`👤 Name: ${name}`);
    console.log(`🔑 Role: admin`);
    console.log(`🌐 Login at: https://aquaevents.club/login`);
    console.log("\n⚠️  Keep your password secure!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating admin account:", error.message);
    process.exit(1);
  }
}

createAdmin();
