import prisma from '../config/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { ConflictError, UnauthorizedError, NotFoundError, BadRequestError } from '../utils/errorTypes';
import nodemailer from 'nodemailer';

interface RegisterData {
  email: string;
  password: string;
  full_name: string;
  phone_number?: string;
  city?: string;
  province?: string;
  role?: string;
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
 * Email service for sending verification emails
 */
const emailTransporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

/**
 * Generate verification token
 */
function generateVerificationToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Send verification email
 */
async function sendVerificationEmail(email: string, token: string): Promise<void> {
  const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

  const mailOptions = {
    from: `"Temu Dataku" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Verifikasi Email Anda',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <h2 style="color: #333; text-align: center;">Verifikasi Email Anda</h2>
        <p style="color: #555; font-size: 16px;">Terima kasih telah mendaftar di Temu Dataku.</p>
        <p style="color: #555; font-size: 16px;">Silakan klik tombol di bawah ini untuk memverifikasi email Anda:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationLink}" style="background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Verifikasi Email</a>
        </div>
        <p style="color: #555; font-size: 16px;">Atau, Anda dapat menyalin dan menempelkan link berikut di browser Anda:</p>
        <p style="color: #555; font-size: 14px; word-break: break-all;">${verificationLink}</p>
        <p style="color: #555; font-size: 16px;">Link ini akan kedaluwarsa dalam 24 jam.</p>
        <p style="color: #555; font-size: 16px;">Jika Anda tidak mendaftar di Temu Dataku, silakan abaikan email ini.</p>
        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
        <p style="color: #999; font-size: 14px; text-align: center;">© ${new Date().getFullYear()} Temu Dataku. Semua hak dilindungi.</p>
      </div>
    `,
  };

  try {
    await emailTransporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new Error('Failed to send verification email');
  }
}

/**
 * Get next available ID for User
 * Exported to be reused by adminUserService
 */
export async function getNextUserId(): Promise<number> {
  // Find the maximum user id
  const result = await prisma.$queryRaw<[{ max: number | null }]>`
    SELECT MAX(id) as max FROM users
  `;
  
  const maxId = result[0]?.max ?? 0;
  return maxId + 1;
}

/**
 * Get next available ID for UserRole
 * Exported to be reused by adminUserService
 */
export async function getNextUserRoleId(): Promise<number> {
  // Find the maximum user_role id
  const result = await prisma.$queryRaw<[{ max: number | null }]>`
    SELECT MAX(id) as max FROM user_roles
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

  // Generate verification token
  const verificationToken = generateVerificationToken();
  const tokenExpiry = new Date();
  tokenExpiry.setHours(tokenExpiry.getHours() + 24); // Token valid for 24 hours

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
        is_email_verified: false,
        verification_token: verificationToken,
        verification_token_expires: tokenExpiry
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

  // Send verification email (outside transaction to avoid rollback if email fails)
  try {
    await sendVerificationEmail(data.email, verificationToken);
  } catch (error) {
    console.error('Failed to send verification email', error);
    // We don't throw here to avoid breaking registration
    // The user can request to resend the verification email
  }

  return result;
};

/**
 * Verify user email
 */
export const verifyEmail = async (token: string): Promise<boolean> => {
  // Find user with matching token that hasn't expired
  const user = await prisma.user.findFirst({
    where: {
      verification_token: token,
      verification_token_expires: {
        gt: new Date() // Token not expired
      }
    }
  });

  if (!user) {
    throw new BadRequestError('Invalid or expired verification token');
  }

  // Update user as verified
  await prisma.user.update({
    where: { id: user.id },
    data: {
      is_email_verified: true,
      verification_token: null,
      verification_token_expires: null
    }
  });

  return true;
};

/**
 * Resend verification email
 */
export const resendVerificationEmail = async (email: string): Promise<void> => {
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    throw new NotFoundError('User not found');
  }

  if (user.is_email_verified) {
    throw new BadRequestError('Email already verified');
  }

  // Generate new verification token
  const verificationToken = generateVerificationToken();
  const tokenExpiry = new Date();
  tokenExpiry.setHours(tokenExpiry.getHours() + 24);

  // Update user with new token
  await prisma.user.update({
    where: { id: user.id },
    data: {
      verification_token: verificationToken,
      verification_token_expires: tokenExpiry
    }
  });

  // Send verification email
  await sendVerificationEmail(email, verificationToken);
};

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

  // Check if email is verified
  if (!user.is_email_verified) {
    throw new UnauthorizedError('Please verify your email before logging in');
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