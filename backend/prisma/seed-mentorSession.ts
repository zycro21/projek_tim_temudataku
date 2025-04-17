import { PrismaClient } from '@prisma/client';
import { add } from 'date-fns';

const prisma = new PrismaClient();

/**
 * Seed mentoring sessions data
 */
async function seedMentoringSessions() {
  try {
    console.log('Seeding mentoring sessions...');

    // Get existing services to link sessions to
    const services = await prisma.mentoringService.findMany({
      include: {
        mentor: true
      }
    });

    if (services.length === 0) {
      console.log('No mentoring services found. Please run seed-mentor.ts first.');
      return;
    }

    // Clear existing sessions
    await prisma.mentoringSession.deleteMany({});
    console.log('Cleared existing mentoring sessions');

    // Base timestamp to ensure uniqueness
    const baseTimestamp = Math.floor(Date.now() / 1000);
    let sessionCounter = 0;

    // Create sessions for each service
    for (const service of services) {
      const now = new Date();
      const sessionCount = Math.floor(Math.random() * 5) + 2; // 2-6 sessions per service
      
      // Create both upcoming and past sessions
      for (let i = 0; i < sessionCount; i++) {
        // Define session date - some in the past, some in the future
        const isUpcoming = i % 3 !== 0; // 2/3 of sessions will be upcoming
        const daysOffset = isUpcoming 
          ? Math.floor(Math.random() * 30) + 1 // 1-30 days in the future
          : -(Math.floor(Math.random() * 30) + 1); // 1-30 days in the past
        
        const startTime = add(now, { days: daysOffset });
        
        // Session duration between 1-3 hours
        const durationHours = Math.floor(Math.random() * 3) + 1;
        const durationMinutes = durationHours * 60;
        const endTime = add(startTime, { minutes: durationMinutes });
        
        // Status based on time
        let status;
        if (startTime > now) {
          status = 'scheduled';
        } else if (endTime < now) {
          status = Math.random() > 0.2 ? 'completed' : 'cancelled';
        } else {
          status = 'ongoing';
        }

        // Meeting platforms
        const meetingPlatforms = [
          'https://meet.google.com/abc-defg-hij',
          'https://zoom.us/j/1234567890',
          'https://teams.microsoft.com/l/meetup-join/abc',
          null // Some sessions might not have links yet
        ];
        
        const meetingLink = isUpcoming ? 
          meetingPlatforms[Math.floor(Math.random() * meetingPlatforms.length)] : 
          (status === 'completed' ? meetingPlatforms[Math.floor(Math.random() * 3)] : null);

        // Session notes
        const noteTemplates = [
          `${service.service_name} session ${i+1} - Please prepare by reviewing the materials sent earlier.`,
          `${service.service_name} - Introduction to key concepts.`,
          `${service.service_name} - Hands-on practice session.`,
          `${service.service_name} - Q&A and problem-solving session.`,
          `${service.service_name} - Final review and project discussion.`
        ];
        
        // Generate a truly unique ID by combining base timestamp, service ID, and counter
        const sessionId = baseTimestamp + sessionCounter++;
        
        try {
          await prisma.mentoringSession.create({
            data: {
              id: sessionId,
              service_id: service.id,
              start_time: startTime,
              end_time: endTime,
              duration_minutes: durationMinutes,
              meeting_link: meetingLink,
              status,
              notes: noteTemplates[Math.floor(Math.random() * noteTemplates.length)],
              created_at: add(startTime, { days: -7 }), // Created a week before the session
              updated_at: Math.random() > 0.5 ? add(startTime, { days: -2 }) : null // Some sessions were updated
            }
          });

          console.log(`Created ${status} session for service: ${service.service_name}`);
        } catch (error) {
          console.error(`Failed to create session for service ID ${service.id}:`, error);
          // Continue with the next session
        }
      }
    }

    console.log(`Seeding completed! Created sessions for ${services.length} services.`);
  } catch (error) {
    console.error('Error seeding mentoring sessions:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seeding function
seedMentoringSessions()
  .catch((error) => {
    console.error('Error during seeding:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });