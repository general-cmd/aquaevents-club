#!/usr/bin/env node

/**
 * Final Database Cleanup for Monday Launch
 * 
 * 1. Remove events with suspicious names
 * 2. Remove events with only generic calendar URLs
 * 3. Fix city names by extracting from event titles
 * 4. Validate all remaining events
 */

import { MongoClient } from 'mongodb';

const DRY_RUN = process.argv.includes('--dry-run');
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI environment variable not set');
  process.exit(1);
}

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
  'Guadalajara', 'Toledo', 'Ciudad Real', 'Jaén', 'Huesca', 'Teruel',
  'Castellón de la Plana', 'Santa Pola', 'Cheste', 'Benidorm',
  'Torrevieja', 'Orihuela', 'Gandía', 'Sagunto', 'Xàbia', 'Dénia',
  'Calpe', 'Altea', 'Villajoyosa', 'Elda', 'Alcoy', 'Ontinyent'
];

const client = new MongoClient(MONGODB_URI);

/**
 * Extract city name from event title
 * Examples:
 * "ENCUENTRO AMAZONAS 2025 - ELCHE" → "Elche"
 * "Copa Catalana - Barcelona" → "Barcelona"
 * "Triatlón de Valencia" → "Valencia"
 */
function extractCityFromTitle(title) {
  if (!title) return null;
  
  // Pattern 1: "Event Name - CITY"
  const dashPattern = /[-–—]\s*([A-ZÁÉÍÓÚÑ][a-záéíóúñ\s]+)(?:\s*\d{4})?$/;
  const dashMatch = title.match(dashPattern);
  if (dashMatch) {
    const city = dashMatch[1].trim();
    // Check if it's a known city
    if (MAJOR_CITIES.some(c => c.toLowerCase() === city.toLowerCase())) {
      return city;
    }
  }
  
  // Pattern 2: "Event de CITY"
  const dePattern = /\bde\s+([A-Z][a-záéíóúñ\s]+?)(?:\s*[-–—]|\s*\d{4}|$)/i;
  const deMatch = title.match(dePattern);
  if (deMatch) {
    const city = deMatch[1].trim();
    if (MAJOR_CITIES.some(c => c.toLowerCase() === city.toLowerCase())) {
      return city;
    }
  }
  
  // Pattern 3: "CITY Event Name"
  for (const city of MAJOR_CITIES) {
    const regex = new RegExp(`\\b${city}\\b`, 'i');
    if (regex.test(title)) {
      return city;
    }
  }
  
  return null;
}

async function analyzeDatabase() {
  console.log('🔍 Analyzing database...\n');
  
  const db = client.db();
  const collection = db.collection('events');
  
  const totalEvents = await collection.countDocuments();
  console.log(`📊 Total events: ${totalEvents}\n`);
  
  // 1. Events with suspicious names
  const suspiciousNames = await collection.find({
    $or: [
      { 'name.es': /^MASTER\s*-\s*Etapa/i },
      { 'name.es': /^Etapa\s+FINAL/i },
      { 'name.es': /^Liga\s*$/i },
      { 'name.es': /Calendario\s+Reuniones/i },
      { 'name.es': /Condiciones\s+generales/i },
      { 'name.es': /Ya a la venta/i },
      { 'name.es': /^suspendida$/i },
      { 'name.es': /TOMA DE TIEMPOS/i }
    ]
  }).toArray();
  
  console.log(`❌ Events with suspicious names: ${suspiciousNames.length}`);
  suspiciousNames.forEach((e, i) => {
    console.log(`   ${i+1}. ${e.name?.es}`);
  });
  
  // 2. Events with only generic calendar URLs (no real contact)
  const genericContact = await collection.find({
    $and: [
      { $or: [{ 'contact.email': '' }, { 'contact.email': { $exists: false } }, { 'contact.email': null }] },
      { $or: [{ 'contact.phone': '' }, { 'contact.phone': { $exists: false } }, { 'contact.phone': null }] },
      { 'contact.website': /\/calendario\/?$/ }
    ]
  }).toArray();
  
  console.log(`\n❌ Events with only generic calendar URL: ${genericContact.length}`);
  genericContact.slice(0, 5).forEach((e, i) => {
    console.log(`   ${i+1}. ${e.name?.es}`);
  });
  
  // 3. Events with wrong city (can be fixed from title)
  const allEvents = await collection.find({}).toArray();
  const wrongCity = [];
  
  for (const event of allEvents) {
    const extractedCity = extractCityFromTitle(event.name?.es);
    if (extractedCity && event.location?.city !== extractedCity) {
      wrongCity.push({
        event,
        currentCity: event.location?.city,
        correctCity: extractedCity
      });
    }
  }
  
  console.log(`\n⚠️  Events with wrong city (can be fixed): ${wrongCity.length}`);
  wrongCity.slice(0, 10).forEach((item, i) => {
    console.log(`   ${i+1}. ${item.event.name?.es}`);
    console.log(`      Current: ${item.currentCity} → Correct: ${item.correctCity}`);
  });
  
  const toDelete = suspiciousNames.length + genericContact.length;
  const toFix = wrongCity.length;
  const toKeep = totalEvents - toDelete;
  
  console.log(`\n${'='.repeat(60)}`);
  console.log(`SUMMARY:`);
  console.log(`   Total events: ${totalEvents}`);
  console.log(`   To delete: ${toDelete}`);
  console.log(`   To fix city: ${toFix}`);
  console.log(`   To keep: ${toKeep}`);
  console.log(`${'='.repeat(60)}`);
  
  return { suspiciousNames, genericContact, wrongCity };
}

