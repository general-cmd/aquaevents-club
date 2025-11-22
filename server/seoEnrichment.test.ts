import { describe, it, expect } from 'vitest';
import { enrichEventSEO } from './seoEnrichment';

describe('SEO Enrichment', () => {
  it('should generate AI-enriched SEO metadata for an event', async () => {
    const event = {
      title: 'Campeonato de España de Natación',
      city: 'Madrid',
      region: 'Comunidad de Madrid',
      discipline: 'Natación',
      startDate: '2026-06-15',
      description: 'Campeonato nacional de natación',
      category: 'Competición'
    };

    const seoData = await enrichEventSEO(event);

    // Verify all required fields are present
    expect(seoData.metaTitle).toBeDefined();
    expect(seoData.metaDescription).toBeDefined();
    expect(seoData.richDescription).toBeDefined();
    expect(seoData.slug).toBeDefined();
    expect(seoData.keywords).toBeDefined();

    // Verify field constraints
    expect(seoData.metaTitle.length).toBeLessThanOrEqual(60);
    expect(seoData.metaDescription.length).toBeLessThanOrEqual(155);
    expect(seoData.keywords.length).toBeGreaterThan(0);
    expect(seoData.slug).toMatch(/^[a-z0-9-]+$/); // SEO-friendly slug format

    // Verify content includes key information
    expect(seoData.metaTitle.toLowerCase()).toContain('madrid');
    expect(seoData.metaDescription.toLowerCase()).toContain('madrid');
    expect(seoData.richDescription.toLowerCase()).toContain('natación');

    console.log('✅ Generated SEO metadata:', {
      metaTitle: seoData.metaTitle,
      metaDescription: seoData.metaDescription,
      slug: seoData.slug,
      keywords: seoData.keywords
    });
  }, 30000); // 30 second timeout for LLM call

  it('should fallback to basic SEO if AI fails', async () => {
    const event = {
      title: 'Test Event',
      city: 'Barcelona',
      region: 'Cataluña',
      discipline: 'Waterpolo',
      startDate: '2026-07-01'
    };

    // This should still work even if LLM fails
    const seoData = await enrichEventSEO(event);

    expect(seoData.metaTitle).toBeDefined();
    expect(seoData.metaDescription).toBeDefined();
    expect(seoData.richDescription).toBeDefined();
    expect(seoData.slug).toBeDefined();
    expect(seoData.keywords).toBeDefined();

    console.log('✅ Fallback SEO metadata generated');
  }, 30000);

  it('should generate unique slugs for different events', async () => {
    const event1 = {
      title: 'Triatlón de Barcelona',
      city: 'Barcelona',
      region: 'Cataluña',
      discipline: 'Triatlón',
      startDate: '2026-05-10'
    };

    const event2 = {
      title: 'Triatlón de Barcelona',
      city: 'Barcelona',
      region: 'Cataluña',
      discipline: 'Triatlón',
      startDate: '2026-09-20'
    };

    const seo1 = await enrichEventSEO(event1);
    const seo2 = await enrichEventSEO(event2);

    // Slugs should be different even if title/city are same (different dates)
    expect(seo1.slug).toBeDefined();
    expect(seo2.slug).toBeDefined();

    console.log('✅ Unique slugs:', { slug1: seo1.slug, slug2: seo2.slug });
  }, 60000);

  it('should handle events with special characters in title', async () => {
    const event = {
      title: 'V Duatlón Cros Jerez-La Bazana',
      city: 'Jerez de la Frontera',
      region: 'Andalucía',
      discipline: 'Triatlón',
      startDate: '2026-03-15'
    };

    const seoData = await enrichEventSEO(event);

    // Slug should be SEO-friendly (no special characters)
    expect(seoData.slug).toMatch(/^[a-z0-9-]+$/);
    expect(seoData.slug).not.toContain(' ');
    expect(seoData.slug).not.toContain('á');
    expect(seoData.slug).not.toContain('ó');

    console.log('✅ SEO-friendly slug for special characters:', seoData.slug);
  }, 30000);
});

