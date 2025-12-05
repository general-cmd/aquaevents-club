import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { hashPassword, verifyPassword, validatePassword, validateEmail } from "../_core/password";
import { getDb } from "../db";
import { users } from "../../drizzle/schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";
import { ENV } from "../_core/env";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "../_core/cookies";

/**
 * Email/Password Authentication Router
 * Secure backup authentication method independent of Manus OAuth
 */

export const emailAuthRouter = router({
  /**
   * Register new user with email/password
   * Admin-only for now to prevent spam registrations
   */
  register: protectedProcedure
    .input(
      z.object({
        email: z.string().email("Invalid email format"),
        password: z.string().min(8, "Password must be at least 8 characters"),
        name: z.string().min(1, "Name is required"),
        role: z.enum(["user", "admin"]).optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      // Only admins can create new accounts
      if (ctx.user.role !== "admin") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Only administrators can create new accounts",
        });
      }

      const db = await getDb();
      if (!db) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Database not available",
        });
      }

      // Validate email format
      if (!validateEmail(input.email)) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid email format",
        });
      }

      // Validate password strength
      const passwordError = validatePassword(input.password);
      if (passwordError) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: passwordError,
        });
      }

      // Check if email already exists
      const existing = await db.select().from(users).where(eq(users.email, input.email)).limit(1);
      if (existing.length > 0) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Email already registered",
        });
      }

      // Hash password
      const hashedPassword = await hashPassword(input.password);

      // Create user
      const userId = nanoid();
      await db.insert(users).values({
        id: userId,
        email: input.email,
        password: hashedPassword,
        name: input.name,
        loginMethod: "email",
        role: input.role || "user",
        createdAt: new Date(),
        lastSignedIn: new Date(),
      });

      return {
        success: true,
        userId,
        message: "Account created successfully",
      };
    }),

  /**
   * Login with email/password
   */
  login: publicProcedure
    .input(
      z.object({
        email: z.string().email("Invalid email format"),
        password: z.string().min(1, "Password is required"),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Database not available",
        });
      }

      // Find user by email
      const result = await db.select().from(users).where(eq(users.email, input.email)).limit(1);
      
      if (result.length === 0) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid email or password",
        });
      }

      const user = result[0];

      // Check if user has a password (might be OAuth-only user)
      if (!user.password) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "This account uses OAuth login. Please use the OAuth button.",
        });
      }

      // Verify password
      const isValid = await verifyPassword(input.password, user.password);
      if (!isValid) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid email or password",
        });
      }

      // Update last signed in
      await db.update(users).set({ lastSignedIn: new Date() }).where(eq(users.id, user.id));

      // Create JWT token with session payload structure expected by sdk.verifySession
      // Must match: { openId, appId, name }
      const token = jwt.sign(
        {
          openId: user.id,
          appId: ENV.appId,
          name: user.name || user.email || "",
        },
        ENV.cookieSecret,
        { expiresIn: "7d" }
      );

      // Set session cookie
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.cookie(COOKIE_NAME, token, {
        ...cookieOptions,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      return {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      };
    }),

  /**
   * Change password (authenticated users only)
   */
  changePassword: protectedProcedure
    .input(
      z.object({
        currentPassword: z.string().min(1, "Current password is required"),
        newPassword: z.string().min(8, "New password must be at least 8 characters"),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Database not available",
        });
      }

      // Get current user
      const result = await db.select().from(users).where(eq(users.id, ctx.user.id)).limit(1);
      if (result.length === 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      const user = result[0];

      // Check if user has a password
      if (!user.password) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "This account uses OAuth login and cannot change password",
        });
      }

      // Verify current password
      const isValid = await verifyPassword(input.currentPassword, user.password);
      if (!isValid) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Current password is incorrect",
        });
      }

      // Validate new password strength
      const passwordError = validatePassword(input.newPassword);
      if (passwordError) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: passwordError,
        });
      }

      // Hash new password
      const hashedPassword = await hashPassword(input.newPassword);

      // Update password
      await db.update(users).set({ password: hashedPassword }).where(eq(users.id, ctx.user.id));

      return {
        success: true,
        message: "Password changed successfully",
      };
    }),
});
