/**
 * Systeme.io API Integration
 * 
 * This module provides functions to interact with Systeme.io API for:
 * - Creating/updating contacts
 * - Managing tags
 * - Triggering email automations
 * 
 * API Documentation: https://developer.systeme.io/reference/api
 */

import { ENV } from './env';

const SYSTEME_API_BASE = 'https://api.systeme.io/api';

interface SystemeContact {
  email: string;
  locale?: string; // e.g., "es", "en"
  fields?: Array<{
    slug: string;
    value: string | null;
  }>;
}

interface SystemeTag {
  id?: number;
  name: string;
}

/**
 * Get Systeme.io API key from environment
 */
function getApiKey(): string {
  const apiKey = process.env.SYSTEME_API_KEY;
  if (!apiKey) {
    throw new Error('SYSTEME_API_KEY environment variable is not set');
  }
  return apiKey;
}

/**
 * Make a request to Systeme.io API
 */
async function systemeRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const apiKey = getApiKey();
  
  // Determine content type based on method
  const isPatch = options.method === 'PATCH';
  const contentType = isPatch ? 'application/merge-patch+json' : 'application/json';
  
  const response = await fetch(`${SYSTEME_API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': contentType,
      'X-API-Key': apiKey,
      'Accept': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Systeme.io API error (${response.status}): ${errorText}`
    );
  }

  return response.json();
}

/**
 * Create or update a contact in Systeme.io
 * 
 * @param email - Contact email address
 * @param data - Additional contact data (name, custom fields, etc.)
 * @returns The created/updated contact
 */
export async function createOrUpdateContact(
  email: string,
  data?: {
    name?: string;
    userType?: string;
    disciplines?: string[];
    locale?: string;
  }
): Promise<any> {
  // Simplified contact data - only email and locale
  // Custom fields removed as they don't exist in Systeme.io account
  const contactData: SystemeContact = {
    email,
    locale: data?.locale || 'es',
  };

  try {
    // First, try to find existing contact
    const existingContacts = await systemeRequest<any>(
      `/contacts?email=${encodeURIComponent(email)}`
    );

    if (existingContacts.items && existingContacts.items.length > 0) {
      // Update existing contact
      const contactId = existingContacts.items[0].id;
      return await systemeRequest<any>(`/contacts/${contactId}`, {
        method: 'PATCH',
        body: JSON.stringify(contactData),
      });
    } else {
      // Create new contact
      return await systemeRequest<any>('/contacts', {
        method: 'POST',
        body: JSON.stringify(contactData),
      });
    }
  } catch (error) {
    console.error('[Systeme.io] Error creating/updating contact:', error);
    throw error;
  }
}

/**
 * Add a tag to a contact
 * 
 * @param email - Contact email
 * @param tagName - Tag name to add
 */
export async function addTagToContact(
  email: string,
  tagName: string
): Promise<void> {
  try {
    // Get contact ID
    const contacts = await systemeRequest<any>(
      `/contacts?email=${encodeURIComponent(email)}`
    );

    if (!contacts.items || contacts.items.length === 0) {
      throw new Error(`Contact not found: ${email}`);
    }

    const contactId = contacts.items[0].id;

    // Get or create tag
    const tags = await systemeRequest<any>('/tags');
    let tag = tags.items?.find((t: any) => t.name === tagName);

    if (!tag) {
      // Create tag if it doesn't exist
      tag = await systemeRequest<any>('/tags', {
        method: 'POST',
        body: JSON.stringify({ name: tagName }),
      });
    }

    // Assign tag to contact using PUT method
    await systemeRequest<any>(`/contacts/${contactId}/tags/${tag.id}`, {
      method: 'PUT',
      body: JSON.stringify({}),
    });
  } catch (error) {
    console.error('[Systeme.io] Error adding tag to contact:', error);
    throw error;
  }
}

