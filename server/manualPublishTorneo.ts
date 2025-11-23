import { drizzle } from 'drizzle-orm/mysql2';
import { eq } from 'drizzle-orm';
import { eventSubmissions } from '../drizzle/schema';
import { publishEventToMongo } from './publishEvent';

const db = drizzle(process.env.DATABASE_URL!);

async function manualPublish() {
  try {
    // Find the Torneo submission
    const submissions = await db
      .select()
      .from(eventSubmissions)
      .where(eq(eventSubmissions.id, 'rKirmb1MOk3KzDQHb8Gs1'))
      .limit(1);
    
    if (submissions.length === 0) {
      console.log('Submission not found');
      return;
    }
    
    const submission = submissions[0];
    console.log('Found submission:', submission.title);
    console.log('Status:', submission.status);
    console.log('Published At:', submission.publishedAt);
    
    // Manually publish to MongoDB
    console.log('\nPublishing to MongoDB...');
    const result = await publishEventToMongo(submission.id);
    console.log('Published successfully!');
    console.log('MongoDB Event ID:', result.eventId);
    
  } catch (error) {
    console.error('Error:', error);
  }
}

manualPublish();

