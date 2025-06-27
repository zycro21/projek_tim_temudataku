// backend/src/routes/staticRoutes.ts
import express from 'express';
import path from 'path';
import fs from 'fs';

const router = express.Router();

/**
 * Serve profile pictures
 * GET /api/static/profile/:filename
 */
router.get('/profile/:filename', (req: express.Request, res: express.Response): void => {
  const { filename } = req.params;
  
  // Validate filename to prevent directory traversal
  if (!filename || filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
    res.status(400).json({ error: 'Invalid filename' });
    return;
  }
  
  const filePath = path.join(__dirname, '../storage/profile', filename);
  
  // Check if file exists
  if (!fs.existsSync(filePath)) {
    res.status(404).json({ error: 'File not found' });
    return;
  }
  
  // Set appropriate headers
  res.setHeader('Content-Type', 'image/jpeg'); // You can make this dynamic based on file extension
  res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 1 day
  
  // Send file
  res.sendFile(filePath);
});

/**
 * Serve other static files if needed
 * You can add more static file routes here
 */

export default router;