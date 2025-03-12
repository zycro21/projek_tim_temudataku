// src/routes/authRoutes.ts
import { Router } from 'express';
import * as authController from '../controllers/authController';
import { validate } from '../middlewares/validator';
import { registerValidation, loginValidation } from '../validations/authValidation';

const router = Router();

/**
 * @route POST /auth/register
 * @description Register a new user
 * @access Public
 */
router.post('/register', validate(registerValidation), authController.register);

/**
 * @route POST /auth/login
 * @description Login user
 * @access Public
 */
router.post('/login', validate(loginValidation), authController.login);

export default router;