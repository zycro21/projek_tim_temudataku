// backend/src/services/userProfileService.ts
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { BadRequestError, NotFoundError, UnauthorizedError } from '../utils/errorTypes';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

/**
 * Get user profile by ID
 */
export const getUserProfile = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      full_name: true,
      phone_number: true,
      profile_picture: true,
      city: true,
      province: true,
      is_email_verified: true,
      registration_date: true,
      last_login: true,
      is_active: true,
      user_roles: {
        select: {
          role: {
            select: {
              role_name: true,
              description: true
            }
          }
        }
      }
    }
  });

  if (!user) {
    throw new NotFoundError('User not found');
  }

  // Transform user_roles to a more readable format
  const roles = user.user_roles.map(ur => ({
    name: ur.role.role_name,
    description: ur.role.description
  }));

  // Remove user_roles from the response and add roles
  const { user_roles, ...userWithoutRoles } = user;
  return {
    ...userWithoutRoles,
    roles
  };
};

/**
 * Update user profile
 */
export const updateUserProfile = async (userId: number, profileData: any) => {
  // Check if user exists
  const user = await prisma.user.findUnique({
    where: { id: userId }
  });

  if (!user) {
    throw new NotFoundError('User not found');
  }

  // Update user profile
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      full_name: profileData.full_name,
      phone_number: profileData.phone_number,
      city: profileData.city,
      province: profileData.province,
      updated_at: new Date()
    },
    select: {
      id: true,
      email: true,
      full_name: true,
      phone_number: true,
      profile_picture: true,
      city: true,
      province: true,
      is_email_verified: true
    }
  });

  return updatedUser;
};

/**
 * Update profile picture
 */
export const updateProfilePicture = async (userId: number, filePath: string) => {
  // Check if user exists
  const user = await prisma.user.findUnique({
    where: { id: userId }
  });

  if (!user) {
    throw new NotFoundError('User not found');
  }

  // Delete old profile picture if exists
  if (user.profile_picture) {
    try {
      const oldPath = path.join(__dirname, '../../uploads', user.profile_picture);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    } catch (error) {
      console.error('Error deleting old profile picture:', error);
    }
  }

  // Get the filename from the path
  const filename = path.basename(filePath);

  // Update user profile picture
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      profile_picture: filename,
      updated_at: new Date()
    },
    select: {
      id: true,
      email: true,
      full_name: true,
      profile_picture: true
    }
  });

  return updatedUser;
};

/**
 * Change user password
 */
export const changeUserPassword = async (userId: number, currentPassword: string, newPassword: string) => {
  // Check if user exists
  const user = await prisma.user.findUnique({
    where: { id: userId }
  });

  if (!user) {
    throw new NotFoundError('User not found');
  }

  // Verify current password
  const isPasswordValid = await bcrypt.compare(currentPassword, user.password_hash);
  if (!isPasswordValid) {
    throw new UnauthorizedError('Current password is incorrect');
  }

  // Hash new password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

  // Update password
  await prisma.user.update({
    where: { id: userId },
    data: {
      password_hash: hashedPassword,
      updated_at: new Date()
    }
  });

  return true;
};