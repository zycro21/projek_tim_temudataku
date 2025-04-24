import { Router } from 'express';
import * as notificationController from '../controllers/notificationController';
import { validate } from '../middlewares/validator';
import * as notificationValidation from '../validations/notificationValidation';
import * as authMiddleware from '../middlewares/authMiddleware';

const router = Router();

// Semua routes notifications memerlukan autentikasi
router.use(authMiddleware.authenticate);

/**
 * @route GET /notifications
 * @description Get all notifications for logged in user
 * @access Private
 */
router.get('/', notificationController.getAllNotifications);

/**
 * @route GET /notifications/:id
 * @description Get a notification by ID
 * @access Private
 */
router.get('/:id', notificationController.getNotificationById);

/**
 * @route POST /notifications
 * @description Create a new notification
 * @access Private
 */
router.post(
  '/',
  validate(notificationValidation.createNotificationSchema),
  notificationController.createNotification
);

/**
 * @route PUT /notifications/:id
 * @description Update a notification
 * @access Private
 */
router.put(
  '/:id',
  validate(notificationValidation.updateNotificationSchema),
  notificationController.updateNotification
);

/**
 * @route PATCH /notifications/read-all
 * @description Mark all notifications as read
 * @access Private
 */
router.patch('/read-all', notificationController.markAllNotificationsAsRead);

/**
 * @route PATCH /notifications/:id/read
 * @description Mark a notification as read
 * @access Private
 */
router.patch('/:id/read', notificationController.markNotificationAsRead);

/**
 * @route DELETE /notifications/:id
 * @description Delete a notification
 * @access Private
 */
router.delete('/:id', notificationController.deleteNotification);

/**
 * @route DELETE /notifications
 * @description Delete all notifications for the logged in user
 * @access Private
 */
router.delete('/', notificationController.deleteAllNotifications);

export default router;