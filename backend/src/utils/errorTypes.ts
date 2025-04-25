// src/utils/errorTypes.ts

export class AppError extends Error {
    statusCode: number;
    errors?: any;
    
    constructor(message: string, statusCode: number, errors?: any) {
      super(message);
      this.statusCode = statusCode;
      this.errors = errors;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  export class BadRequestError extends AppError {
    constructor(message: string, errors?: any) {
      super(message, 400, errors);
    }
  }
  
  export class UnauthorizedError extends AppError {
    constructor(message: string = 'Unauthorized') {
      super(message, 401);
    }
  }
  
  export class ForbiddenError extends AppError {
    constructor(message: string = 'Forbidden') {
      super(message, 403);
    }
  }
  
  export class NotFoundError extends AppError {
    constructor(message: string = 'Resource not found') {
      super(message, 404);
    }
  }
  
  export class ConflictError extends AppError {
    constructor(message: string, errors?: any) {
      super(message, 409, errors);
    }
  }
  
  export class ValidationError extends AppError {
    constructor(message: string, errors?: any) {
      super(message, 422, errors);
    }
  }
  
  export class InternalServerError extends AppError {
    constructor(message: string = 'Internal server error') {
      super(message, 500);
    }
  }