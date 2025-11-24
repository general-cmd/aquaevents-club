# Task 3: Regional Swimming & Triathlon Federations Scraper

**Scheduled Task Configuration:**
- **Task Name:** `Regional Swimming & Triathlon Federations Scraper`
- **Schedule:** `0 0 7 10 * *` (Monthly on 10th at 7:00 AM UTC)
- **Repeat:** Yes
- **Timeout:** 60 minutes (longer due to multiple federations)

---

## Mission

Extract all upcoming aquatic sports events from **ALL Spanish regional federations** (swimming and triathlon) for years 2025-2026 and save them to the AquaEvents MongoDB database. This task covers 31 regional federations across Spain.

---

## Target Federations

### Swimming Federations (15 total)

| Federation | Region | Website | Technical Notes |
|------------|--------|---------|-----------------|
| Federación Andaluza de Natación | Andalucía | https://www.fan.es | HTML calendar, some PDFs |
| Federación Aragonesa de Natación | Aragón | https://www.fanaragon.com | JavaScript calendar |
| Federació Catalana de Natació | Cataluña | https://www.natacio.cat | Advanced calendar system |
| Federación Madrileña de Natación | Madrid | https://www.federacionmadridnatacion.es | HTML tables |
| Federación de Natación de la Comunidad Valenciana | Valencia | https://www.fncv.es | PDF calendars |
| Federación de Natación de la Región de Murcia | Murcia | https://www.fnmurcia.org | HTML calendar |
| Federación Canaria de Natación | Canarias | https://www.fedecanat.es | Mixed HTML/PDF |
| Federación Gallega de Natación | Galicia | https://www.fegan.org | HTML calendar |
| Federación de Natación de Castilla y León | Castilla y León | https://www.fenacyl.org | PDF calendars |
| Federación de Natación de Castilla-La Mancha | Castilla-La Mancha | https://www.fnclm.com | HTML tables |
| Federación Cántabra de Natación | Cantabria | https://www.fncantabria.com | Simple HTML |
| Federación Navarra de Natación | Navarra | https://www.fnn-nif.com | HTML calendar |
| Federación Riojana de Natación | La Rioja | https://www.frnatacion.es | HTML tables |
| Federació Balear de Natació | Baleares | https://www.fbnatacion.org | JavaScript calendar |
| Federación Extremeña de Natación | Extremadura | https://www.fexnatacion.com | PDF calendars |

### Triathlon Federations (16 total)

| Federation | Region | Website | Technical Notes |
|------------|--------|---------|-----------------|
| Federació Catalana de Triatlón | Cataluña | https://www.triatlocatalunya.org | Advanced calendar |
| Federación Madrileña de Triatlón | Madrid | https://www.triatlonmadrid.org | HTML calendar |
| Federación de Triatlón de la Comunidad Valenciana | Valencia | https://www.triatlocv.org | JavaScript calendar |
| Federación de Triatlón de la Región de Murcia | Murcia | https://www.trimurcia.org | HTML tables |
| Federación Canaria de Triatlón | Canarias | https://www.fecantri.org | Mixed HTML/PDF |
| Federación Gallega de Triatlón | Galicia | https://www.fegatri.org | HTML calendar |
| Federación de Triatlón de Castilla y León | Castilla y León | https://www.triatlon-cyl.com | Simple HTML |
| Federación de Triatlón de Castilla-La Mancha | Castilla-La Mancha | https://www.triatlonclm.org | HTML tables |
| Federación Cántabra de Triatlón | Cantabria | https://www.fetricantabria.com | Basic HTML |
| Federación Navarra de Triatlón | Navarra | https://www.navarratriatlon.com | HTML calendar |
| Federación Riojana de Triatlón | La Rioja | https://www.fertriatlon.com | Simple HTML |
| Federació Balear de Triatlón | Baleares | https://www.fetrib.com | JavaScript calendar |
| Federación Extremeña de Triatlón | Extremadura | https://www.fextri.org | HTML tables |
| Federación Asturiana de Triatlón | Asturias | https://www.fastri.com | HTML calendar |
| Federación Aragonesa de Triatlón | Aragón | https://www.triatlonaragon.org | JavaScript calendar |
| Euskadiko Triatloi Federazioa | País Vasco | https://www.triatloi.org | Basque/Spanish bilingual |

---

## Scraping Instructions

### Step 1: Iterate Through All Federations

**Process each federation sequentially** to avoid overwhelming the system. For each federation:

