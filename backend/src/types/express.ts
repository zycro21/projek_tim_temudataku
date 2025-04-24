// backend/src/types/express.ts
import { Request } from 'express';

// Define the File interface matching Multer's structure
interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
  buffer: Buffer;
}

/**
 * Extends Express Request interface to include file property added by Multer
 */
export interface MulterRequest extends Request {
  file?: MulterFile;
  files?: {
    [fieldname: string]: MulterFile[];
  } | MulterFile[];
}

/**
 * Extends Express Request interface to include the authenticated user
 */
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        roles: string[];
      };
    }
  }
}