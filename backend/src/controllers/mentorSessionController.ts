import { Request, Response, NextFunction } from 'express';
import * as mentorSessionService from '../services/mentorSessionService';
import { formatResponse } from '../utils/responseFormatter';
import { validate } from '../middlewares/validator';
import * as mentorSessionValidation from '../validations/mentorSessionValidation';

/**
 * Create multiple sessions at once (batch scheduling)
 */
export const createBatchSessions = [
  validate(mentorSessionValidation.createBatchSessionsSchema),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Pastikan user telah login
      if (!req.user) {
        formatResponse(res, 'User not authenticated', undefined, 401);
        return;
      }
      
      const { serviceId, sessions } = req.body;
      
      // Verify that if user is a mentor, they own the service
      if (req.user.roles.includes('mentor')) {
        const isOwner = await mentorSessionService.verifyServiceOwnership(
          serviceId, 
          req.user.id
        );
        
        if (!isOwner) {
          formatResponse(res, 'You do not have permission to create sessions for this service', undefined, 403);
          return;
        }
      }
      
      const createdSessions = await mentorSessionService.createBatchSessions(serviceId, sessions);
      
      formatResponse(res, 'Batch sessions created successfully', createdSessions, 201);
    } catch (error) {
      next(error);
    }
  }
];

/**
 * Create recurring sessions (weekly, bi-weekly, monthly)
 */
export const createRecurringSessions = [
  validate(mentorSessionValidation.createRecurringSessionsSchema),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Pastikan user telah login
      if (!req.user) {
        formatResponse(res, 'User not authenticated', undefined, 401);
        return;
      }
      
      const { 
        serviceId, 
        startDate, 
        endDate, 
        durationMinutes, 
        daysOfWeek, 
        startTimes, 
        recurrencePattern,
        status,
        meetingLink,
        notes 
      } = req.body;
      
      // Verify that if user is a mentor, they own the service
      if (req.user.roles.includes('mentor')) {
        const isOwner = await mentorSessionService.verifyServiceOwnership(
          serviceId, 
          req.user.id
        );
        
        if (!isOwner) {
          formatResponse(res, 'You do not have permission to create sessions for this service', undefined, 403);
          return;
        }
      }
      
      const createdSessions = await mentorSessionService.createRecurringSessions({
        serviceId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        durationMinutes,
        daysOfWeek,
        startTimes,
        recurrencePattern,
        status: status || 'scheduled',
        meetingLink,
        notes
      });
      
      formatResponse(res, 'Recurring sessions created successfully', {
        totalCreated: createdSessions.length,
        sessions: createdSessions
      }, 201);
    } catch (error) {
      next(error);
    }
  }
];

/**
 * Get available time slots for a service
 */
export const getAvailableTimeSlots = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { serviceId } = req.params;
    const { startDate, endDate } = req.query;
    
    if (!startDate || !endDate) {
      formatResponse(res, 'Start date and end date are required', undefined, 400);
      return;
    }
    
    const availableSlots = await mentorSessionService.getAvailableTimeSlots(
      Number(serviceId),
      new Date(startDate as string),
      new Date(endDate as string)
    );
    
    formatResponse(res, 'Available time slots retrieved successfully', availableSlots);
  } catch (error) {
    next(error);
  }
};

/**
 * Get sessions for a specific day for a service
 */
export const getSessionsByDay = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { serviceId } = req.params;
    const { date } = req.query;
    
    if (!date) {
      formatResponse(res, 'Date parameter is required', undefined, 400);
      return;
    }
    
    const sessions = await mentorSessionService.getSessionsByDay(
      Number(serviceId),
      new Date(date as string)
    );
    
    formatResponse(res, 'Sessions for the day retrieved successfully', sessions);
  } catch (error) {
    next(error);
  }
};

/**
 * Cancel multiple sessions at once
 */
export const cancelMultipleSessions = [
  validate(mentorSessionValidation.cancelMultipleSessionsSchema),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Pastikan user telah login
      if (!req.user) {
        formatResponse(res, 'User not authenticated', undefined, 401);
        return;
      }
      
      const { sessionIds, cancellationReason } = req.body;
      
      // Check if user has permission for all sessions
      for (const sessionId of sessionIds) {
        const session = await mentorSessionService.getMentoringSessionById(sessionId);
        
        if (req.user.roles.includes('mentor') && !req.user.roles.includes('admin')) {
          const isOwner = await mentorSessionService.verifyServiceOwnership(
            session.serviceId, 
            req.user.id
          );
          
          if (!isOwner) {
            formatResponse(res, `You do not have permission to cancel session #${sessionId}`, undefined, 403);
            return;
          }
        }
      }
      
      const cancelledSessions = await mentorSessionService.cancelMultipleSessions(
        sessionIds, 
        cancellationReason
      );
      
      formatResponse(res, 'Sessions cancelled successfully', {
        totalCancelled: cancelledSessions.length,
        sessions: cancelledSessions
      });
    } catch (error) {
      next(error);
    }
  }
];

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