1. Log: `"🔍 Processing: [Federation Name]"`
2. Execute search queries
3. Extract and save events
4. Log results: `"✅ [Federation Name]: X events found, Y inserted, Z updated"`
5. Wait 5 seconds before next federation (rate limiting)

### Step 2: Search for Events (Per Federation)

For **each federation**, use the Manus `search` tool with `type='data'`:

**Search Query Template:**
```
"[Federation Name] eventos calendario 2025"
"[Federation Name] calendario 2026"
"[Federation Website Domain] eventos"
```

**Example for Federación Andaluza de Natación:**
```
"Federación Andaluza de Natación eventos calendario 2025"
"Federación Andaluza de Natación calendario 2026"
"fan.es eventos natación"
```

**Important Handling by Website Type:**

| Website Type | Approach |
|--------------|----------|
| HTML calendar | Use browser tool to navigate and extract table data |
| JavaScript calendar | Use browser tool with wait for dynamic content |
| PDF calendar | Download PDF and extract text, parse dates |
| Excel/ODF files | Download file and parse spreadsheet data |

### Step 3: Extract Event Data

For each event found, extract the following information:

| Field | Required | Notes |
|-------|----------|-------|
| Event Name | ✅ Yes | Spanish title |
| Start Date | ✅ Yes | Full ISO format with time if available |
| End Date | ⚠️ Optional | Full ISO format |
| City | ✅ Yes | Event location city |
| Region | ✅ Yes | Must match federation's region |
| Venue | ⚠️ Optional | Facility name |
| Discipline | ✅ Yes | Natación, Triatlón, Duatlón, Acuatlón, Waterpolo, etc. |
| Category | ⚠️ Optional | Age/level category |
| Contact Email | ⚠️ Optional | Event organizer email |
| Contact Phone | ⚠️ Optional | Event organizer phone |
| Website URL | ⚠️ Optional | Event-specific URL |
| Description | ⚠️ Optional | Event details in Spanish |
| Registration URL | ⚠️ Optional | Link to registration page |
| Max Capacity | ⚠️ Optional | Maximum participants (as integer) |

### Step 4: Data Validation

Before saving to MongoDB, validate each event:

**Required Field Checks:**
- `name` must not be empty
- `date` must be a valid ISO 8601 timestamp
- `date` must be in the future (after today)
- `location.city` must not be empty
- `location.region` must match the federation's region
- `discipline` must be a valid aquatic sport

**Data Normalization:**
- Convert all dates to full ISO 8601 format: `YYYY-MM-DDTHH:MM:SS.000Z`
- If only date is available (no time), use `T00:00:00.000Z`
- Ensure `maxCapacity` is an integer (use `parseInt()`)
- Ensure `currentRegistrations` is an integer if provided
- Trim whitespace from all string fields
- Capitalize city and region names properly

**Region Mapping:**

Ensure the region field matches these standardized names:

| Common Variations | Standardized Region |
|-------------------|---------------------|
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
| "La Rioja", "Rioja" | "La Rioja" |

### Step 5: Save to MongoDB

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
    "es": "Campeonato Autonómico de Natación",
    "en": "Regional Swimming Championship"
  },
  "date": "2025-12-20T10:00:00.000Z",
  "endDate": "2025-12-21T18:00:00.000Z",
  "location": {
    "city": "Sevilla",
    "region": "Andalucía",
    "venue": "Centro Acuático San Pablo",
    "address": "",
    "country": "Spain"
  },
  "discipline": "Natación",
  "category": "Absoluto",
  "federation": "Federación Andaluza de Natación",
  "contact": {
    "email": "competiciones@fan.es",
    "phone": "+34954123456",
    "website": "https://www.fan.es/eventos/campeonato-autonomico-2025"
  },
  "description": {
    "es": "Campeonato autonómico de natación en todas las categorías. Clasificatorio para campeonatos nacionales.",
    "en": "Regional swimming championship in all categories. Qualifier for national championships."
  },
  "registrationUrl": "https://www.fan.es/inscripciones/autonomico-2025",
  "maxCapacity": 400,
  "currentRegistrations": 0,
  "source": "regional-scraper",
  "createdAt": "2025-11-23T07:00:00.000Z",
  "updatedAt": "2025-11-23T07:00:00.000Z",
  "seo": {
    "canonical": "https://aquaevents.club/eventos/campeonato-autonomico-natacion-sevilla-2025",
    "metaTitle": "Campeonato Autonómico de Natación 2025 en Sevilla",
    "metaDescription": "Información completa sobre el Campeonato Autonómico de Natación 2025. Competición regional en Sevilla del 20 al 21 de diciembre.",
    "keywords": [
      "Campeonato Andalucía Natación",
      "Natación Sevilla 2025",
      "FAN Eventos"
    ]
  }
}
```

**Field Mapping Notes:**

| MongoDB Field | Source Data | Transformation |
|---------------|-------------|----------------|
| `federation` | Federation name | Use full federation name from table above |
| `location.region` | Federation region | Use standardized region name |
| `source` | Always "regional-scraper" | Hardcode |
| All other fields | Same as RFEN/FETRI tasks | Follow same mapping rules |

### Step 6: Upsert Logic (Prevent Duplicates)

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

---

## Error Handling

Handle these common scenarios gracefully:

**Scenario 1: Federation Website is Down**
```
If search returns no results or connection errors for a federation:
- Log: "⚠️ [Federation Name] website unreachable. Skipping."
- Continue with next federation
- Include federation name in final report's "Failed Federations" section
```

**Scenario 2: PDF/Excel Extraction Fails**
```
If file cannot be parsed:
- Log: "⚠️ Could not extract events from file: [URL]"
- Continue with next federation
- Include file URL in final report for manual review
```

**Scenario 3: Invalid Date Format**
```
If date cannot be parsed:
- Log: "⚠️ Invalid date format for event: [Event Name] from [Federation]"
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

