import { MongoClient, ObjectId } from 'mongodb';

const MONGO_URI = "mongodb+srv://manusdbuser:bh2*klmnjP09@aquaevents.i1zdgpx.mongodb.net/";
const client = new MongoClient(MONGO_URI);

async function aggressiveCleanup() {
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
    
    // Aggressive validation
    for (const event of allEvents) {
      let shouldDelete = false;
      const reasons = [];
      
      const nameEs = event.name?.es || '';
      const city = event.location?.city || '';
      const region = event.location?.region || '';
      
      // Rule 1: Missing location
      if (!city || !region || city === '' || region === '') {
        shouldDelete = true;
        reasons.push('missing_location');
      }
      
      // Rule 2: Name too short or generic
      if (nameEs.length < 10) {
        shouldDelete = true;
        reasons.push('name_too_short');
      }
      
      // Rule 3: Calendar UI elements
      const calendarPatterns = [
        /^Calendario/i,
        /^Filtrar por/i,
        /^DÍA\s+PRUEBA/i,
        /^Eventos anteriores/i,
        /^Año:/i,
        /^\d{4}$/,  // Just a year
        /^(Enero|Febrero|Marzo|Abril|Mayo|Junio|Julio|Agosto|Septiembre|Octubre|Noviembre|Diciembre)$/i,
        /^(Noviembre|Diciembre)$/i,
        /^Todos$/i,
        /^Adultos$/i,
        /^Menores$/i
      ];
      
      if (calendarPatterns.some(pattern => pattern.test(nameEs))) {
        shouldDelete = true;
        reasons.push('calendar_ui_element');
      }
      
      // Rule 4: News articles or announcements (not events)
      const newsPatterns = [
        /Clasificaciones.*Resultados/i,
        /Convocatoria.*Asamblea/i,
        /ICAN Triathlon.*inscripción cubierta/i,
        /^Curso de/i,
        /^TOMA DE TIEMPOS/i
      ];
      
      if (newsPatterns.some(pattern => pattern.test(nameEs))) {
        shouldDelete = true;
        reasons.push('news_article_not_event');
      }
      
      // Rule 5: No contact info
      const hasEmail = event.contact?.email && event.contact.email !== 'None' && event.contact.email.includes('@');
      const hasPhone = event.contact?.phone && event.contact.phone !== 'None' && event.contact.phone.length >= 9;
      const hasWebsite = event.contact?.website && event.contact.website !== 'None' && event.contact.website.startsWith('http');
      
      if (!hasEmail && !hasPhone && !hasWebsite) {
        shouldDelete = true;
        reasons.push('no_contact_info');
      }
      
      // Rule 6: Invalid dates
      if (!event.date) {
        shouldDelete = true;
        reasons.push('missing_date');
      } else {
        try {
          const eventDate = new Date(event.date);
          const now = new Date();
          
          // Past events
          if (eventDate < now) {
            shouldDelete = true;
            reasons.push('past_date');
          }
          
          // Wrong year
          const year = eventDate.getFullYear();
          if (year < 2025 || year > 2026) {
            shouldDelete = true;
            reasons.push('wrong_year');
          }
        } catch (e) {
          shouldDelete = true;
          reasons.push('invalid_date');
        }
      }
      
      // Rule 7: City equals region (suspicious)
      const majorCities = ['Madrid', 'Valencia', 'Sevilla', 'Barcelona', 'Zaragoza', 'Murcia'];
      if (city && region && city.toLowerCase() === region.toLowerCase() && !majorCities.includes(city)) {
        shouldDelete = true;
        reasons.push('city_equals_region');
      }
      
      if (shouldDelete) {
        toDelete.push({
          _id: event._id,
          name: nameEs,
          date: event.date,
          city: city,
          region: region,
          reasons: reasons
        });
      } else {
        toKeep.push({
          _id: event._id,
          name: nameEs,
          date: event.date,
          city: city,
          region: region
        });
      }
    }
    
    console.log('🔍 ANALYSIS:\n');
    console.log(`✅ Events to KEEP: ${toKeep.length}`);
    console.log(`❌ Events to DELETE: ${toDelete.length}\n`);
    
    // Show reasons breakdown
    const reasonCounts = {};
    toDelete.forEach(e => {
      e.reasons.forEach(r => {
        reasonCounts[r] = (reasonCounts[r] || 0) + 1;
      });
    });
    
    console.log('📊 DELETION REASONS:');
    Object.entries(reasonCounts).forEach(([reason, count]) => {
      console.log(`  - ${reason}: ${count}`);
    });
    console.log('');
    
    // Show events to delete
    console.log('🗑️  EVENTS TO DELETE:');
    toDelete.forEach((e, i) => {
      console.log(`  ${i+1}. "${e.name}" (${e.date}) - ${e.reasons.join(', ')}`);
    });
    console.log('');
    
    // Show events to keep
    console.log('✅ EVENTS TO KEEP:');
    toKeep.forEach((e, i) => {
      console.log(`  ${i+1}. "${e.name}" (${e.date}) in ${e.city}, ${e.region}`);
    });
    console.log('');
    
    // Delete
    if (toDelete.length > 0) {
      console.log(`🗑️  Deleting ${toDelete.length} events...\n`);
      
      const idsToDelete = toDelete.map(e => e._id);
      const result = await eventsCollection.deleteMany({
        _id: { $in: idsToDelete }
      });
      
      console.log(`✅ Deleted ${result.deletedCount} events\n`);
    }
    
    // Final count
    const finalCount = await eventsCollection.countDocuments();
    console.log(`\n📊 FINAL EVENT COUNT: ${finalCount}\n`);
    
    console.log('✅ Cleanup complete!\n');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
  }
}

aggressiveCleanup();

