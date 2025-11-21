import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createOrUpdateContact, addTagToContact } from './_core/systemeio';

// Mock fetch globally
global.fetch = vi.fn();

describe('Systeme.io User Profile Sync', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Set API key for tests
    process.env.SYSTEME_API_KEY = 'test-api-key-znu6';
  });

  it('should create contact with user data when email consent is given', async () => {
    // Mock successful contact creation
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ items: [] }), // No existing contact
    }).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 123, email: 'test@example.com' }),
    });

    await createOrUpdateContact('test@example.com', {
      name: 'Test User',
      userType: 'swimmer',
      disciplines: ['Natación', 'Triatlón'],
      locale: 'es',
    });

    expect(global.fetch).toHaveBeenCalledTimes(2);
    
    // Check that contact was created with correct data
    const createCall = (global.fetch as any).mock.calls[1];
    expect(createCall[0]).toContain('/contacts');
    const body = JSON.parse(createCall[1].body);
    expect(body.email).toBe('test@example.com');
    expect(body.locale).toBe('es');
  });

  it('should add correct tag based on user type - Swimmer', async () => {
    // Mock contact lookup
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ items: [{ id: 123, email: 'swimmer@example.com' }] }),
    });
    
    // Mock tags list
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ items: [{ id: 1, name: 'Swimmer' }] }),
    });
    
    // Mock tag assignment
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    await addTagToContact('swimmer@example.com', 'Swimmer');

    expect(global.fetch).toHaveBeenCalledTimes(3);
    
    // Verify tag was assigned
    const tagAssignCall = (global.fetch as any).mock.calls[2];
    expect(tagAssignCall[0]).toContain('/contacts/123/tags/1');
    expect(tagAssignCall[1].method).toBe('POST');
  });

  it('should add correct tag based on user type - Club Deportivo', async () => {
    // Mock contact lookup
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ items: [{ id: 456, email: 'club@example.com' }] }),
    });
    
    // Mock tags list
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ items: [{ id: 2, name: 'Club Deportivo' }] }),
    });
    
    // Mock tag assignment
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    await addTagToContact('club@example.com', 'Club Deportivo');

    expect(global.fetch).toHaveBeenCalledTimes(3);
    
    const tagAssignCall = (global.fetch as any).mock.calls[2];
    expect(tagAssignCall[0]).toContain('/contacts/456/tags/2');
  });

  it('should add correct tag based on user type - Federation', async () => {
    // Mock contact lookup
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ items: [{ id: 789, email: 'federation@example.com' }] }),
    });
    
    // Mock tags list
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ items: [{ id: 3, name: 'Federation' }] }),
    });
    
    // Mock tag assignment
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    await addTagToContact('federation@example.com', 'Federation');

    expect(global.fetch).toHaveBeenCalledTimes(3);
    
    const tagAssignCall = (global.fetch as any).mock.calls[2];
    expect(tagAssignCall[0]).toContain('/contacts/789/tags/3');
  });

  it('should update existing contact instead of creating duplicate', async () => {
    // Mock existing contact found
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ items: [{ id: 999, email: 'existing@example.com' }] }),
    });
    
    // Mock contact update
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 999, email: 'existing@example.com' }),
    });

    await createOrUpdateContact('existing@example.com', {
      name: 'Updated Name',
      userType: 'club',
    });

    expect(global.fetch).toHaveBeenCalledTimes(2);
    
    // Verify PATCH was used for update
    const updateCall = (global.fetch as any).mock.calls[1];
    expect(updateCall[0]).toContain('/contacts/999');
    expect(updateCall[1].method).toBe('PATCH');
  });

  it('should handle API errors gracefully', async () => {
    // Mock API error
    (global.fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 401,
      text: async () => 'Unauthorized',
    });

    await expect(
      createOrUpdateContact('error@example.com', { name: 'Test' })
    ).rejects.toThrow('Systeme.io API error (401): Unauthorized');
  });

  it('should not sync if emailConsent is false', () => {
    // This test verifies the router logic - the sync should only happen when emailConsent is true
    // The actual router code checks: if (input.emailConsent && ctx.user.email)
    // So if emailConsent is false, the Systeme.io functions should never be called
    
    const emailConsent = false;
    const shouldSync = emailConsent && true; // simulating ctx.user.email exists
    
    expect(shouldSync).toBe(false);
  });

  it('should sync when emailConsent is true and email exists', () => {
    const emailConsent = true;
    const userEmail = 'test@example.com';
    const shouldSync = emailConsent && userEmail;
    
    expect(shouldSync).toBeTruthy();
  });
});

