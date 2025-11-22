# Profile-Gated Event Submission System - Implementation Guide

## Overview

This document provides complete context for implementing the profile-gated event submission system with club/federation verification workflow.

## Business Requirements

### User Flow
1. **Only clubs and federations can submit events** (no individual swimmers)
2. **Manual verification with call** before approval
3. **Weekly review cycle** for new applications  
4. **Verified organizations submit freely** but admin can moderate/remove events
5. **Organizations can edit their own events**

### Verification Process
- User signs up → Selects "Club Deportivo" or "Federación" as user type
- User completes organization profile (name, logo, website, contact, legal ID)
- User submits verification application
- Admin reviews application weekly
- Admin schedules call with organization
- Admin approves/rejects with notes
- If approved: User can submit unlimited events
- If rejected: User sees rejection reason, can reapply

## Database Schema (COMPLETED ✅)

### Users Table - New Fields Added
```typescript
// Organization profile fields (for clubs and federations)
organizationName: text("organizationName"),
organizationLogo: text("organizationLogo"),
organizationWebsite: text("organizationWebsite"),
organizationPhone: varchar("organizationPhone", { length: 50 }),
organizationAddress: text("organizationAddress"),
organizationLegalId: varchar("organizationLegalId", { length: 50 }), // CIF/NIF for Spain
organizationDescription: text("organizationDescription"),

// Verification status (for clubs and federations)
verificationStatus: mysqlEnum("verificationStatus", ["pending", "approved", "rejected"]).default("pending"),
verificationNotes: text("verificationNotes"), // Admin notes for call scheduling, rejection reasons
verifiedAt: timestamp("verifiedAt"),
```

### Event Submissions Table - Existing Fields
```typescript
submittedBy: varchar("submittedBy", { length: 64 }), // User ID who submitted
```

## Implementation Tasks

### Phase 1: Update UserProfile Page

**File:** `client/src/pages/UserProfile.tsx`

**Requirements:**
1. Check if user type is "club" or "federation"
2. If yes, show organization profile section with fields:
   - Organization Name (required)
   - Organization Logo URL (optional)
   - Website (optional)
   - Phone (optional)
   - Address (optional)
   - Legal ID / CIF (optional but recommended)
   - Description (optional)
3. Show verification status badge:
   - Pending: Yellow badge "Verificación Pendiente"
   - Approved: Green badge "Verificado ✓"
   - Rejected: Red badge "Rechazado" + show rejection reason
4. If pending or rejected, show "Solicitar Verificación" button
5. Update `userProfile.update` mutation to include organization fields

**tRPC Procedures to Update:**
- `userProfile.update` - Add organization fields to input schema

### Phase 2: Protect Event Submission Route

**File:** `client/src/pages/SubmitEvent.tsx`

**Requirements:**
1. Check authentication at page load
2. If not logged in → Redirect to login with return URL
3. If logged in, check user type:
   - If NOT "club" or "federation" → Show error message: "Solo clubes y federaciones pueden enviar eventos. Por favor actualiza tu perfil."
4. If club/federation, check verification status:
   - If "pending" → Show message: "Tu solicitud de verificación está pendiente. Te contactaremos pronto."
   - If "rejected" → Show message: "Tu solicitud fue rechazada. Razón: [notes]. Puedes solicitar verificación nuevamente desde tu perfil."
   - If "approved" → Allow event submission
5. Link event submission to user ID in database

**tRPC Procedures to Update:**
- `eventSubmissions.submit` - Already has `submittedBy: ctx.user?.id`
- Add verification check in mutation before allowing submission

### Phase 3: Admin Verification Dashboard

**File:** `client/src/pages/Admin.tsx`

**Requirements:**
1. Add new tab: "Verificaciones Pendientes"
2. Show list of users with `verificationStatus === "pending"` and `userType === "club" or "federation"`
3. For each pending verification, show:
   - Organization name
   - User email
   - Organization details (website, phone, legal ID)
   - Registration date
   - Actions: "Aprobar" | "Rechazar"
4. On "Aprobar":
   - Open dialog to add notes (call date, observations)
   - Update `verificationStatus` to "approved"
   - Set `verifiedAt` to current timestamp
   - Send email notification via Systeme.io
5. On "Rechazar":
   - Open dialog to add rejection reason (required)
   - Update `verificationStatus` to "rejected"
   - Save reason in `verificationNotes`
   - Send email notification via Systeme.io

**New tRPC Procedures Needed:**
```typescript
userProfile: router({
  // ... existing procedures
  
  pendingVerifications: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user.role !== 'admin') throw new Error('Unauthorized');
    // Get users with verificationStatus === 'pending' and userType in ['club', 'federation']
    return { success: true, users };
  }),
  
  approveVerification: protectedProcedure
    .input(z.object({
      userId: z.string(),
      notes: z.string().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      if (ctx.user.role !== 'admin') throw new Error('Unauthorized');
      // Update user: verificationStatus = 'approved', verifiedAt = now, verificationNotes = notes
      // Send approval email via Systeme.io
      return { success: true };
    }),
  
  rejectVerification: protectedProcedure
    .input(z.object({
      userId: z.string(),
      reason: z.string().min(1),
    }))
    .mutation(async ({ input, ctx }) => {
      if (ctx.user.role !== 'admin') throw new Error('Unauthorized');
      // Update user: verificationStatus = 'rejected', verificationNotes = reason
      // Send rejection email via Systeme.io
      return { success: true };
    }),
}),
```

