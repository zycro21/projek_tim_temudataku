// 4. Routes - src/routes/mentorProfileRoutes.ts
import { Router } from 'express';
import { mentorProfileController } from '../controllers/mentorProfileController';
import { createMentorProfileValidation, updateMentorProfileValidation } from '../validations/mentorProfileValidation';
import { validate } from '../middlewares/validator';
import * as authMiddleware from '../middlewares/authMiddleware';

const router = Router();

/**
 * @route GET /mentors
 * @description Get all mentor profiles with pagination
 * @access Public
 */
router.get('/mentors', mentorProfileController.getAllMentorProfiles);

/**
 * @route GET /mentors/user/:userId
 * @description Get mentor profile by user ID
 * @access Public
 */
router.get('/mentors/user/:userId', mentorProfileController.getMentorProfileByUserId);

/**
 * @route GET /mentors/:id
 * @description Get mentor profile by profile ID
 * @access Public
 */
router.get('/mentors/:id', mentorProfileController.getMentorProfileById);

/**
 * @route GET /mentor-profile
 * @description Get current user's mentor profile
 * @access Private
 */
router.get('/mentor-profile', 
  authMiddleware.authenticate, 
  mentorProfileController.getCurrentMentorProfile
);

/**
 * @route PUT /mentor-profile
 * @description Update current user's mentor profile
 * @access Private
 */
router.put('/mentor-profile', 
  authMiddleware.authenticate, 
  validate(updateMentorProfileValidation()), 
  mentorProfileController.updateCurrentMentorProfile
);

/**
 * @route POST /mentors
 * @description Create a new mentor profile
 * @access Admin
 */
router.post('/mentors', 
  authMiddleware.authenticate, 
  authMiddleware.requireAdmin, 
  validate(createMentorProfileValidation()), 
  mentorProfileController.createMentorProfile
);

/**
 * @route PUT /mentors/:id
 * @description Update a mentor profile by ID
 * @access Admin
 */
router.put('/mentors/:id', 
  authMiddleware.authenticate, 
  authMiddleware.requireAdmin, 
  validate(updateMentorProfileValidation()), 
  mentorProfileController.updateMentorProfile
);

/**
 * @route PATCH /mentors/:id/verify
 * @description Toggle verification status of a mentor profile
 * @access Admin
 */
router.patch('/mentors/:id/verify', 
  authMiddleware.authenticate, 
  authMiddleware.requireAdmin, 
  mentorProfileController.toggleVerificationStatus
);

/**
 * @route DELETE /mentors/:id
 * @description Delete a mentor profile
 * @access Admin
 */
router.delete('/mentors/:id', 
  authMiddleware.authenticate, 
  authMiddleware.requireAdmin, 
  mentorProfileController.deleteMentorProfile
);

export default router;