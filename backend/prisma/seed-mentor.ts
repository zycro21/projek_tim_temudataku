// backend/prisma/seed-mentors.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Mulai seeding data mentor...');
  
  // Cek jika role mentor sudah ada, jika belum maka buat
  const mentorRole = await prisma.role.findUnique({
    where: { role_name: 'MENTOR' }
  });
  
  // Jika role mentor belum ada, buat role mentor
  if (!mentorRole) {
    console.log('Role MENTOR tidak ditemukan, membuat role MENTOR...');
    const newMentorRole = await prisma.role.create({
      data: {
        id: 8, // Sesuaikan ID dengan sequence di database Anda
        role_name: 'MENTOR',
        description: 'Mentor role',
      },
    });
    console.log('Role MENTOR berhasil dibuat:', newMentorRole);
  }
  
  // Gunakan user yang sudah ada untuk membuat mentor profile
  // User 2: habdil Iqrawardana
  await createMentorProfileIfNotExists({
    id: 1,
    user_id: 2,
    expertise: 'Web Development, Frontend, React, Vue.js',
    bio: 'Fullstack developer dengan pengalaman 5+ tahun dalam pengembangan web modern.',
    experience: 'Senior Frontend Developer di Company XYZ (2019-sekarang), Web Developer di ABC Corp (2016-2019)',
    availability_schedule: {
      monday: ['09:00-12:00', '14:00-17:00'],
      wednesday: ['10:00-15:00'],
      friday: ['09:00-17:00']
    },
    hourly_rate: 200000,
    is_verified: true,
  });
  
  // User 3: Temu Dataku
  await createMentorProfileIfNotExists({
    id: 2,
    user_id: 3,
    expertise: 'Mobile Development, Flutter, Firebase, UI/UX Design',
    bio: 'Mobile developer spesialis dalam pengembangan aplikasi cross-platform yang scalable.',
    experience: 'Mobile Lead Developer di StartupX (2020-sekarang), Mobile Engineer di TechY (2018-2020)',
    availability_schedule: {
      tuesday: ['10:00-17:00'],
      thursday: ['13:00-18:00'],
      saturday: ['10:00-15:00']
    },
    hourly_rate: 250000,
    is_verified: true,
  });
  
  // User 5: Test Mentor
  await createMentorProfileIfNotExists({
    id: 3,
    user_id: 5,
    expertise: 'Data Science, Machine Learning, Python, TensorFlow',
    bio: 'Data scientist dengan fokus pada implementasi algoritma machine learning untuk masalah bisnis.',
    experience: 'Data Scientist di BigData Inc (2017-sekarang), Research Assistant di Universitas Teknologi (2015-2017)',
    availability_schedule: {
      monday: ['13:00-18:00'],
      wednesday: ['09:00-14:00'],
      friday: ['13:00-18:00']
    },
    hourly_rate: 300000,
    is_verified: false, // Mentor belum diverifikasi
  });
  
  // Pastikan user memiliki role mentor
  await assignMentorRoleIfNotExists(2);
  await assignMentorRoleIfNotExists(3);
  await assignMentorRoleIfNotExists(5);
  
  console.log('Seeding data mentor selesai!');
}

// Fungsi untuk membuat profil mentor jika belum ada
async function createMentorProfileIfNotExists(profileData) {
  try {
    const existingProfile = await prisma.mentorProfile.findUnique({
      where: { user_id: profileData.user_id }
    });
    
    if (!existingProfile) {
      console.log(`Membuat profil mentor untuk user ID ${profileData.user_id}...`);
      const profile = await prisma.mentorProfile.create({
        data: profileData
      });
      console.log(`Profil mentor berhasil dibuat untuk user ID ${profileData.user_id}`);
      return profile;
    } else {
      console.log(`Profil mentor untuk user ID ${profileData.user_id} sudah ada.`);
      return existingProfile;
    }
  } catch (error) {
    console.error(`Error saat membuat profil mentor untuk user ID ${profileData.user_id}:`, error);
    throw error;
  }
}

// Fungsi untuk memberikan role mentor ke user jika belum memilikinya
async function assignMentorRoleIfNotExists(userId) {
  try {
    // Cari role mentor
    const mentorRole = await prisma.role.findUnique({
      where: { role_name: 'MENTOR' }
    });
    
    if (!mentorRole) {
      throw new Error('Role MENTOR tidak ditemukan');
    }
    
    // Cek apakah user sudah memiliki role mentor
    const existingUserRole = await prisma.userRole.findFirst({
      where: {
        user_id: userId,
        role_id: mentorRole.id
      }
    });
    
    if (!existingUserRole) {
      console.log(`Menambahkan role MENTOR untuk user ID ${userId}...`);
      
      // Hitung ID baru berdasarkan jumlah data userRole yang sudah ada
      const userRoleCount = await prisma.userRole.count();
      const newUserRoleId = userRoleCount + 1;
      
      // Tambahkan role mentor ke user
      const userRole = await prisma.userRole.create({
        data: {
          id: newUserRoleId,
          user_id: userId,
          role_id: mentorRole.id
        }
      });
      
      console.log(`Role MENTOR berhasil ditambahkan untuk user ID ${userId}`);
      return userRole;
    } else {
      console.log(`User ID ${userId} sudah memiliki role MENTOR.`);
      return existingUserRole;
    }
  } catch (error) {
    console.error(`Error saat menambahkan role MENTOR untuk user ID ${userId}:`, error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });