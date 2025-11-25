import fetch from 'node-fetch';

const API_URL = 'http://localhost:3000/api/trpc/events.create';

async function testCreateEvent() {
  try {
    console.log('🧪 Testing event creation via API...\n');

    const eventData = {
      nameEs: "Campeonato de España Open de Invierno 2026",
      nameEn: "Spanish Open Winter Championship 2026",
      descriptionEs: "Campeonato nacional de natación en piscina de 25 metros. Abierto a todas las categorías.",
      descriptionEn: "National swimming championship in 25m pool. Open to all categories.",
      date: "2026-02-14",
      endDate: "2026-02-15",
      time: "09:00",
      endTime: "18:00",
      city: "Madrid",
      region: "Madrid",
      venue: "Centro Acuático M-86",
      address: "Calle de la Vía, 28",
      discipline: "natacion",
      category: "nacional",
      organizerType: "federation",
      organizerName: "RFEN",
      contactEmail: "natacion@rfen.es",
      contactPhone: "+34 915 478 200",
      contactWebsite: "https://www.rfen.es",
      registrationUrl: "https://www.rfen.es/inscripciones",
      maxCapacity: 500,
      currentRegistrations: 0
    };

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        json: eventData
      })
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Event created successfully!');
      console.log('📝 Response:', JSON.stringify(result, null, 2));
    } else {
      console.log('❌ Error creating event');
      console.log('📝 Response:', JSON.stringify(result, null, 2));
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testCreateEvent();

