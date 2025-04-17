import express from 'express';
import * as mentorSessionController from '../controllers/mentorSessionController';
import { authenticate, requireRole } from '../middlewares/authMiddleware';

const router = express.Router();

/**
 * @route GET /api/mentoring-sessions
 * @desc Get all mentoring sessions with pagination and filters
 * @access Public
 */
router.get('/', mentorSessionController.getAllMentoringSessions);

/**
 * @route GET /api/mentoring-sessions/service/:serviceId
 * @desc Get mentoring sessions by service ID
 * @access Public
 */
router.get('/service/:serviceId', mentorSessionController.getMentoringSessionsByServiceId);

/**
 * @route GET /api/mentoring-sessions/:id
 * @desc Get mentoring session by ID
 * @access Public
 */
router.get('/:id', mentorSessionController.getMentoringSessionById);

/**
 * @route POST /api/mentoring-sessions
 * @desc Create new mentoring session
 * @access Private (Mentor/Admin)
 */
router.post(
  '/',
  authenticate,
  requireRole(['MENTOR', 'ADMIN']),
  mentorSessionController.createMentoringSession
);

/**
 * @route PUT /api/mentoring-sessions/:id
 * @desc Update mentoring session
 * @access Private (Mentor/Admin)
 */
router.put(
  '/:id',
  authenticate,
  requireRole(['MENTOR', 'ADMIN']),
  mentorSessionController.updateMentoringSession
);

/**
 * @route PATCH /api/mentoring-sessions/:id/status
 * @desc Update session status
 * @access Private (Mentor/Admin)
 */
router.patch(
  '/:id/status',
  authenticate,
  requireRole(['MENTOR', 'ADMIN']),
  mentorSessionController.updateSessionStatus
);

/**
 * @route DELETE /api/mentoring-sessions/:id
 * @desc Delete mentoring session
 * @access Private (Mentor/Admin)
 */
router.delete(
  '/:id',
  authenticate,
  requireRole(['MENTOR', 'ADMIN']),
  mentorSessionController.deleteMentoringSession
);

export default router;