# Federation Event Scraper - FINAL VERSION with Complete Quality Control

**⚠️ CRITICAL: This prompt ensures ONLY high-quality, actionable events are saved to MongoDB.**

---

## Quality Standards

Every event MUST meet these criteria to be saved:

✅ **Minimum name length:** 10 characters  
✅ **Valid date:** ISO 8601 format, in future (≥ 2025-01-01)  
✅ **Specific location:** City must be a real city (not just region name), OR a major city where city=region is acceptable  
✅ **Contact information:** At least ONE of: email, phone, or website  
✅ **Valid discipline:** Must be an aquatic sport  
✅ **NOT generic:** No calendar headers, month names, or placeholder text  

---

## STEP 1: Event Validation Function

**USE THIS FUNCTION BEFORE SAVING ANY EVENT:**

```javascript
// Major Spanish cities where city=region is acceptable
const MAJOR_CITIES = [
  'Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Zaragoza', 'Málaga',
  'Murcia', 'Palma', 'Las Palmas', 'Bilbao', 'Alicante', 'Córdoba',
  'Valladolid', 'Vigo', 'Gijón', 'Hospitalet', 'Vitoria', 'Granada',
  'Elche', 'Oviedo', 'Badalona', 'Cartagena', 'Terrassa', 'Jerez',
  'Sabadell', 'Santa Cruz', 'Pamplona', 'Almería', 'Fuenlabrada',
  'Leganés', 'Santander', 'Burgos', 'Castellón', 'Alcorcón',
  'Getafe', 'Salamanca', 'Logroño', 'San Sebastián', 'Badajoz',
  'Albacete', 'Mataró', 'Tarragona', 'Pontevedra', 'León',
  'Cádiz', 'Huelva', 'Lleida', 'Girona', 'Ourense', 'Lugo',
  'Ávila', 'Cuenca', 'Soria', 'Segovia', 'Palencia', 'Zamora',
  'Guadalajara', 'Toledo', 'Ciudad Real', 'Jaén', 'Huesca', 'Teruel'
];

// Invalid event name patterns
const INVALID_PATTERNS = [
  /^(calendario|eventos|competiciones|liga|temporada|campeonato)$/i,
  /^\d{4}$/,  // Just a year
  /^\d{4}-\d{2}-\d{2}/,  // Date-like name
  /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)$/i,
  /^(lunes|martes|miércoles|jueves|viernes|sábado|domingo)$/i,
  /^(natación|natacion|swimming|triatlón|triatlon|duatlón|waterpolo)$/i,
  /^(infantil|cadete|junior|absoluto|master|senior)$/i,
  /^(masculino|femenino|mixto)$/i,
  /^(primera|segunda|tercera|división)$/i,
  /^(jornada|etapa|fase|ronda)$/i,
  /^(inscripciones|inscripción|plazo|cierre)$/i,
  /^(condiciones|bases|normativa|reglamento)$/i,
  /^(ya a la venta|entradas|información)$/i
];

function isValidEvent(eventData) {
  const name = eventData.name?.es;
  const date = eventData.date;
  const city = eventData.location?.city;
  const region = eventData.location?.region;
  const discipline = eventData.discipline;
  const contact = eventData.contact;
  
  // 1. Check required fields exist
  if (!name || !date || !city || !region || !discipline) {
    console.log(`❌ REJECTED: Missing required fields`);
    return false;
  }
  
  // 2. Check name length (minimum 10 characters)
  if (name.length < 10) {
    console.log(`❌ REJECTED: Name too short "${name}" (${name.length} chars)`);
    return false;
  }
  
  // 3. Check for invalid name patterns
  if (INVALID_PATTERNS.some(pattern => pattern.test(name))) {
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
  
  // 5. Check location specificity
  // If city equals region, it must be a major city
  if (city === region && !MAJOR_CITIES.includes(city)) {
    console.log(`❌ REJECTED: City=Region but not a major city "${city}"`);
    return false;
  }
  
  // Generic location names
  const genericLocations = ['españa', 'spain', 'nacional', 'regional', 'por determinar', 'tbd', 'a determinar'];
  if (genericLocations.includes(city.toLowerCase()) || genericLocations.includes(region.toLowerCase())) {
    console.log(`❌ REJECTED: Generic location "${city}, ${region}"`);
    return false;
  }
  
  // 6. Check contact information (must have at least ONE)
  const hasEmail = contact?.email && contact.email.trim() !== '';
  const hasPhone = contact?.phone && contact.phone.trim() !== '';
  const hasWebsite = contact?.website && contact.website.trim() !== '';
  
  if (!hasEmail && !hasPhone && !hasWebsite) {
    console.log(`❌ REJECTED: No contact information for "${name}"`);
    return false;
  }
  
  // 7. Check discipline is valid
  const validDisciplines = [
    'natación', 'triatlón', 'duatlón', 'acuatlón', 'waterpolo',
    'natación artística', 'aguas abiertas', 'saltos', 'natacion',
    'triatlon', 'duatlon', 'acuatlon', 'swimming', 'triathlon'
  ];
  if (!validDisciplines.some(d => discipline.toLowerCase().includes(d))) {
    console.log(`❌ REJECTED: Invalid discipline "${discipline}"`);
    return false;
  }
  
  // All checks passed
  console.log(`✅ VALID: "${name}" - ${city}, ${region} - ${contact.email || contact.phone || contact.website}`);
  return true;
}
```

