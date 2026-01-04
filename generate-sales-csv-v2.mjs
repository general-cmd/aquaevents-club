#!/usr/bin/env node
/**
 * Generate Q2 & Q3 2026 Sales Master CSV
 * Handles both string dates (YYYY-MM-DD) and Date objects
 */
import { MongoClient } from 'mongodb';
import { createWriteStream } from 'fs';

// Research data extracted from intelligence reports
const researchData = [
  { keywords: ['reinosa', 'campoo', 'invierno', 'triatlón de invierno'], club: 'A.D. Triatlón Reinosa-Campóo', email: 'triatloncampoo@outlook.com' },
  { keywords: ['huesca', 'atletismo'], club: 'Club Atletismo Huesca', email: 'atletismohu@atletismohu.es' },
  { keywords: ['cáceres', 'delfines', 'natación cáceres'], club: 'Club Natación Cáceres Los Delfines', email: 'cncaceres@natacioncaceres.es' },
  { keywords: ['ciudad real', 'forjadores', 'duatlón'], club: 'Club Triatlón Forjadores / Grupo Montes Norte', email: 'comunicacion@grupomontesnorte.com' },
  { keywords: ['albacete', 'triatlón albacete'], club: 'C.D.B. Club Triatlón Albacete', email: 'INFOTRIALBACETE@GMAIL.COM' },
  { keywords: ['águilas', 'aguilas', 'murcia'], club: 'Club Triatlón Águilas', email: 'Chanitin@hotmail.com' },
  { keywords: ['pamplona', 'navarra', 'natación pamplona'], club: 'Club Natación Pamplona', email: 'delegadotriatloncnp@gmail.com' },
  { keywords: ['pontevedra', 'galaico', 'lérez', 'lerez', 'rías do sur', 'rias do sur'], club: 'Club Natación Galaico', email: 'galaico@cngalaico.com' },
  { keywords: ['vinuesa', 'soria', 'gravel'], club: 'Club Triatlón Vinuesa', email: '' }, // No email in research
  { keywords: ['muros', 'galicia', 'mar de muros'], club: 'Club Triatlón Muros', email: '' },
  { keywords: ['blanca', 'murcia'], club: 'Club Triatlón Blanca', email: '' },
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
        status: research.email ? 'Ready to Send' : 'Needs Automation'
      };
    }
  }
  
  return {
    club: '',
    email: '',
    status: 'Needs Automation'
  };
}

// Convert any date format to YYYY-MM-DD string
function formatDate(date) {
  if (!date) return '';
  
  // If it's already a string in YYYY-MM-DD format
  if (typeof date === 'string') {
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return date;
    }
    // Try to parse it
    const parsed = new Date(date);
    if (!isNaN(parsed.getTime())) {
      date = parsed;
    } else {
      return date; // Return as-is if can't parse
    }
  }
  
  // If it's a Date object
  if (date instanceof Date || typeof date === 'object') {
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  return '';
}

// Determine quarter from date
function getQuarter(date) {
  const dateStr = formatDate(date);
  if (!dateStr) return '';
  
  const month = parseInt(dateStr.split('-')[1], 10);
  if (month >= 4 && month <= 6) return 'Q2';
  if (month >= 7 && month <= 9) return 'Q3';
  return '';
}

// Check if date is in Q2 or Q3 2026
function isQ2Q3_2026(date) {
  const dateStr = formatDate(date);
  if (!dateStr || !dateStr.startsWith('2026-')) return false;
  
  const month = dateStr.substring(5, 7);
  return month >= '04' && month <= '09';
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
    
    // Query for ALL events (we'll filter by date in JavaScript)
    console.log('Fetching all events...');
    const allEvents = await eventsCollection.find().toArray();
    console.log(`Total events in database: ${allEvents.length}\n`);
    
    // Filter for Q2 & Q3 2026
    console.log('Filtering for Q2 & Q3 2026 (April-September)...');
    const q2q3Events = allEvents.filter(event => isQ2Q3_2026(event.date));
    
    console.log(`Found ${q2q3Events.length} events in Q2 & Q3 2026\n`);
    
    if (q2q3Events.length === 0) {
      console.log('No events found in Q2 & Q3 2026.');
      return;
    }
    
    // Sort by date
    q2q3Events.sort((a, b) => {
      const dateA = formatDate(a.date);
      const dateB = formatDate(b.date);
      return dateA.localeCompare(dateB);
    });
    
    // Process and enrich events
    console.log('Matching with research data...');
    const enrichedEvents = q2q3Events.map(event => {
      const match = matchResearchData(event);
      const quarter = getQuarter(event.date);
      
      return {
        internal_id: event._id || event.id || '',
        event_name: event.name?.es || '',
        event_date: formatDate(event.date),
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
    console.log(`\nQ2 events (Apr-Jun): ${enrichedEvents.filter(e => e.quarter === 'Q2').length}`);
    console.log(`Q3 events (Jul-Sep): ${enrichedEvents.filter(e => e.quarter === 'Q3').length}`);
    
    // Show sample enriched events
    const enrichedSamples = enrichedEvents.filter(e => e.status === 'Ready to Send').slice(0, 5);
    if (enrichedSamples.length > 0) {
      console.log('\n=== Sample Enriched Events ===');
      enrichedSamples.forEach(e => {
        console.log(`${e.event_date} | ${e.location_city} | ${e.researched_host_club}`);
      });
    }
    
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  } finally {
    await client.close();
    console.log('\n✅ Complete!');
  }
}

main();
