// backend/src/controllers/roleController.ts
import { Request, Response, NextFunction } from 'express';
import * as roleService from '../services/roleService';
import { formatResponse } from '../utils/responseFormatter';
import { BadRequestError } from '../utils/errorTypes';
import { validateRole } from '../validations/roleValidation';

/**
 * Get all roles
 */
export const getAllRoles = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const roles = await roleService.getAllRoles();
    formatResponse(res, 'Roles retrieved successfully', roles);
  } catch (error) {
    next(error);
  }
};

/**
 * Get role by ID
 */
export const getRoleById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const roleId = parseInt(req.params.id, 10);
    if (isNaN(roleId)) {
      throw new BadRequestError('Invalid role ID');
    }

    const role = await roleService.getRoleById(roleId);
    formatResponse(res, 'Role retrieved successfully', role);
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new role
 */
export const createRole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Validate request body
    const { error, value } = validateRole(req.body);
    if (error) {
      throw new BadRequestError(error.details[0].message);
    }

    const role = await roleService.createRole(value);
    formatResponse(res, 'Role created successfully', role, 201);
  } catch (error) {
    next(error);
  }
};

/**
 * Update role
 */
export const updateRole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const roleId = parseInt(req.params.id, 10);
    if (isNaN(roleId)) {
      throw new BadRequestError('Invalid role ID');
    }

    // Validate request body
    const { error, value } = validateRole(req.body);
    if (error) {
      throw new BadRequestError(error.details[0].message);
    }

    const updatedRole = await roleService.updateRole(roleId, value);
    formatResponse(res, 'Role updated successfully', updatedRole);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete role
 */
export const deleteRole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const roleId = parseInt(req.params.id, 10);
    if (isNaN(roleId)) {
      throw new BadRequestError('Invalid role ID');
    }

    await roleService.deleteRole(roleId);
    formatResponse(res, 'Role deleted successfully');
  } catch (error) {
    next(error);
  }
};