#!/usr/bin/env node
/**
 * Generate Sales-Ready CSV with Personalized Email Scripts
 * For 57 enriched Q2 & Q3 2026 events
 */
import { MongoClient } from 'mongodb';
import { createWriteStream } from 'fs';

// Research data with club names
const researchData = [
  { keywords: ['reinosa', 'campoo', 'invierno'], club: 'A.D. Triatlón Reinosa-Campóo', email: 'triatloncampoo@outlook.com' },
  { keywords: ['huesca', 'atletismo'], club: 'Club Atletismo Huesca', email: 'atletismohu@atletismohu.es' },
  { keywords: ['cáceres', 'delfines'], club: 'Club Natación Cáceres Los Delfines', email: 'cncaceres@natacioncaceres.es' },
  { keywords: ['ciudad real', 'forjadores', 'duatlón', 'salamanca', 'albacete', 'sonsierra', 'madrid', 'baena', 'zuera'], club: 'Grupo Montes Norte', email: 'comunicacion@grupomontesnorte.com' },
  { keywords: ['águilas', 'aguilas'], club: 'Club Triatlón Águilas', email: 'Chanitin@hotmail.com' },
  { keywords: ['pamplona', 'navarra'], club: 'Club Natación Pamplona', email: 'delegadotriatloncnp@gmail.com' },
  { keywords: ['pontevedra', 'galaico', 'lérez', 'lerez', 'rías'], club: 'Club Natación Galaico', email: 'galaico@cngalaico.com' },
];

// Match event with research data
function matchResearchData(event) {
  const eventName = (event.name?.es || '').toLowerCase();
  const city = (event.location?.city || '').toLowerCase();
  const region = (event.location?.region || '').toLowerCase();
  
  const searchText = `${eventName} ${city} ${region}`;
  
  for (const research of researchData) {
    if (research.keywords.some(keyword => searchText.includes(keyword))) {
      return {
        club: research.club,
        email: research.email
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

// Check if date is in Q2 or Q3 2026
function isQ2Q3_2026(date) {
  const dateStr = formatDate(date);
  if (!dateStr || !dateStr.startsWith('2026-')) return false;
  
  const month = dateStr.substring(5, 7);
  return month >= '04' && month <= '09';
}

// Generate event URL
function generateEventUrl(eventId) {
  return `https://aquaevents.club/events/${eventId}`;
}

// Determine if email is club/organizer or generic/federation
function isClubEmail(email, clubName) {
  if (!email) return false;
  
  // Generic federation emails
  const federationPatterns = ['@rfen.es', '@fetri.es', '@fextri', '@ftrm', '@triatlocv'];
  if (federationPatterns.some(pattern => email.includes(pattern))) {
    return false;
  }
  
  // If we have a club name from research, it's a club email
  if (clubName) {
    return true;
  }
  
  return false;
}

// Generate email script
function generateEmailScript(eventName, clubName, email, eventLink) {
  const isClub = isClubEmail(email, clubName);
  
  if (isClub && clubName) {
    // Club/Organizer email
    return `Subject: ⚠️ Verificación: ${eventName} (Temporada 2026)

Hola ${clubName},

Soy David de AquaEvents. Tenemos vuestro evento ${eventName} listado en nuestra plataforma para la temporada 2026.

Como la página ya está activa, necesitamos que verifiquéis si los datos son correctos para no confundir a los nadadores:
👉 ${eventLink}

Nota: Al verificar, veréis la Calculadora de Precios activada para bloquear el coste de gorros de esta edición.

Gracias,
Bruno`;
  } else {
    // Generic/Federation email
    return `Subject: Contacto Organizador: ${eventName}

Hola,

Vemos el evento ${eventName} activo en nuestra plataforma: ${eventLink}

Necesitamos contactar con el Club Organizador para verificar los detalles técnicos. ¿Podríais facilitarnos su email?

Gracias.`;
  }
}

// Escape CSV field
function escapeCsv(field) {
  if (field === null || field === undefined) return '';
  const str = String(field);
  // Always quote fields with commas, quotes, newlines, or special characters
  if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('👉') || str.includes('⚠️')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

async function main() {
  console.log('=== Sales-Ready Email CSV Generator ===\n');
  
  const mongoUri = process.env.MONGODB_URI;
  const client = new MongoClient(mongoUri);
  
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB\n');
    
    const db = client.db('aquaevents_db');
    const eventsCollection = db.collection('events');
    
    // Fetch all events
    console.log('Fetching events...');
    const allEvents = await eventsCollection.find().toArray();
    
    // Filter for Q2 & Q3 2026
    const q2q3Events = allEvents.filter(event => isQ2Q3_2026(event.date));
    console.log(`Found ${q2q3Events.length} Q2 & Q3 2026 events\n`);
    
    // Filter for enriched events (those with research data)
    console.log('Filtering enriched events...');
    const enrichedEvents = [];
    
    for (const event of q2q3Events) {
      const match = matchResearchData(event);
      if (match && match.email) {
        enrichedEvents.push({
          event,
          clubName: match.club,
          email: match.email
        });
      }
    }
    
    console.log(`Found ${enrichedEvents.length} enriched events with contact data\n`);
    
    // Sort by date
    enrichedEvents.sort((a, b) => {
      const dateA = formatDate(a.event.date);
      const dateB = formatDate(b.event.date);
      return dateA.localeCompare(dateB);
    });
    
    // Generate CSV
    const csvPath = '/home/ubuntu/Q2_Q3_2026_Sales_Emails.csv';
    console.log(`Generating sales CSV: ${csvPath}...\n`);
    
    const writeStream = createWriteStream(csvPath);
    
    // Write header
    const headers = ['event_name', 'host_club_name', 'target_email', 'event_link', 'email_script'];
    writeStream.write(headers.join(',') + '\n');
    
    // Write rows
    for (const item of enrichedEvents) {
      const event = item.event;
      const eventName = event.name?.es || '';
      const eventId = event._id || event.id || '';
      const eventLink = generateEventUrl(eventId);
      const emailScript = generateEmailScript(eventName, item.clubName, item.email, eventLink);
      
      const row = [
        escapeCsv(eventName),
        escapeCsv(item.clubName),
        escapeCsv(item.email),
        escapeCsv(eventLink),
        escapeCsv(emailScript)
      ];
      
      writeStream.write(row.join(',') + '\n');
    }
    
    writeStream.end();
    
    console.log('✅ CSV generated successfully!\n');
    console.log('=== Summary ===');
    console.log(`Total enriched events: ${enrichedEvents.length}`);
    console.log(`CSV file: ${csvPath}`);
    
    // Show sample
    console.log('\n=== Sample Rows ===');
    enrichedEvents.slice(0, 3).forEach(item => {
      console.log(`${formatDate(item.event.date)} | ${item.event.name?.es} | ${item.clubName}`);
    });
    
    console.log('\n✅ Ready to send! Test the first link before mass mailing. 🚀');
    
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

main();
