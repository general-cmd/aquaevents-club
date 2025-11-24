# Business-Grade Federation Event Scraper

**Mission:** Extract complete, accurate event data from Spanish aquatic sports federations using browser automation and strict quality control.

**Quality Standard:** Every event must provide swimmers with actionable next steps (contact information, registration details, specific location).

---

## Core Principles

### 1. **Detail Page Extraction**
- Do NOT scrape from calendar summary pages
- Navigate to individual event detail pages
- Extract complete information from the source

### 2. **Data Completeness**
- Every event MUST have: name, date, specific city, contact info
- Missing any required field → reject event
- Partial data → attempt to find detail page, otherwise reject

### 3. **Quality Over Quantity**
- 100 high-quality events > 500 low-quality events
- Only save events that swimmers can actually use
- Reject calendar headers, placeholders, announcements

---

## Scraping Strategy by Federation Type

### Type A: Modern Websites with Event Detail Pages
**Examples:** RFEN (rfen.es), FETRI (triatlon.org), Federación Catalana

**Approach:**
1. Find calendar/events page
2. Extract all event links from calendar
3. Visit EACH event detail page
4. Extract complete data from detail page
5. Validate and save

**Example Workflow:**
```
1. Visit https://rfen.es/calendario/
2. Find all event links (e.g., /evento/campeonato-españa-natacion-2025)
3. For each link:
   - Navigate to detail page
   - Extract: name, date, city, venue, contact email/phone, description
   - Validate data quality
   - Save to MongoDB if valid
```

### Type B: Calendar Tables (HTML/JavaScript)
**Examples:** Federación Valenciana (triatlocv.org), regional federations

**Approach:**
1. Find calendar table
2. Parse table rows for event data
3. Extract city from table column (NOT region header)
4. If table has event links → visit detail pages
5. If no links → extract contact from federation page

**Example Workflow:**
```
1. Visit https://www.triatlocv.org/calendario/
2. Parse table:
   - Column 1: Date
   - Column 2: Event Name
   - Column 3: City (IMPORTANT: use this, not region)
   - Column 4: Category/Type
3. For events with links:
   - Visit detail page
   - Extract contact info
4. For events without links:
   - Use federation contact as fallback
```

### Type C: PDF Calendars
**Examples:** Some regional federations publish PDF calendars

**Approach:**
1. Download PDF calendar
2. Extract text using PDF parser
3. Parse structured data (dates, names, cities)
4. Cross-reference with federation website for contact info
5. Only save if contact info can be found

**Example Workflow:**
```
1. Download PDF from federation website
2. Extract text and parse:
   - Date patterns (DD/MM/YYYY)
   - Event names (capitalized text)
   - Cities (look for "en [City]" or "- [City]")
3. Visit federation contact page
4. Use federation email/phone as contact
5. Validate and save
```

---

## Required Data Schema

Every event MUST have these fields to be saved:

```javascript
{
  // REQUIRED FIELDS
  "name": {
    "es": "Campeonato de España de Natación 2025",  // Min 10 chars, not generic
    "en": "Spanish National Swimming Championship 2025"
  },
  "date": "2025-12-15T10:00:00.000Z",  // ISO 8601, future date
  "endDate": "2025-12-17T18:00:00.000Z",  // ISO 8601
  "location": {
    "city": "Madrid",  // SPECIFIC city, not region (unless major city)
    "region": "Madrid",  // Standardized region name
    "venue": "Centro Acuático M-86",  // Optional but recommended
    "address": "Calle Example 123",  // Optional
    "country": "Spain"
  },
  "discipline": "Natación",  // Valid aquatic sport
  "federation": "RFEN",  // Source federation
  
  // AT LEAST ONE REQUIRED
  "contact": {
    "email": "natacion@rfen.es",  // Preferred
    "phone": "+34 91 123 4567",  // Alternative
    "website": "https://rfen.es/evento/..."  // Minimum acceptable
  },
  
  // OPTIONAL BUT RECOMMENDED
  "category": "Absoluto",
  "description": {
    "es": "Campeonato nacional de natación...",
    "en": "National swimming championship..."
  },
  "registrationUrl": "https://inscripciones.rfen.es/...",
  "maxCapacity": 500,
  "currentRegistrations": 0,
  
  // AUTO-GENERATED
  "source": "federation-scraper",
  "createdAt": "2025-11-24T12:00:00.000Z",
  "updatedAt": "2025-11-24T12:00:00.000Z",
  "seo": {
    "canonical": "https://aquaevents.club/eventos/...",
    "metaTitle": "...",
    "metaDescription": "...",
    "keywords": [...]
  }
}
```

