// backend/src/routes/roleRoutes.ts
import express from 'express';
import * as roleController from '../controllers/roleController';
import { authenticate, requireAdmin } from '../middlewares/authMiddleware';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// All routes require admin role
router.use(requireAdmin);

// Role routes
router.get('/', roleController.getAllRoles);
router.get('/:id', roleController.getRoleById);
router.post('/', roleController.createRole);
router.put('/:id', roleController.updateRole);
router.delete('/:id', roleController.deleteRole);

export default router;