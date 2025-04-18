// backend/src/routes/feedbackRoutes.ts
import express from 'express';
import * as feedbackController from '../controllers/feedbackController';
import { authenticate, requireRole } from '../middlewares/authMiddleware';
import { validate } from '../middlewares/validator';
import {
  feedbackValidationRules,
  updateFeedbackValidationRules,
  getFeedbackValidationRules,
  deleteFeedbackValidationRules,
  sessionFeedbackValidationRules,
  mentorRatingValidationRules,
  mentorFeedbackValidationRules,
} from '../validations/feedbackValidation';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Create new feedback
router.post(
  '/',
  validate(feedbackValidationRules),
  feedbackController.createFeedback
);

// Get all feedback (admin only)
router.get(
  '/',
  requireRole(['ADMIN']),
  feedbackController.getAllFeedback
);

// Get feedback by ID
router.get(
  '/:id',
  validate(getFeedbackValidationRules),
  feedbackController.getFeedbackById
);

// Update feedback
router.put(
  '/:id',
  validate(updateFeedbackValidationRules),
  feedbackController.updateFeedback
);

// Delete feedback
router.delete(
  '/:id',
  validate(deleteFeedbackValidationRules),
  feedbackController.deleteFeedback
);

// Get feedback by session ID
router.get(
  '/session/:sessionId',
  validate(sessionFeedbackValidationRules),
  feedbackController.getFeedbackBySession
);

// Get mentor average rating
router.get(
  '/mentor/:mentorId/rating',
  validate(mentorRatingValidationRules),
  feedbackController.getMentorRating
);

// Get mentor feedback
router.get(
  '/mentor/:mentorId/feedback',
  validate(mentorFeedbackValidationRules),
  feedbackController.getMentorFeedback
);

export default router;