---

## STEP 2: Search for Events

For EACH federation, search for 2025 AND 2026 events:

```javascript
const federations = [
  { name: "RFEN", website: "https://www.rfen.es" },
  { name: "FETRI", website: "https://www.triatlon.org" },
  // ... add all federations
];

for (const federation of federations) {
  console.log(`\n🔍 Processing: ${federation.name}`);
  
  // Search for both years
  const results = await search({
    type: 'data',
    queries: [
      `${federation.name} eventos calendario 2025`,
      `${federation.name} eventos calendario 2026`,
      `${federation.website} competiciones 2025 2026`
    ]
  });
  
  // Process results...
}
```

---

## STEP 3: Extract Event Data with Required Fields

```javascript
const eventData = {
  name: {
    es: extractedName,  // REQUIRED, min 10 chars
    en: translateToEnglish(extractedName) || extractedName
  },
  date: convertToISO8601(extractedDate),  // REQUIRED, ISO 8601
  endDate: convertToISO8601(extractedEndDate) || convertToISO8601(extractedDate),
  location: {
    city: extractedCity,  // REQUIRED, specific city
    region: standardizeRegion(extractedRegion),  // REQUIRED
    venue: extractedVenue || "",
    address: extractedAddress || "",
    country: "Spain"
  },
  discipline: standardizeDiscipline(extractedDiscipline),  // REQUIRED
  category: extractedCategory || "",
  federation: federation.name,  // REQUIRED
  contact: {
    email: extractedEmail || "",  // At least ONE required
    phone: extractedPhone || "",  // At least ONE required
    website: extractedWebsite || ""  // At least ONE required
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
  stats.rejected++;
  continue;
}

// If valid, save to MongoDB
await saveEventToMongoDB(eventData);
stats.saved++;
```

---

## STEP 4: Helper Functions

### Date Conversion

```javascript
function convertToISO8601(dateString) {
  if (!dateString) return null;
  
  try {
    // Handle various date formats
    let date;
    
    // DD/MM/YYYY
    if (/^\d{2}\/\d{2}\/\d{4}/.test(dateString)) {
      const [day, month, year] = dateString.split(/[\/\s]/);
      date = new Date(`${year}-${month}-${day}`);
    }
    // YYYY-MM-DD
    else if (/^\d{4}-\d{2}-\d{2}/.test(dateString)) {
      date = new Date(dateString);
    }
    // Other formats
    else {
      date = new Date(dateString);
    }
    
    if (isNaN(date.getTime())) {
      return null;
    }
    
    // Return ISO 8601 format
    return date.toISOString();
  } catch (error) {
    return null;
  }
}
```

### Region Standardization