---

## Validation Rules (MUST PASS ALL)

### 1. Name Validation
```javascript
// PASS
"Campeonato de España de Natación Absoluto 2025"
"Copa Catalana de Triatlón Sprint - Barcelona"
"Trofeo Ciudad de Valencia - Aguas Abiertas"

// FAIL
"MASTER" (too short, generic)
"Octubre" (month name)
"2025" (just a year)
"Calendario Reuniones" (calendar header)
"Liga" (too short)
"Natación" (just discipline)
```

### 2. Location Validation
```javascript
// PASS
city: "Madrid", region: "Madrid" (major city, allowed)
city: "Barcelona", region: "Cataluña" (different, specific)
city: "Sabadell", region: "Cataluña" (specific city)

// FAIL
city: "Valencia", region: "Valencia" (unless it's Valencia city)
city: "Cáceres", region: "Cáceres" (small city=region, too vague)
city: "España", region: "Nacional" (not specific)
city: "Por determinar", region: "..." (TBD location)
```

### 3. Contact Validation
```javascript
// PASS (has email)
contact: {
  email: "info@federation.es",
  phone: "",
  website: ""
}

// PASS (has phone)
contact: {
  email: "",
  phone: "+34 123 456 789",
  website: ""
}

// PASS (has website)
contact: {
  email: "",
  phone: "",
  website: "https://federation.org/evento/123"
}

// FAIL (no contact info)
contact: {
  email: "",
  phone: "",
  website: ""
}
```

### 4. Date Validation
```javascript
// PASS
"2025-12-30T10:00:00.000Z" (future, ISO 8601)
"2026-06-15T09:00:00.000Z" (2026, ISO 8601)

// FAIL
"2024-12-30T10:00:00.000Z" (past)
"30/12/2025" (not ISO 8601)
"December 30, 2025" (not ISO 8601)
```

---

## Browser Automation Workflow

### Step 1: Navigate to Federation Calendar

```javascript
// Use browser tools to navigate
await browser.navigate('https://rfen.es/calendario/');

// Wait for page to load
await browser.waitForSelector('.event-list');

// Accept cookies if needed
const cookieButton = await browser.findElement('Aceptar');
if (cookieButton) {
  await browser.click(cookieButton);
}
```

### Step 2: Extract Event Links

```javascript
// Find all event links
const eventLinks = await browser.extractLinks({
  selector: '.event-item a',
  filter: (href) => href.includes('/evento/') || href.includes('/competicion/')
});

console.log(`Found ${eventLinks.length} event links`);
```

### Step 3: Visit Each Event Detail Page

```javascript
for (const link of eventLinks) {
  try {
    // Navigate to event detail page
    await browser.navigate(link.href);
    
    // Extract event data
    const eventData = await extractEventData(browser);
    
    // Validate
    if (!isValidEvent(eventData)) {
      console.log(`❌ REJECTED: ${eventData.name?.es || 'Unknown'}`);
      stats.rejected++;
      continue;
    }
    
    // Save to MongoDB
    await saveEventToMongoDB(eventData);
    stats.saved++;
    
    // Rate limiting
    await sleep(2000);
    
  } catch (error) {
    console.log(`⚠️ Error processing ${link.href}: ${error.message}`);
    stats.errors++;
    continue;
  }
}
```

### Step 4: Extract Data from Detail Page

