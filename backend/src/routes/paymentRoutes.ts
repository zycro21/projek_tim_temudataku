import { Router } from 'express';
import { createPayment, verifyPayment } from '../controllers/paymentController';

const router = Router();

router.post('/create-payment', createPayment);
router.post('/verify-payment', verifyPayment);

export default router;
