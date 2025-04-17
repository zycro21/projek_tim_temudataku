import { Request, Response, NextFunction } from 'express';
import * as mentorSessionService from '../services/mentorSessionService';
import { formatResponse } from '../utils/responseFormatter';
import { validate } from '../middlewares/validator';
import * as mentorSessionValidation from '../validations/mentorSessionValidation';

/**
 * Get all mentoring sessions with pagination and filters
 */
export const getAllMentoringSessions = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { page = 1, limit = 10, status, serviceId, startDate, endDate } = req.query;
    
    const filters: any = {};
    if (status) filters.status = status as string;
    if (serviceId) filters.serviceId = Number(serviceId);
    if (startDate) filters.startDate = new Date(startDate as string);
    if (endDate) filters.endDate = new Date(endDate as string);
    
    const sessions = await mentorSessionService.getAllMentoringSessions(
      Number(page),
      Number(limit),
      filters
    );
    
    formatResponse(res, 'Mentoring sessions retrieved successfully', sessions);
  } catch (error) {
    next(error);
  }
};

/**
 * Get mentoring session by ID
 */
export const getMentoringSessionById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const session = await mentorSessionService.getMentoringSessionById(Number(id));
    
    formatResponse(res, 'Mentoring session retrieved successfully', session);
  } catch (error) {
    next(error);
  }
};

/**
 * Get mentoring sessions by service ID
 */
export const getMentoringSessionsByServiceId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { serviceId } = req.params;
    const { page = 1, limit = 10, status } = req.query;
    
    const filters: any = {};
    if (status) filters.status = status as string;
    
    const sessions = await mentorSessionService.getMentoringSessionsByServiceId(
      Number(serviceId),
      Number(page),
      Number(limit),
      filters
    );
    
    formatResponse(res, 'Mentoring sessions retrieved successfully', sessions);
  } catch (error) {
    next(error);
  }
};

/**
 * Create new mentoring session
 */
export const createMentoringSession = [
  validate(mentorSessionValidation.createMentoringSessionSchema),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Pastikan user telah login
      if (!req.user) {
        formatResponse(res, 'User not authenticated', undefined, 401);
        return;
      }
      
      // Verify that if user is a mentor, they own the service
      if (req.user.roles.includes('MENTOR')) {
        const isOwner = await mentorSessionService.verifyServiceOwnership(
          Number(req.body.serviceId), 
          req.user.id
        );
        
        if (!isOwner) {
          formatResponse(res, 'You do not have permission to create sessions for this service', undefined, 403);
          return;
        }
      }
      
      const sessionData = {
        ...req.body,
        startTime: new Date(req.body.startTime),
        endTime: new Date(req.body.endTime)
      };
      
      const newSession = await mentorSessionService.createMentoringSession(sessionData);
      
      formatResponse(res, 'Mentoring session created successfully', newSession, 201);
    } catch (error) {
      next(error);
    }
  }
];

/**
 * Update mentoring session
 */
export const updateMentoringSession = [
  validate(mentorSessionValidation.updateMentoringSessionSchema),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Pastikan user telah login
      if (!req.user) {
        formatResponse(res, 'User not authenticated', undefined, 401);
        return;
      }
      
      const { id } = req.params;
      const sessionId = Number(id);
      
      // Check if session exists
      const existingSession = await mentorSessionService.getMentoringSessionById(sessionId);
      
      // If user is mentor, ensure they own this session's service
      if (req.user.roles.includes('MENTOR') && !req.user.roles.includes('ADMIN')) {
        const isOwner = await mentorSessionService.verifyServiceOwnership(
          existingSession.serviceId, 
          req.user.id
        );
        
        if (!isOwner) {
          formatResponse(res, 'You do not have permission to update this session', undefined, 403);
          return;
        }
      }
      
      // Prevent changing the service of a session
      const updateData = { ...req.body };
      delete updateData.serviceId;
      
      // Format date fields if provided
      if (updateData.startTime) updateData.startTime = new Date(updateData.startTime);
      if (updateData.endTime) updateData.endTime = new Date(updateData.endTime);
      
      const updatedSession = await mentorSessionService.updateMentoringSession(
        sessionId,
        updateData
      );
      
      formatResponse(res, 'Mentoring session updated successfully', updatedSession);
    } catch (error) {
      next(error);
    }
  }
];

/**
 * Update session status
 */
export const updateSessionStatus = [
  validate(mentorSessionValidation.updateSessionStatusSchema),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Pastikan user telah login
      if (!req.user) {
        formatResponse(res, 'User not authenticated', undefined, 401);
        return;
      }
      
      const { id } = req.params;
      const sessionId = Number(id);
      const { status } = req.body;
      
      // Check if session exists
      const existingSession = await mentorSessionService.getMentoringSessionById(sessionId);
      
      // If user is mentor, ensure they own this session's service
      if (req.user.roles.includes('MENTOR') && !req.user.roles.includes('ADMIN')) {
        const isOwner = await mentorSessionService.verifyServiceOwnership(
          existingSession.serviceId, 
          req.user.id
        );
        
        if (!isOwner) {
          formatResponse(res, 'You do not have permission to update this session', undefined, 403);
          return;
        }
      }
      
      const updatedSession = await mentorSessionService.updateSessionStatus(sessionId, status);
      
      formatResponse(res, `Session status updated to ${status}`, updatedSession);
    } catch (error) {
      next(error);
    }
  }
];

/**
 * Delete mentoring session
 */
export const deleteMentoringSession = async (
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
    const sessionId = Number(id);
    
    // Check if session exists
    const existingSession = await mentorSessionService.getMentoringSessionById(sessionId);
    
    // If user is mentor, ensure they own this session's service
    if (req.user.roles.includes('MENTOR') && !req.user.roles.includes('ADMIN')) {
      const isOwner = await mentorSessionService.verifyServiceOwnership(
        existingSession.serviceId, 
        req.user.id
      );
      
      if (!isOwner) {
        formatResponse(res, 'You do not have permission to delete this session', undefined, 403);
        return;
      }
    }
    
    // Verify session has no active bookings
    const hasActiveBookings = await mentorSessionService.sessionHasActiveBookings(sessionId);
    if (hasActiveBookings) {
      formatResponse(res, 'Cannot delete session with active bookings', undefined, 400);
      return;
    }
    
    await mentorSessionService.deleteMentoringSession(sessionId);
    
    formatResponse(res, 'Mentoring session deleted successfully');
  } catch (error) {
    next(error);
  }
};