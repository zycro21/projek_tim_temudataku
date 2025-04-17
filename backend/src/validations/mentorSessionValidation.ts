import { body } from 'express-validator';

/**
 * Validation schema for creating a mentoring session
 */
export const createMentoringSessionSchema = [
  body('serviceId')
    .notEmpty()
    .withMessage('Service ID is required')
    .isInt({ min: 1 })
    .withMessage('Service ID must be a positive integer'),
    
  body('startTime')
    .notEmpty()
    .withMessage('Start time is required')
    .isISO8601()
    .withMessage('Start time must be a valid ISO 8601 date string'),
    
  body('endTime')
    .notEmpty()
    .withMessage('End time is required')
    .isISO8601()
    .withMessage('End time must be a valid ISO 8601 date string')
    .custom((value, { req }) => {
      const startTime = new Date(req.body.startTime);
      const endTime = new Date(value);
      if (endTime <= startTime) {
        throw new Error('End time must be after start time');
      }
      return true;
    }),
    
  body('durationMinutes')
    .optional()
    .isInt({ min: 15, max: 480 })
    .withMessage('Duration must be between 15 and 480 minutes'),
    
  body('meetingLink')
    .optional()
    .isURL()
    .withMessage('Meeting link must be a valid URL'),
    
  body('status')
    .optional()
    .isString()
    .withMessage('Status must be a string')
    .isIn(['scheduled', 'ongoing', 'completed', 'cancelled'])
    .withMessage('Status must be one of: scheduled, ongoing, completed, cancelled'),
    
  body('notes')
    .optional()
    .isString()
    .withMessage('Notes must be a string')
    .isLength({ max: 1000 })
    .withMessage('Notes cannot exceed 1000 characters'),
];

/**
 * Validation schema for updating a mentoring session
 */
export const updateMentoringSessionSchema = [
  body('startTime')
    .optional()
    .isISO8601()
    .withMessage('Start time must be a valid ISO 8601 date string'),
    
  body('endTime')
    .optional()
    .isISO8601()
    .withMessage('End time must be a valid ISO 8601 date string')
    .custom((value, { req }) => {
      if (req.body.startTime) {
        const startTime = new Date(req.body.startTime);
        const endTime = new Date(value);
        if (endTime <= startTime) {
          throw new Error('End time must be after start time');
        }
      }
      return true;
    }),
    
  body('durationMinutes')
    .optional()
    .isInt({ min: 15, max: 480 })
    .withMessage('Duration must be between 15 and 480 minutes'),
    
  body('meetingLink')
    .optional()
    .isURL()
    .withMessage('Meeting link must be a valid URL'),
    
  body('status')
    .optional()
    .isString()
    .withMessage('Status must be a string')
    .isIn(['scheduled', 'ongoing', 'completed', 'cancelled'])
    .withMessage('Status must be one of: scheduled, ongoing, completed, cancelled'),
    
  body('notes')
    .optional()
    .isString()
    .withMessage('Notes must be a string')
    .isLength({ max: 1000 })
    .withMessage('Notes cannot exceed 1000 characters'),
];

/**
 * Validation schema for updating session status
 */
export const updateSessionStatusSchema = [
  body('status')
    .notEmpty()
    .withMessage('Status is required')
    .isString()
    .withMessage('Status must be a string')
    .isIn(['scheduled', 'ongoing', 'completed', 'cancelled'])
    .withMessage('Status must be one of: scheduled, ongoing, completed, cancelled'),
];