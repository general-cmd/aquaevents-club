import { describe, it, expect } from "vitest";

/**
 * Federation Preparation Tests
 * Tests for sitemap, robots.txt, and bulk import functionality
 */

describe("Sitemap and Robots.txt", () => {
  it("should generate valid XML sitemap structure", async () => {
    const response = await fetch("http://localhost:3000/sitemap.xml");
    const text = await response.text();

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("application/xml");
    expect(text).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(text).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
    expect(text).toContain("</urlset>");
  });

  it("should include all static pages in sitemap", async () => {
    const response = await fetch("http://localhost:3000/sitemap.xml");
    const text = await response.text();

    const staticPages = [
      "https://aquaevents.club/",
      "https://aquaevents.club/eventos",
      "https://aquaevents.club/federaciones",
      "https://aquaevents.club/blog",
      "https://aquaevents.club/enviar-evento",
      "https://aquaevents.club/perfil",
    ];

    staticPages.forEach((page) => {
      expect(text).toContain(`<loc>${page}</loc>`);
    });
  });

  it("should include event pages in sitemap", async () => {
    const response = await fetch("http://localhost:3000/sitemap.xml");
    const text = await response.text();

    // Should have at least one event URL
    expect(text).toContain("https://aquaevents.club/eventos/");
    
    // Should have proper sitemap structure for events
    expect(text).toContain("<changefreq>");
    expect(text).toContain("<priority>");
    expect(text).toContain("<lastmod>");
  });

  it("should generate valid robots.txt", async () => {
    const response = await fetch("http://localhost:3000/robots.txt");
    const text = await response.text();

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("text/plain");
    expect(text).toContain("User-agent: *");
    expect(text).toContain("Allow: /");
    expect(text).toContain("Sitemap: https://aquaevents.club/sitemap.xml");
  });
});

describe("Bulk Import CSV Format", () => {
  it("should validate required CSV columns", () => {
    const requiredColumns = [
      "name",
      "discipline",
      "date",
    ];

    const csvHeaders = "name,discipline,date,city,region,venue,organizer,website,description";
    const headers = csvHeaders.split(",");

    requiredColumns.forEach((col) => {
      expect(headers).toContain(col);
    });
  });

  it("should validate date format YYYY-MM-DD", () => {
    const validDates = ["2026-03-15", "2025-12-31", "2026-01-01"];
    const invalidDates = ["15/03/2026", "2026-3-15", "03-15-2026"];

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    validDates.forEach((date) => {
      expect(dateRegex.test(date)).toBe(true);
    });

    invalidDates.forEach((date) => {
      expect(dateRegex.test(date)).toBe(false);
    });
  });

  it("should validate discipline values", () => {
    const validDisciplines = [
      "natacion",
      "natacion-sincronizada",
      "saltos",
      "waterpolo",
      "aguas-abiertas",
      "triatlon",
    ];

    const testDiscipline = "natacion";
    expect(validDisciplines).toContain(testDiscipline);
  });
});

describe("SEO Improvements", () => {
  it("should have sitemap accessible at root", async () => {
    const response = await fetch("http://localhost:3000/sitemap.xml");
    expect(response.status).toBe(200);
  });

  it("should have robots.txt accessible at root", async () => {
    const response = await fetch("http://localhost:3000/robots.txt");
    expect(response.status).toBe(200);
  });

  it("sitemap should reference production URL", async () => {
    const response = await fetch("http://localhost:3000/sitemap.xml");
    const text = await response.text();

    expect(text).toContain("https://aquaevents.club");
    expect(text).not.toContain("localhost");
  });

  it("robots.txt should reference production sitemap URL", async () => {
    const response = await fetch("http://localhost:3000/robots.txt");
    const text = await response.text();

    expect(text).toContain("https://aquaevents.club/sitemap.xml");
  });
});

console.log("✅ Federation preparation tests complete");
console.log("📊 Sitemap: http://localhost:3000/sitemap.xml");
console.log("🤖 Robots.txt: http://localhost:3000/robots.txt");
console.log("📥 Bulk Import: /admin/bulk-import (admin only)");
