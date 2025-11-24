# Unified Federation Scraper - Updated for 2025-2026

## Mission

Extract ALL upcoming aquatic sports events from Spanish national and regional federations for **2025 AND 2026** and save them to the AquaEvents MongoDB database with complete, properly formatted data.

---

## Target Federations

### National Federations (Priority)
1. **RFEN** - Real Federación Española de Natación (https://www.rfen.es)
2. **FETRI** - Federación Española de Triatlón (https://www.triatlon.org)

### Regional Swimming Federations
- Federación Andaluza de Natación (https://www.fan.es)
- Federación Aragonesa de Natación (https://www.fanaragon.com)
- Federació Catalana de Natació (https://www.natacio.cat)
- Federación Madrileña de Natación (https://www.federacionmadridnatacion.es)
- Federación de Natación de la Comunidad Valenciana (https://www.fncv.es)
- Federación de Natación de la Región de Murcia (https://www.fnmurcia.org)
- Federación Canaria de Natación (https://www.fedecanat.es)
- Federación Gallega de Natación (https://www.fegan.org)
- Federación de Natación de Castilla y León (https://www.fenacyl.org)
- Federación de Natación de Castilla-La Mancha (https://www.fnclm.com)
- Federación Cántabra de Natación (https://www.fncantabria.com)
- Federación Navarra de Natación (https://www.fnn-nif.com)
- Federación Riojana de Natación (https://www.frnatacion.es)
- Federació Balear de Natació (https://www.fbnatacion.org)
- Federación Extremeña de Natación (https://www.fexnatacion.com)

### Regional Triathlon Federations
- Federació Catalana de Triatlón (https://www.triatlocatalunya.org)
- Federación Madrileña de Triatlón (https://www.triatlonmadrid.org)
- Federación de Triatlón de la Comunidad Valenciana (https://www.triatlocv.org)
- Federación de Triatlón de la Región de Murcia (https://www.trimurcia.org)
- Federación Canaria de Triatlón (https://www.fecantri.org)
- Federación Gallega de Triatlón (https://www.fegatri.org)
- Federación de Triatlón de Castilla y León (https://www.triatlon-cyl.com)
- Federación de Triatlón de Castilla-La Mancha (https://www.triatlonclm.org)
- Federación Cántabra de Triatlón (https://www.fetricantabria.com)
- Federación Navarra de Triatlón (https://www.navarratriatlon.com)
- Federación Riojana de Triatlón (https://www.fertriatlon.com)
- Federació Balear de Triatlón (https://www.fetrib.com)
- Federación Extremeña de Triatlón (https://www.fextri.org)
- Federación Asturiana de Triatlón (https://www.fastri.com)
- Federación Aragonesa de Triatlón (https://www.triatlonaragon.org)
- Euskadiko Triatloi Federazioa (https://www.triatloi.org)

---

## Step 1: Search for Events

For EACH federation, use the `search` tool with `type='data'` to find events for **BOTH 2025 AND 2026**:

**Search Query Template (run both queries per federation):**
```
"[Federation Name] eventos calendario 2025"
"[Federation Name] eventos calendario 2026"
```

**Examples:**
- "RFEN eventos natación 2025"
- "RFEN eventos natación 2026"
- "FETRI triatlón calendario 2025"
- "FETRI triatlón calendario 2026"
- "Federación Andaluza Natación eventos 2025"
- "Federación Andaluza Natación eventos 2026"

**CRITICAL:** Always search for BOTH years. Do not skip 2026.

---

## Step 2: Extract Event Data

For each event found, extract ALL available information:

### Required Fields (MUST be present)

| Field | Format | Example | Validation |
|-------|--------|---------|------------|
| `name.es` | String | "Campeonato de España Absoluto" | Not empty |
| `name.en` | String | "Spanish Absolute Championship" | Translate or copy Spanish |
| `date` | ISO 8601 | "2025-12-30T10:00:00.000Z" | Valid date, in future |
| `location.city` | String | "Madrid" | Not empty, capitalized |
| `location.region` | String | "Madrid" | Valid Spanish region |
| `location.country` | String | "Spain" | Always "Spain" |
| `discipline` | String | "Natación" | Valid discipline |
| `federation` | String | "RFEN" | Federation name |

### Optional Fields (Fill if available)

| Field | Format | Example | Notes |
|-------|--------|---------|-------|
| `endDate` | ISO 8601 | "2025-12-31T18:00:00.000Z" | Use `date` if not specified |
| `location.venue` | String | "Centro Acuático M-86" | Facility name |
| `location.address` | String | "Calle Example 123" | Full address |
| `category` | String | "Absoluto" | Age/level category |
| `contact.email` | String | "eventos@rfen.es" | Valid email format |
| `contact.phone` | String | "+34912345678" | International format |
| `contact.website` | String | "https://..." | Valid URL |
| `description.es` | String | "Campeonato nacional..." | Event details in Spanish |
| `description.en` | String | "National championship..." | Translate Spanish |
| `registrationUrl` | String | "https://..." | Registration link |
| `maxCapacity` | Integer | 500 | Convert to number |
| `currentRegistrations` | Integer | 0 | Default to 0 if unknown |

### Auto-Generated Fields (Always include)

| Field | Value | Notes |
|-------|-------|-------|
| `source` | "federation-scraper" | Hardcode this value |
| `createdAt` | `new Date().toISOString()` | Current timestamp |
| `updatedAt` | `new Date().toISOString()` | Current timestamp |
| `seo.canonical` | Auto-generate from event name | See SEO section below |
| `seo.metaTitle` | Auto-generate | See SEO section below |
| `seo.metaDescription` | Auto-generate | See SEO section below |
| `seo.keywords` | Auto-generate array | See SEO section below |

---

## Step 3: Data Normalization & Validation

### Date Handling (CRITICAL)

**Convert ALL dates to full ISO 8601 format with time:**

```javascript
// If you have date and time
"2025-12-30 10:00" → "2025-12-30T10:00:00.000Z"

// If you only have date (no time)
"2025-12-30" → "2025-12-30T00:00:00.000Z"

// If date is in DD/MM/YYYY format
"30/12/2025" → "2025-12-30T00:00:00.000Z"
```

**ALWAYS include:**
- Full year (4 digits)
- Month (2 digits)
- Day (2 digits)
- Time with `T` separator
- Timezone indicator `.000Z`

**Filter out past events:**
```javascript
const eventDate = new Date(date);
const today = new Date();
if (eventDate < today) {
  console.log(`⏭️ Skipping past event: ${name}`);
  continue; // Skip this event
}
```

### Discipline Standardization

Map all variations to these standard values:

| Input Variations | Standard Value |
|------------------|----------------|
| "natacion", "natación", "swimming", "NATACION" | "Natación" |
| "triatlon", "triatlón", "triathlon", "TRIATLON" | "Triatlón" |
| "duatlon", "duatlón", "duathlon" | "Duatlón" |
| "acuatlon", "acuatlón", "aquathlon" | "Acuatlón" |
| "waterpolo", "water polo", "polo acuático" | "Waterpolo" |
| "natacion artistica", "natación artística", "synchronized swimming" | "Natación Artística" |
| "aguas abiertas", "open water", "aguas abiertas natación" | "Aguas Abiertas" |
| "saltos", "diving", "saltos de trampolín" | "Saltos" |

### Region Standardization

Map all variations to these standard region names:

| Input Variations | Standard Region |
|------------------|-----------------|
| "Catalunya", "Catalonia", "CAT" | "Cataluña" |
| "Comunidad Valenciana", "C. Valenciana", "Valencia" | "Valencia" |
| "Comunidad de Madrid", "C. Madrid" | "Madrid" |
| "Andalucia" (no accent) | "Andalucía" |
| "Pais Vasco", "Euskadi", "Basque Country" | "País Vasco" |
| "Castilla Leon", "CyL" | "Castilla y León" |
| "Castilla La Mancha", "CLM" | "Castilla-La Mancha" |
| "Illes Balears", "Islas Baleares" | "Baleares" |
| "Islas Canarias" | "Canarias" |
| "Region de Murcia" | "Murcia" |

### Number Conversion

```javascript
// Convert capacity to integer
maxCapacity: parseInt(capacityString) || 0

// Convert registrations to integer
currentRegistrations: parseInt(registrationsString) || 0
```

---

## Step 4: SEO Fields Generation

For EVERY event, generate SEO fields automatically:

```javascript
const seo = {
  canonical: `https://aquaevents.club/eventos/${slugify(name.es)}-${slugify(location.city)}-${year}`,
  metaTitle: `${name.es} ${year} en ${location.city} - AquaEvents.club`,
  metaDescription: `Información completa sobre ${name.es}. Competición de ${discipline} en ${location.city}, ${location.region}. Fecha: ${formatDate(date)}. Detalles de inscripción y requisitos.`,
  keywords: [
    name.es,
    `${discipline} ${location.city}`,
    `${discipline} ${location.region} ${year}`,
    federation,
    `Eventos ${discipline} España`
  ]
};

// Helper function to create URL-friendly slug
function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

// Helper function to format date for description
function formatDate(isoDate) {
  const date = new Date(isoDate);
  return date.toLocaleDateString('es-ES', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}
```

---

## Step 5: MongoDB Connection & Save

### Connection

```javascript
import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const client = new MongoClient(MONGODB_URI);

await client.connect();
const db = client.db('aquaevents');
const collection = db.collection('events');
```

### Complete Document Structure

```javascript
const eventDocument = {
  // Required fields
  name: {
    es: "Campeonato de España Absoluto de Natación",
    en: "Spanish Absolute Swimming Championship"
  },
  date: "2025-12-30T10:00:00.000Z",
  endDate: "2026-01-02T18:00:00.000Z", // Or use date if not specified
  location: {
    city: "Madrid",
    region: "Madrid",
    venue: "Centro Acuático M-86", // Optional
    address: "", // Optional
    country: "Spain"
  },
  discipline: "Natación",
  category: "Absoluto", // Optional
  federation: "RFEN",
  
  // Contact information (optional)
  contact: {
    email: "eventos@rfen.es",
    phone: "+34912345678",
    website: "https://www.rfen.es/evento/campeonato-absoluto-2025"
  },
  
  // Descriptions (optional but recommended)
  description: {
    es: "Campeonato nacional de natación en todas las categorías.",
    en: "National swimming championship in all categories."
  },
  
  // Registration (optional)
  registrationUrl: "https://www.rfen.es/inscripciones/absoluto-2025",
  maxCapacity: 500, // Integer, 0 if unknown
  currentRegistrations: 0, // Integer, default 0
  
  // Metadata (required)
  source: "federation-scraper",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  
  // SEO (required)
  seo: {
    canonical: "https://aquaevents.club/eventos/campeonato-españa-absoluto-natacion-madrid-2025",
    metaTitle: "Campeonato de España Absoluto de Natación 2025 en Madrid - AquaEvents.club",
    metaDescription: "Información completa sobre Campeonato de España Absoluto de Natación. Competición de Natación en Madrid, Madrid. Fecha: 30 de diciembre de 2025. Detalles de inscripción y requisitos.",
    keywords: [
      "Campeonato de España Absoluto de Natación",
      "Natación Madrid",
      "Natación Madrid 2025",
      "RFEN",
      "Eventos Natación España"
    ]
  }
};
```

### Upsert Logic (Prevent Duplicates)

```javascript
// Check if event already exists
const existingEvent = await collection.findOne({
  "name.es": eventDocument.name.es,
  "date": eventDocument.date,
  "location.city": eventDocument.location.city
});

if (existingEvent) {
  // UPDATE existing event
  await collection.updateOne(
    { _id: existingEvent._id },
    { 
      $set: {
        ...eventDocument,
        updatedAt: new Date().toISOString()
      }
    }
  );
  console.log(`✅ UPDATED: ${eventDocument.name.es} (${eventDocument.date})`);
} else {
  // INSERT new event
  await collection.insertOne(eventDocument);
  console.log(`✅ INSERTED: ${eventDocument.name.es} (${eventDocument.date})`);
}
```

---

## Step 6: Error Handling

Handle these scenarios gracefully:

```javascript
// 1. Federation website unreachable
try {
  const results = await search({ type: 'data', queries: [...] });
} catch (error) {
  console.log(`⚠️ ${federationName} website unreachable. Skipping.`);
  continue; // Move to next federation
}

// 2. Invalid date format
try {
  const eventDate = new Date(dateString);
  if (isNaN(eventDate.getTime())) {
    throw new Error('Invalid date');
  }
} catch (error) {
  console.log(`⚠️ Invalid date for event: ${eventName}. Skipping.`);
  continue; // Skip this event
}

// 3. Missing required fields
if (!name || !date || !city || !region || !discipline) {
  console.log(`⚠️ Missing required fields for event: ${name || 'Unknown'}. Skipping.`);
  continue; // Skip this event
}

// 4. MongoDB connection failure
try {
  await client.connect();
} catch (error) {
  console.error(`❌ MongoDB connection failed: ${error.message}`);
  process.exit(1); // Exit with error, will retry next run
}
```

---

## Step 7: Final Report

At the end of execution, provide this comprehensive report:

```
=== FEDERATION SCRAPER REPORT ===
Date: [Current Date] UTC
Duration: [Execution Time]

📊 OVERALL STATISTICS:
- Federations processed: X/33
- Total events found: XXX
- New events inserted: XX
- Existing events updated: XX
- Events skipped (invalid data): X
- Federations failed: X

📋 BREAKDOWN BY YEAR:
- 2025 events: XXX
- 2026 events: XXX

📋 BREAKDOWN BY SPORT:
- Natación: XX events
- Triatlón: XX events
- Duatlón: XX events
- Waterpolo: XX events
- [... other disciplines ...]

📋 BREAKDOWN BY FEDERATION:
- RFEN: XX events
- FETRI: XX events
- Federación Andaluza de Natación: XX events
- [... top 10 federations by event count ...]

📅 DATE RANGE:
- Earliest event: YYYY-MM-DD
- Latest event: YYYY-MM-DD

⚠️ FAILED FEDERATIONS:
- [Federation Name] (reason: website unreachable)
- [Federation Name] (reason: PDF extraction failed)

📄 EVENTS SKIPPED (Invalid Data):
- [Event Name] from [Federation] (reason: missing city)
- [Event Name] from [Federation] (reason: invalid date format)

✅ TASK COMPLETED SUCCESSFULLY
```

---

## Execution Checklist

Before running, verify:

- [ ] MongoDB connection string is set in environment
- [ ] Search queries include BOTH 2025 AND 2026
- [ ] All required fields are being extracted
- [ ] Dates are converted to full ISO 8601 format
- [ ] SEO fields are auto-generated for every event
- [ ] Duplicate detection is working (upsert logic)
- [ ] Error handling prevents task from crashing
- [ ] Final report includes all sections

---

## Quick Reference: Required vs Optional Fields

### ✅ REQUIRED (Must be present)
- `name.es`, `name.en`
- `date` (ISO 8601 with time)
- `location.city`, `location.region`, `location.country`
- `discipline`
- `federation`
- `source`, `createdAt`, `updatedAt`
- `seo.canonical`, `seo.metaTitle`, `seo.metaDescription`, `seo.keywords`

### ⚠️ OPTIONAL (Fill if available)
- `endDate`
- `location.venue`, `location.address`
- `category`
- `contact.email`, `contact.phone`, `contact.website`
- `description.es`, `description.en`
- `registrationUrl`
- `maxCapacity`, `currentRegistrations`

---

**Document Version:** 2.0 (Updated for 2025-2026)  
**Last Updated:** 2025-11-24  
**Author:** Manus AI

