#!/usr/bin/env node
/**
 * Generate Q2 & Q3 2026 Sales Master CSV
 * Merges MongoDB events with deep research contact data
 */
import { MongoClient } from 'mongodb';
import { createWriteStream } from 'fs';
import { readFileSync } from 'fs';

// Research data extracted from the intelligence reports
const researchData = [
  // From Triathlon/Duathlon Intelligence Report
  { keywords: ['reinosa', 'campoo', 'invierno', 'triatlón de invierno'], club: 'A.D. Triatlón Reinosa-Campóo', email: 'triatloncampoo@outlook.com' },
  { keywords: ['huesca', 'atletismo'], club: 'Club Atletismo Huesca', email: 'atletismohu@atletismohu.es' },
  { keywords: ['cáceres', 'delfines', 'natación cáceres'], club: 'Club Natación Cáceres Los Delfines', email: 'cncaceres@natacioncaceres.es' },
  { keywords: ['ciudad real', 'forjadores', 'duatlón'], club: 'Club Triatlón Forjadores / Grupo Montes Norte', email: 'comunicacion@grupomontesnorte.com' },
  { keywords: ['albacete', 'triatlón albacete'], club: 'C.D.B. Club Triatlón Albacete', email: 'INFOTRIALBACETE@GMAIL.COM' },
  { keywords: ['águilas', 'aguilas', 'murcia'], club: 'Club Triatlón Águilas', email: 'Chanitin@hotmail.com' },
  { keywords: ['pamplona', 'navarra', 'natación pamplona'], club: 'Club Natación Pamplona', email: 'delegadotriatloncnp@gmail.com' },
  
  // From Swimming Intelligence Report
  { keywords: ['pontevedra', 'galaico', 'lérez', 'lerez', 'rías do sur', 'rias do sur'], club: 'Club Natación Galaico', email: 'galaico@cngalaico.com' },
];

// Match event with research data
function matchResearchData(event) {
  const eventName = (event.name?.es || '').toLowerCase();
  const city = (event.location?.city || '').toLowerCase();
  const region = (event.location?.region || '').toLowerCase();
  const discipline = (event.discipline || '').toLowerCase();
  
  const searchText = `${eventName} ${city} ${region} ${discipline}`;
  
  for (const research of researchData) {
    if (research.keywords.some(keyword => searchText.includes(keyword))) {
      return {
        club: research.club,
        email: research.email,
        status: 'Ready to Send'
      };
    }
  }
  
  return {
    club: '',
    email: '',
    status: 'Needs Automation'
  };
}

// Determine quarter
function getQuarter(dateStr) {
  if (!dateStr) return '';
  const month = parseInt(dateStr.split('-')[1], 10);
  if (month >= 4 && month <= 6) return 'Q2';
  if (month >= 7 && month <= 9) return 'Q3';
  return '';
}

// Format date as YYYY-MM-DD
function formatDate(dateStr) {
  // Date is already in YYYY-MM-DD format
  return dateStr || '';
}

// Escape CSV field
function escapeCsv(field) {
  if (field === null || field === undefined) return '';
  const str = String(field);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

async function main() {
  console.log('=== Q2 & Q3 2026 Sales Master CSV Generator ===\n');
  
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.error('Error: MONGODB_URI environment variable not set');
    process.exit(1);
  }
  
  const client = new MongoClient(mongoUri);
  
  try {
    console.log('Connecting to MongoDB...');
    await client.connect();
    console.log('✅ Connected\n');
    
    const db = client.db('aquaevents_db');
    const eventsCollection = db.collection('events');
    
    // Query for Q2 & Q3 2026 events (dates are stored as strings)
    console.log(`Querying events from 2026-04-01 to 2026-09-30...`);
    
    const events = await eventsCollection.find({
      date: {
        $gte: '2026-04-01',
        $lte: '2026-09-30'
      }
    }).sort({ date: 1 }).toArray();
    
    console.log(`Found ${events.length} events\n`);
    
    if (events.length === 0) {
      console.log('No events found in Q2 & Q3 2026. Exiting.');
      return;
    }
    
    // Process and enrich events
    console.log('Matching with research data...');
    const enrichedEvents = events.map(event => {
      const match = matchResearchData(event);
      const quarter = getQuarter(event.date);
      
      return {
        internal_id: event._id || event.id || '',
        event_name: event.name?.es || '',
        event_date: event.date || '',
        location_city: event.location?.city || '',
        location_region: event.location?.region || '',
        quarter: quarter,
        original_email: event.contact?.email || '',
        researched_host_club: match.club,
        researched_email: match.email,
        status: match.status
      };
    });
    
    const enrichedCount = enrichedEvents.filter(e => e.status === 'Ready to Send').length;
    console.log(`✅ Enriched ${enrichedCount} events with research data\n`);
    
    // Generate CSV
    const csvPath = '/home/ubuntu/Q2_Q3_2026_Sales_Master.csv';
    console.log(`Generating CSV: ${csvPath}...`);
    
    const writeStream = createWriteStream(csvPath);
    
    // Write header
    const headers = [
      'internal_id',
      'event_name',
      'event_date',
      'location_city',
      'location_region',
      'quarter',
      'original_email',
      'researched_host_club',
      'researched_email',
      'status'
    ];
    writeStream.write(headers.join(',') + '\n');
    
    // Write rows
    for (const event of enrichedEvents) {
      const row = headers.map(header => escapeCsv(event[header]));
      writeStream.write(row.join(',') + '\n');
    }
    
    writeStream.end();
    
    console.log('✅ CSV generated successfully!\n');
    console.log('=== Summary ===');
    console.log(`Total events: ${enrichedEvents.length}`);
    console.log(`Ready to Send: ${enrichedCount}`);
    console.log(`Needs Automation: ${enrichedEvents.length - enrichedCount}`);
    console.log(`\nQ2 events: ${enrichedEvents.filter(e => e.quarter === 'Q2').length}`);
    console.log(`Q3 events: ${enrichedEvents.filter(e => e.quarter === 'Q3').length}`);
    
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  } finally {
    await client.close();
    console.log('\n✅ Complete!');
  }
}

main();
