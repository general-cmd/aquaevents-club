# Task 1: RFEN National Swimming Events Scraper

**Scheduled Task Configuration:**
- **Task Name:** `RFEN National Swimming Events Scraper`
- **Schedule:** `0 0 7 1 * *` (Monthly on 1st at 7:00 AM UTC)
- **Repeat:** Yes
- **Timeout:** 30 minutes

---

## Mission

Extract all upcoming aquatic sports events from the **Real Federación Española de Natación (RFEN)** website for years 2025-2026 and save them to the AquaEvents MongoDB database. RFEN is the national governing body for swimming, water polo, synchronized swimming, diving, and open water swimming in Spain.

---

## Target Federation

**Real Federación Española de Natación (RFEN)**
- **Website:** https://www.rfen.es
- **Disciplines Covered:** Natación (swimming), Waterpolo (water polo), Natación Artística (artistic swimming), Saltos (diving), Aguas Abiertas (open water swimming)
- **Event Calendar Pages:**
  - Main calendar: https://www.rfen.es/calendario
  - Water polo: https://wp.rfen.es/
  - Artistic swimming: https://www.rfen.es/natacion-artistica
  - Open water: https://www.rfen.es/aguas-abiertas
- **Technical Notes:** 
  - RFEN uses a mix of HTML tables and JavaScript-rendered calendars
  - Some event details are in PDF documents (use PDF extraction if needed)
  - Event pages may require clicking through to get full details

---

## Scraping Instructions

### Step 1: Search for Events

Use the Manus `search` tool with `type='data'` to find RFEN events. Execute multiple searches to ensure comprehensive coverage:

**Search Queries:**
1. `"RFEN eventos natación 2025"`
2. `"RFEN eventos natación 2026"`
3. `"Real Federación Española Natación calendario 2025"`
4. `"Real Federación Española Natación calendario 2026"`
5. `"RFEN waterpolo calendario 2025 2026"`
6. `"RFEN natación artística eventos 2025 2026"`
7. `"RFEN aguas abiertas calendario 2025 2026"`
8. `"RFEN saltos competiciones 2025 2026"`

**Important:** If search results include PDF links, use browser tools to navigate to the PDF and extract event information.

### Step 2: Extract Event Data

For each event found, extract the following information:

| Field | Required | Notes |
|-------|----------|-------|
| Event Name | ✅ Yes | Spanish title (e.g., "Campeonato de España Absoluto") |
| Start Date | ✅ Yes | Full ISO format with time if available (e.g., "2025-12-30T10:00:00.000Z") |
| End Date | ⚠️ Optional | Full ISO format; if not specified, use start date |
| City | ✅ Yes | Event location city (e.g., "Madrid") |
| Region | ✅ Yes | Autonomous community (e.g., "Madrid", "Cataluña") |
| Venue | ⚠️ Optional | Facility name (e.g., "Piscina Municipal de Sabadell") |
| Discipline | ✅ Yes | One of: "Natación", "Waterpolo", "Natación Artística", "Saltos", "Aguas Abiertas" |
| Category | ⚠️ Optional | Age/level (e.g., "Absoluto", "Junior", "Master", "Infantil") |
| Contact Email | ⚠️ Optional | Event organizer email |
| Contact Phone | ⚠️ Optional | Event organizer phone |
| Website URL | ⚠️ Optional | Event-specific URL or RFEN page |
| Description | ⚠️ Optional | Event details in Spanish |
| Registration URL | ⚠️ Optional | Link to registration page |
| Max Capacity | ⚠️ Optional | Maximum participants (as integer) |

### Step 3: Data Validation

Before saving to MongoDB, validate each event:

**Required Field Checks:**
- `name` must not be empty
- `date` must be a valid ISO 8601 timestamp
- `date` must be in the future (after today)
- `location.city` must not be empty
- `location.region` must be a valid Spanish region
- `discipline` must be one of the allowed values

**Data Normalization:**
- Convert all dates to full ISO 8601 format: `YYYY-MM-DDTHH:MM:SS.000Z`
- If only date is available (no time), use `T00:00:00.000Z`
- Ensure `maxCapacity` is an integer (use `parseInt()`)
- Ensure `currentRegistrations` is an integer if provided
- Trim whitespace from all string fields
- Capitalize city and region names properly

### Step 4: Save to MongoDB

**Connection Details:**
```javascript
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://aquaevents:[INSERT_PASSWORD]@cluster0.mongodb.net/aquaevents";
const DATABASE_NAME = "aquaevents";
const COLLECTION_NAME = "events";
```

**Document Structure:**

```json
{
  "name": {
    "es": "Campeonato de España Absoluto de Natación",
    "en": "Spanish Absolute Swimming Championship"
  },
  "date": "2025-12-30T10:00:00.000Z",
  "endDate": "2026-01-02T18:00:00.000Z",
  "location": {
    "city": "Madrid",
    "region": "Madrid",
    "venue": "Centro Acuático M-86",
    "address": "",
    "country": "Spain"
  },
  "discipline": "Natación",
  "category": "Absoluto",
  "federation": "RFEN",
  "contact": {
    "email": "eventos@rfen.es",
    "phone": "+34912345678",
    "website": "https://www.rfen.es/evento/campeonato-absoluto-2025"
  },
  "description": {
    "es": "Campeonato nacional de natación en todas las categorías. Incluye pruebas de 50m, 100m, 200m, 400m, 800m y 1500m en estilos libre, espalda, braza y mariposa.",
    "en": "National swimming championship in all categories. Includes 50m, 100m, 200m, 400m, 800m and 1500m events in freestyle, backstroke, breaststroke and butterfly."
  },
  "registrationUrl": "https://www.rfen.es/inscripciones/absoluto-2025",
  "maxCapacity": 500,
  "currentRegistrations": 0,
  "source": "rfen-scraper",
  "createdAt": "2025-11-23T07:00:00.000Z",
  "updatedAt": "2025-11-23T07:00:00.000Z",
  "seo": {
    "canonical": "https://aquaevents.club/eventos/campeonato-españa-absoluto-natacion-madrid-2025",
    "metaTitle": "Campeonato de España Absoluto de Natación 2025 en Madrid",
    "metaDescription": "Información completa sobre el Campeonato de España Absoluto de Natación 2025. Competición nacional en Madrid del 30 de diciembre al 2 de enero.",
    "keywords": [
      "Campeonato España Natación",
      "RFEN",
      "Natación Madrid 2025",
      "Competición Nacional Natación"
    ]
  }
}
```

