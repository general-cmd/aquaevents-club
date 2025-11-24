#!/usr/bin/env node

/**
 * MongoDB Database Cleanup Script
 * 
 * This script removes invalid events from the AquaEvents MongoDB database:
 * - Events without required fields (name, date, city, discipline)
 * - Events with generic/invalid names (just "calendario", "eventos", etc.)
 * - Duplicate events (same name + date + city)
 * - Events with very short names (<6 characters)
 * - Events from past years (before 2025)
 * 
 * Usage: node cleanup-database.mjs [--dry-run]
 */

import { MongoClient } from 'mongodb';

const DRY_RUN = process.argv.includes('--dry-run');
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI environment variable not set');
  process.exit(1);
}

const client = new MongoClient(MONGODB_URI);

// Invalid event name patterns
const INVALID_NAME_PATTERNS = [
  /^(calendario|eventos|competiciones|liga|temporada|campeonato)$/i, // Generic words only
  /^\d{4}$/,  // Just a year like "2025"
  /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)$/i, // Just a month
  /^(lunes|martes|miércoles|jueves|viernes|sábado|domingo)$/i, // Just a day of week
  /^(natación|natacion|swimming|triatlón|triatlon|duatlón|duatlon)$/i, // Just a discipline
  /^(infantil|cadete|junior|absoluto|master|senior)$/i, // Just a category
  /^(masculino|femenino|mixto)$/i, // Just a gender
  /^(primera|segunda|tercera|cuarta|división|division)$/i, // Just a division
];

async function analyzeDatabase() {
  console.log('🔍 Analyzing database...\n');
  
  const db = client.db();
  const collection = db.collection('events');
  
  const stats = {
    total: 0,
    toDelete: {
      noName: 0,
      noDate: 0,
      noCity: 0,
      noDiscipline: 0,
      invalidName: 0,
      shortName: 0,
      pastEvent: 0,
      duplicates: 0
    },
    toKeep: 0
  };
  
  stats.total = await collection.countDocuments();
  console.log(`📊 Total events: ${stats.total}`);
  
  // Events without name
  stats.toDelete.noName = await collection.countDocuments({
    $or: [
      { "name.es": { $exists: false } },
      { "name.es": "" },
      { "name.es": null }
    ]
  });
  
  // Events without date
  stats.toDelete.noDate = await collection.countDocuments({
    $or: [
      { date: { $exists: false } },
      { date: "" },
      { date: null }
    ]
  });
  
  // Events without city
  stats.toDelete.noCity = await collection.countDocuments({
    $or: [
      { "location.city": { $exists: false } },
      { "location.city": "" },
      { "location.city": null }
    ]
  });
  
  // Events without discipline
  stats.toDelete.noDiscipline = await collection.countDocuments({
    $or: [
      { discipline: { $exists: false } },
      { discipline: "" },
      { discipline: null }
    ]
  });
  
  // Events with invalid names
  const invalidNameQuery = {
    $or: INVALID_NAME_PATTERNS.map(pattern => ({ "name.es": { $regex: pattern } }))
  };
  stats.toDelete.invalidName = await collection.countDocuments(invalidNameQuery);
  
  // Events with very short names
  stats.toDelete.shortName = await collection.countDocuments({
    "name.es": { $regex: /^.{1,5}$/ }
  });
  
  // Events from past years (before 2025)
  const cutoffDate = "2025-01-01T00:00:00.000Z";
  stats.toDelete.pastEvent = await collection.countDocuments({
    date: { $lt: cutoffDate }
  });
  
  // Find duplicates
  const duplicates = await collection.aggregate([
    {
      $group: {
        _id: {
          name: "$name.es",
          date: "$date",
          city: "$location.city"
        },
        count: { $sum: 1 },
        ids: { $push: "$_id" }
      }
    },
    {
      $match: { count: { $gt: 1 } }
    }
  ]).toArray();
  
  stats.toDelete.duplicates = duplicates.reduce((sum, d) => sum + d.count - 1, 0);
  
  // Calculate total to delete (with deduplication)
  const totalToDelete = stats.toDelete.noName + 
                        stats.toDelete.noDate + 
                        stats.toDelete.noCity + 
                        stats.toDelete.noDiscipline + 
                        stats.toDelete.invalidName + 
                        stats.toDelete.shortName + 
                        stats.toDelete.pastEvent +
                        stats.toDelete.duplicates;
  
  stats.toKeep = stats.total - totalToDelete;
  
  console.log('\n❌ Events to delete:');
  console.log(`   Missing name: ${stats.toDelete.noName}`);
  console.log(`   Missing date: ${stats.toDelete.noDate}`);
  console.log(`   Missing city: ${stats.toDelete.noCity}`);
  console.log(`   Missing discipline: ${stats.toDelete.noDiscipline}`);
  console.log(`   Invalid name: ${stats.toDelete.invalidName}`);
  console.log(`   Short name (<6 chars): ${stats.toDelete.shortName}`);
  console.log(`   Past events (before 2025): ${stats.toDelete.pastEvent}`);
  console.log(`   Duplicates: ${stats.toDelete.duplicates}`);
  console.log(`   ─────────────────────────`);
  console.log(`   TOTAL TO DELETE: ~${totalToDelete} (may overlap)`);
  
  console.log(`\n✅ Events to keep: ~${stats.toKeep}`);
  
  return { stats, duplicates };
}

