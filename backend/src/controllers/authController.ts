// src/controllers/authController.ts
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
        'User registered successfully'
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