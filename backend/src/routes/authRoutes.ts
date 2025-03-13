// src/routes/authRoutes.ts
import { Router } from 'express';
import * as authController from '../controllers/authController';
import { validate } from '../middlewares/validator';
import { registerValidation, loginValidation, emailValidation } from '../validations/authValidation';

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

/**
 * @route GET /auth/verify-email/:token
 * @description Verify user email
 * @access Public
 */
router.get('/verify-email/:token', authController.verifyEmail);

/**
 * @route POST /auth/resend-verification
 * @description Resend verification email
 * @access Public
 */
router.post('/resend-verification', validate(emailValidation), authController.resendVerificationEmail);

export default router;