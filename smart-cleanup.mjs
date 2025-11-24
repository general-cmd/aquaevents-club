#!/usr/bin/env node

/**
 * Smart MongoDB Cleanup - Removes low-quality events while preserving valid ones
 * 
 * Rules:
 * 1. DELETE events with NO contact info (no email, phone, or website)
 * 2. DELETE events where city=region EXCEPT for major Spanish cities
 * 3. KEEP events in major cities even if city=region (Madrid, Barcelona, Valencia, etc.)
 * 
 * Usage: node smart-cleanup.mjs [--dry-run]
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
  'Madrid',
  'Barcelona', 
  'Valencia',
  'Sevilla',
  'Zaragoza',
  'Málaga',
  'Murcia',
  'Palma',
  'Las Palmas',
  'Bilbao',
  'Alicante',
  'Córdoba',
  'Valladolid',
  'Vigo',
  'Gijón',
  'Hospitalet',
  'Vitoria',
  'Granada',
  'Elche',
  'Oviedo',
  'Badalona',
  'Cartagena',
  'Terrassa',
  'Jerez',
  'Sabadell',
  'Santa Cruz',
  'Pamplona',
  'Almería',
  'Fuenlabrada',
  'Leganés',
  'Santander',
  'Burgos',
  'Castellón',
  'Alcorcón',
  'Getafe',
  'Salamanca',
  'Logroño',
  'San Sebastián',
  'Badajoz',
  'Albacete',
  'Mataró',
  'Tarragona'
];

const client = new MongoClient(MONGODB_URI);

async function analyzeDatabase() {
  console.log('🔍 Analyzing database with smart rules...\n');
  
  const db = client.db();
  const collection = db.collection('events');
  
  const totalEvents = await collection.countDocuments();
  console.log(`📊 Total events: ${totalEvents}\n`);
  
  // 1. Events with NO contact info
  const noContactQuery = {
    $and: [
      { $or: [{ 'contact.email': '' }, { 'contact.email': { $exists: false } }, { 'contact.email': null }] },
      { $or: [{ 'contact.phone': '' }, { 'contact.phone': { $exists: false } }, { 'contact.phone': null }] },
      { $or: [{ 'contact.website': '' }, { 'contact.website': { $exists: false } }, { 'contact.website': null }] }
    ]
  };
  
  const noContactCount = await collection.countDocuments(noContactQuery);
  console.log(`❌ Events with NO contact info: ${noContactCount}`);
  
  const noContactSamples = await collection.find(noContactQuery).limit(5).toArray();
  noContactSamples.forEach((e, i) => {
    console.log(`   ${i+1}. ${e.name?.es} - ${e.location?.city}`);
  });
  
  // 2. Events where city=region but NOT a major city
  const cityEqualsRegionQuery = {
    $expr: { $eq: ['$location.city', '$location.region'] },
    'location.city': { $nin: MAJOR_CITIES }
  };
  
  const cityEqualsRegionCount = await collection.countDocuments(cityEqualsRegionQuery);
  console.log(`\n❌ Events where city=region (excluding major cities): ${cityEqualsRegionCount}`);
  
  const cityEqualsRegionSamples = await collection.find(cityEqualsRegionQuery).limit(5).toArray();
  cityEqualsRegionSamples.forEach((e, i) => {
    console.log(`   ${i+1}. ${e.name?.es} - City/Region: ${e.location?.city}`);
  });
  
  // 3. Events in major cities (will be KEPT)
  const majorCityQuery = {
    'location.city': { $in: MAJOR_CITIES }
  };
  
  const majorCityCount = await collection.countDocuments(majorCityQuery);
  console.log(`\n✅ Events in major cities (will be KEPT): ${majorCityCount}`);
  
  const majorCitySamples = await collection.find(majorCityQuery).limit(5).toArray();
  majorCitySamples.forEach((e, i) => {
    console.log(`   ${i+1}. ${e.name?.es} - ${e.location?.city}`);
  });
  
  const estimatedToDelete = noContactCount + cityEqualsRegionCount;
  const estimatedToKeep = totalEvents - estimatedToDelete;
  
  console.log(`\n${'='.repeat(50)}`);
  console.log(`📊 ESTIMATED RESULTS:`);
  console.log(`   Total events: ${totalEvents}`);
  console.log(`   To delete: ~${estimatedToDelete}`);
  console.log(`   To keep: ~${estimatedToKeep}`);
  console.log(`${'='.repeat(50)}`);
  
  return { noContactCount, cityEqualsRegionCount };
}

async function smartCleanup() {
  console.log('\n🧹 Starting smart cleanup...\n');
  
  const db = client.db();
  const collection = db.collection('events');
  
  let totalDeleted = 0;
  
  // 1. Delete events with NO contact info
  console.log('1️⃣ Deleting events with NO contact info...');
  const noContactQuery = {
    $and: [
      { $or: [{ 'contact.email': '' }, { 'contact.email': { $exists: false } }, { 'contact.email': null }] },
      { $or: [{ 'contact.phone': '' }, { 'contact.phone': { $exists: false } }, { 'contact.phone': null }] },
      { $or: [{ 'contact.website': '' }, { 'contact.website': { $exists: false } }, { 'contact.website': null }] }
    ]
  };
  
  if (DRY_RUN) {
    const count = await collection.countDocuments(noContactQuery);
    console.log(`   [DRY RUN] Would delete ${count} events`);
  } else {
    const result = await collection.deleteMany(noContactQuery);
    totalDeleted += result.deletedCount;
    console.log(`   ✅ Deleted ${result.deletedCount} events`);
  }
  
  // 2. Delete events where city=region (excluding major cities)
  console.log('\n2️⃣ Deleting events where city=region (excluding major cities)...');
  const cityEqualsRegionQuery = {
    $expr: { $eq: ['$location.city', '$location.region'] },
    'location.city': { $nin: MAJOR_CITIES }
  };
  
  if (DRY_RUN) {
    const count = await collection.countDocuments(cityEqualsRegionQuery);
    const samples = await collection.find(cityEqualsRegionQuery).limit(5).toArray();
    console.log(`   [DRY RUN] Would delete ${count} events`);
    console.log(`   Examples:`);
    samples.forEach((e, i) => {
      console.log(`     ${i+1}. ${e.name?.es} - ${e.location?.city}`);
    });
  } else {
    const result = await collection.deleteMany(cityEqualsRegionQuery);
    totalDeleted += result.deletedCount;
    console.log(`   ✅ Deleted ${result.deletedCount} events`);
  }
  
  return totalDeleted;
}

async function verifyResults() {
  console.log('\n📋 Verifying remaining events...\n');
  
  const db = client.db();
  const collection = db.collection('events');
  
  const totalRemaining = await collection.countDocuments();
  console.log(`✅ Total events remaining: ${totalRemaining}`);
  
  // Check major cities
  const majorCityCount = await collection.countDocuments({
    'location.city': { $in: MAJOR_CITIES }
  });
  console.log(`✅ Events in major cities: ${majorCityCount}`);
  
  // Check events with contact info
  const withContactCount = await collection.countDocuments({
    $or: [
      { 'contact.email': { $ne: '', $exists: true } },
      { 'contact.phone': { $ne: '', $exists: true } },
      { 'contact.website': { $ne: '', $exists: true } }
    ]
  });
  console.log(`✅ Events with contact info: ${withContactCount}`);
  
  // Sample remaining events
  console.log(`\n📋 Sample of remaining events:\n`);
  const samples = await collection.find({}).limit(10).toArray();
  samples.forEach((e, i) => {
    const contact = e.contact?.email || e.contact?.phone || e.contact?.website || 'No contact';
    console.log(`${i+1}. ${e.name?.es}`);
    console.log(`   📍 ${e.location?.city}, ${e.location?.region}`);
    console.log(`   📧 ${contact.substring(0, 50)}`);
  });
}

async function main() {
  try {
    console.log('🚀 Smart Database Cleanup\n');
    
    if (DRY_RUN) {
      console.log('⚠️  DRY RUN MODE - No changes will be made\n');
    }
    
    await client.connect();
    console.log('✅ Connected to MongoDB\n');
    
    // Analyze
    await analyzeDatabase();
    
    // Confirm if not dry run
    if (!DRY_RUN) {
      console.log('\n⚠️  WARNING: This will permanently delete events!');
      console.log('   Press Ctrl+C to cancel, or wait 5 seconds to continue...\n');
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
    
    // Cleanup
    const totalDeleted = await smartCleanup();
    
    // Verify
    if (!DRY_RUN) {
      await verifyResults();
    }
    
    // Summary
    console.log('\n' + '='.repeat(50));
    console.log('📊 CLEANUP SUMMARY');
    console.log('='.repeat(50));
    if (DRY_RUN) {
      console.log('This was a dry run. Run without --dry-run to delete.');
    } else {
      console.log(`Events deleted: ${totalDeleted}`);
      console.log('✅ Cleanup completed successfully!');
    }
    console.log('='.repeat(50));
    
  } catch (error) {
    console.error('\n❌ Error:', error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

main();

