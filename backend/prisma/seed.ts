// import { PrismaClient } from '@prisma/client';
// <<<<<<< HEAD
// import bcrypt from 'bcrypt';
// import { getNextUserId, getNextUserRoleId } from '../src/services/authService';
// =======
// >>>>>>> 3eb97f296cb9618ff77cad5d8542f956508d4df8

// const prisma = new PrismaClient();

// async function main() {
// <<<<<<< HEAD
//   try {
//     // Buat role ADMIN jika belum ada
//     const adminRole = await prisma.role.upsert({
//       where: { role_name: 'ADMIN' },
//       update: {},
//       create: {
//         id: 2, // Diasumsikan MENTEE adalah 1
//         role_name: 'ADMIN',
//         description: 'Administrator dengan akses penuh'
//       }
//     });

//     // Buat user ADMIN awal
//     const existingAdmin = await prisma.user.findFirst({
//       where: {
//         user_roles: {
//           some: {
//             role: {
//               role_name: 'ADMIN'
//             }
//           }
//         }
//       }
//     });

//     if (!existingAdmin) {
//       const hashedPassword = await bcrypt.hash('admin123', 10);
//       const nextUserId = await getNextUserId();

//       // Buat user admin
//       const admin = await prisma.user.create({
//         data: {
//           id: nextUserId,
//           email: 'admin@temudataku.com',
//           password_hash: hashedPassword,
//           full_name: 'Admin TemuDataku',
//           is_email_verified: true,
//           is_active: true
//         }
//       });

//       // Berikan role ADMIN
//       await prisma.userRole.create({
//         data: {
//           id: await getNextUserRoleId(),
//           user_id: admin.id,
//           role_id: adminRole.id
//         }
//       });

//       console.log('Admin user created successfully', admin.email);
//     } else {
//       console.log('Admin user already exists', existingAdmin.email);
//     }

//   } catch (error) {
//     console.error('Error seeding database:', error);
//   }
// =======
//   // Menambahkan role
//   const mentorRole = await prisma.roles.create({
//     data: {
//       role_name: 'mentor',
//       description: 'A mentor role for guiding mentees',
//     },
//   });

//   const menteeRole = await prisma.roles.create({
//     data: {
//       role_name: 'mentee',
//       description: 'A mentee who seeks mentoring',
//     },
//   });

//   console.log('Roles added:', mentorRole, menteeRole);

//   // Menambahkan user sebagai mentor
//   const mentorUser = await prisma.users.create({
//     data: {
//       email: 'mentor@example.com',
//       password_hash: 'hashedPassword123',
//       full_name: 'Mentor Name',
//       phone_number: '9876543210',
//       is_email_verified: true,
//       registration_date: new Date(),
//       last_login: new Date(),
//       is_active: true,
//       user_roles: {
//         create: {
//           role_id: mentorRole.id, // Mengaitkan role 'mentor' ke user
//         },
//       },
//     },
//   });

//   console.log('Mentor user added:', mentorUser);

//   // Menambahkan user sebagai mentee
//   const menteeUser = await prisma.users.create({
//     data: {
//       email: 'mentee@example.com',
//       password_hash: 'hashedPassword123',
//       full_name: 'Mentee Name',
//       phone_number: '1234567890',
//       is_email_verified: true,
//       registration_date: new Date(),
//       last_login: new Date(),
//       is_active: true,
//       user_roles: {
//         create: {
//           role_id: menteeRole.id, // Mengaitkan role 'mentee' ke user
//         },
//       },
//     },
//   });

//   console.log('Mentee user added:', menteeUser);

//   // Menambahkan profil mentor
//   const mentorProfile = await prisma.mentor_profiles.create({
//     data: {
//       user_id: mentorUser.id,
//       expertise: 'Web Development',
//       bio: 'Experienced in full-stack web development.',
//       experience: '5 years of experience in building scalable web applications.',
//       hourly_rate: 50.0,
//       is_verified: true,
//     },
//   });

//   console.log('Mentor profile added:', mentorProfile);

//   // Menambahkan layanan mentoring
//   const webDevelopmentService = await prisma.mentoring_services.create({
//     data: {
//       mentor_id: mentorProfile.id,
//       service_name: 'Web Development Mentorship',
//       description: 'Mentoring in web development, including frontend and backend.',
//       price: 100.0,
//       service_type: 'Hourly',
//       duration_days: 7,
//       is_active: true,
//     },
//   });

