import express from "express";
import {
  createCommissionPayment,
  getAllCommissionPayments,
  getCommissionPaymentsByReferralCodeId,
} from "../controllers/commissionPaymentController";

const router = express.Router();

// Buat pembayaran komisi baru
router.post("/", createCommissionPayment);

// Ambil semua pembayaran komisi
router.get("/", getAllCommissionPayments);

// Ambil pembayaran berdasarkan referral code ID
router.get("/referral/:referralCodeId", getCommissionPaymentsByReferralCodeId);

export default router;
