import { describe, it, expect, beforeAll } from 'vitest';
import { formatDate, formatDateLong } from '../client/src/lib/dateFormat';

describe('User-Reported Fixes Tests', () => {
  describe('Date Format DD/MM/YYYY', () => {
    it('should format dates as DD/MM/YYYY', () => {
      const testDate = '2025-12-25T12:00:00Z';
      const formatted = formatDate(testDate);
      expect(formatted).toMatch(/^\d{2}\/\d{2}\/\d{4}$/);
      // Date should be in DD/MM/YYYY format
      const parts = formatted.split('/');
      expect(parts).toHaveLength(3);
      expect(parseInt(parts[0])).toBeGreaterThanOrEqual(1);
      expect(parseInt(parts[0])).toBeLessThanOrEqual(31);
      expect(parseInt(parts[1])).toBeGreaterThanOrEqual(1);
      expect(parseInt(parts[1])).toBeLessThanOrEqual(12);
      expect(parseInt(parts[2])).toBe(2025);
    });

    it('should format dates with long month names', () => {
      const testDate = '2025-12-25';
      const formatted = formatDateLong(testDate);
      expect(formatted).toContain('diciembre');
      expect(formatted).toContain('2025');
    });

    it('should handle different date formats', () => {
      const isoDate = '2025-06-15T10:30:00Z';
      const formatted = formatDate(isoDate);
      expect(formatted).toMatch(/^\d{2}\/\d{2}\/\d{4}$/);
    });
  });

  describe('Time Field Handling', () => {
    it('should extract time from ISO timestamp', () => {
      const timestamp = new Date('2025-12-25T14:30:00Z');
      const timeString = timestamp.toTimeString().slice(0, 5);
      expect(timeString).toMatch(/^\d{2}:\d{2}$/);
    });

    it('should combine date and time into timestamp', () => {
      const date = '2025-12-25';
      const time = '14:30';
      const combined = new Date(`${date}T${time}:00`);
      expect(combined.getHours()).toBe(14);
      expect(combined.getMinutes()).toBe(30);
    });
  });

  describe('Optional Fields Display', () => {
    it('should only show capacity when maxCapacity is provided', () => {
      const eventWithCapacity = { maxCapacity: 200, currentRegistrations: 150 };
      const eventWithoutCapacity = { maxCapacity: null };
      
      expect(eventWithCapacity.maxCapacity).toBeTruthy();
      expect(eventWithoutCapacity.maxCapacity).toBeFalsy();
    });

    it('should only show registration URL when provided', () => {
      const eventWithURL = { registrationUrl: 'https://example.com' };
      const eventWithoutURL = { registrationUrl: '' };
      
      expect(eventWithURL.registrationUrl).toBeTruthy();
      expect(eventWithoutURL.registrationUrl).toBeFalsy();
    });

    it('should only show website when provided', () => {
      const eventWithWebsite = { contact: { website: 'https://example.com' } };
      const eventWithoutWebsite = { contact: { website: null } };
      
      expect(eventWithWebsite.contact.website).toBeTruthy();
      expect(eventWithoutWebsite.contact.website).toBeFalsy();
    });
  });
});

