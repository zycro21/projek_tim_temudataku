// backend/src/routes/userRoleRoutes.ts
import express from 'express';
import * as userRoleController from '../controllers/userRoleController';
import { authenticate, requireAdmin } from '../middlewares/authMiddleware';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// All routes require admin role
router.use(requireAdmin);

// User role routes
router.get('/:id/roles', userRoleController.getUserRoles);
router.post('/:id/roles', userRoleController.assignRoleToUser);
router.delete('/:id/roles/:roleId', userRoleController.removeRoleFromUser);

export default router;