# AquaEvents Federation Scraper Prompts

## Overview

This directory contains three comprehensive prompt documents for scheduled tasks that automatically scrape aquatic sports events from Spanish federations and save them to the AquaEvents MongoDB database.

## Files

| File | Purpose | Schedule | Federations Covered |
|------|---------|----------|---------------------|
| `TASK_1_RFEN_SCRAPER_PROMPT.md` | National swimming events | 1st of month, 7:00 AM | RFEN (Real Federación Española de Natación) |
| `TASK_2_FETRI_SCRAPER_PROMPT.md` | National triathlon events | 5th of month, 7:00 AM | FETRI (Federación Española de Triatlón) |
| `TASK_3_REGIONAL_SCRAPER_PROMPT.md` | Regional events | 10th of month, 7:00 AM | 31 regional federations (swimming & triathlon) |

## Quick Start

### Step 1: Prepare MongoDB Connection

Before creating the scheduled tasks, you need to insert your MongoDB password into the connection strings in each prompt document.

**Find this line in each prompt:**
```javascript
const MONGODB_URI = "mongodb+srv://aquaevents:[INSERT_PASSWORD]@cluster0.mongodb.net/aquaevents";
```

**Replace `[INSERT_PASSWORD]` with your actual MongoDB password.**

### Step 2: Create Scheduled Tasks in Manus

1. Go to your Manus dashboard
2. Navigate to **Scheduled Tasks**
3. Click **Create New Task**
4. For each of the 3 tasks:
   - Copy the **Task Name** from the prompt document
   - Set the **Schedule** using the cron expression provided
   - Enable **Repeat**
   - Copy the **entire prompt** (everything below the configuration section)
   - Paste into the task prompt field
   - Save the task

### Step 3: Test the Tasks

Before waiting for the scheduled run, you can manually trigger each task to verify it works:

1. Open the task in Manus dashboard
2. Click **Run Now**
3. Monitor the execution logs
4. Verify events are being saved to MongoDB

### Step 4: Monitor Monthly Runs

After the tasks are running automatically:

1. Check the execution logs on the 1st, 5th, and 10th of each month
2. Review the final reports for any errors or failed federations
3. Manually add events from failed federations if needed

## Task Details

### Task 1: RFEN National Events

**What it does:**
- Scrapes national swimming, water polo, artistic swimming, diving, and open water events
- Covers all major RFEN competitions (championships, leagues, cups)
- Handles HTML calendars, JavaScript-rendered pages, and PDF documents

**Expected output:**
- 40-60 events per run
- Primarily national-level competitions
- High-quality event data with full details

**Common issues:**
- PDF extraction may fail if RFEN changes document format
- Some events may only have dates without specific times

### Task 2: FETRI National Events

**What it does:**
- Scrapes national triathlon, duathlon, and aquathlon events
- Covers all FETRI-sanctioned competitions
- Handles JavaScript calendars and downloadable Excel/PDF files

**Expected output:**
- 30-50 events per run
- Mix of elite and popular categories
- Distance information included when available

**Common issues:**
- Category names vary (needs standardization)
- Some events listed without full location details

### Task 3: Regional Federations

**What it does:**
- Scrapes 31 regional federations across Spain
- Covers both swimming and triathlon regional events
- Processes diverse website formats (HTML, JavaScript, PDF, Excel)

**Expected output:**
- 200-350 events per run
- Comprehensive regional coverage
- Mix of competitive and recreational events

**Common issues:**
- Some federation websites may be temporarily down
- PDF calendars may have inconsistent date formats
- Task may timeout if too many federations have slow websites

## MongoDB Schema

All scraped events follow this structure:

```json
{
  "name": {"es": "...", "en": "..."},
  "date": "2025-12-30T10:00:00.000Z",
  "endDate": "2025-12-31T18:00:00.000Z",
  "location": {
    "city": "...",
    "region": "...",
    "venue": "...",
    "address": "",
    "country": "Spain"
  },
  "discipline": "Natación|Triatlón|Duatlón|Acuatlón|Waterpolo|...",
  "category": "...",
  "federation": "...",
  "contact": {
    "email": "...",
    "phone": "...",
    "website": "..."
  },
  "description": {"es": "...", "en": "..."},
  "registrationUrl": "...",
  "maxCapacity": 0,
  "currentRegistrations": 0,
  "source": "rfen-scraper|fetri-scraper|regional-scraper",
  "createdAt": "...",
  "updatedAt": "...",
  "seo": {...}
}
```

## Duplicate Prevention

All three scrapers use the same duplicate detection logic:

**Matching criteria:**
- Event name (Spanish) + Start date + City

**Behavior:**
- If match found: **UPDATE** existing event with new data
- If no match: **INSERT** new event

This ensures:
- No duplicate events in the database
- Event details stay up-to-date if federations change information
- Historical events are preserved

## Error Handling

All scrapers handle these scenarios gracefully:

| Scenario | Behavior |
|----------|----------|
| Federation website down | Skip federation, continue with others |
| PDF extraction fails | Log error, continue with next source |
| Invalid date format | Skip event, continue with next event |
| MongoDB connection fails | Exit with error, retry on next run |
| Timeout approaching | Save progress, exit gracefully |

## Maintenance Schedule

### Monthly (After Each Run)
- [ ] Review execution logs for errors
- [ ] Check "Failed Federations" section in reports
- [ ] Manually verify 5-10 random events on federation websites
- [ ] Add missing events from failed federations manually if critical

### Quarterly
- [ ] Audit all federation URLs (check for website changes)
- [ ] Review category standardization (check for new categories)
- [ ] Update technical notes for federations with website changes
- [ ] Verify all disciplines are being captured correctly

### Annually
- [ ] Update federation contact information
- [ ] Check for new regional federations
- [ ] Review and optimize search queries
- [ ] Audit MongoDB for data quality issues

## Troubleshooting

### Problem: Task times out before completing

**Solution:**
- Reduce timeout in task configuration
- Split regional scraper into multiple tasks (e.g., swimming vs triathlon)
- Optimize search queries to be more specific

### Problem: Many events have missing fields

**Solution:**
- Review the federation's website structure
- Update extraction logic in the prompt
- Add fallback values for optional fields

### Problem: Duplicate events are being created

**Solution:**
- Check duplicate detection logic
- Verify event names are being normalized consistently
- Ensure dates are in correct ISO format

### Problem: Events from past years are being scraped

**Solution:**
- Add date filter: `if (eventDate < new Date()) continue;`
- Update search queries to specify year range

## Support

For issues with the scrapers:

1. Check the execution logs in Manus dashboard
2. Review the final report for specific error messages
3. Verify MongoDB connection is working
4. Test search queries manually to see what data is available

## Version History

- **v1.0** (2025-11-23): Initial release with 3 comprehensive scraper prompts

---

**Author:** Manus AI  
**Last Updated:** 2025-11-23

