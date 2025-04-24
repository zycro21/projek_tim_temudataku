import { Request, Response, NextFunction } from 'express';
import * as adminUserService from '../services/adminUserService';
import { successResponse } from '../utils/responseFormatter';
import { ValidationError } from '../utils/errorTypes';

/**
 * Create a new user with specific role (ADMIN or MENTOR)
 * @route POST /api/admin/users
 */
export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Extract data from request body
    const { email, password, full_name, phone_number, city, province, role } = req.body;
    
    // Validate role
    if (!role || !['ADMIN', 'MENTOR'].includes(role)) {
      throw new ValidationError('Role must be ADMIN or MENTOR');
    }
    
    // Create user with specific role
    const result = await adminUserService.createUser({
      email,
      password,
      full_name,
      phone_number,
      city,
      province,
      role
    });
    
    // Return success response
    res.status(201).json(
      successResponse(
        result,
        `User with role ${role} created successfully`
      )
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Get all users
 * @route GET /api/admin/users
 */
export const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await adminUserService.getAllUsers();
    
    res.status(200).json(
      successResponse(
        users,
        'Users retrieved successfully'
      )
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Get admin count
 * @route GET /api/admin/users/admin-count
 */
export const getAdminCount = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const count = await adminUserService.getAdminCount();
    
    res.status(200).json(
      successResponse(
        { count },
        'Admin count retrieved successfully'
      )
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Toggle user active status
 * @route PATCH /api/admin/users/:id/toggle-status
 */
export const toggleUserStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = parseInt(req.params.id);
    const result = await adminUserService.toggleUserStatus(userId);
    
    res.status(200).json(
      successResponse(
        result,
        `User status toggled to ${result.is_active ? 'active' : 'inactive'}`
      )
    );
  } catch (error) {
    next(error);
  }
};