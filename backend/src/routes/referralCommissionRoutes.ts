// referralCommissionRoutes.ts
import express from "express";
import referralCommissionController from "../controllers/referralCommissionController";

const router = express.Router();

// Buat referral commission baru
router.post("/create", referralCommissionController.createReferralCommission);

// Dapatkan total komisi untuk kode referral
router.get("/total/:referralCodeId", referralCommissionController.getTotalCommission);

// Bayar referral commission
router.post("/pay", referralCommissionController.payReferralCommission);

export default router;
