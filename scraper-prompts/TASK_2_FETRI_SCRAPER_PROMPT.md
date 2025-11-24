# Task 2: FETRI National Triathlon Events Scraper

**Scheduled Task Configuration:**
- **Task Name:** `FETRI National Triathlon Events Scraper`
- **Schedule:** `0 0 7 5 * *` (Monthly on 5th at 7:00 AM UTC)
- **Repeat:** Yes
- **Timeout:** 30 minutes

---

## Mission

Extract all upcoming triathlon, duathlon, and aquathlon events from the **Federación Española de Triatlón (FETRI)** website for years 2025-2026 and save them to the AquaEvents MongoDB database. FETRI is the national governing body for triathlon sports in Spain.

---

## Target Federation

**Federación Española de Triatlón (FETRI)**
- **Website:** https://www.triatlon.org
- **Disciplines Covered:** Triatlón (triathlon), Duatlón (duathlon), Acuatlón (aquathlon), Triatlón Cross (cross triathlon)
- **Event Calendar Pages:**
  - Main calendar: https://www.triatlon.org/calendario
  - National championships: https://www.triatlon.org/competiciones/campeonatos-de-espana
  - Regional events: https://www.triatlon.org/competiciones/autonomicas
- **Technical Notes:** 
  - FETRI uses JavaScript-heavy calendar interfaces
  - Event details often require clicking through to individual event pages
  - Some events are listed in Excel/PDF downloadable calendars
  - Event categories include: Élite, Sub-23, Junior, Cadete, Infantil, Benjamín, Alevín, Popular

---

## Scraping Instructions

### Step 1: Search for Events

Use the Manus `search` tool with `type='data'` to find FETRI events. Execute multiple searches to ensure comprehensive coverage:

**Search Queries:**
1. `"FETRI eventos triatlón 2025"`
2. `"FETRI eventos triatlón 2026"`
3. `"Federación Española Triatlón calendario 2025"`
4. `"Federación Española Triatlón calendario 2026"`
5. `"FETRI duatlón calendario 2025 2026"`
6. `"FETRI acuatlón eventos 2025 2026"`
7. `"FETRI campeonatos España 2025 2026"`
8. `"FETRI triatlón cross 2025 2026"`

**Important:** If search results include Excel or PDF calendar links, use browser tools to download and extract event information from these files.

### Step 2: Extract Event Data

For each event found, extract the following information:

| Field | Required | Notes |
|-------|----------|-------|
| Event Name | ✅ Yes | Spanish title (e.g., "Campeonato de España de Triatlón Élite") |
| Start Date | ✅ Yes | Full ISO format with time if available (e.g., "2025-06-15T09:00:00.000Z") |
| End Date | ⚠️ Optional | Full ISO format; many triathlons are single-day events |
| City | ✅ Yes | Event location city (e.g., "Valencia") |
| Region | ✅ Yes | Autonomous community (e.g., "Valencia", "Andalucía") |
| Venue | ⚠️ Optional | Location name (e.g., "Playa de la Malvarrosa") |
| Discipline | ✅ Yes | One of: "Triatlón", "Duatlón", "Acuatlón", "Triatlón Cross" |
| Category | ⚠️ Optional | Age/level (e.g., "Élite", "Sub-23", "Junior", "Popular", "Sprint", "Olímpico", "Media Distancia", "Larga Distancia") |
| Contact Email | ⚠️ Optional | Event organizer email |
| Contact Phone | ⚠️ Optional | Event organizer phone |
| Website URL | ⚠️ Optional | Event-specific URL or FETRI page |
| Description | ⚠️ Optional | Event details in Spanish (include distances if available) |
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
- `discipline` must be one of: "Triatlón", "Duatlón", "Acuatlón", "Triatlón Cross"

**Data Normalization:**
- Convert all dates to full ISO 8601 format: `YYYY-MM-DDTHH:MM:SS.000Z`
- If only date is available (no time), use `T09:00:00.000Z` (typical triathlon start time)
- Ensure `maxCapacity` is an integer (use `parseInt()`)
- Ensure `currentRegistrations` is an integer if provided
- Trim whitespace from all string fields
- Capitalize city and region names properly
- Normalize discipline names (e.g., "triatlon" → "Triatlón", "duathlon" → "Duatlón")

**Category Standardization:**

Map common FETRI category names to standardized values:

