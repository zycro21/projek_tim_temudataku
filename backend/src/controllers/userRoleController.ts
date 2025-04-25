// backend/src/controllers/userRoleController.ts
import { Request, Response, NextFunction } from 'express';
import * as userRoleService from '../services/userRoleService';
import { formatResponse } from '../utils/responseFormatter';
import { BadRequestError } from '../utils/errorTypes';
import { validateUserRole } from '../validations/userRoleValidation';

/**
 * Get user roles
 */
export const getUserRoles = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = parseInt(req.params.id, 10);
    if (isNaN(userId)) {
      throw new BadRequestError('Invalid user ID');
    }

    const roles = await userRoleService.getUserRoles(userId);
    formatResponse(res, 'User roles retrieved successfully', roles);
  } catch (error) {
    next(error);
  }
};

/**
 * Assign role to user
 */
export const assignRoleToUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = parseInt(req.params.id, 10);
    if (isNaN(userId)) {
      throw new BadRequestError('Invalid user ID');
    }

    // Validate request body
    const { error, value } = validateUserRole(req.body);
    if (error) {
      throw new BadRequestError(error.details[0].message);
    }

    const roleId = value.role_id;
    
    const userRole = await userRoleService.assignRoleToUser(userId, roleId);
    formatResponse(res, 'Role assigned to user successfully', userRole, 201);
  } catch (error) {
    next(error);
  }
};

/**
 * Remove role from user
 */
export const removeRoleFromUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = parseInt(req.params.id, 10);
    const roleId = parseInt(req.params.roleId, 10);
    
    if (isNaN(userId) || isNaN(roleId)) {
      throw new BadRequestError('Invalid user ID or role ID');
    }

    await userRoleService.removeRoleFromUser(userId, roleId);
    formatResponse(res, 'Role removed from user successfully');
  } catch (error) {
    next(error);
  }
};