### Phase 4: My Events Page (Organization Dashboard)

**New File:** `client/src/pages/MyEvents.tsx`

**Requirements:**
1. Show list of events submitted by current user
2. For each event, show:
   - Event name, date, location
   - Status badge (pending, approved, published)
   - Actions: "Editar" | "Eliminar"
3. On "Editar":
   - Navigate to edit form (reuse SubmitEvent with pre-filled data)
4. On "Eliminar":
   - Confirm dialog
   - Delete event submission

**New tRPC Procedures:**
```typescript
eventSubmissions: router({
  // ... existing procedures
  
  mySubmissions: protectedProcedure.query(async ({ ctx }) => {
    // Get submissions where submittedBy === ctx.user.id
    return { success: true, submissions };
  }),
  
  update: protectedProcedure
    .input(z.object({
      id: z.string(),
      // ... all event fields
    }))
    .mutation(async ({ input, ctx }) => {
      // Verify submission belongs to user
      // Update submission
      return { success: true };
    }),
  
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      // Verify submission belongs to user OR user is admin
      // Delete submission
      return { success: true };
    }),
}),
```

### Phase 5: Email Notifications

**File:** `server/_core/systemeio.ts`

**New Functions Needed:**
```typescript
export async function sendVerificationApprovalEmail(
  email: string,
  organizationName: string
) {
  // Send email with "verification-approved" tag
  // Content: Congratulations, you can now submit events
}

export async function sendVerificationRejectionEmail(
  email: string,
  organizationName: string,
  reason: string
) {
  // Send email with "verification-rejected" tag
  // Content: Your application was rejected. Reason: [reason]
}
```

**Systeme.io Tags to Create:**
- `verification-approved`
- `verification-rejected`

### Phase 6: Navigation Updates

**Files to Update:**
- `client/src/pages/Home.tsx` - Add "Mis Eventos" link in header (only for verified clubs/federations)
- `client/src/App.tsx` - Add route for `/mis-eventos`

## Testing Checklist

### Manual Testing
- [ ] Create test account as "Club Deportivo"
- [ ] Complete organization profile
- [ ] Submit verification application
- [ ] Admin approves verification
- [ ] Verified club submits event successfully
- [ ] Verified club can view/edit their events
- [ ] Admin can moderate any event
- [ ] Test rejection flow
- [ ] Test email notifications

### Vitest Tests
- [ ] Test verification status checks
- [ ] Test event submission with/without verification
- [ ] Test admin approval/rejection mutations
- [ ] Test event ownership verification
- [ ] Test email notification triggers

## Key Design Decisions

1. **Verification is per-user, not per-organization** - If multiple people from same club sign up, each needs verification
2. **Events are linked to submitting user** - This allows tracking and editing
3. **Admin can always moderate** - Even verified org events can be removed if needed
4. **Weekly review cycle** - Admin checks pending verifications once per week
5. **Manual call required** - Verification includes phone/video call to confirm legitimacy

## Next Steps After Implementation

1. Create email templates in Systeme.io for verification notifications
2. Document verification process for admin users
3. Create FAQ for clubs about verification requirements
4. Monitor verification requests and adjust process as needed
5. Consider adding batch approval for multiple organizations

## Files Modified in This Session

### Completed
- ✅ `drizzle/schema.ts` - Added organization and verification fields
- ✅ `client/src/components/SEOMeta.tsx` - Created SEO meta component
- ✅ `client/src/components/RelatedEvents.tsx` - Created related events component
- ✅ `client/src/pages/EventDetail.tsx` - Added SEO meta and related events
- ✅ `client/src/pages/Home.tsx` - Added SEO meta
- ✅ `client/src/main.tsx` - Added HelmetProvider
- ✅ `server/routers.ts` - Added getRelated procedure

### To Be Modified
- ⏳ `client/src/pages/UserProfile.tsx` - Add organization fields and verification UI
- ⏳ `client/src/pages/SubmitEvent.tsx` - Add verification checks
- ⏳ `client/src/pages/Admin.tsx` - Add verification dashboard
- ⏳ `client/src/pages/MyEvents.tsx` - Create new page
- ⏳ `client/src/App.tsx` - Add MyEvents route
- ⏳ `server/routers.ts` - Add verification and event management procedures
- ⏳ `server/db.ts` - Add database helper functions
- ⏳ `server/_core/systemeio.ts` - Add verification email functions

## Important Notes

- **GDPR Compliance**: Verification notes may contain personal information from calls. Ensure proper data handling.
- **Security**: Always verify user owns event before allowing edits/deletes
- **UX**: Provide clear feedback at each step of verification process
- **Scalability**: Current manual verification works for MVP. Consider automation later.

