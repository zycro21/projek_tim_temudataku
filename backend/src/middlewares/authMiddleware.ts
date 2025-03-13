import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../config/prisma';
import { UnauthorizedError, ForbiddenError } from '../utils/errorTypes';

// Memperluas interface Request untuk menyimpan data user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        roles: string[];
      };
    }
  }
}

/**
 * Middleware untuk verifikasi token JWT dan menyimpan data user di request
 */
export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Dapatkan token dari header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('Authentication token not provided');
    }

    const token = authHeader.split(' ')[1];

    // Verifikasi token
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: number; email: string };
    
    // Dapatkan user dari database dengan roles
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      include: {
        user_roles: {
          include: {
            role: true
          }
        }
      }
    });

    if (!user) {
      throw new UnauthorizedError('User not found');
    }

    if (!user.is_active) {
      throw new UnauthorizedError('Your account has been deactivated');
    }

    // Simpan user di request untuk digunakan di middleware selanjutnya
    req.user = {
      id: user.id,
      email: user.email,
      roles: user.user_roles.map(ur => ur.role.role_name)
    };

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new UnauthorizedError('Invalid token'));
    } else {
      next(error);
    }
  }
};

/**
 * Middleware untuk memeriksa role
 * @param allowedRoles Array of roles yang diizinkan
 */
export const requireRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      next(new UnauthorizedError('Authentication required'));
      return;
    }

    const hasRequiredRole = req.user.roles.some(role => allowedRoles.includes(role));
    if (!hasRequiredRole) {
      next(new ForbiddenError('You do not have permission to access this resource'));
      return;
    }

    next();
  };
};

/**
 * Middleware khusus untuk ADMIN
 */
export const requireAdmin = requireRole(['ADMIN']);