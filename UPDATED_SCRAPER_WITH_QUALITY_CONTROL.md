# Federation Scraper - WITH STRICT QUALITY CONTROL

**⚠️ CRITICAL: This updated prompt includes strict validation to prevent scraping calendar headers, month names, and generic labels as events.**

---

## Mission

Extract ONLY valid, complete aquatic sports events from Spanish federations for 2025-2026. **Do NOT extract calendar headers, month names, or incomplete data.**

---

## STEP 1: Event Validation (MUST CHECK BEFORE SAVING)

**Before saving ANY event to MongoDB, it MUST pass ALL these checks:**

### ✅ Required Field Validation

| Field | Validation Rule | Example VALID | Example INVALID |
|-------|----------------|---------------|-----------------|
| `name.es` | Length ≥ 10 characters | "Campeonato de España Absoluto" | "MASTER", "Octubre", "Liga" |
| `name.es` | NOT a generic word | "Copa Catalana de Natación" | "calendario", "eventos", "competiciones" |
| `name.es` | NOT a month name | "Trofeo Primavera 2025" | "enero", "febrero", "octubre" |
| `name.es` | NOT a day of week | "Campeonato Regional Sábado" | "lunes", "martes", "sábado" |
| `name.es` | NOT just a year | "Campeonato Nacional 2025" | "2025", "2026" |
| `name.es` | NOT just a category | "Campeonato Infantil de Natación" | "infantil", "master", "absoluto" |
| `name.es` | NOT just a discipline | "Trofeo Ciudad de Madrid - Natación" | "natación", "triatlón", "swimming" |
| `date` | Valid ISO 8601 format | "2025-12-30T10:00:00.000Z" | "30/12/2025", "December 30" |
| `date` | In the future (≥ 2025-01-01) | "2025-06-15T..." | "2024-12-01T..." |
| `location.city` | Length ≥ 3 characters | "Madrid", "Barcelona" | "M", "BCN" |
| `location.city` | NOT a generic word | "Sevilla" | "España", "Andalucía" |
| `discipline` | Valid aquatic sport | "Natación", "Triatlón" | "Deporte", "Competición" |

### ❌ Invalid Event Name Patterns (REJECT IMMEDIATELY)

```javascript
const INVALID_PATTERNS = [
  /^(calendario|eventos|competiciones|liga|temporada|campeonato)$/i,
  /^\d{4}$/,  // Just "2025" or "2026"
  /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)$/i,
  /^(lunes|martes|miércoles|jueves|viernes|sábado|domingo)$/i,
  /^(natación|natacion|swimming|triatlón|triatlon|duatlón|waterpolo)$/i,
  /^(infantil|cadete|junior|absoluto|master|senior)$/i,
  /^(masculino|femenino|mixto)$/i,
  /^(primera|segunda|tercera|división|division)$/i,
  /^(jornada|etapa|fase|ronda)$/i,
  /^(inscripciones|inscripción|plazo|cierre)$/i,
];

// Check if event name matches any invalid pattern
function isInvalidEventName(name) {
  return INVALID_PATTERNS.some(pattern => pattern.test(name));
}
```

### ✅ Validation Function (USE THIS BEFORE SAVING)

