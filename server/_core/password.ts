import bcrypt from "bcryptjs";

/**
 * Password Hashing Utilities
 * Secure password management using bcrypt
 */

const SALT_ROUNDS = 12;

/**
 * Hash a plain text password
 * @param password Plain text password
 * @returns Hashed password
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Verify a password against a hash
 * @param password Plain text password to verify
 * @param hash Hashed password to compare against
 * @returns True if password matches, false otherwise
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Validate password strength
 * @param password Password to validate
 * @returns Error message if invalid, null if valid
 */
export function validatePassword(password: string): string | null {
  if (password.length < 8) {
    return "Password must be at least 8 characters long";
  }
  
  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter";
  }
  
  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter";
  }
  
  if (!/[0-9]/.test(password)) {
    return "Password must contain at least one number";
  }
  
  return null;
}

/**
 * Validate email format
 * @param email Email to validate
 * @returns True if valid, false otherwise
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
