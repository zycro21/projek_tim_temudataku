import express from 'express';
import * as mentorServiceController from '../controllers/mentorServiceController';
import { authenticate, requireRole } from '../middlewares/authMiddleware';

const router = express.Router();

/**
 * @route GET /api/mentoring-services
 * @desc Get all mentoring services with pagination and filters
 * @access Public
 */
router.get('/', mentorServiceController.getAllMentoringServices);

/**
 * @route GET /api/mentoring-services/:id
 * @desc Get mentoring service by ID
 * @access Public
 */
router.get('/:id', mentorServiceController.getMentoringServiceById);

/**
 * @route GET /api/mentoring-services/mentor/:mentorId
 * @desc Get mentoring services by mentor ID
 * @access Public
 */
router.get('/mentor/:mentorId', mentorServiceController.getMentoringServicesByMentorId);

/**
 * @route POST /api/mentoring-services
 * @desc Create new mentoring service
 * @access Private (Mentor/Admin)
 */
router.post(
  '/',
  authenticate,
  requireRole(['MENTOR', 'ADMIN']),
  mentorServiceController.createMentoringService
);

/**
 * @route PUT /api/mentoring-services/:id
 * @desc Update mentoring service
 * @access Private (Mentor/Admin)
 */
router.put(
  '/:id',
  authenticate,
  requireRole(['MENTOR', 'ADMIN']),
  mentorServiceController.updateMentoringService
);

/**
 * @route PATCH /api/mentoring-services/:id/toggle-status
 * @desc Toggle service active status
 * @access Private (Mentor/Admin)
 */
router.patch(
  '/:id/toggle-status',
  authenticate,
  requireRole(['MENTOR', 'ADMIN']),
  mentorServiceController.toggleServiceStatus
);

/**
 * @route DELETE /api/mentoring-services/:id
 * @desc Delete mentoring service
 * @access Private (Mentor/Admin)
 */
router.delete(
  '/:id',
  authenticate,
  requireRole(['MENTOR', 'ADMIN']),
  mentorServiceController.deleteMentoringService
);

export default router;