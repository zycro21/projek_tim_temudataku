// backend/src/routes/userProfileRoutes.ts
import express from 'express';
import * as userProfileController from '../controllers/userProfileController';
import { authenticate } from '../middlewares/authMiddleware';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../../uploads/profile');
    // Ensure the directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Create a unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'profile-' + uniqueSuffix + ext);
  }
});

// Define file filter
const fileFilter = (req: any, file: any, cb: multer.FileFilterCallback) => {
  // Accept only image files
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'));
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  }
});

// All routes require authentication
router.use(authenticate);

// User profile routes
router.get('/profile', userProfileController.getProfile);
router.put('/profile', userProfileController.updateProfile);
router.patch('/profile/picture', upload.single('profile_picture'), userProfileController.updateProfilePicture);
router.put('/change-password', userProfileController.changePassword);

export default router;