/**
 * Tests for XML Sitemap Generation
 */

import { describe, it, expect } from 'vitest';
import request from 'supertest';
import express from 'express';
import sitemapRouter from './sitemap';

describe('Sitemap Generation', () => {
  const app = express();
  app.use('', sitemapRouter);

  it('should return XML sitemap with correct content type', async () => {
    const response = await request(app).get('/sitemap.xml');
    
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toContain('application/xml');
  });

  it('should include XML declaration and urlset', async () => {
    const response = await request(app).get('/sitemap.xml');
    const xml = response.text;
    
    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(xml).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
    expect(xml).toContain('</urlset>');
  });

  it('should include all static pages', async () => {
    const response = await request(app).get('/sitemap.xml');
    const xml = response.text;
    
    // Check for static pages
    expect(xml).toContain('<loc>https://aquaevents.club/</loc>');
    expect(xml).toContain('<loc>https://aquaevents.club/eventos</loc>');
    expect(xml).toContain('<loc>https://aquaevents.club/federaciones</loc>');
    expect(xml).toContain('<loc>https://aquaevents.club/blog</loc>');
    expect(xml).toContain('<loc>https://aquaevents.club/enviar-evento</loc>');
  });

  it('should include priority and changefreq for pages', async () => {
    const response = await request(app).get('/sitemap.xml');
    const xml = response.text;
    
    expect(xml).toContain('<priority>1.0</priority>'); // Homepage
    expect(xml).toContain('<changefreq>daily</changefreq>');
    expect(xml).toContain('<changefreq>weekly</changefreq>');
    expect(xml).toContain('<changefreq>monthly</changefreq>');
  });

  it('should include event pages if events exist', async () => {
    const response = await request(app).get('/sitemap.xml');
    const xml = response.text;
    
    // Check for event URL pattern
    if (xml.includes('/evento/')) {
      expect(xml).toMatch(/<loc>https:\/\/aquaevents\.club\/evento\/[a-f0-9]+<\/loc>/);
      expect(xml).toContain('<lastmod>'); // Events should have lastmod
    }
  });

  it('should include blog posts if they exist', async () => {
    const response = await request(app).get('/sitemap.xml');
    const xml = response.text;
    
    // Check for blog URL pattern
    if (xml.includes('/blog/')) {
      expect(xml).toMatch(/<loc>https:\/\/aquaevents\.club\/blog\/[\w-]+<\/loc>/);
    }
  });

  it('should include federation pages if they exist', async () => {
    const response = await request(app).get('/sitemap.xml');
    const xml = response.text;
    
    // Check for federation URL pattern
    if (xml.includes('/federacion/')) {
      expect(xml).toMatch(/<loc>https:\/\/aquaevents\.club\/federacion\/[\w-]+<\/loc>/);
    }
  });

  it('should have proper XML structure with no syntax errors', async () => {
    const response = await request(app).get('/sitemap.xml');
    const xml = response.text;
    
    // Check for balanced tags
    const urlOpenTags = (xml.match(/<url>/g) || []).length;
    const urlCloseTags = (xml.match(/<\/url>/g) || []).length;
    expect(urlOpenTags).toBe(urlCloseTags);
    
    const locOpenTags = (xml.match(/<loc>/g) || []).length;
    const locCloseTags = (xml.match(/<\/loc>/g) || []).length;
    expect(locOpenTags).toBe(locCloseTags);
  });

  it('should set cache control header', async () => {
    const response = await request(app).get('/sitemap.xml');
    
    expect(response.headers['cache-control']).toBeDefined();
    expect(response.headers['cache-control']).toContain('public');
  });

  it('should properly encode URLs with special characters', async () => {
    const response = await request(app).get('/sitemap.xml');
    const xml = response.text;
    
    // URLs should not contain unencoded special characters
    const urlMatches = xml.match(/<loc>(.*?)<\/loc>/g);
    if (urlMatches) {
      urlMatches.forEach(url => {
        // Check that URLs don't contain raw spaces or other problematic characters
        expect(url).not.toMatch(/<loc>.*\s.*<\/loc>/);
      });
    }
  });
});

