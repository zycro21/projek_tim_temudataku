import { body } from 'express-validator';

/**
 * Validation schema for creating a mentoring service
 */
export const createMentoringServiceSchema = [
  body('serviceName')
    .notEmpty()
    .withMessage('Service name is required')
    .isString()
    .withMessage('Service name must be a string')
    .isLength({ min: 3, max: 100 })
    .withMessage('Service name must be between 3 and 100 characters'),
    
  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string')
    .isLength({ max: 1000 })
    .withMessage('Description cannot exceed 1000 characters'),
    
  body('price')
    .notEmpty()
    .withMessage('Price is required')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
    
  body('serviceType')
    .optional()
    .isString()
    .withMessage('Service type must be a string')
    .isIn(['one-on-one', 'group', 'bootcamp', 'shortclass', 'live class'])
    .withMessage('Service type must be one of: one-on-one, group, bootcamp, shortclass, live class'),
    
  body('maxParticipants')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Maximum participants must be a positive integer'),
    
  body('durationDays')
    .notEmpty()
    .withMessage('Duration is required')
    .isInt({ min: 1 })
    .withMessage('Duration must be a positive integer'),
    
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('Active status must be a boolean'),
    
  body('mentorId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Mentor ID must be a positive integer'),
];

/**
 * Validation schema for updating a mentoring service
 */
export const updateMentoringServiceSchema = [
  body('serviceName')
    .optional()
    .isString()
    .withMessage('Service name must be a string')
    .isLength({ min: 3, max: 100 })
    .withMessage('Service name must be between 3 and 100 characters'),
    
  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string')
    .isLength({ max: 1000 })
    .withMessage('Description cannot exceed 1000 characters'),
    
  body('price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
    
  body('serviceType')
    .optional()
    .isString()
    .withMessage('Service type must be a string')
    .isIn(['one-on-one', 'group', 'bootcamp', 'shortclass', 'live class'])
    .withMessage('Service type must be one of: one-on-one, group, bootcamp, shortclass, live class'),
    
  body('maxParticipants')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Maximum participants must be a positive integer'),
    
  body('durationDays')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Duration must be a positive integer'),
    
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('Active status must be a boolean'),
];