```javascript
async function extractEventData(browser) {
  // Extract name
  const name = await browser.getText('h1.event-title') || 
               await browser.getText('.event-name') ||
               await browser.getText('h1');
  
  // Extract date
  const dateText = await browser.getText('.event-date') ||
                   await browser.getText('[itemprop="startDate"]');
  const date = convertToISO8601(dateText);
  
  // Extract location
  const city = await browser.getText('.event-city') ||
               await browser.getText('[itemprop="addressLocality"]');
  const region = await browser.getText('.event-region') ||
                 inferRegionFromCity(city);
  const venue = await browser.getText('.event-venue') || '';
  
  // Extract contact
  const email = await browser.getText('.contact-email') ||
                await browser.getAttribute('a[href^="mailto:"]', 'href').replace('mailto:', '');
  const phone = await browser.getText('.contact-phone') ||
                await browser.getText('[itemprop="telephone"]');
  const website = await browser.getAttribute('.event-website', 'href') ||
                  browser.currentUrl;
  
  // Extract description
  const description = await browser.getText('.event-description') ||
                      await browser.getText('[itemprop="description"]');
  
  return {
    name: { es: name, en: translateToEnglish(name) },
    date: date,
    endDate: date, // Use same date if end date not found
    location: {
      city: city,
      region: standardizeRegion(region),
      venue: venue,
      address: '',
      country: 'Spain'
    },
    discipline: inferDiscipline(name, description),
    category: inferCategory(name),
    federation: currentFederation.name,
    contact: {
      email: email || '',
      phone: phone || '',
      website: website || ''
    },
    description: {
      es: description || '',
      en: translateToEnglish(description) || ''
    },
    registrationUrl: await browser.getAttribute('.register-button', 'href') || '',
    maxCapacity: 0,
    currentRegistrations: 0,
    source: 'federation-scraper',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    seo: generateSEO(name, city, date)
  };
}
```

---

## Fallback Strategies

### When Event Detail Page Doesn't Exist

If an event is listed in a calendar table but has no detail page:

1. **Use table data:**
   - Extract: name, date, city from table columns
   - Use federation contact as fallback

2. **Search for event:**
   - Google: "[Event Name] [City] [Year] inscripción contacto"
   - If found → extract contact info
   - If not found → use federation contact

3. **Federation contact fallback:**
   ```javascript
   contact: {
     email: "info@federation.es",  // Federation email
     phone: "+34 XXX XXX XXX",     // Federation phone
     website: "https://federation.es/contacto"
   }
   ```

### When City is Ambiguous

If city equals region (e.g., "Valencia"):

1. **Check if it's a major city:**
   - If in MAJOR_CITIES list → allow
   - If not → reject (too vague)

2. **Look for venue/address:**
   - If venue is specific → allow
   - If no venue → reject

3. **Cross-reference with map:**
   - If address can be geocoded → allow
   - If not → reject

---

## Quality Control Reporting

After scraping, provide this detailed report:

```
==================================================
FEDERATION SCRAPER QUALITY REPORT
==================================================
Federation: RFEN
Date: 2025-11-24 12:00:00
==================================================

📊 PROCESSING STATISTICS:
   Calendar pages visited: 5
   Event links found: 120
   Event detail pages visited: 120
   Events extracted: 120

✅ VALIDATION RESULTS:
   Valid events: 85
   Rejected events: 35
   
❌ REJECTION BREAKDOWN:
   Missing required fields: 12
   Name too short (<10 chars): 5
   Invalid name pattern: 8
   Past events: 3
   Generic/vague location: 4
   No contact information: 3
   Invalid discipline: 0

💾 DATABASE OPERATIONS:
   New events inserted: 42
   Existing events updated: 43
   Total events in DB: 85

📋 SAMPLE VALID EVENTS:
1. Campeonato de España de Natación Absoluto
   📍 Madrid, Madrid
   📧 natacion@rfen.es
   📅 2025-12-15

2. Copa Catalana de Triatlón Sprint
   📍 Barcelona, Cataluña
   📧 info@fcn.cat
   📅 2025-10-20

3. Trofeo Ciudad de Valencia - Aguas Abiertas
   📍 Valencia, Valencia
   📧 eventos@valencia.es
   📅 2025-09-10

📋 SAMPLE REJECTED EVENTS:
1. "MASTER" - Rejected: Name too short
2. "Octubre" - Rejected: Month name
3. "Calendario Reuniones 2025" - Rejected: Calendar header
4. "Liga Nacional" - Rejected: No contact info
5. "Campeonato Regional" - Rejected: No specific city

⚠️ ERRORS ENCOUNTERED:
   Page load timeouts: 2
   Parsing errors: 1
   Network errors: 0

==================================================
✅ SCRAPING COMPLETED
Next run: 2025-12-24 07:00:00
==================================================
```

---

## Federation-Specific Instructions

