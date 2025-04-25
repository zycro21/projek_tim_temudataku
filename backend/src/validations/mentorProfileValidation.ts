import { body } from 'express-validator';

export const createMentorProfileValidation = () => [
  body('user_id').isInt().withMessage('User ID must be an integer'),
  body('expertise').optional().isString().withMessage('Expertise must be a string'),
  body('bio').optional().isString().withMessage('Bio must be a string'),
  body('experience').optional().isString().withMessage('Experience must be a string'),
  body('availability_schedule').optional().isObject().withMessage('Availability schedule must be a valid JSON object'),
  body('hourly_rate').optional().isDecimal().withMessage('Hourly rate must be a decimal value'),
];

export const updateMentorProfileValidation = () => [
  body('expertise').optional().isString().withMessage('Expertise must be a string'),
  body('bio').optional().isString().withMessage('Bio must be a string'),
  body('experience').optional().isString().withMessage('Experience must be a string'),
  body('availability_schedule').optional().isObject().withMessage('Availability schedule must be a valid JSON object'),
  body('hourly_rate').optional().isDecimal().withMessage('Hourly rate must be a decimal value'),
  body('is_verified').optional().isBoolean().withMessage('Is verified must be a boolean value'),
];