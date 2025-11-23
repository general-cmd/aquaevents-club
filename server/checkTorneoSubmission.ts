import { drizzle } from 'drizzle-orm/mysql2';
import { like } from 'drizzle-orm';
import { eventSubmissions } from '../drizzle/schema';

const db = drizzle(process.env.DATABASE_URL!);

async function checkTorneoSubmission() {
  try {
    const submissions = await db
      .select()
      .from(eventSubmissions)
      .where(like(eventSubmissions.title, '%Torneo%'))
      .limit(5);
    
    console.log(`Found ${submissions.length} submissions matching "Torneo":\n`);
    
    submissions.forEach((sub, index) => {
      console.log(`Submission ${index + 1}:`);
      console.log('ID:', sub.id);
      console.log('Title:', sub.title);
      console.log('Status:', sub.status);
      console.log('Start Date:', sub.startDate);
      console.log('End Date:', sub.endDate);
      console.log('Max Capacity:', sub.maxCapacity);
      console.log('Current Registrations:', sub.currentRegistrations);
      console.log('Registration URL:', sub.registrationUrl);
      console.log('Website:', sub.website);
      console.log('Published At:', sub.publishedAt);
      console.log('---\n');
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

checkTorneoSubmission();