| FETRI Category | Standardized Category |
|----------------|----------------------|
| "Élite" / "Elite" / "ELITE" | "Élite" |
| "Sub23" / "Sub-23" / "SUB23" | "Sub-23" |
| "Junior" / "JUNIOR" | "Junior" |
| "Cadete" / "CADETE" | "Cadete" |
| "Infantil" / "INFANTIL" | "Infantil" |
| "Popular" / "POPULAR" / "Age Group" | "Popular" |
| "Sprint" / "SPRINT" | "Sprint" |
| "Olímpico" / "Olimpico" / "Olympic" | "Olímpico" |
| "Media Distancia" / "Half" / "70.3" | "Media Distancia" |
| "Larga Distancia" / "Long Distance" / "Ironman" | "Larga Distancia" |

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
    "es": "Campeonato de España de Triatlón Élite",
    "en": "Spanish Elite Triathlon Championship"
  },
  "date": "2025-06-15T09:00:00.000Z",
  "endDate": "2025-06-15T14:00:00.000Z",
  "location": {
    "city": "Valencia",
    "region": "Valencia",
    "venue": "Playa de la Malvarrosa",
    "address": "",
    "country": "Spain"
  },
  "discipline": "Triatlón",
  "category": "Élite",
  "federation": "FETRI",
  "contact": {
    "email": "competiciones@triatlon.org",
    "phone": "+34913456789",
    "website": "https://www.triatlon.org/evento/campeonato-elite-2025"
  },
  "description": {
    "es": "Campeonato nacional de triatlón en categoría élite. Distancia olímpica: 1.5km natación, 40km ciclismo, 10km carrera. Clasificatorio para campeonatos internacionales.",
    "en": "National elite triathlon championship. Olympic distance: 1.5km swim, 40km bike, 10km run. Qualifier for international championships."
  },
  "registrationUrl": "https://www.triatlon.org/inscripciones/elite-2025",
  "maxCapacity": 300,
  "currentRegistrations": 0,
  "source": "fetri-scraper",
  "createdAt": "2025-11-23T07:00:00.000Z",
  "updatedAt": "2025-11-23T07:00:00.000Z",
  "seo": {
    "canonical": "https://aquaevents.club/eventos/campeonato-españa-triatlon-elite-valencia-2025",
    "metaTitle": "Campeonato de España de Triatlón Élite 2025 en Valencia",
    "metaDescription": "Información completa sobre el Campeonato de España de Triatlón Élite 2025. Competición nacional en Valencia el 15 de junio. Distancia olímpica.",
    "keywords": [
      "Campeonato España Triatlón",
      "FETRI",
      "Triatlón Valencia 2025",
      "Triatlón Élite España"
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
| `endDate` | End date/time | Convert to ISO 8601, or calculate based on typical event duration |
| `location.city` | City name | Capitalize properly |
| `location.region` | Autonomous community | Map to standard region name |
| `location.venue` | Location name | Direct copy if available |
| `discipline` | Sport type | Map to standardized discipline name |
| `category` | Age/level/distance | Standardize using category mapping table |
| `federation` | Always "FETRI" | Hardcode |
| `contact.email` | Contact email | Direct copy if available |
| `contact.phone` | Contact phone | Format as international (+34...) |
| `contact.website` | Event URL | Direct copy |
| `description.es` | Event description | Extract from page, include distances |
| `description.en` | English description | Translate Spanish description |
| `registrationUrl` | Registration link | Direct copy if available |
| `maxCapacity` | Max participants | Convert to integer |
| `source` | Always "fetri-scraper" | Hardcode |
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

**Scenario 1: FETRI Website is Down**
```
If search returns no results or connection errors:
- Log: "⚠️ FETRI website unreachable. Skipping this run."
- Exit gracefully without errors
- Task will retry next month
```

**Scenario 2: Excel/PDF Extraction Fails**
```
If calendar file cannot be parsed:
- Log: "⚠️ Could not extract events from file: [URL]"
- Continue with other sources
- Include file URL in final report for manual review
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
=== FETRI SCRAPER REPORT ===
Date: 2025-11-23 07:00:00 UTC
Duration: 6 minutes 18 seconds

📊 STATISTICS:
- Total events found: 34
- New events inserted: 8
- Existing events updated: 26
- Events skipped (invalid data): 0
- Errors encountered: 0

📋 BREAKDOWN BY DISCIPLINE:
- Triatlón: 22 events
- Duatlón: 8 events
- Acuatlón: 3 events
- Triatlón Cross: 1 event

📋 BREAKDOWN BY CATEGORY:
- Élite: 4 events
- Popular: 18 events
- Junior: 6 events
- Sprint: 12 events
- Olímpico: 10 events
- Media Distancia: 4 events

📅 DATE RANGE:
- Earliest event: 2025-12-10
- Latest event: 2026-11-28

✅ TASK COMPLETED SUCCESSFULLY
```

---

## Testing Checklist

Before deploying this scheduled task, verify:

- [ ] MongoDB connection string is correct (password inserted)
- [ ] Search queries return relevant FETRI events
- [ ] Date parsing handles both "YYYY-MM-DD" and "DD/MM/YYYY" formats
- [ ] Category standardization works correctly
- [ ] Duplicate detection prevents creating duplicate events
- [ ] All required fields are populated
- [ ] Events from 2024 or earlier are filtered out
- [ ] Task completes within 30-minute timeout
- [ ] Final report is clear and actionable

---

## Maintenance Notes

**Monthly Review:**
- Check final report for any skipped events or errors
- Manually verify a sample of 5-10 events on FETRI website
- Update search queries if FETRI changes their website structure

**Quarterly Review:**
- Verify all disciplines are being captured
- Check if new event categories have been added by FETRI
- Update category standardization mapping if needed
- Verify distance information is being captured accurately

---

**Document Version:** 1.0  
**Last Updated:** 2025-11-23  
**Author:** Manus AI

