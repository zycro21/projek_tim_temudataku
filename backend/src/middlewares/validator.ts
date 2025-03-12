// src/middlewares/validator.ts
import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';
import { ValidationError } from '../utils/errorTypes';

/**
 * Middleware to validate request using express-validator
 * @param validations Array of validation chains
 */
export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Run all validations
    await Promise.all(validations.map(validation => validation.run(req)));

    // Get validation results
    const errors = validationResult(req);
    
    if (errors.isEmpty()) {
      return next();
    }

    // Format errors
    const formattedErrors = errors.array().reduce((acc: any, error: any) => {
      const field = error.path;
      if (!acc[field]) {
        acc[field] = [];
      }
      acc[field].push(error.msg);
      return acc;
    }, {});

    // Throw validation error
    next(new ValidationError('Validation failed', formattedErrors));
  };
};