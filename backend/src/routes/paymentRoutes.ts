import { Router, Request, Response, NextFunction } from 'express';
import { createPayment, verifyPayment } from '../controllers/paymentController';

const router = Router();

// Buat wrapper untuk mengelola pengembalian Promise
router.post('/create-payment', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await createPayment(req, res);
  } catch (error) {
    next(error);
  }
});

router.post('/verify-payment', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await verifyPayment(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;