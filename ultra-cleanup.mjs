import { MongoClient, ObjectId } from 'mongodb';

const MONGO_URI = "mongodb+srv://manusdbuser:bh2*klmnjP09@aquaevents.i1zdgpx.mongodb.net/";
const client = new MongoClient(MONGO_URI);

async function ultraCleanup() {
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB\n');
    
    const db = client.db('aquaevents_db');
    const eventsCollection = db.collection('events');
    
    // Get all events
    const allEvents = await eventsCollection.find({}).toArray();
    console.log(`📊 Total events in database: ${allEvents.length}\n`);
    
    const toDelete = [];
    const toKeep = [];
    
    for (const event of allEvents) {
      let shouldDelete = false;
      const reasons = [];
      
      const nameEs = event.name?.es || '';
      
      // ULTRA AGGRESSIVE PATTERNS - Delete anything that looks like:
      
      // 1. Just dates or month names
      if (/^(noviembre|diciembre|enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre)\s*\d*$/i.test(nameEs)) {
        shouldDelete = true;
        reasons.push('date_header');
      }
      
      // 2. Contains HTML/calendar markup
      if (nameEs.includes('evento,') || nameEs.includes('@') && nameEs.includes('am') && nameEs.includes('pm')) {
        shouldDelete = true;
        reasons.push('calendar_markup');
      }
      
      // 3. Contains time ranges without event name
      if (/^\d+:\d+\s+(am|pm)\s*-\s*\d+:\d+\s+(am|pm)/i.test(nameEs)) {
        shouldDelete = true;
        reasons.push('time_range_only');
      }
      
      // 4. Contains "eventos," or calendar UI text
      if (nameEs.includes('eventos,') || nameEs.includes('evento,')) {
        shouldDelete = true;
        reasons.push('calendar_ui');
      }
      
      // 5. Starts with numbers (like "1 evento," or "2 eventos,")
      if (/^\d+\s+eventos?,/i.test(nameEs)) {
        shouldDelete = true;
        reasons.push('event_count_ui');
      }
      
      // 6. Contains tab/newline characters (scraped HTML)
      if (nameEs.includes('\t') || nameEs.includes('\n\n')) {
        shouldDelete = true;
        reasons.push('html_scraping_artifact');
      }
      
      // 7. Extremely long names (>200 chars) - likely scraped HTML
      if (nameEs.length > 200) {
        shouldDelete = true;
        reasons.push('name_too_long');
      }
      
      // 8. Contains "Normativa |" or "Listado Inscritos" (event details, not event name)
      if (nameEs.includes('Normativa |') || nameEs.includes('Listado Inscritos') || nameEs.includes('SUMARIO FINAL')) {
        shouldDelete = true;
        reasons.push('event_details_not_name');
      }
      
      // 9. Contains "Calentamiento" (warmup info, not event name)
      if (nameEs.includes('Calentamiento')) {
        shouldDelete = true;
        reasons.push('warmup_info');
      }
      
      // 10. Date is 2025-12-31 (default/placeholder date)
      if (event.date === '2025-12-31') {
        shouldDelete = true;
        reasons.push('placeholder_date');
      }
      
      // 11. Missing location
      if (!event.location?.city || !event.location?.region) {
        shouldDelete = true;
        reasons.push('missing_location');
      }
      
      // 12. No contact info
      const hasEmail = event.contact?.email && event.contact.email !== 'None' && event.contact.email.includes('@');
      const hasPhone = event.contact?.phone && event.contact.phone !== 'None' && event.contact.phone.length >= 9;
      const hasWebsite = event.contact?.website && event.contact.website !== 'None' && event.contact.website.startsWith('http');
      
      if (!hasEmail && !hasPhone && !hasWebsite) {
        shouldDelete = true;
        reasons.push('no_contact');
      }
      
      // 13. Past dates
      if (event.date) {
        try {
          const eventDate = new Date(event.date);
          const now = new Date();
          if (eventDate < now) {
            shouldDelete = true;
            reasons.push('past_date');
          }
        } catch (e) {
          shouldDelete = true;
          reasons.push('invalid_date');
        }
      }
      
      if (shouldDelete) {
        toDelete.push({
          _id: event._id,
          name: nameEs.substring(0, 100),  // Truncate for display
          date: event.date,
          reasons: reasons
        });
      } else {
        toKeep.push({
          _id: event._id,
          name: nameEs,
          date: event.date,
          city: event.location?.city,
          region: event.location?.region
        });
      }
    }
    
    console.log('🔍 ANALYSIS:\n');
    console.log(`✅ Events to KEEP: ${toKeep.length}`);
    console.log(`❌ Events to DELETE: ${toDelete.length}\n`);
    
    // Show reasons
    const reasonCounts = {};
    toDelete.forEach(e => {
      e.reasons.forEach(r => {
        reasonCounts[r] = (reasonCounts[r] || 0) + 1;
      });
    });
    
    console.log('📊 DELETION REASONS:');
    Object.entries(reasonCounts).sort((a, b) => b[1] - a[1]).forEach(([reason, count]) => {
      console.log(`  - ${reason}: ${count}`);
    });
    console.log('');
    
    // Show sample of deletions
    console.log('🗑️  SAMPLE OF EVENTS TO DELETE (first 20):');
    toDelete.slice(0, 20).forEach((e, i) => {
      console.log(`  ${i+1}. "${e.name}" - ${e.reasons.join(', ')}`);
    });
    console.log('');
    
    // Show what we're keeping
    console.log('✅ EVENTS WE WILL KEEP:');
    toKeep.forEach((e, i) => {
      console.log(`  ${i+1}. "${e.name}" (${e.date}) in ${e.city}, ${e.region}`);
    });
    console.log('');
    
    // Delete
    if (toDelete.length > 0) {
      console.log(`🗑️  Deleting ${toDelete.length} invalid events...\n`);
      
      const idsToDelete = toDelete.map(e => e._id);
      const result = await eventsCollection.deleteMany({
        _id: { $in: idsToDelete }
      });
      
      console.log(`✅ Deleted ${result.deletedCount} events\n`);
    } else {
      console.log('✅ No events to delete - database is clean!\n');
    }
    
    // Final count
    const finalCount = await eventsCollection.countDocuments();
    console.log(`📊 FINAL EVENT COUNT: ${finalCount}\n`);
    
    console.log('✅ Ultra cleanup complete!\n');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
  }
}

ultraCleanup();