async function cleanupDatabase(duplicates) {
  console.log('\n🧹 Starting cleanup...\n');
  
  const db = client.db();
  const collection = db.collection('events');
  
  let deletedCount = 0;
  
  // 1. Delete events without required fields
  console.log('1️⃣ Deleting events without required fields...');
  const missingFieldsQuery = {
    $or: [
      { "name.es": { $in: ["", null] } },
      { "name.es": { $exists: false } },
      { date: { $in: ["", null] } },
      { date: { $exists: false } },
      { "location.city": { $in: ["", null] } },
      { "location.city": { $exists: false } },
      { discipline: { $in: ["", null] } },
      { discipline: { $exists: false } }
    ]
  };
  
  if (DRY_RUN) {
    const count = await collection.countDocuments(missingFieldsQuery);
    console.log(`   [DRY RUN] Would delete ${count} events`);
  } else {
    const result = await collection.deleteMany(missingFieldsQuery);
    deletedCount += result.deletedCount;
    console.log(`   ✅ Deleted ${result.deletedCount} events`);
  }
  
  // 2. Delete events with invalid names
  console.log('\n2️⃣ Deleting events with invalid names...');
  const invalidNameQuery = {
    $or: INVALID_NAME_PATTERNS.map(pattern => ({ "name.es": { $regex: pattern } }))
  };
  
  if (DRY_RUN) {
    const count = await collection.countDocuments(invalidNameQuery);
    const samples = await collection.find(invalidNameQuery).limit(5).toArray();
    console.log(`   [DRY RUN] Would delete ${count} events`);
    console.log(`   Examples:`);
    samples.forEach((e, i) => {
      console.log(`     ${i+1}. "${e.name?.es}"`);
    });
  } else {
    const result = await collection.deleteMany(invalidNameQuery);
    deletedCount += result.deletedCount;
    console.log(`   ✅ Deleted ${result.deletedCount} events`);
  }
  
  // 3. Delete events with very short names
  console.log('\n3️⃣ Deleting events with very short names (<6 chars)...');
  const shortNameQuery = {
    "name.es": { $regex: /^.{1,5}$/ }
  };
  
  if (DRY_RUN) {
    const count = await collection.countDocuments(shortNameQuery);
    const samples = await collection.find(shortNameQuery).limit(5).toArray();
    console.log(`   [DRY RUN] Would delete ${count} events`);
    console.log(`   Examples:`);
    samples.forEach((e, i) => {
      console.log(`     ${i+1}. "${e.name?.es}"`);
    });
  } else {
    const result = await collection.deleteMany(shortNameQuery);
    deletedCount += result.deletedCount;
    console.log(`   ✅ Deleted ${result.deletedCount} events`);
  }
  
  // 4. Delete past events (before 2025)
  console.log('\n4️⃣ Deleting past events (before 2025)...');
  const pastEventQuery = {
    date: { $lt: "2025-01-01T00:00:00.000Z" }
  };
  
  if (DRY_RUN) {
    const count = await collection.countDocuments(pastEventQuery);
    console.log(`   [DRY RUN] Would delete ${count} events`);
  } else {
    const result = await collection.deleteMany(pastEventQuery);
    deletedCount += result.deletedCount;
    console.log(`   ✅ Deleted ${result.deletedCount} events`);
  }
  
  // 5. Delete duplicates (keep only the first one)
  console.log('\n5️⃣ Deleting duplicate events...');
  let duplicatesDeleted = 0;
  
  for (const dup of duplicates) {
    // Keep the first ID, delete the rest
    const [keepId, ...deleteIds] = dup.ids;
    
    if (DRY_RUN) {
      console.log(`   [DRY RUN] Would keep 1, delete ${deleteIds.length} duplicates of: "${dup._id.name}"`);
    } else {
      const result = await collection.deleteMany({
        _id: { $in: deleteIds }
      });
      duplicatesDeleted += result.deletedCount;
    }
  }
  
  if (!DRY_RUN) {
    deletedCount += duplicatesDeleted;
    console.log(`   ✅ Deleted ${duplicatesDeleted} duplicate events`);
  }
  
  return deletedCount;
}

async function main() {
  try {
    console.log('🚀 AquaEvents Database Cleanup\n');
    
    if (DRY_RUN) {
      console.log('⚠️  DRY RUN MODE - No changes will be made\n');
    }
    
    await client.connect();
    console.log('✅ Connected to MongoDB\n');
    
    // Analyze database
    const { stats, duplicates } = await analyzeDatabase();
    
    // Ask for confirmation if not dry run
    if (!DRY_RUN) {
      console.log('\n⚠️  WARNING: This will permanently delete events from the database!');
      console.log('   Run with --dry-run first to see what will be deleted.');
      console.log('\n   Press Ctrl+C to cancel, or wait 5 seconds to continue...\n');
      
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
    
    // Cleanup
    const deletedCount = await cleanupDatabase(duplicates);
    
    // Final stats
    console.log('\n' + '='.repeat(50));
    console.log('📊 CLEANUP SUMMARY');
    console.log('='.repeat(50));
    console.log(`Total events before: ${stats.total}`);
    if (!DRY_RUN) {
      console.log(`Events deleted: ${deletedCount}`);
      console.log(`Events remaining: ${stats.total - deletedCount}`);
    }
    console.log('='.repeat(50));
    
    if (DRY_RUN) {
      console.log('\n💡 This was a dry run. Run without --dry-run to actually delete events.');
    } else {
      console.log('\n✅ Cleanup completed successfully!');
    }
    
  } catch (error) {
    console.error('\n❌ Error:', error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

main();

