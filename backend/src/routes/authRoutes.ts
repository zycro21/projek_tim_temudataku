// src/routes/authRoutes.ts
import { Router } from 'express';
import * as authController from '../controllers/authController';
import { validate } from '../middlewares/validator';
import { registerValidation, loginValidation, emailValidation, requestResetValidation, resetPasswordValidation } from '../validations/authValidation';
import * as authMiddleware from '../middlewares/authMiddleware';

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

/**
 * @route POST /auth/logout
 * @description Logout user
 * @access Private
 */
router.post('/logout', authMiddleware.authenticate, authController.logout);

/**
 * @route POST /auth/request-reset
 * @description Request password reset
 * @access Public
 */
router.post('/request-reset', validate(requestResetValidation), authController.requestPasswordReset);

/**
 * @route POST /auth/reset-password
 * @description Reset password with token
 * @access Public
 */
router.post('/reset-password', validate(resetPasswordValidation), authController.resetPassword);

export default router;