```javascript
function isValidEvent(eventData) {
  const name = eventData.name?.es;
  const date = eventData.date;
  const city = eventData.location?.city;
  const discipline = eventData.discipline;
  
  // 1. Check required fields exist
  if (!name || !date || !city || !discipline) {
    console.log(`❌ REJECTED: Missing required fields`);
    return false;
  }
  
  // 2. Check name length (must be at least 10 characters)
  if (name.length < 10) {
    console.log(`❌ REJECTED: Name too short "${name}" (${name.length} chars)`);
    return false;
  }
  
  // 3. Check for invalid name patterns
  if (isInvalidEventName(name)) {
    console.log(`❌ REJECTED: Invalid name pattern "${name}"`);
    return false;
  }
  
  // 4. Check date is valid and in future
  try {
    const eventDate = new Date(date);
    const cutoffDate = new Date('2025-01-01');
    
    if (isNaN(eventDate.getTime())) {
      console.log(`❌ REJECTED: Invalid date format "${date}"`);
      return false;
    }
    
    if (eventDate < cutoffDate) {
      console.log(`❌ REJECTED: Past event "${name}" (${date})`);
      return false;
    }
  } catch (error) {
    console.log(`❌ REJECTED: Date parsing error for "${name}"`);
    return false;
  }
  
  // 5. Check city is not generic
  const genericCities = ['españa', 'spain', 'nacional', 'regional', 'por determinar', 'tbd'];
  if (genericCities.includes(city.toLowerCase())) {
    console.log(`❌ REJECTED: Generic city "${city}"`);
    return false;
  }
  
  // 6. Check discipline is valid
  const validDisciplines = [
    'natación', 'triatlón', 'duatlón', 'acuatlón', 'waterpolo',
    'natación artística', 'aguas abiertas', 'saltos', 'natacion',
    'triatlon', 'duatlon', 'acuatlon'
  ];
  if (!validDisciplines.some(d => discipline.toLowerCase().includes(d))) {
    console.log(`❌ REJECTED: Invalid discipline "${discipline}"`);
    return false;
  }
  
  // All checks passed
  console.log(`✅ VALID: "${name}" - ${date} - ${city}`);
  return true;
}
```

---

## STEP 2: Search for Events

For EACH federation, search for events using the Manus `search` tool:

```javascript
// Search for 2025 events
const results2025 = await search({
  type: 'data',
  queries: [
    `${federationName} eventos calendario 2025`,
    `${federationName} competiciones 2025`,
    `${federationWebsite} calendario 2025`
  ]
});

// Search for 2026 events
const results2026 = await search({
  type: 'data',
  queries: [
    `${federationName} eventos calendario 2026`,
    `${federationName} competiciones 2026`,
    `${federationWebsite} calendario 2026`
  ]
});
```

---

## STEP 3: Extract and Validate Events

For each search result:

```javascript
// Extract event data
const eventData = {
  name: {
    es: extractedName,
    en: translateToEnglish(extractedName)
  },
  date: convertToISO8601(extractedDate),
  endDate: convertToISO8601(extractedEndDate) || convertToISO8601(extractedDate),
  location: {
    city: extractedCity,
    region: standardizeRegion(extractedRegion),
    venue: extractedVenue || "",
    address: "",
    country: "Spain"
  },
  discipline: standardizeDiscipline(extractedDiscipline),
  category: extractedCategory || "",
  federation: federationName,
  contact: {
    email: extractedEmail || "",
    phone: extractedPhone || "",
    website: extractedWebsite || ""
  },
  description: {
    es: extractedDescription || "",
    en: translateToEnglish(extractedDescription) || ""
  },
  registrationUrl: extractedRegistrationUrl || "",
  maxCapacity: parseInt(extractedCapacity) || 0,
  currentRegistrations: 0,
  source: "federation-scraper",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  seo: generateSEO(extractedName, extractedCity, extractedDate)
};

// CRITICAL: Validate before saving
if (!isValidEvent(eventData)) {
  console.log(`⏭️ Skipping invalid event`);
  continue; // Skip this event, move to next
}

// If valid, check for duplicates and save
await saveEventToMongoDB(eventData);
```

---

## STEP 4: Save to MongoDB (With Duplicate Check)

```javascript
async function saveEventToMongoDB(eventData) {
  const collection = db.collection('events');
  
  // Check for duplicates
  const existing = await collection.findOne({
    "name.es": eventData.name.es,
    "date": eventData.date,
    "location.city": eventData.location.city
  });
  
  if (existing) {
    // Update existing event
    await collection.updateOne(
      { _id: existing._id },
      {
        $set: {
          ...eventData,
          updatedAt: new Date().toISOString()
        }
      }
    );
    console.log(`✅ UPDATED: ${eventData.name.es}`);
  } else {
    // Insert new event
    await collection.insertOne(eventData);
    console.log(`✅ INSERTED: ${eventData.name.es}`);
  }
}
```

