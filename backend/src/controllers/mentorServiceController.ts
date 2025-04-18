import { Request, Response, NextFunction } from 'express';
import * as mentorServiceService from '../services/mentorServiceService';
import { formatResponse } from '../utils/responseFormatter';
import { validate } from '../middlewares/validator';
import * as mentorServiceValidation from '../validations/mentorServiceValidation';

// Memperluas interface Request untuk menyertakan tipe user
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

export const searchMentoringServices = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      search,
      priceMin,
      priceMax,
      serviceType,
      durationMin,
      durationMax,
      mentorId,
      isActive,
      sortBy = 'created_at',
      sortDir = 'desc',
      page = 1,
      limit = 10
    } = req.query;
    
    // Construct filters
    const filters: any = {};
    
    if (priceMin) filters.priceMin = Number(priceMin);
    if (priceMax) filters.priceMax = Number(priceMax);
    if (serviceType) filters.serviceType = serviceType as string;
    if (durationMin) filters.durationMin = Number(durationMin);
    if (durationMax) filters.durationMax = Number(durationMax);
    if (mentorId) filters.mentorId = Number(mentorId);
    if (isActive !== undefined) filters.isActive = isActive === 'true';
    
    // Sort options
    const sortOptions = {
      field: sortBy as string,
      direction: sortDir as 'asc' | 'desc'
    };
    
    const services = await mentorServiceService.searchMentoringServices(
      search as string,
      filters,
      sortOptions,
      Number(page),
      Number(limit)
    );
    
    formatResponse(res, 'Mentoring services retrieved successfully', services);
  } catch (error) {
    next(error);
  }
};

// Get all mentoring services (keeping the original method for backward compatibility)
export const getAllMentoringServices = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { page = 1, limit = 10, search, serviceType, isActive } = req.query;
    
    const filters: any = {};
    if (serviceType) filters.serviceType = serviceType as string;
    if (isActive !== undefined) filters.isActive = isActive === 'true';
    
    const services = await mentorServiceService.getAllMentoringServices(
      Number(page),
      Number(limit),
      search as string,
      filters
    );
    
    formatResponse(res, 'Mentoring services retrieved successfully', services);
  } catch (error) {
    next(error);
  }
};

/**
 * Get mentoring service by ID
 */
export const getMentoringServiceById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const service = await mentorServiceService.getMentoringServiceById(Number(id));
    
    formatResponse(res, 'Mentoring service retrieved successfully', service);
  } catch (error) {
    next(error);
  }
};

/**
 * Get mentoring services by mentor ID
 */
export const getMentoringServicesByMentorId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { mentorId } = req.params;
    const { page = 1, limit = 10, isActive } = req.query;
    
    const filters: any = {};
    if (isActive !== undefined) filters.isActive = isActive === 'true';
    
    const services = await mentorServiceService.getMentoringServicesByMentorId(
      Number(mentorId),
      Number(page),
      Number(limit),
      filters
    );
    
    formatResponse(res, 'Mentor services retrieved successfully', services);
  } catch (error) {
    next(error);
  }
};

/**
 * Create new mentoring service
 */
export const createMentoringService = [
  validate(mentorServiceValidation.createMentoringServiceSchema),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Pastikan user telah login
      if (!req.user) {
        formatResponse(res, 'User not authenticated', undefined, 401);
        return;
      }
      
      // If user is mentor, use their mentor ID from profile
      let mentorId: number;
      
      if (req.user.roles.includes('MENTOR')) {
        // Get mentor profile for current user
        const mentorProfile = await mentorServiceService.getMentorProfileByUserId(req.user.id);
        mentorId = mentorProfile.id;
      } else if (req.body.mentorId) {
        // For admin users who can specify mentorId
        mentorId = Number(req.body.mentorId);
      } else {
        formatResponse(res, 'Mentor ID is required');
        return;
      }
      
      const serviceData = {
        ...req.body,
        mentorId
      };
      
      const newService = await mentorServiceService.createMentoringService(serviceData);
      
      formatResponse(res, 'Mentoring service created successfully', newService, 201);
    } catch (error) {
      next(error);
    }
  }
];

/**
 * Update mentoring service
 */
export const updateMentoringService = [
  validate(mentorServiceValidation.updateMentoringServiceSchema),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Pastikan user telah login
      if (!req.user) {
        formatResponse(res, 'User not authenticated', undefined, 401);
        return;
      }
      
      const { id } = req.params;
      const serviceId = Number(id);
      
      // Check if service exists and user has permission
      const existingService = await mentorServiceService.getMentoringServiceById(serviceId);
      
      // If user is mentor, ensure they own this service
      if (req.user.roles.includes('MENTOR') && !req.user.roles.includes('ADMIN')) {
        const mentorProfile = await mentorServiceService.getMentorProfileByUserId(req.user.id);
        
        if (existingService.mentorId !== mentorProfile.id) {
          formatResponse(res, 'You do not have permission to update this service', undefined, 403);
          return;
        }
      }
      
      // Prevent changing the mentor of a service
      const updateData = { ...req.body };
      delete updateData.mentorId;
      
      const updatedService = await mentorServiceService.updateMentoringService(
        serviceId,
        updateData
      );
      
      formatResponse(res, 'Mentoring service updated successfully', updatedService);
    } catch (error) {
      next(error);
    }
  }
];

/**
 * Toggle service active status
 */
export const toggleServiceStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Pastikan user telah login
    if (!req.user) {
      formatResponse(res, 'User not authenticated', undefined, 401);
      return;
    }
    
    const { id } = req.params;
    const serviceId = Number(id);
    
    // Check if service exists and user has permission
    const existingService = await mentorServiceService.getMentoringServiceById(serviceId);
    
    // If user is mentor, ensure they own this service
    if (req.user.roles.includes('MENTOR') && !req.user.roles.includes('ADMIN')) {
      const mentorProfile = await mentorServiceService.getMentorProfileByUserId(req.user.id);
      
      if (existingService.mentorId !== mentorProfile.id) {
        formatResponse(res, 'You do not have permission to update this service', undefined, 403);
        return;
      }
    }
    
    const updatedService = await mentorServiceService.toggleServiceStatus(serviceId);
    
    const statusMessage = updatedService.is_active 
      ? 'Service activated successfully' 
      : 'Service deactivated successfully';
    
    formatResponse(res, statusMessage, updatedService);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete mentoring service
 */
export const deleteMentoringService = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Pastikan user telah login
    if (!req.user) {
      formatResponse(res, 'User not authenticated', undefined, 401);
      return;
    }
    
    const { id } = req.params;
    const serviceId = Number(id);
    
    // Check if service exists and user has permission
    const existingService = await mentorServiceService.getMentoringServiceById(serviceId);
    
    // If user is mentor, ensure they own this service
    if (req.user.roles.includes('MENTOR') && !req.user.roles.includes('ADMIN')) {
      const mentorProfile = await mentorServiceService.getMentorProfileByUserId(req.user.id);
      
      if (existingService.mentorId !== mentorProfile.id) {
        formatResponse(res, 'You do not have permission to delete this service', undefined, 403);
        return;
      }
    }
    
    await mentorServiceService.deleteMentoringService(serviceId);
    
    formatResponse(res, 'Mentoring service deleted successfully');
  } catch (error) {
    next(error);
  }
};

