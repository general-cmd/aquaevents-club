/**
 * Generate ICS (iCalendar) file content for events
 * Compatible with Google Calendar, Apple Calendar, Outlook, etc.
 */

interface ICSEvent {
  title: string;
  startDate: string;
  endDate?: string;
  location?: string;
  description?: string;
  url?: string;
}

function formatICSDate(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
}

function escapeICSText(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

export function generateICS(events: ICSEvent[], filename: string = 'eventos.ics'): void {
  const now = new Date();
  const timestamp = formatICSDate(now.toISOString());
  
  let icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//AquaEvents.club//ES',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Eventos Acuáticos',
    'X-WR-TIMEZONE:Europe/Madrid',
  ];

  events.forEach((event, index) => {
    const uid = `${timestamp}-${index}@aquaevents.club`;
    const dtstart = formatICSDate(event.startDate);
    const dtend = event.endDate ? formatICSDate(event.endDate) : dtstart;
    
    icsContent.push(
      'BEGIN:VEVENT',
      `UID:${uid}`,
      `DTSTAMP:${timestamp}`,
      `DTSTART:${dtstart}`,
      `DTEND:${dtend}`,
      `SUMMARY:${escapeICSText(event.title)}`,
    );

    if (event.location) {
      icsContent.push(`LOCATION:${escapeICSText(event.location)}`);
    }

    if (event.description) {
      icsContent.push(`DESCRIPTION:${escapeICSText(event.description)}`);
    }

    if (event.url) {
      icsContent.push(`URL:${event.url}`);
    }

    icsContent.push(
      'STATUS:CONFIRMED',
      'SEQUENCE:0',
      'END:VEVENT'
    );
  });

  icsContent.push('END:VCALENDAR');

  // Create blob and download
  const blob = new Blob([icsContent.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}