```javascript
function standardizeRegion(region) {
  if (!region) return "";
  
  const regionMap = {
    'catalunya': 'Cataluña',
    'catalonia': 'Cataluña',
    'cat': 'Cataluña',
    'comunidad valenciana': 'Valencia',
    'c. valenciana': 'Valencia',
    'comunidad de madrid': 'Madrid',
    'c. madrid': 'Madrid',
    'andalucia': 'Andalucía',
    'pais vasco': 'País Vasco',
    'euskadi': 'País Vasco',
    'basque country': 'País Vasco',
    'castilla leon': 'Castilla y León',
    'cyl': 'Castilla y León',
    'castilla la mancha': 'Castilla-La Mancha',
    'clm': 'Castilla-La Mancha',
    'illes balears': 'Baleares',
    'islas baleares': 'Baleares',
    'islas canarias': 'Canarias',
    'region de murcia': 'Murcia'
  };
  
  const normalized = region.toLowerCase().trim();
  return regionMap[normalized] || region;
}
```

### Discipline Standardization

```javascript
function standardizeDiscipline(discipline) {
  if (!discipline) return "";
  
  const disciplineMap = {
    'natacion': 'Natación',
    'swimming': 'Natación',
    'triatlon': 'Triatlón',
    'triathlon': 'Triatlón',
    'duatlon': 'Duatlón',
    'duathlon': 'Duatlón',
    'acuatlon': 'Acuatlón',
    'aquathlon': 'Acuatlón',
    'waterpolo': 'Waterpolo',
    'water polo': 'Waterpolo',
    'polo acuático': 'Waterpolo',
    'natacion artistica': 'Natación Artística',
    'synchronized swimming': 'Natación Artística',
    'aguas abiertas': 'Aguas Abiertas',
    'open water': 'Aguas Abiertas',
    'saltos': 'Saltos',
    'diving': 'Saltos'
  };
  
  const normalized = discipline.toLowerCase().trim();
  return disciplineMap[normalized] || discipline;
}
```

### SEO Generation

```javascript
function generateSEO(name, city, date) {
  const year = new Date(date).getFullYear();
  
  function slugify(text) {
    return text
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  
  return {
    canonical: `https://aquaevents.club/eventos/${slugify(name)}-${slugify(city)}-${year}`,
    metaTitle: `${name} ${year} en ${city} - AquaEvents.club`,
    metaDescription: `Información completa sobre ${name}. Competición en ${city}. Fecha: ${new Date(date).toLocaleDateString('es-ES')}. Detalles de inscripción y contacto.`,
    keywords: [
      name,
      `${name} ${city}`,
      `${name} ${year}`,
      `Eventos deportivos ${city}`,
      `Competiciones acuáticas España`
    ]
  };
}
```

---

## STEP 5: Save to MongoDB with Duplicate Check

```javascript
import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const client = new MongoClient(MONGODB_URI);

await client.connect();
const db = client.db('aquaevents');
const collection = db.collection('events');

async function saveEventToMongoDB(eventData) {
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
    return 'updated';
  } else {
    // Insert new event
    await collection.insertOne(eventData);
    console.log(`✅ INSERTED: ${eventData.name.es}`);
    return 'inserted';
  }
}
```

---

## STEP 6: Quality Control Reporting

```javascript
const stats = {
  federationsProcessed: 0,
  eventsFound: 0,
  eventsValid: 0,
  eventsRejected: 0,
  eventsInserted: 0,
  eventsUpdated: 0,
  rejectionReasons: {
    missingFields: 0,
    shortName: 0,
    invalidPattern: 0,
    pastDate: 0,
    genericLocation: 0,
    noContact: 0,
    invalidDiscipline: 0
  }
};

