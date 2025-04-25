// backend/src/utils/responseFormatter.ts
import { Response } from 'express';

interface SuccessResponse<T> {
  status: 'success';
  message?: string;
  data?: T;
}

interface ErrorResponse {
  status: 'error';
  message: string;
  errors?: any;
}

export type ApiResponse<T = any> = SuccessResponse<T> | ErrorResponse;

/**
 * Format and send success response
 */
export const formatResponse = <T>(
  res: Response, 
  message: string = 'Operation successful', 
  data?: T, 
  statusCode: number = 200
): Response => {
  return res.status(statusCode).json({
    status: 'success',
    message,
    data
  });
};

/**
 * Format and send error response
 */
export const formatErrorResponse = (
  res: Response, 
  message: string = 'An error occurred', 
  errors?: any, 
  statusCode: number = 400
): Response => {
  return res.status(statusCode).json({
    status: 'error',
    message,
    errors
  });
};

/**
 * Create a success response object (without sending)
 */
export const successResponse = <T>(data?: T, message?: string): SuccessResponse<T> => ({
  status: 'success',
  message,
  data
});

/**
 * Create an error response object (without sending)
 */
export const errorResponse = (message: string, errors?: any): ErrorResponse => ({
  status: 'error',
  message,
  errors
});