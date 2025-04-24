import { body } from 'express-validator';

// Validasi untuk membuat notifikasi baru
export const createNotificationSchema = [
  body('user_id')
    .isInt({ min: 1 })
    .withMessage('User ID harus berupa angka positif'),
  
  body('type')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Tipe notifikasi harus diisi')
    .isIn(['info', 'warning', 'success', 'session_reminder', 'feedback_reminder', 'new_feedback'])
    .withMessage('Tipe notifikasi tidak valid'),
  
  body('title')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Judul notifikasi harus diisi')
    .isLength({ max: 100 })
    .withMessage('Judul notifikasi maksimal 100 karakter'),
  
  body('message')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Pesan notifikasi maksimal 500 karakter'),
];

// Validasi untuk memperbarui notifikasi
export const updateNotificationSchema = [
  body('type')
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Tipe notifikasi harus diisi')
    .isIn(['info', 'warning', 'success', 'session_reminder', 'feedback_reminder', 'new_feedback'])
    .withMessage('Tipe notifikasi tidak valid'),
  
  body('title')
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Judul notifikasi harus diisi')
    .isLength({ max: 100 })
    .withMessage('Judul notifikasi maksimal 100 karakter'),
  
  body('message')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Pesan notifikasi maksimal 500 karakter'),
  
  body('is_read')
    .optional()
    .isBoolean()
    .withMessage('Status baca harus berupa boolean'),
];