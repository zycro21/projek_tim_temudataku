// backend/src/validations/feedbackValidation.ts
import { body, param, query } from 'express-validator';

/**
 * Validation rules for creating feedback
 */
export const feedbackValidationRules = [
  body('session_id')
    .isInt({ min: 1 })
    .withMessage('Session ID must be a positive integer'),
  
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be an integer between 1 and 5'),
  
  body('comment')
    .optional()
    .isString()
    .isLength({ max: 1000 })
    .withMessage('Comment must be a string with maximum 1000 characters'),
];

/**
 * Validation rules for updating feedback
 */
export const updateFeedbackValidationRules = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Feedback ID must be a positive integer'),
  
  body('rating')
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be an integer between 1 and 5'),
  
  body('comment')
    .optional()
    .isString()
    .isLength({ max: 1000 })
    .withMessage('Comment must be a string with maximum 1000 characters'),
];

/**
 * Validation rules for getting a specific feedback
 */
export const getFeedbackValidationRules = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Feedback ID must be a positive integer'),
];

/**
 * Validation rules for deleting feedback
 */
export const deleteFeedbackValidationRules = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Feedback ID must be a positive integer'),
];

/**
 * Validation rules for getting session feedback
 */
export const sessionFeedbackValidationRules = [
  param('sessionId')
    .isInt({ min: 1 })
    .withMessage('Session ID must be a positive integer'),
  
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be a positive integer between 1 and 100'),
];

/**
 * Validation rules for getting mentor rating
 */
export const mentorRatingValidationRules = [
  param('mentorId')
    .isInt({ min: 1 })
    .withMessage('Mentor ID must be a positive integer'),
];

/**
 * Validation rules for getting mentor feedback
 */
export const mentorFeedbackValidationRules = [
  param('mentorId')
    .isInt({ min: 1 })
    .withMessage('Mentor ID must be a positive integer'),
  
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be a positive integer between 1 and 100'),
];