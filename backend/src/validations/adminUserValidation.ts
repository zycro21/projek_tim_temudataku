import { body, param } from 'express-validator';

/**
 * Validation rules for creating a user with specific role
 */
export const createUserValidation = [
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email address')
    .normalizeEmail(),
  
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  
  body('full_name')
    .notEmpty()
    .withMessage('Full name is required')
    .isLength({ max: 100 })
    .withMessage('Full name must not exceed 100 characters'),
  
  body('phone_number')
    .optional()
    .matches(/^[0-9+\-\s()]*$/)
    .withMessage('Phone number must contain only digits, spaces, and the following characters: +, -, (, )'),
  
  body('city')
    .optional()
    .isLength({ max: 100 })
    .withMessage('City must not exceed 100 characters'),
  
  body('province')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Province must not exceed 100 characters'),
  
  body('role')
    .notEmpty()
    .withMessage('Role is required')
    .isIn(['ADMIN', 'MENTOR'])
    .withMessage('Role must be ADMIN or MENTOR')
];

/**
 * Validation rules for toggling user status
 */
export const toggleUserStatusValidation = [
  param('id')
    .isInt()
    .withMessage('User ID must be an integer')
];