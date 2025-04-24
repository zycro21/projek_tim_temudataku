import prisma from '../config/prisma';
import bcrypt from 'bcrypt';
import { ConflictError, ForbiddenError, NotFoundError } from '../utils/errorTypes';

// Reuse helper functions from authService
import { getNextUserId, getNextUserRoleId } from './authService';

interface CreateUserData {
  email: string;
  password: string;
  full_name: string;
  phone_number?: string;
  city?: string;
  province?: string;
  role: 'ADMIN' | 'MENTOR';
}

interface UserResult {
  id: number;
  email: string;
  full_name: string;
  roles: string[];
}

/**
 * Create a new user with specific role (ADMIN or MENTOR)
 */
export const createUser = async (data: CreateUserData): Promise<UserResult> => {
  // Validasi role
  if (data.role !== 'ADMIN' && data.role !== 'MENTOR') {
    throw new ForbiddenError('Role must be ADMIN or MENTOR');
  }

  // Jika creating ADMIN, periksa jumlah ADMIN yang sudah ada
  if (data.role === 'ADMIN') {
    const adminCount = await getAdminCount();
    if (adminCount >= 5) {
      throw new ConflictError('Maximum number of admins (5) already reached');
    }
  }

  // Check if email already exists
  const existingUser = await prisma.users.findUnique({
    where: { email: data.email }
  });

  if (existingUser) {
    throw new ConflictError('Email already registered');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(data.password, 10);
  
  // Get next available ID
  const nextId = await getNextUserId();

  // Start transaction
  const result = await prisma.$transaction(async (tx) => {
    // Create user
    const user = await tx.users.create({
      data: {
        id: nextId,
        email: data.email,
        password_hash: hashedPassword,
        full_name: data.full_name,
        phone_number: data.phone_number,
        city: data.city,
        province: data.province,
        is_email_verified: true, // Admin-created accounts are auto-verified
      }
    });

    // Get or create role
    const role = await tx.roles.upsert({
      where: { role_name: data.role },
      update: {},
      create: {
        id: data.role === 'ADMIN' ? 2 : 3, // Assuming MENTEE is 1, ADMIN is 2, MENTOR is 3
        role_name: data.role,
        description: data.role === 'ADMIN' ? 'Administrator with full access' : 'Mentor providing services'
      }
    });

    // Assign role to user
    await tx.user_roles.create({
      data: {
        id: await getNextUserRoleId(),
        user_id: user.id,
        role_id: role.id
      }
    });

    // Get user with roles
    const userWithRoles = await tx.users.findUnique({
      where: { id: user.id },
      include: {
        user_roles: {
          include: {
            role: true
          }
        }
      }
    });

    if (!userWithRoles) {
      throw new Error('Failed to create user');
    }

    return {
      id: userWithRoles.id,
      email: userWithRoles.email,
      full_name: userWithRoles.full_name,
      roles: userWithRoles.user_roles.map(ur => ur.role.role_name)
    };
  });

  return result;
};

/**
 * Get all users with their roles
 */
export const getAllUsers = async () => {
  const users = await prisma.users.findMany({
    include: {
      user_roles: {
        include: {
          role: true
        }
      }
    },
    orderBy: {
      created_at: 'desc'
    }
  });

  return users.map(user => ({
    id: user.id,
    email: user.email,
    full_name: user.full_name,
    phone_number: user.phone_number,
    city: user.city,
    province: user.province,
    is_active: user.is_active,
    is_email_verified: user.is_email_verified,
    registration_date: user.registration_date,
    last_login: user.last_login,
    roles: user.user_roles.map(ur => ur.role.role_name),
    created_at: user.created_at,
    updated_at: user.updated_at
  }));
};

/**
 * Get count of users with ADMIN role
 */
export const getAdminCount = async (): Promise<number> => {
  const adminRole = await prisma.roles.findUnique({
    where: { role_name: 'ADMIN' }
  });

  if (!adminRole) {
    return 0;
  }

  const count = await prisma.user_roles.count({
    where: { role_id: adminRole.id }
  });

  return count;
};

/**
 * Toggle user active status
 */
export const toggleUserStatus = async (userId: number) => {
  // Check if user exists
  const user = await prisma.users.findUnique({
    where: { id: userId }
  });

  if (!user) {
    throw new NotFoundError('User not found');
  }

  // Toggle status
  const updated = await prisma.users.update({
    where: { id: userId },
    data: {
      is_active: !user.is_active,
      updated_at: new Date()
    }
  });

  return {
    id: updated.id,
    email: updated.email,
    is_active: updated.is_active
  };
};