---

## STEP 5: Quality Control Reporting

At the end of scraping, provide detailed quality metrics:

```
=== QUALITY CONTROL REPORT ===

📊 EVENTS PROCESSED:
- Total found: 450
- Valid events: 312
- Invalid events rejected: 138

❌ REJECTION BREAKDOWN:
- Missing required fields: 45
- Name too short: 23
- Invalid name pattern: 38
- Generic/calendar headers: 18
- Past events: 8
- Invalid date format: 6

✅ SAVED TO DATABASE:
- New events inserted: 89
- Existing events updated: 223

📋 SAMPLE REJECTED EVENTS:
1. "MASTER" - Rejected: Invalid name pattern
2. "Octubre" - Rejected: Month name
3. "2025" - Rejected: Just a year
4. "Liga" - Rejected: Name too short
5. "calendario" - Rejected: Generic word

📋 SAMPLE VALID EVENTS:
1. "Campeonato de España Absoluto de Natación" - Madrid - 2025-12-15
2. "Copa Catalana de Natación Infantil" - Barcelona - 2025-11-20
3. "Triatlón Sprint Ciudad de Valencia" - Valencia - 2025-10-05
```

---

## Complete Scraping Workflow

```javascript
import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const client = new MongoClient(MONGODB_URI);

await client.connect();
const db = client.db('aquaevents');
const collection = db.collection('events');

const stats = {
  found: 0,
  valid: 0,
  invalid: 0,
  inserted: 0,
  updated: 0,
  rejectionReasons: {}
};

// List of federations to scrape
const federations = [
  { name: "RFEN", website: "https://www.rfen.es" },
  { name: "FETRI", website: "https://www.triatlon.org" },
  // ... add all 33 federations
];

for (const federation of federations) {
  console.log(`\n🔍 Processing: ${federation.name}`);
  
  // Search for events (2025 + 2026)
  const results = await search({
    type: 'data',
    queries: [
      `${federation.name} eventos calendario 2025`,
      `${federation.name} eventos calendario 2026`
    ]
  });
  
  // Extract and validate each event
  for (const result of results) {
    stats.found++;
    
    const eventData = extractEventData(result, federation.name);
    
    if (!isValidEvent(eventData)) {
      stats.invalid++;
      continue;
    }
    
    stats.valid++;
    
    // Save to MongoDB
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
      stats.updated++;
    } else {
      await collection.insertOne(eventData);
      stats.inserted++;
    }
  }
  
  // Rate limiting
  await new Promise(resolve => setTimeout(resolve, 5000));
}

// Print final report
console.log('\n' + '='.repeat(50));
console.log('QUALITY CONTROL REPORT');
console.log('='.repeat(50));
console.log(`Events found: ${stats.found}`);
console.log(`Valid events: ${stats.valid}`);
console.log(`Invalid events rejected: ${stats.invalid}`);
console.log(`New events inserted: ${stats.inserted}`);
console.log(`Existing events updated: ${stats.updated}`);
console.log('='.repeat(50));

await client.close();
```

---

## Key Differences from Previous Scraper

| Old Scraper | New Scraper with Quality Control |
|-------------|----------------------------------|
| Saved everything found | Validates BEFORE saving |
| No name length check | Minimum 10 characters |
| Accepted "Octubre", "MASTER" | Rejects generic words, months, categories |
| No duplicate prevention | Checks for duplicates before insert |
| No quality reporting | Detailed rejection breakdown |
| Scraped calendar headers | Only scrapes actual events |

---

## Testing Checklist

Before deploying:

- [ ] Run validation function on sample data
- [ ] Verify invalid patterns are rejected
- [ ] Confirm minimum name length (10 chars)
- [ ] Test duplicate detection
- [ ] Verify date validation (future events only)
- [ ] Check quality control report format

---

**Document Version:** 2.1 (With Quality Control)  
**Last Updated:** 2025-11-24  
**Author:** Manus AI