//   console.log('Mentoring service added:', webDevelopmentService);

//   // Menambahkan sesi mentoring
//   const mentoringSession = await prisma.mentoring_sessions.create({
//     data: {
//       service_id: webDevelopmentService.id,
//       start_time: new Date(),
//       end_time: new Date(new Date().getTime() + 60 * 60 * 1000), // Satu jam
//       duration_minutes: 60,
//       meeting_link: 'https://zoom.us/j/123456789',
//       status: 'scheduled',
//       notes: 'First session on introduction to web development.',
//     },
//   });

//   console.log('Mentoring session added:', mentoringSession);

//   // Menambahkan booking untuk mentee
//   const booking = await prisma.bookings.create({
//     data: {
//       mentee_id: menteeUser.id,
//       session_id: mentoringSession.id,
//       status: 'pending',
//       special_requests: 'Need help with React.js basics.',
//     },
//   });

//   console.log('Booking added:', booking);
// >>>>>>> 3eb97f296cb9618ff77cad5d8542f956508d4df8
// }

// main()
//   .catch((e) => {
//     console.error(e);
// <<<<<<< HEAD
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
// =======
//     throw e;
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
// >>>>>>> 3eb97f296cb9618ff77cad5d8542f956508d4df8

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seeder for Roles
  const adminRole = await prisma.roles.create({
    data: {
      role_name: "Admin",
      description: "Administrator with full access",
    },
  });

  const mentorRole = await prisma.roles.create({
    data: {
      role_name: "Mentor",
      description: "Mentor for mentoring sessions",
    },
  });

  const menteeRole = await prisma.roles.create({
    data: {
      role_name: "Mentee",
      description: "Mentee enrolled in a mentoring program",
    },
  });

  // Seeder for Users
  const adminUser = await prisma.users.create({
    data: {
      email: "admin@example.com",
      password_hash: "hashedpassword123",
      full_name: "Admin User",
      is_email_verified: true,
      is_active: true,
    },
  });

  const mentorUser = await prisma.users.create({
    data: {
      email: "mentor@example.com",
      password_hash: "hashedpassword123",
      full_name: "Mentor User",
      is_email_verified: true,
      is_active: true,
    },
  });

  const menteeUser = await prisma.users.create({
    data: {
      email: "mentee@example.com",
      password_hash: "hashedpassword123",
      full_name: "Mentee User",
      is_email_verified: true,
      is_active: true,
    },
  });

  // Assign roles to users
  await prisma.user_roles.create({
    data: {
      user_id: adminUser.id,
      role_id: adminRole.id,
    },
  });

  await prisma.user_roles.create({
    data: {
      user_id: mentorUser.id,
      role_id: mentorRole.id,
    },
  });

  await prisma.user_roles.create({
    data: {
      user_id: menteeUser.id,
      role_id: menteeRole.id,
    },
  });

  // Seeder for Mentor Profile
  const mentorProfile = await prisma.mentor_profiles.create({
    data: {
      user_id: mentorUser.id,
      expertise: "Software Engineering",
      bio: "Experienced software engineer with a passion for mentoring.",
      experience: "5 years in the tech industry",
      hourly_rate: 50.0,
      is_verified: true,
    },
  });

  // Seeder for Mentoring Services
  const mentoringService = await prisma.mentoring_services.create({
    data: {
      mentor_id: mentorProfile.id,
      service_name: "Full Stack Development Mentorship",
      description: "One-on-one mentorship for aspiring full-stack developers.",
      price: 300.0,
      duration_days: 30,
      target_audience: "Aspiring full-stack developers",
      is_active: true,
    },
  });

  // Seeder for Mentoring Sessions
  const mentoringSession = await prisma.mentoring_sessions.create({
    data: {
      service_id: mentoringService.id,
      start_time: new Date("2025-05-15T10:00:00Z"),
      end_time: new Date("2025-05-15T11:00:00Z"),
      duration_minutes: 60,
      status: "scheduled",
    },
  });

  // Seeder for Bookings
  const booking = await prisma.bookings.create({
    data: {
      mentee_id: menteeUser.id,
      session_id: mentoringSession.id,
      status: "confirmed",
      special_requests: "No special requests",
    },
  });

  console.log("Seeder data created successfully!");
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
