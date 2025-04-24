// backend/src/controllers/feedbackController.ts
import { Request, Response, NextFunction } from 'express';
import * as feedbackService from '../services/feedbackService';
import { formatResponse } from '../utils/responseFormatter';
import { BadRequestError, NotFoundError } from '../utils/errorTypes';

/**
 * Create a new feedback
 */
export const createFeedback = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      throw new BadRequestError('User ID not found');
    }

    const feedback = await feedbackService.createFeedback({
      ...req.body,
      user_id: userId,
    });

    formatResponse(res, 'Feedback created successfully', feedback, 201);
  } catch (error) {
    next(error);
  }
};

/**
 * Get all feedback
 */
export const getAllFeedback = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { page = '1', limit = '10', session_id } = req.query;
    
    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);
    
    const sessionId = session_id ? parseInt(session_id as string, 10) : undefined;
    
    const result = await feedbackService.getAllFeedback(pageNumber, limitNumber, sessionId);
    
    formatResponse(res, 'Feedback retrieved successfully', result);
  } catch (error) {
    next(error);
  }
};

/**
 * Get feedback by ID
 */
export const getFeedbackById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const feedbackId = parseInt(req.params.id, 10);
    
    const feedback = await feedbackService.getFeedbackById(feedbackId);
    
    formatResponse(res, 'Feedback retrieved successfully', feedback);
  } catch (error) {
    next(error);
  }
};

/**
 * Update feedback
 */
export const updateFeedback = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const feedbackId = parseInt(req.params.id, 10);
    const userId = req.user?.id;
    
    if (!userId) {
      throw new BadRequestError('User ID not found');
    }
    
    // Check if the feedback belongs to the user
    const feedback = await feedbackService.getFeedbackById(feedbackId);
    if (feedback.user_id !== userId) {
      throw new BadRequestError('You can only update your own feedback');
    }
    
    const updatedFeedback = await feedbackService.updateFeedback(feedbackId, req.body);
    
    formatResponse(res, 'Feedback updated successfully', updatedFeedback);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete feedback
 */
export const deleteFeedback = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const feedbackId = parseInt(req.params.id, 10);
    const userId = req.user?.id;
    
    if (!userId) {
      throw new BadRequestError('User ID not found');
    }
    
    // Check if the feedback belongs to the user
    const feedback = await feedbackService.getFeedbackById(feedbackId);
    if (feedback.user_id !== userId) {
      throw new BadRequestError('You can only delete your own feedback');
    }
    
    await feedbackService.deleteFeedback(feedbackId);
    
    formatResponse(res, 'Feedback deleted successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Get feedback by session ID
 */
export const getFeedbackBySession = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const sessionId = parseInt(req.params.sessionId, 10);
    const { page = '1', limit = '10' } = req.query;
    
    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);
    
    const result = await feedbackService.getFeedbackBySession(sessionId, pageNumber, limitNumber);
    
    formatResponse(res, 'Session feedback retrieved successfully', result);
  } catch (error) {
    next(error);
  }
};

/**
 * Get average rating for a mentor
 */
export const getMentorRating = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const mentorId = parseInt(req.params.mentorId, 10);
    
    const result = await feedbackService.getMentorAverageRating(mentorId);
    
    formatResponse(res, 'Mentor rating retrieved successfully', result);
  } catch (error) {
    next(error);
  }
};

/**
 * Get feedback for a mentor
 */
export const getMentorFeedback = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const mentorId = parseInt(req.params.mentorId, 10);
    const { page = '1', limit = '10' } = req.query;
    
    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);
    
    const result = await feedbackService.getMentorFeedback(mentorId, pageNumber, limitNumber);
    
    formatResponse(res, 'Mentor feedback retrieved successfully', result);
  } catch (error) {
    next(error);
  }
};