### RFEN (Real Federación Española de Natación)
- **Calendar URL:** https://rfen.es/calendario/
- **Event detail pattern:** /evento/* or /competicion/*
- **Specialties:** Natación, Waterpolo, Natación Artística, Saltos, Aguas Abiertas, Master
- **Contact fallback:** natacion@rfen.es, +34 91 534 09 90

### FETRI (Federación Española de Triatlón)
- **Calendar URL:** https://www.triatlon.org/calendario
- **Event detail pattern:** /evento/* or /competicion/*
- **Specialties:** Triatlón, Duatlón, Acuatlón, Cross Triathlon
- **Contact fallback:** fetri@triatlon.org

### Federación Catalana de Natación
- **Calendar URL:** https://www.fcn.cat/calendari
- **Event detail pattern:** /esdeveniment/* or /evento/*
- **Language:** Catalan + Spanish
- **Contact fallback:** fcn@fcn.cat

### Federación Valenciana de Triatlón
- **Calendar URL:** https://www.triatlocv.org/calendario/
- **Format:** HTML table with event rows
- **City extraction:** Parse table column (not region header!)
- **Event links:** Some events have detail pages, others don't
- **Contact fallback:** dtecnica@triatlocv.org, 645 96 83 35

### Regional Federations (31 total)
- **Approach:** Visit each federation's calendar page
- **Extract:** Event links if available, otherwise table data
- **Fallback:** Use federation contact info
- **Validation:** Extra strict (many have incomplete data)

---

## MongoDB Connection

```javascript
import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const client = new MongoClient(MONGODB_URI);

await client.connect();
const db = client.db('aquaevents');
const collection = db.collection('events');

// Upsert logic (update or insert)
async function saveEventToMongoDB(eventData) {
  const existing = await collection.findOne({
    "name.es": eventData.name.es,
    "date": eventData.date,
    "location.city": eventData.location.city
  });
  
  if (existing) {
    await collection.updateOne(
      { _id: existing._id },
      { $set: { ...eventData, updatedAt: new Date().toISOString() } }
    );
    return 'updated';
  } else {
    await collection.insertOne(eventData);
    return 'inserted';
  }
}
```

---

## Error Handling

### Network Errors
```javascript
try {
  await browser.navigate(url);
} catch (error) {
  if (error.message.includes('timeout')) {
    console.log(`⚠️ Timeout loading ${url}, retrying...`);
    await sleep(5000);
    await browser.navigate(url); // Retry once
  } else {
    console.log(`❌ Network error: ${error.message}`);
    stats.errors++;
    continue; // Skip this event
  }
}
```

### Parsing Errors
```javascript
try {
  const eventData = await extractEventData(browser);
} catch (error) {
  console.log(`❌ Parsing error on ${browser.currentUrl}: ${error.message}`);
  stats.errors++;
  continue; // Skip this event
}
```

### Validation Errors
```javascript
if (!isValidEvent(eventData)) {
  console.log(`❌ REJECTED: ${eventData.name?.es || 'Unknown'}`);
  console.log(`   Reason: ${getValidationError(eventData)}`);
  stats.rejected++;
  continue; // Skip this event
}
```

---

## Rate Limiting

```javascript
// Between event detail pages
await sleep(2000); // 2 seconds

// Between federations
await sleep(10000); // 10 seconds

// After errors
await sleep(5000); // 5 seconds

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
```

---

## Testing Checklist

Before deploying:

- [ ] Test on RFEN calendar (modern website)
- [ ] Test on FETRI calendar (JavaScript-heavy)
- [ ] Test on Federación Valenciana (HTML table)
- [ ] Test on regional federation (PDF calendar)
- [ ] Verify all validation rules work
- [ ] Verify duplicate detection works
- [ ] Verify contact info extraction
- [ ] Verify city extraction (not region)
- [ ] Verify date conversion to ISO 8601
- [ ] Verify quality report generation

---

## Success Criteria

A successful scrape run should:

1. **Extract 80%+ valid events** from total found
2. **All saved events have contact info** (email, phone, or website)
3. **All saved events have specific cities** (not just regions)
4. **No calendar headers or month names** saved as events
5. **Detailed quality report** shows what was rejected and why

---

**Document Version:** 4.0 (Business-Grade with Browser Automation)  
**Last Updated:** 2025-11-24  
**Author:** Manus AI  
**Quality Standard:** Production-ready, reliable, consistent

