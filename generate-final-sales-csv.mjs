#!/usr/bin/env node
/**
 * Generate Final Sales CSV - Q2, Q3, Q4 2026
 * - ALL events (not just enriched)
 * - Only 100% verified contacts from deep research
 * - Grouped summary emails per host
 */
import { MongoClient } from 'mongodb';
import { createWriteStream } from 'fs';

// STRICT VERIFIED CONTACTS ONLY - From deep research intelligence reports
const verifiedContacts = [
  {
    club: 'A.D. Triatlón Reinosa-Campóo',
    email: 'triatloncampoo@outlook.com',
    cities: ['Reinosa'],
    keywords: ['reinosa', 'campoo']
  },
  {
    club: 'Club Atletismo Huesca',
    email: 'atletismohu@atletismohu.es',
    cities: ['Huesca'],
    keywords: ['huesca']
  },
  {
    club: 'Club Natación Cáceres Los Delfines',
    email: 'cncaceres@natacioncaceres.es',
    cities: ['Cáceres'],
    keywords: ['cáceres', 'caceres']
  },
  {
    club: 'C.D.B. Club Triatlón Albacete',
    email: 'INFOTRIALBACETE@GMAIL.COM',
    cities: ['Albacete'],
    keywords: ['albacete']
  },
  {
    club: 'Club Triatlón Águilas',
    email: 'Chanitin@hotmail.com',
    cities: ['Águilas', 'Aguilas'],
    keywords: ['águilas', 'aguilas']
  },
  {
    club: 'Club Natación Pamplona',
    email: 'delegadotriatloncnp@gmail.com',
    cities: ['Pamplona'],
    keywords: ['pamplona']
  },
  {
    club: 'Club Natación Galaico',
    email: 'galaico@cngalaico.com',
    cities: ['Pontevedra'],
    keywords: ['pontevedra', 'galaico', 'lérez', 'lerez']
  },
];

// STRICT matching - only match if city AND keywords match
function matchVerifiedContact(event) {
  const eventName = (event.name?.es || '').toLowerCase();
  const city = (event.location?.city || '').toLowerCase();
  const region = (event.location?.region || '').toLowerCase();
  
  for (const contact of verifiedContacts) {
    // Check if city matches (case-insensitive)
    const cityMatch = contact.cities.some(c => city.includes(c.toLowerCase()));
    
    // Check if keywords match in event name or location
    const keywordMatch = contact.keywords.some(keyword => 
      eventName.includes(keyword) || city.includes(keyword) || region.includes(keyword)
    );
    
    // BOTH must match
    if (cityMatch && keywordMatch) {
      return {
        club: contact.club,
        email: contact.email
      };
    }
  }
  
  return null;
}