/**
 * Remove a tag from a contact
 * 
 * @param email - Contact email
 * @param tagName - Tag name to remove
 */
export async function removeTagFromContact(
  email: string,
  tagName: string
): Promise<void> {
  try {
    // Get contact ID
    const contacts = await systemeRequest<any>(
      `/contacts?email=${encodeURIComponent(email)}`
    );

    if (!contacts.items || contacts.items.length === 0) {
      throw new Error(`Contact not found: ${email}`);
    }

    const contactId = contacts.items[0].id;

    // Get tag
    const tags = await systemeRequest<any>('/tags');
    const tag = tags.items?.find((t: any) => t.name === tagName);

    if (!tag) {
      console.warn(`[Systeme.io] Tag not found: ${tagName}`);
      return;
    }

    // Remove tag from contact
    await systemeRequest<any>(`/contacts/${contactId}/tags/${tag.id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error('[Systeme.io] Error removing tag from contact:', error);
    throw error;
  }
}

/**
 * Send event submission confirmation email
 * 
 * This triggers a Systeme.io automation by adding a tag to the contact.
 * You need to set up an automation in Systeme.io that:
 * 1. Triggers when "event-submitted" tag is added
 * 2. Sends a confirmation email
 * 3. Removes the tag (to allow future triggers)
 * 
 * @param email - Submitter email
 * @param eventTitle - Title of submitted event
 */
export async function sendEventSubmissionConfirmation(
  email: string,
  eventTitle: string,
  submitterName?: string
): Promise<boolean> {
  try {
    // Create/update contact
    await createOrUpdateContact(email, {
      name: submitterName,
      locale: 'es',
    });

    // Add tag to trigger automation
    await addTagToContact(email, 'event-submitted');

    console.log(`[Systeme.io] Event submission confirmation triggered for ${email}`);
    return true;
  } catch (error) {
    console.error('[Systeme.io] Failed to send submission confirmation:', error);
    return false;
  }
}

/**
 * Send event approval notification email
 * 
 * Triggers automation when "event-approved" tag is added.
 * 
 * @param email - Submitter email
 * @param eventTitle - Title of approved event
 */
export async function sendEventApprovalNotification(
  email: string,
  eventTitle: string
): Promise<boolean> {
  try {
    await createOrUpdateContact(email, { locale: 'es' });
    await addTagToContact(email, 'event-approved');

    console.log(`[Systeme.io] Event approval notification triggered for ${email}`);
    return true;
  } catch (error) {
    console.error('[Systeme.io] Failed to send approval notification:', error);
    return false;
  }
}

/**
 * Send event rejection notification email
 * 
 * Triggers automation when "event-rejected" tag is added.
 * 
 * @param email - Submitter email
 * @param eventTitle - Title of rejected event
 * @param reason - Rejection reason
 */
export async function sendEventRejectionNotification(
  email: string,
  eventTitle: string,
  reason?: string
): Promise<boolean> {
  try {
    await createOrUpdateContact(email, { locale: 'es' });
    await addTagToContact(email, 'event-rejected');

    console.log(`[Systeme.io] Event rejection notification triggered for ${email}`);
    return true;
  } catch (error) {
    console.error('[Systeme.io] Failed to send rejection notification:', error);
    return false;
  }
}

/**
 * Send new event notification to users with matching preferences
 * 
 * Triggers automation when "new-event-alert" tag is added.
 * 
 * @param email - User email
 * @param eventTitle - Title of new event
 * @param discipline - Event discipline
 */
export async function sendNewEventNotification(
  email: string,
  eventTitle: string,
  discipline: string
): Promise<boolean> {
  try {
    await createOrUpdateContact(email, { locale: 'es' });
    await addTagToContact(email, 'new-event-alert');

    console.log(`[Systeme.io] New event notification triggered for ${email}`);
    return true;
  } catch (error) {
    console.error('[Systeme.io] Failed to send new event notification:', error);
    return false;
  }
}

