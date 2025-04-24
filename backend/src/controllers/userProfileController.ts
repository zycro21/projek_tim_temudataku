// backend/src/controllers/userProfileController.ts
import { Request, Response, NextFunction } from 'express';
import { MulterRequest } from '../types/express';
import * as userProfileService from '../services/userProfileService';
import { formatResponse } from '../utils/responseFormatter';
import { BadRequestError } from '../utils/errorTypes';
import { validateProfileUpdate, validatePasswordChange } from '../validations/userProfileValidation';

/**
 * Get profile of the currently logged in user
 */
export const getProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // req.user is set by the auth middleware
    const userId = req.user?.id;
    if (!userId) {
      throw new BadRequestError('User ID not found');
    }

    const profile = await userProfileService.getUserProfile(userId);
    formatResponse(res, 'User profile retrieved successfully', profile);
  } catch (error) {
    next(error);
  }
};

/**
 * Update profile of the currently logged in user
 */
export const updateProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Validate request body
    const { error, value } = validateProfileUpdate(req.body);
    if (error) {
      throw new BadRequestError(error.details[0].message);
    }

    const userId = req.user?.id;
    if (!userId) {
      throw new BadRequestError('User ID not found');
    }

    const updatedProfile = await userProfileService.updateUserProfile(userId, value);
    formatResponse(res, 'User profile updated successfully', updatedProfile);
  } catch (error) {
    next(error);
  }
};

/**
 * Update profile picture
 */
export const updateProfilePicture = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Cast request to MulterRequest to access file property
    const multerReq = req as MulterRequest;
    
    // Check if file exists
    if (!multerReq.file) {
      throw new BadRequestError('No file uploaded');
    }

    const userId = req.user?.id;
    if (!userId) {
      throw new BadRequestError('User ID not found');
    }

    // Get file path
    const filePath = multerReq.file.path;
    
    const updatedProfile = await userProfileService.updateProfilePicture(userId, filePath);
    formatResponse(res, 'Profile picture updated successfully', updatedProfile);
  } catch (error) {
    next(error);
  }
};

/**
 * Change user password
 */
export const changePassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Validate request body
    const { error, value } = validatePasswordChange(req.body);
    if (error) {
      throw new BadRequestError(error.details[0].message);
    }

    const userId = req.user?.id;
    if (!userId) {
      throw new BadRequestError('User ID not found');
    }

    const { currentPassword, newPassword } = value;
    
    await userProfileService.changeUserPassword(userId, currentPassword, newPassword);
    formatResponse(res, 'Password changed successfully');
  } catch (error) {
    next(error);
  }
};