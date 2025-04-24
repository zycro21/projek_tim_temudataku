import { Router } from 'express';
import * as adminUserController from '../controllers/adminUserController';
import { authenticate, requireAdmin } from '../middlewares/authMiddleware';
import { validate } from '../middlewares/validator';
import { createUserValidation, toggleUserStatusValidation } from '../validations/adminUserValidation';

const router = Router();

// Semua routes di bawah ini memerlukan autentikasi
router.use(authenticate);
// Semua routes di bawah ini memerlukan role ADMIN
router.use(requireAdmin);

/**
 * @route POST /api/admin/users
 * @description Create new user with specific role (ADMIN or MENTOR)
 * @access Admin
 */
router.post('/', validate(createUserValidation), adminUserController.createUser);

/**
 * @route GET /api/admin/users
 * @description Get all users
 * @access Admin
 */
router.get('/', adminUserController.getAllUsers);

/**
 * @route GET /api/admin/users/admin-count
 * @description Get count of admin users
 * @access Admin
 */
router.get('/admin-count', adminUserController.getAdminCount);

/**
 * @route PATCH /api/admin/users/:id/toggle-status
 * @description Toggle user active status
 * @access Admin
 */
router.patch(
  '/:id/toggle-status',
  validate(toggleUserStatusValidation),
  adminUserController.toggleUserStatus
);

export default router;