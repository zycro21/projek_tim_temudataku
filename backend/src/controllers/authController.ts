import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/authService';
import { successResponse } from '../utils/responseFormatter';

/**
 * Register a new user
 * @route POST /api/auth/register
 */
export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Extract data from request body
    const { email, password, full_name, phone_number, city, province } = req.body;
    
    // Register user
    const result = await authService.register({
      email,
      password,
      full_name,
      phone_number,
      city,
      province
    });
    
    // Return success response
    res.status(201).json(
      successResponse(
        result,
        'User registered successfully. Please check your email to verify your account.'
      )
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Login user
 * @route POST /api/auth/login
 */
export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Extract data from request body
    const { email, password } = req.body;
    
    // Login user
    const result = await authService.login({
      email,
      password
    });
    
    // Return success response
    res.status(200).json(
      successResponse(
        result,
        'Login successful'
      )
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Verify user email
 * @route GET /api/auth/verify-email/:token
 */
export const verifyEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { token } = req.params;
    
    await authService.verifyEmail(token);
    
    res.status(200).json(
      successResponse(
        null,
        'Email verification successful. You can now login.'
      )
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Resend verification email
 * @route POST /api/auth/resend-verification
 */
export const resendVerificationEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email } = req.body;
    
    await authService.resendVerificationEmail(email);
    
    res.status(200).json(
      successResponse(
        null,
        'Verification email has been sent. Please check your inbox.'
      )
    );
  } catch (error) {
    next(error);
  }
};

// Di authController.ts
export const logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id;
    
    if (userId) {
      // Ambil informasi tambahan dari request
      const ipAddress = req.ip;
      const userAgent = req.headers['user-agent'];
      
      // Kirim ke service
      await authService.logout(userId, ipAddress, userAgent);
    }
    
    res.status(200).json(
      successResponse(
        null,
        'Logout successful'
      )
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Request password reset
 * @route POST /api/auth/request-reset
 */
export const requestPasswordReset = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email } = req.body;
    
    await authService.requestPasswordReset(email);
    
    res.status(200).json(
      successResponse(
        null,
        'Password reset instructions have been sent to your email'
      )
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Reset password with token
 * @route POST /api/auth/reset-password
 */
export const resetPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { token, password } = req.body;
    
    await authService.resetPassword(token, password);
    
    res.status(200).json(
      successResponse(
        null,
        'Password has been reset successfully. You can now login with your new password.'
      )
    );
  } catch (error) {
    next(error);
  }
};