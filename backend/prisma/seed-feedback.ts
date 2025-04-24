// backend/prisma/seed-feedback.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Starting feedback system seeding...');

    // Create test users if they don't exist
    // Mentee User
    const menteeEmail = 'mentee@example.com';
    let mentee = await prisma.user.findUnique({
      where: { email: menteeEmail }
    });

    if (!mentee) {
      const hashedPassword = await bcrypt.hash('Password123!', 10);
      
      mentee = await prisma.user.create({
        data: {
          id: 1001, // Using a specific ID to avoid conflicts
          email: menteeEmail,
          password_hash: hashedPassword,
          full_name: 'Test Mentee',
          is_active: true,
          is_email_verified: true
        }
      });
      
      console.log(`Created mentee user: ${mentee.email}`);
      
      // Assign MENTEE role to user
      const menteeRole = await prisma.role.findUnique({
        where: { role_name: 'MENTEE' }
      });
      
      if (!menteeRole) {
        // Create MENTEE role if it doesn't exist
        await prisma.role.create({
          data: {
            id: 2,
            role_name: 'MENTEE',
            description: 'Regular user seeking mentorship'
          }
        });
        console.log('Created MENTEE role');
      }
      
      // Assign MENTEE role to user
      await prisma.userRole.create({
        data: {
          id: 2001, // Using a specific ID to avoid conflicts
          user_id: mentee.id,
          role_id: 2 // Assuming MENTEE role has ID 2
        }
      });
      console.log('Assigned MENTEE role to user');
    }

    // Mentor User
    const mentorEmail = 'mentor@example.com';
    let mentor = await prisma.user.findUnique({
      where: { email: mentorEmail }
    });

    if (!mentor) {
      const hashedPassword = await bcrypt.hash('Password123!', 10);
      
      mentor = await prisma.user.create({
        data: {
          id: 1002, // Using a specific ID to avoid conflicts
          email: mentorEmail,
          password_hash: hashedPassword,
          full_name: 'Test Mentor',
          is_active: true,
          is_email_verified: true
        }
      });
      
      console.log(`Created mentor user: ${mentor.email}`);
      
      // Assign MENTOR role to user
      const mentorRole = await prisma.role.findUnique({
        where: { role_name: 'MENTOR' }
      });
      
      if (!mentorRole) {
        // Create MENTOR role if it doesn't exist
        await prisma.role.create({
          data: {
            id: 3,
            role_name: 'MENTOR',
            description: 'Expert providing mentorship'
          }
        });
        console.log('Created MENTOR role');
      }
      
      // Assign MENTOR role to user
      await prisma.userRole.create({
        data: {
          id: 2002, // Using a specific ID to avoid conflicts
          user_id: mentor.id,
          role_id: 3 // Assuming MENTOR role has ID 3
        }
      });
      console.log('Assigned MENTOR role to user');
    }

    // Create mentor profile if it doesn't exist
    let mentorProfile = await prisma.mentorProfile.findUnique({
      where: { user_id: mentor.id }
    });

    if (!mentorProfile) {
      mentorProfile = await prisma.mentorProfile.create({
        data: {
          id: 101, // Using a specific ID to avoid conflicts
          user_id: mentor.id,
          expertise: 'Data Science, Machine Learning',
          bio: 'Experienced data scientist with 5+ years in the industry',
          experience: '5+ years working with top tech companies',
          hourly_rate: 150.00,
          is_verified: true
        }
      });
      console.log('Created mentor profile');
    }

    // Create mentoring service if it doesn't exist
    let mentoringService = await prisma.mentoringService.findFirst({
      where: { mentor_id: mentorProfile.id }
    });

    if (!mentoringService) {
      mentoringService = await prisma.mentoringService.create({
        data: {
          id: 101, // Using a specific ID to avoid conflicts
          mentor_id: mentorProfile.id,
          service_name: 'Data Science Fundamentals',
          description: 'Learn the fundamentals of data science and analytics',
          price: 1000.00,
          service_type: 'one-on-one',
          duration_days: 30,
          is_active: true
        }
      });
      console.log('Created mentoring service');
    }

    // Create mentoring session if it doesn't exist
    let mentoringSession = await prisma.mentoringSession.findFirst({
      where: { service_id: mentoringService.id }
    });

    if (!mentoringSession) {
      // Create a session that started yesterday and ended today (completed)
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      const today = new Date();
      
      mentoringSession = await prisma.mentoringSession.create({
        data: {
          id: 1744863082, // Using the session ID from the screenshot
          service_id: mentoringService.id,
          start_time: yesterday,
          end_time: today,
          duration_minutes: 60,
          meeting_link: 'https://meet.example.com/session',
          status: 'completed',
          notes: 'Introduction to Data Science concepts'
        }
      });
      console.log('Created mentoring session');
    }

    // Create booking for the mentee to join the session
    let booking = await prisma.booking.findFirst({
      where: { 
        mentee_id: mentee.id,
        session_id: mentoringSession.id
      }
    });

    if (!booking) {
      booking = await prisma.booking.create({
        data: {
          id: 101, // Using a specific ID to avoid conflicts
          mentee_id: mentee.id,
          session_id: mentoringSession.id,
          booking_date: new Date(new Date().setDate(new Date().getDate() - 7)), // Booked a week ago
          status: 'completed'
        }
      });
      console.log('Created booking for mentee to join session');
    }

    // Create payment for the booking
    let payment = await prisma.payment.findFirst({
      where: { booking_id: booking.id }
    });

    if (!payment) {
      payment = await prisma.payment.create({
        data: {
          id: 101, // Using a specific ID to avoid conflicts
          booking_id: booking.id,
          amount: 1000.00,
          payment_date: new Date(new Date().setDate(new Date().getDate() - 7)), // Paid a week ago
          payment_method: 'bank_transfer',
          transaction_id: 'TRX123456789',
          status: 'completed'
        }
      });
      console.log('Created payment for booking');
    }

    console.log('Feedback system seeding completed successfully');
  } catch (error) {
    console.error('Error seeding feedback system:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });