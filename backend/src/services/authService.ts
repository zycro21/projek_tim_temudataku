// src/services/authService.ts
import prisma from '../config/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ConflictError, UnauthorizedError, NotFoundError } from '../utils/errorTypes';

interface RegisterData {
  email: string;
  password: string;
  full_name: string;
  phone_number?: string;
  city?: string;
  province?: string;
}

interface LoginData {
  email: string;
  password: string;
}

export interface AuthResult {
  user: {
    id: number;
    email: string;
    full_name: string;
    roles: string[];
  };
  token: string;
}

/**
 * Get next available ID for User
 */
async function getNextUserId(): Promise<number> {
  // Find the maximum user id
  const result = await prisma.$queryRaw<[{ max: number | null }]>`
    SELECT MAX(id) as max FROM users
  `;
  
  const maxId = result[0]?.max ?? 0;
  return maxId + 1;
}

/**
 * Register a new user
 */
export const register = async (data: RegisterData): Promise<AuthResult> => {
  // Check if email already exists
  const existingUser = await prisma.user.findUnique({
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
    const user = await tx.user.create({
      data: {
        id: nextId,
        email: data.email,
        password_hash: hashedPassword,
        full_name: data.full_name,
        phone_number: data.phone_number,
        city: data.city,
        province: data.province,
      }
    });

    // Get or create MENTEE role
    const menteeRole = await tx.role.upsert({
      where: { role_name: 'MENTEE' },
      update: {},
      create: {
        id: 1, // Assuming this is the first role
        role_name: 'MENTEE',
        description: 'Regular user looking for mentoring'
      }
    });

    // Assign MENTEE role to user
    await tx.userRole.create({
      data: {
        id: await getNextUserRoleId(),
        user_id: user.id,
        role_id: menteeRole.id
      }
    });

    // Get user with roles
    const userWithRoles = await tx.user.findUnique({
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

    // Create token
    const token = jwt.sign(
      { 
        id: userWithRoles.id,
        email: userWithRoles.email
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return {
      user: {
        id: userWithRoles.id,
        email: userWithRoles.email,
        full_name: userWithRoles.full_name,
        roles: userWithRoles.user_roles.map(ur => ur.role.role_name)
      },
      token
    };
  });

  return result;
};

/**
 * Get next available ID for UserRole
 */
async function getNextUserRoleId(): Promise<number> {
  // Find the maximum user_role id
  const result = await prisma.$queryRaw<[{ max: number | null }]>`
    SELECT MAX(id) as max FROM user_roles
  `;
  
  const maxId = result[0]?.max ?? 0;
  return maxId + 1;
}

/**
 * Login user
 */
export const login = async (data: LoginData): Promise<AuthResult> => {
  // Find user by email
  const user = await prisma.user.findUnique({
    where: { email: data.email },
    include: {
      user_roles: {
        include: {
          role: true
        }
      }
    }
  });

  // If user not found
  if (!user) {
    throw new UnauthorizedError('Invalid email or password');
  }

  // Check if password is correct
  const isPasswordValid = await bcrypt.compare(data.password, user.password_hash);
  
  if (!isPasswordValid) {
    throw new UnauthorizedError('Invalid email or password');
  }

  // Check if user is active
  if (!user.is_active) {
    throw new UnauthorizedError('Your account has been deactivated');
  }

  // Update last login
  await prisma.user.update({
    where: { id: user.id },
    data: { last_login: new Date() }
  });

  // Create token
  const token = jwt.sign(
    { 
      id: user.id,
      email: user.email
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  return {
    user: {
      id: user.id,
      email: user.email,
      full_name: user.full_name,
      roles: user.user_roles.map(ur => ur.role.role_name)
    },
    token
  };
};