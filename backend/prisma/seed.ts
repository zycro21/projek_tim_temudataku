import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { getNextUserId, getNextUserRoleId } from '../src/services/authService';

const prisma = new PrismaClient();

async function main() {
  try {
    // Buat role ADMIN jika belum ada
    const adminRole = await prisma.role.upsert({
      where: { role_name: 'ADMIN' },
      update: {},
      create: {
        id: 2, // Diasumsikan MENTEE adalah 1
        role_name: 'ADMIN',
        description: 'Administrator dengan akses penuh'
      }
    });

    // Buat user ADMIN awal
    const existingAdmin = await prisma.user.findFirst({
      where: {
        user_roles: {
          some: {
            role: {
              role_name: 'ADMIN'
            }
          }
        }
      }
    });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      const nextUserId = await getNextUserId();
      
      // Buat user admin
      const admin = await prisma.user.create({
        data: {
          id: nextUserId,
          email: 'admin@temudataku.com',
          password_hash: hashedPassword,
          full_name: 'Admin TemuDataku',
          is_email_verified: true,
          is_active: true
        }
      });

      // Berikan role ADMIN
      await prisma.userRole.create({
        data: {
          id: await getNextUserRoleId(),
          user_id: admin.id,
          role_id: adminRole.id
        }
      });

      console.log('Admin user created successfully', admin.email);
    } else {
      console.log('Admin user already exists', existingAdmin.email);
    }

  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });