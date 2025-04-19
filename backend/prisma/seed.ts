import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Menambahkan role
  const mentorRole = await prisma.roles.create({
    data: {
      role_name: 'mentor',
      description: 'A mentor role for guiding mentees',
    },
  });

  const menteeRole = await prisma.roles.create({
    data: {
      role_name: 'mentee',
      description: 'A mentee who seeks mentoring',
    },
  });

  console.log('Roles added:', mentorRole, menteeRole);

  // Menambahkan user sebagai mentor
  const mentorUser = await prisma.users.create({
    data: {
      email: 'mentor@example.com',
      password_hash: 'hashedPassword123',
      full_name: 'Mentor Name',
      phone_number: '9876543210',
      is_email_verified: true,
      registration_date: new Date(),
      last_login: new Date(),
      is_active: true,
      user_roles: {
        create: {
          role_id: mentorRole.id, // Mengaitkan role 'mentor' ke user
        },
      },
    },
  });

  console.log('Mentor user added:', mentorUser);

  // Menambahkan user sebagai mentee
  const menteeUser = await prisma.users.create({
    data: {
      email: 'mentee@example.com',
      password_hash: 'hashedPassword123',
      full_name: 'Mentee Name',
      phone_number: '1234567890',
      is_email_verified: true,
      registration_date: new Date(),
      last_login: new Date(),
      is_active: true,
      user_roles: {
        create: {
          role_id: menteeRole.id, // Mengaitkan role 'mentee' ke user
        },
      },
    },
  });

  console.log('Mentee user added:', menteeUser);

  // Menambahkan profil mentor
  const mentorProfile = await prisma.mentor_profiles.create({
    data: {
      user_id: mentorUser.id,
      expertise: 'Web Development',
      bio: 'Experienced in full-stack web development.',
      experience: '5 years of experience in building scalable web applications.',
      hourly_rate: 50.0,
      is_verified: true,
    },
  });

  console.log('Mentor profile added:', mentorProfile);

  // Menambahkan layanan mentoring
  const webDevelopmentService = await prisma.mentoring_services.create({
    data: {
      mentor_id: mentorProfile.id,
      service_name: 'Web Development Mentorship',
      description: 'Mentoring in web development, including frontend and backend.',
      price: 100.0,
      service_type: 'Hourly',
      duration_days: 7,
      is_active: true,
    },
  });

  console.log('Mentoring service added:', webDevelopmentService);
  
  // Menambahkan sesi mentoring
  const mentoringSession = await prisma.mentoring_sessions.create({
    data: {
      service_id: webDevelopmentService.id,
      start_time: new Date(),
      end_time: new Date(new Date().getTime() + 60 * 60 * 1000), // Satu jam
      duration_minutes: 60,
      meeting_link: 'https://zoom.us/j/123456789',
      status: 'scheduled',
      notes: 'First session on introduction to web development.',
    },
  });

  console.log('Mentoring session added:', mentoringSession);

  // Menambahkan booking untuk mentee
  const booking = await prisma.bookings.create({
    data: {
      mentee_id: menteeUser.id,
      session_id: mentoringSession.id,
      status: 'pending',
      special_requests: 'Need help with React.js basics.',
    },
  });

  console.log('Booking added:', booking);
}

main()
  .catch((e) => {
    console.error(e);
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
