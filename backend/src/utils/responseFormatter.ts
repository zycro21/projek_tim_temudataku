// src/utils/responseFormatter.ts

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
   * Format success response
   */
  export const successResponse = <T>(data?: T, message?: string): SuccessResponse<T> => ({
    status: 'success',
    message,
    data
  });
  
  /**
   * Format error response
   */
  export const errorResponse = (message: string, errors?: any): ErrorResponse => ({
    status: 'error',
    message,
    errors
  });