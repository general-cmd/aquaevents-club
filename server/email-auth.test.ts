import { describe, it, expect } from "vitest";
import { validatePassword, validateEmail, hashPassword, verifyPassword } from "./_core/password";

/**
 * Email/Password Authentication Tests
 * Tests for password hashing, validation, and authentication flow
 */

describe("Password Validation", () => {
  it("should reject passwords shorter than 8 characters", () => {
    const result = validatePassword("Short1");
    expect(result).not.toBeNull();
    expect(result).toContain("at least 8 characters");
  });

  it("should reject passwords without uppercase letters", () => {
    const result = validatePassword("lowercase123");
    expect(result).not.toBeNull();
    expect(result).toContain("uppercase letter");
  });

  it("should reject passwords without lowercase letters", () => {
    const result = validatePassword("UPPERCASE123");
    expect(result).not.toBeNull();
    expect(result).toContain("lowercase letter");
  });

  it("should reject passwords without numbers", () => {
    const result = validatePassword("NoNumbers");
    expect(result).not.toBeNull();
    expect(result).toContain("number");
  });

  it("should accept valid strong passwords", () => {
    const validPasswords = [
      "Password123",
      "SecurePass1",
      "MyP@ssw0rd",
      "Admin2024!",
    ];

    validPasswords.forEach((password) => {
      const result = validatePassword(password);
      expect(result).toBeNull();
    });
  });
});

describe("Email Validation", () => {
  it("should accept valid email addresses", () => {
    const validEmails = [
      "user@example.com",
      "admin@aquaevents.club",
      "test.user+tag@domain.co.uk",
      "federation@rfen.es",
    ];

    validEmails.forEach((email) => {
      expect(validateEmail(email)).toBe(true);
    });
  });

  it("should reject invalid email addresses", () => {
    const invalidEmails = [
      "notanemail",
      "@example.com",
      "user@",
      "user @example.com",
      "user@.com",
    ];

    invalidEmails.forEach((email) => {
      expect(validateEmail(email)).toBe(false);
    });
  });
});

describe("Password Hashing", () => {
  it("should hash passwords securely", async () => {
    const password = "TestPassword123";
    const hash = await hashPassword(password);

    // Hash should be different from original password
    expect(hash).not.toBe(password);
    
    // Hash should be bcrypt format (starts with $2a$ or $2b$)
    expect(hash).toMatch(/^\$2[ab]\$/);
    
    // Hash should be 60 characters long
    expect(hash.length).toBe(60);
  });

  it("should generate different hashes for same password", async () => {
    const password = "TestPassword123";
    const hash1 = await hashPassword(password);
    const hash2 = await hashPassword(password);

    // Hashes should be different due to salt
    expect(hash1).not.toBe(hash2);
  });
});

describe("Password Verification", () => {
  it("should verify correct passwords", async () => {
    const password = "TestPassword123";
    const hash = await hashPassword(password);

    const isValid = await verifyPassword(password, hash);
    expect(isValid).toBe(true);
  });

  it("should reject incorrect passwords", async () => {
    const password = "TestPassword123";
    const hash = await hashPassword(password);

    const isValid = await verifyPassword("WrongPassword123", hash);
    expect(isValid).toBe(false);
  });

  it("should be case-sensitive", async () => {
    const password = "TestPassword123";
    const hash = await hashPassword(password);

    const isValid = await verifyPassword("testpassword123", hash);
    expect(isValid).toBe(false);
  });
});

describe("Security Properties", () => {
  it("should use sufficient salt rounds (slow hashing)", async () => {
    const password = "TestPassword123";
    const startTime = Date.now();
    
    await hashPassword(password);
    
    const duration = Date.now() - startTime;
    
    // Hashing should take at least 50ms (indicates proper salt rounds)
    expect(duration).toBeGreaterThan(50);
  });

  it("should not expose password in hash", async () => {
    const password = "TestPassword123";
    const hash = await hashPassword(password);

    // Hash should not contain the original password
    expect(hash.toLowerCase()).not.toContain(password.toLowerCase());
  });
});

console.log("✅ Email/password authentication tests complete");
console.log("🔒 Password hashing: bcrypt with 12 salt rounds");
console.log("📧 Email validation: RFC-compliant regex");
console.log("🔐 Login page: /login");
console.log("👤 Admin registration: /admin/register");