**Scenario 5: Timeout Risk**
```
If task is approaching 60-minute timeout:
- Log: "⚠️ Approaching timeout. Processed X/31 federations."
- Save current progress
- Exit gracefully
- Remaining federations will be processed next month
```

---

## Final Report

At the end of execution, provide a comprehensive summary report:

```
=== REGIONAL FEDERATIONS SCRAPER REPORT ===
Date: 2025-11-23 07:00:00 UTC
Duration: 42 minutes 15 seconds

📊 OVERALL STATISTICS:
- Federations processed: 31/31
- Total events found: 287
- New events inserted: 89
- Existing events updated: 198
- Events skipped (invalid data): 4
- Federations failed: 2

📋 BREAKDOWN BY SPORT:
- Natación: 178 events
- Triatlón: 82 events
- Duatlón: 18 events
- Acuatlón: 6 events
- Waterpolo: 3 events

📋 BREAKDOWN BY REGION:
- Cataluña: 45 events
- Madrid: 38 events
- Andalucía: 32 events
- Valencia: 28 events
- Galicia: 22 events
- Murcia: 18 events
- Castilla y León: 16 events
- Canarias: 15 events
- [... other regions ...]

📅 DATE RANGE:
- Earliest event: 2025-12-12
- Latest event: 2026-12-18

⚠️ FAILED FEDERATIONS:
- Federación Asturiana de Natación (website unreachable)
- Federación de Triatlón de Castilla-La Mancha (PDF extraction failed)

📄 FILES REQUIRING MANUAL REVIEW:
- https://www.fnclm.com/calendario2025.pdf (could not parse dates)

✅ TASK COMPLETED SUCCESSFULLY
```

---

## Performance Optimization

To ensure the task completes within 60 minutes:

**Priority Federations (Process First):**
1. Large regions with many events: Cataluña, Madrid, Andalucía, Valencia
2. Federations with reliable HTML calendars (faster to scrape)

**Low-Priority Federations (Process Last):**
1. Small regions with few events: Melilla, Ceuta, La Rioja
2. Federations with PDF-only calendars (slower to process)

**Rate Limiting:**
- Wait 5 seconds between federations
- Wait 2 seconds between search queries for same federation
- If a federation takes >3 minutes, skip and move to next

---

## Testing Checklist

Before deploying this scheduled task, verify:

- [ ] MongoDB connection string is correct (password inserted)
- [ ] All 31 federation URLs are correct and accessible
- [ ] Region name standardization works correctly
- [ ] Duplicate detection prevents creating duplicate events
- [ ] Task can handle federation website failures gracefully
- [ ] Task completes within 60-minute timeout
- [ ] Final report includes all required sections
- [ ] Failed federations are clearly reported for manual follow-up

---

## Maintenance Notes

**Monthly Review:**
- Check final report for failed federations
- Manually verify events from federations that had issues
- Update federation URLs if any have changed
- Review "Files Requiring Manual Review" section

**Quarterly Review:**
- Verify all 31 federations are still active
- Check if new regional federations have been created
- Update technical notes for federations that changed their website
- Optimize processing order based on success rates

**Annual Review:**
- Audit all federation contact information
- Update region mapping if administrative boundaries change
- Review discipline categorization for new event types

---

**Document Version:** 1.0  
**Last Updated:** 2025-11-23  
**Author:** Manus AI

