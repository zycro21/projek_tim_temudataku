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

/**
 * Validation schema for creating batch sessions
 */
export const createBatchSessionsSchema = [
  body('serviceId')
    .notEmpty()
    .withMessage('Service ID is required')
    .isInt({ min: 1 })
    .withMessage('Service ID must be a positive integer'),
    
  body('sessions')
    .notEmpty()
    .withMessage('Sessions array is required')
    .isArray()
    .withMessage('Sessions must be an array')
    .isLength({ min: 1, max: 50 })
    .withMessage('You can create between 1 and 50 sessions at once'),
    
  body('sessions.*.startTime')
    .notEmpty()
    .withMessage('Start time is required')
    .isISO8601()
    .withMessage('Start time must be a valid ISO 8601 date string'),
    
  body('sessions.*.endTime')
    .notEmpty()
    .withMessage('End time is required')
    .isISO8601()
    .withMessage('End time must be a valid ISO 8601 date string')
    .custom((value, { req, path }) => {
      const index = path.split('.')[1];
      const startTime = new Date(req.body.sessions[index].startTime);
      const endTime = new Date(value);
      if (endTime <= startTime) {
        throw new Error('End time must be after start time');
      }
      return true;
    }),
    
  body('sessions.*.durationMinutes')
    .optional()
    .isInt({ min: 15, max: 480 })
    .withMessage('Duration must be between 15 and 480 minutes'),
    
  body('sessions.*.meetingLink')
    .optional()
    .isURL()
    .withMessage('Meeting link must be a valid URL'),
    
  body('sessions.*.status')
    .optional()
    .isString()
    .withMessage('Status must be a string')
    .isIn(['scheduled', 'ongoing', 'completed', 'cancelled'])
    .withMessage('Status must be one of: scheduled, ongoing, completed, cancelled'),
    
  body('sessions.*.notes')
    .optional()
    .isString()
    .withMessage('Notes must be a string')
    .isLength({ max: 1000 })
    .withMessage('Notes cannot exceed 1000 characters'),

  body('sessions').custom((sessions, { req }) => {
      if (!Array.isArray(sessions)) return true;
      
      for (let i = 0; i < sessions.length; i++) {
        const session = sessions[i];
        if (session.startTime && session.endTime) {
          const startTime = new Date(session.startTime);
          const endTime = new Date(session.endTime);
          if (endTime <= startTime) {
            throw new Error(`Session ${i+1}: End time must be after start time`);
          }
        }
      }
      return true;
    })
];

/**
 * Validation schema for creating recurring sessions
 */
export const createRecurringSessionsSchema = [
  body('serviceId')
    .notEmpty()
    .withMessage('Service ID is required')
    .isInt({ min: 1 })
    .withMessage('Service ID must be a positive integer'),
    
  body('startDate')
    .notEmpty()
    .withMessage('Start date is required')
    .isISO8601()
    .withMessage('Start date must be a valid ISO 8601 date string'),
    
  body('endDate')
    .notEmpty()
    .withMessage('End date is required')
    .isISO8601()
    .withMessage('End date must be a valid ISO 8601 date string')
    .custom((value, { req }) => {
      const startDate = new Date(req.body.startDate);
      const endDate = new Date(value);
      if (endDate < startDate) {
        throw new Error('End date must be on or after start date');
      }
      return true;
    }),
    
  body('durationMinutes')
    .notEmpty()
    .withMessage('Duration is required')
    .isInt({ min: 15, max: 480 })
    .withMessage('Duration must be between 15 and 480 minutes'),
    
  body('daysOfWeek')
    .notEmpty()
    .withMessage('Days of week are required')
    .isArray()
    .withMessage('Days of week must be an array')
    .custom(value => {
      if (value.length === 0) {
        throw new Error('At least one day of week must be specified');
      }
      
      for (const day of value) {
        if (!Number.isInteger(day) || day < 0 || day > 6) {
          throw new Error('Days of week must be integers between 0 (Sunday) and 6 (Saturday)');
        }
      }
      
      return true;
    }),
    
  body('startTimes')
    .notEmpty()
    .withMessage('Start times are required')
    .isArray()
    .withMessage('Start times must be an array')
    .custom(value => {
      if (value.length === 0) {
        throw new Error('At least one start time must be specified');
      }
      
      const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
      for (const time of value) {
        if (typeof time !== 'string' || !timeRegex.test(time)) {
          throw new Error('Start times must be in HH:MM format');
        }
      }
      
      return true;
    }),
    
  body('recurrencePattern')
    .notEmpty()
    .withMessage('Recurrence pattern is required')
    .isString()
    .withMessage('Recurrence pattern must be a string')
    .isIn(['weekly', 'biweekly', 'monthly'])
    .withMessage('Recurrence pattern must be one of: weekly, biweekly, monthly'),
    
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
 * Validation schema for cancelling multiple sessions
 */
export const cancelMultipleSessionsSchema = [
  body('sessionIds')
    .notEmpty()
    .withMessage('Session IDs are required')
    .isArray()
    .withMessage('Session IDs must be an array')
    .isLength({ min: 1, max: 50 })
    .withMessage('You can cancel between 1 and 50 sessions at once')
    .custom(value => {
      for (const id of value) {
        if (!Number.isInteger(id) || id <= 0) {
          throw new Error('Session IDs must be positive integers');
        }
      }
      return true;
    }),
    
  body('cancellationReason')
    .optional()
    .isString()
    .withMessage('Cancellation reason must be a string')
    .isLength({ max: 500 })
    .withMessage('Cancellation reason cannot exceed 500 characters'),
];