async function cleanupDatabase() {
  console.log('\n🧹 Starting cleanup...\n');
  
  const db = client.db();
  const collection = db.collection('events');
  
  let totalDeleted = 0;
  let totalFixed = 0;
  
  // 1. Delete events with suspicious names
  console.log('1️⃣ Deleting events with suspicious names...');
  const suspiciousQuery = {
    $or: [
      { 'name.es': /^MASTER\s*-\s*Etapa/i },
      { 'name.es': /^Etapa\s+FINAL/i },
      { 'name.es': /^Liga\s*$/i },
      { 'name.es': /Calendario\s+Reuniones/i },
      { 'name.es': /Condiciones\s+generales/i },
      { 'name.es': /Ya a la venta/i },
      { 'name.es': /^suspendida$/i },
      { 'name.es': /TOMA DE TIEMPOS/i }
    ]
  };
  
  if (DRY_RUN) {
    const count = await collection.countDocuments(suspiciousQuery);
    console.log(`   [DRY RUN] Would delete ${count} events`);
  } else {
    const result = await collection.deleteMany(suspiciousQuery);
    totalDeleted += result.deletedCount;
    console.log(`   ✅ Deleted ${result.deletedCount} events`);
  }
  
  // 2. Delete events with only generic calendar URLs
  console.log('\n2️⃣ Deleting events with only generic calendar URLs...');
  const genericContactQuery = {
    $and: [
      { $or: [{ 'contact.email': '' }, { 'contact.email': { $exists: false } }, { 'contact.email': null }] },
      { $or: [{ 'contact.phone': '' }, { 'contact.phone': { $exists: false } }, { 'contact.phone': null }] },
      { 'contact.website': /\/calendario\/?$/ }
    ]
  };
  
  if (DRY_RUN) {
    const count = await collection.countDocuments(genericContactQuery);
    console.log(`   [DRY RUN] Would delete ${count} events`);
  } else {
    const result = await collection.deleteMany(genericContactQuery);
    totalDeleted += result.deletedCount;
    console.log(`   ✅ Deleted ${result.deletedCount} events`);
  }
  
  // 3. Fix city names from event titles
  console.log('\n3️⃣ Fixing city names from event titles...');
  const allEvents = await collection.find({}).toArray();
  
  for (const event of allEvents) {
    const extractedCity = extractCityFromTitle(event.name?.es);
    
    if (extractedCity && event.location?.city !== extractedCity) {
      if (DRY_RUN) {
        console.log(`   [DRY RUN] Would fix: ${event.name?.es}`);
        console.log(`      ${event.location?.city} → ${extractedCity}`);
        totalFixed++;
      } else {
        await collection.updateOne(
          { _id: event._id },
          {
            $set: {
              'location.city': extractedCity,
              updatedAt: new Date().toISOString()
            }
          }
        );
        console.log(`   ✅ Fixed: ${event.name?.es}`);
        console.log(`      ${event.location?.city} → ${extractedCity}`);
        totalFixed++;
      }
    }
  }
  
  if (totalFixed === 0) {
    console.log(`   ℹ️  No city names needed fixing`);
  }
  
  return { totalDeleted, totalFixed };
}

async function verifyResults() {
  console.log('\n📋 Verifying results...\n');
  
  const db = client.db();
  const collection = db.collection('events');
  
  const totalRemaining = await collection.countDocuments();
  console.log(`✅ Total events remaining: ${totalRemaining}`);
  
  // Check events with contact info
  const withContact = await collection.countDocuments({
    $or: [
      { 'contact.email': { $ne: '', $exists: true, $ne: null } },
      { 'contact.phone': { $ne: '', $exists: true, $ne: null } }
    ]
  });
  console.log(`✅ Events with contact info: ${withContact}`);
  
  // Sample remaining events
  console.log(`\n📋 Sample of remaining events:\n`);
  const samples = await collection.find({}).limit(10).toArray();
  samples.forEach((e, i) => {
    const contact = e.contact?.email || e.contact?.phone || e.contact?.website || 'No contact';
    console.log(`${i+1}. ${e.name?.es}`);
    console.log(`   📍 ${e.location?.city}, ${e.location?.region}`);
    console.log(`   📧 ${contact.substring(0, 60)}`);
  });
}

async function main() {
  try {
    console.log('🚀 Final Database Cleanup for Monday Launch\n');
    
    if (DRY_RUN) {
      console.log('⚠️  DRY RUN MODE - No changes will be made\n');
    }
    
    await client.connect();
    console.log('✅ Connected to MongoDB\n');
    
    // Analyze
    await analyzeDatabase();
    
    // Confirm if not dry run
    if (!DRY_RUN) {
      console.log('\n⚠️  WARNING: This will permanently delete and modify events!');
      console.log('   Press Ctrl+C to cancel, or wait 5 seconds to continue...\n');
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
    
    // Cleanup
    const { totalDeleted, totalFixed } = await cleanupDatabase();
    
    // Verify
    if (!DRY_RUN) {
      await verifyResults();
    }
    
    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 CLEANUP SUMMARY');
    console.log('='.repeat(60));
    if (DRY_RUN) {
      console.log('This was a dry run. Run without --dry-run to apply changes.');
    } else {
      console.log(`Events deleted: ${totalDeleted}`);
      console.log(`City names fixed: ${totalFixed}`);
      console.log('✅ Cleanup completed successfully!');
      console.log('\n🚀 Database is ready for Monday launch!');
    }
    console.log('='.repeat(60));
    
  } catch (error) {
    console.error('\n❌ Error:', error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

main();