// At the end of scraping:
console.log('\n' + '='.repeat(60));
console.log('QUALITY CONTROL REPORT');
console.log('='.repeat(60));
console.log(`\n📊 PROCESSING STATISTICS:`);
console.log(`   Federations processed: ${stats.federationsProcessed}`);
console.log(`   Events found: ${stats.eventsFound}`);
console.log(`   Events validated: ${stats.eventsValid}`);
console.log(`   Events rejected: ${stats.eventsRejected}`);
console.log(`\n✅ DATABASE OPERATIONS:`);
console.log(`   New events inserted: ${stats.eventsInserted}`);
console.log(`   Existing events updated: ${stats.eventsUpdated}`);
console.log(`\n❌ REJECTION BREAKDOWN:`);
console.log(`   Missing required fields: ${stats.rejectionReasons.missingFields}`);
console.log(`   Name too short (<10 chars): ${stats.rejectionReasons.shortName}`);
console.log(`   Invalid name pattern: ${stats.rejectionReasons.invalidPattern}`);
console.log(`   Past event: ${stats.rejectionReasons.pastDate}`);
console.log(`   Generic location: ${stats.rejectionReasons.genericLocation}`);
console.log(`   No contact information: ${stats.rejectionReasons.noContact}`);
console.log(`   Invalid discipline: ${stats.rejectionReasons.invalidDiscipline}`);
console.log('\n' + '='.repeat(60));
console.log('✅ SCRAPING COMPLETED SUCCESSFULLY');
console.log('='.repeat(60));
```

---

## Complete Workflow Example

```javascript
import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const client = new MongoClient(MONGODB_URI);

const stats = {
  federationsProcessed: 0,
  eventsFound: 0,
  eventsValid: 0,
  eventsRejected: 0,
  eventsInserted: 0,
  eventsUpdated: 0
};

const federations = [
  { name: "RFEN", website: "https://www.rfen.es" },
  { name: "FETRI", website: "https://www.triatlon.org" },
  // ... add all 33 federations
];

await client.connect();
const db = client.db('aquaevents');
const collection = db.collection('events');

for (const federation of federations) {
  console.log(`\n🔍 Processing: ${federation.name}`);
  stats.federationsProcessed++;
  
  try {
    // Search for events
    const results = await search({
      type: 'data',
      queries: [
        `${federation.name} eventos calendario 2025`,
        `${federation.name} eventos calendario 2026`
      ]
    });
    
    for (const result of results) {
      stats.eventsFound++;
      
      // Extract event data
      const eventData = extractEventData(result, federation.name);
      
      // Validate
      if (!isValidEvent(eventData)) {
        stats.eventsRejected++;
        continue;
      }
      
      stats.eventsValid++;
      
      // Save to MongoDB
      const operation = await saveEventToMongoDB(eventData);
      if (operation === 'inserted') {
        stats.eventsInserted++;
      } else if (operation === 'updated') {
        stats.eventsUpdated++;
      }
    }
    
    // Rate limiting
    await new Promise(resolve => setTimeout(resolve, 5000));
    
  } catch (error) {
    console.log(`⚠️ Error processing ${federation.name}: ${error.message}`);
    continue;
  }
}

// Print final report
printQualityReport(stats);

await client.close();
```

---

## Key Quality Improvements

| Issue | Old Scraper | New Scraper |
|-------|-------------|-------------|
| Calendar headers | Saved as events | Rejected (invalid pattern) |
| Month names | Saved as events | Rejected (invalid pattern) |
| No contact info | Saved anyway | Rejected (unusable) |
| City = Region (small cities) | Saved anyway | Rejected (too vague) |
| City = Region (major cities) | N/A | Allowed (Madrid, Barcelona, etc.) |
| Short names | Saved anyway | Rejected (<10 chars) |
| Past events | Saved anyway | Rejected (before 2025) |
| Duplicates | Created duplicates | Upsert (update or insert) |

---

## Testing Checklist

Before deploying:

- [ ] Validation function rejects all invalid patterns
- [ ] Major cities list includes all Spanish provincial capitals
- [ ] Contact info check requires at least ONE (email, phone, or website)
- [ ] Date conversion handles DD/MM/YYYY and YYYY-MM-DD formats
- [ ] Duplicate detection works correctly
- [ ] Quality report shows all rejection reasons
- [ ] MongoDB connection string is correct

---

**Document Version:** 3.0 (Final with Complete Quality Control)  
**Last Updated:** 2025-11-24  
**Author:** Manus AI  
**Quality Standard:** Only events with actionable next steps (contact info) are saved