// Format date as YYYY-MM-DD
function formatDate(date) {
  if (!date) return '';
  
  if (typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return date;
  }
  
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Check if date is in Q2, Q3, or Q4 2026
function isQ2Q3Q4_2026(date) {
  const dateStr = formatDate(date);
  if (!dateStr || !dateStr.startsWith('2026-')) return false;
  
  const month = dateStr.substring(5, 7);
  return month >= '04' && month <= '12'; // April to December
}

// Get quarter
function getQuarter(date) {
  const dateStr = formatDate(date);
  if (!dateStr) return '';
  
  const month = parseInt(dateStr.split('-')[1], 10);
  if (month >= 4 && month <= 6) return 'Q2';
  if (month >= 7 && month <= 9) return 'Q3';
  if (month >= 10 && month <= 12) return 'Q4';
  return '';
}

// Generate event URL
function generateEventUrl(eventId) {
  return `https://aquaevents.club/events/${eventId}`;
}

// Escape CSV field
function escapeCsv(field) {
  if (field === null || field === undefined) return '';
  const str = String(field);
  if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('👉') || str.includes('⚠️')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

async function main() {
  console.log('=== Final Sales CSV Generator (Q2-Q4 2026) ===\n');
  
  const mongoUri = process.env.MONGODB_URI;
  const client = new MongoClient(mongoUri);
  
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB\n');
    
    const db = client.db('aquaevents_db');
    const eventsCollection = db.collection('events');
    
    // Fetch all events
    console.log('Fetching all events...');
    const allEvents = await eventsCollection.find().toArray();
    console.log(`Total events in database: ${allEvents.length}\n`);
    
    // Filter for Q2, Q3, Q4 2026
    console.log('Filtering for Q2, Q3, Q4 2026 (April-December)...');
    const targetEvents = allEvents.filter(event => isQ2Q3Q4_2026(event.date));
    console.log(`Found ${targetEvents.length} events in Q2-Q4 2026\n`);
    
    // Sort by date
    targetEvents.sort((a, b) => {
      const dateA = formatDate(a.date);
      const dateB = formatDate(b.date);
      return dateA.localeCompare(dateB);
    });
    
    // Process all events and mark verified contacts
    console.log('Matching with VERIFIED contacts only...');
    const processedEvents = targetEvents.map(event => {
      const match = matchVerifiedContact(event);
      
      return {
        event_id: event._id || event.id || '',
        event_name: event.name?.es || '',
        event_date: formatDate(event.date),
        quarter: getQuarter(event.date),
        city: event.location?.city || '',
        region: event.location?.region || '',
        federation: event.federation || '',
        host_club_name: match ? match.club : '',
        target_email: match ? match.email : '',
        registration_link: event.registration_url || event.source_url || '',
        event_link: generateEventUrl(event._id || event.id || ''),
        verified: match ? 'YES' : 'NO'
      };
    });
    
    const verifiedCount = processedEvents.filter(e => e.verified === 'YES').length;
    console.log(`✅ Verified contacts: ${verifiedCount} events`);
    console.log(`⚠️  Unverified: ${processedEvents.length - verifiedCount} events\n`);
    
    // Generate CSV 1: ALL EVENTS
    const allEventsCsvPath = '/home/ubuntu/Q2_Q3_Q4_2026_All_Events.csv';
    console.log(`Generating complete events CSV: ${allEventsCsvPath}...`);
    
    const allEventsStream = createWriteStream(allEventsCsvPath);
    const headers = [
      'event_id',
      'event_name',
      'event_date',
      'quarter',
      'city',
      'region',
      'federation',
      'host_club_name',
      'target_email',
      'registration_link',
      'event_link',
      'verified'
    ];
    
    allEventsStream.write(headers.join(',') + '\n');
    
    for (const event of processedEvents) {
      const row = headers.map(h => escapeCsv(event[h]));
      allEventsStream.write(row.join(',') + '\n');
    }
    
    allEventsStream.end();
    console.log('✅ Complete events CSV generated\n');
    
    // Generate CSV 2: GROUPED BY HOST (for summary emails)
    console.log('Generating grouped summary CSV...');
    
    // Group verified events by host
    const groupedByHost = {};
    
    processedEvents.forEach(event => {
      if (event.verified === 'YES' && event.target_email) {
        const key = `${event.host_club_name}|||${event.target_email}`;
        
        if (!groupedByHost[key]) {
          groupedByHost[key] = {
            host_club_name: event.host_club_name,
            target_email: event.target_email,
            events: []
          };
        }
        
        groupedByHost[key].events.push(event);
      }
    });
    
    const groupedCsvPath = '/home/ubuntu/Q2_Q3_Q4_2026_Grouped_By_Host.csv';
    const groupedStream = createWriteStream(groupedCsvPath);
    
    const groupedHeaders = [
      'host_club_name',
      'target_email',
      'event_count',
      'cities',
      'quarters',
      'event_list',
      'event_links',
      'email_script'
    ];
    
    groupedStream.write(groupedHeaders.join(',') + '\n');
    
    for (const key in groupedByHost) {
      const group = groupedByHost[key];
      const events = group.events;
      
      // Extract unique cities and quarters
      const cities = [...new Set(events.map(e => e.city))].join(', ');
      const quarters = [...new Set(events.map(e => e.quarter))].sort().join(', ');
      
      // Create event list
      const eventList = events.map(e => `${e.event_date} - ${e.event_name} (${e.city})`).join('\n');
      const eventLinks = events.map(e => e.event_link).join('\n');
      
      // Generate summary email script
      const emailScript = `Subject: ⚠️ Verificación: ${events.length} Eventos ${group.host_club_name} (Q2-Q4 2026)

Hola ${group.host_club_name},

Soy David de AquaEvents. Tenemos ${events.length} eventos vuestros listados en nuestra plataforma para la temporada 2026 (${quarters}).

📍 Ciudades: ${cities}

📅 Eventos listados:
${events.map((e, i) => `${i + 1}. ${e.event_date} - ${e.event_name} (${e.city})\n   👉 ${e.event_link}`).join('\n\n')}

Como las páginas ya están activas, necesitamos que verifiquéis si los datos son correctos para no confundir a los nadadores.

📋 También necesitamos:
- Confirmar si hay eventos adicionales pendientes de publicar
- Links de inscripción para los eventos que faltan
- Cualquier corrección en fechas o ubicaciones

Nota: Al verificar, veréis la Calculadora de Precios activada para bloquear el coste de gorros de esta edición.

Gracias,
Bruno`;
      
      const row = [
        escapeCsv(group.host_club_name),
        escapeCsv(group.target_email),
        escapeCsv(events.length),
        escapeCsv(cities),
        escapeCsv(quarters),
        escapeCsv(eventList),
        escapeCsv(eventLinks),
        escapeCsv(emailScript)
      ];
      
      groupedStream.write(row.join(',') + '\n');
    }
    
    groupedStream.end();
    console.log('✅ Grouped summary CSV generated\n');
    
    // Summary
    console.log('=== FINAL SUMMARY ===');
    console.log(`Total Q2-Q4 2026 events: ${processedEvents.length}`);
    console.log(`  - Q2 (Apr-Jun): ${processedEvents.filter(e => e.quarter === 'Q2').length}`);
    console.log(`  - Q3 (Jul-Sep): ${processedEvents.filter(e => e.quarter === 'Q3').length}`);
    console.log(`  - Q4 (Oct-Dec): ${processedEvents.filter(e => e.quarter === 'Q4').length}`);
    console.log(`\nVerified contacts: ${verifiedCount} events`);
    console.log(`Unique hosts: ${Object.keys(groupedByHost).length}`);
    console.log(`\nFiles generated:`);
    console.log(`  1. ${allEventsCsvPath} (all events)`);
    console.log(`  2. ${groupedCsvPath} (grouped by host)`);
    
    console.log('\n=== Verified Hosts ===');
    for (const key in groupedByHost) {
      const group = groupedByHost[key];
      console.log(`${group.host_club_name}: ${group.events.length} events`);
    }
    
    console.log('\n✅ Complete! Ready for outreach. 🚀');
    
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

main();
