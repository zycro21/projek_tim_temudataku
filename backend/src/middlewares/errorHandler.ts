// src/middlewares/errorHandler.ts
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errorTypes';
import { errorResponse } from '../utils/responseFormatter';
import { Prisma } from '@prisma/client';

/**
 * Global error handler middleware
 */
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', err);

  // Handle Prisma errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // Handle unique constraint errors
    if (err.code === 'P2002') {
      const target = err.meta?.target as string[];
      const field = target?.[0] || 'field';
      return res.status(409).json(
        errorResponse(`${field} already exists`, { field })
      );
    }

    // Handle foreign key constraint errors
    if (err.code === 'P2003') {
      return res.status(400).json(
        errorResponse('Invalid relationship')
      );
    }

    // Handle record not found
    if (err.code === 'P2001' || err.code === 'P2018') {
      return res.status(404).json(
        errorResponse('Record not found')
      );
    }

    return res.status(400).json(
      errorResponse('Database error', { code: err.code })
    );
  }

  // Handle validation errors
  if (err instanceof Prisma.PrismaClientValidationError) {
    return res.status(400).json(
      errorResponse('Validation error', { message: err.message })
    );
  }

  // Handle custom app errors
  if (err instanceof AppError) {
    return res.status(err.statusCode).json(
      errorResponse(err.message, err.errors)
    );
  }

  // Handle unknown errors
  return res.status(500).json(
    errorResponse('Internal server error')
  );
};