**Field Mapping Notes:**

| MongoDB Field | Source Data | Transformation |
|---------------|-------------|----------------|
| `name.es` | Event title in Spanish | Direct copy |
| `name.en` | Event title in English | Translate if needed, or copy Spanish |
| `date` | Start date/time | Convert to ISO 8601 with timezone |
| `endDate` | End date/time | Convert to ISO 8601, or use `date` if missing |
| `location.city` | City name | Capitalize properly |
| `location.region` | Autonomous community | Map to standard region name |
| `location.venue` | Facility name | Direct copy if available |
| `discipline` | Sport type | Map to standard discipline name |
| `category` | Age/level category | Direct copy if available |
| `federation` | Always "RFEN" | Hardcode |
| `contact.email` | Contact email | Direct copy if available |
| `contact.phone` | Contact phone | Format as international (+34...) |
| `contact.website` | Event URL | Direct copy |
| `description.es` | Event description | Extract from page or generate summary |
| `description.en` | English description | Translate Spanish description |
| `registrationUrl` | Registration link | Direct copy if available |
| `maxCapacity` | Max participants | Convert to integer |
| `source` | Always "rfen-scraper" | Hardcode |
| `createdAt` | Current timestamp | `new Date().toISOString()` |
| `updatedAt` | Current timestamp | `new Date().toISOString()` |

### Step 5: Upsert Logic (Prevent Duplicates)

**Before inserting**, check if the event already exists in MongoDB:

```javascript
const existingEvent = await collection.findOne({
  "name.es": eventData.name.es,
  "date": eventData.date,
  "location.city": eventData.location.city
});

if (existingEvent) {
  // UPDATE existing event
  await collection.updateOne(
    { _id: existingEvent._id },
    { 
      $set: {
        ...eventData,
        updatedAt: new Date().toISOString()
      }
    }
  );
  console.log(`✅ UPDATED: ${eventData.name.es}`);
} else {
  // INSERT new event
  await collection.insertOne(eventData);
  console.log(`✅ INSERTED: ${eventData.name.es}`);
}
```

**Duplicate Detection Logic:**
- Match on: `name.es` + `date` + `location.city`
- If all three match, consider it a duplicate and UPDATE
- Otherwise, INSERT as new event

---

## Error Handling

Handle these common scenarios gracefully:

**Scenario 1: RFEN Website is Down**
```
If search returns no results or connection errors:
- Log: "⚠️ RFEN website unreachable. Skipping this run."
- Exit gracefully without errors
- Task will retry next month
```

**Scenario 2: PDF Extraction Fails**
```
If PDF cannot be parsed:
- Log: "⚠️ Could not extract events from PDF: [URL]"
- Continue with other sources
- Include PDF URL in final report for manual review
```

**Scenario 3: Invalid Date Format**
```
If date cannot be parsed:
- Log: "⚠️ Invalid date format for event: [Event Name]"
- Skip this event
- Continue with next event
```

**Scenario 4: MongoDB Connection Fails**
```
If MongoDB is unreachable:
- Log: "❌ MongoDB connection failed"
- Exit with error
- Task will retry on next scheduled run
```

---

## Final Report

At the end of execution, provide a summary report:

```
=== RFEN SCRAPER REPORT ===
Date: 2025-11-23 07:00:00 UTC
Duration: 8 minutes 32 seconds

📊 STATISTICS:
- Total events found: 47
- New events inserted: 12
- Existing events updated: 35
- Events skipped (invalid data): 0
- Errors encountered: 0

📋 BREAKDOWN BY DISCIPLINE:
- Natación: 28 events
- Waterpolo: 12 events
- Natación Artística: 4 events
- Aguas Abiertas: 2 events
- Saltos: 1 event

📅 DATE RANGE:
- Earliest event: 2025-12-15
- Latest event: 2026-12-20

✅ TASK COMPLETED SUCCESSFULLY
```

---

## Testing Checklist

Before deploying this scheduled task, verify:

- [ ] MongoDB connection string is correct (password inserted)
- [ ] Search queries return relevant RFEN events
- [ ] Date parsing handles both "YYYY-MM-DD" and "DD/MM/YYYY" formats
- [ ] Duplicate detection prevents creating duplicate events
- [ ] All required fields are populated
- [ ] Events from 2024 or earlier are filtered out
- [ ] Task completes within 30-minute timeout
- [ ] Final report is clear and actionable

---

## Maintenance Notes

**Monthly Review:**
- Check final report for any skipped events or errors
- Manually verify a sample of 5-10 events on RFEN website
- Update search queries if RFEN changes their website structure

**Quarterly Review:**
- Verify all disciplines are being captured
- Check if new event types have been added by RFEN
- Update field mappings if RFEN adds new data fields

---

**Document Version:** 1.0  
**Last Updated:** 2025-11-23  
**Author:** Manus AI

