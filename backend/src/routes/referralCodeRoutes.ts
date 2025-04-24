import express, { RequestHandler } from "express";
import {
  createReferralCode,
  getReferralCodeById,
  updateReferralCode,
  deleteReferralCode,
  getAllReferralCodes,
  getReferralCodeByCode,
  verifyReferralCode,
} from "../controllers/referralCodeController";

const router = express.Router();

// Route untuk membuat referral code baru
router.post("/", createReferralCode as RequestHandler);

// Route untuk mendapatkan referral code berdasarkan ID
router.get("/:id", getReferralCodeById as RequestHandler);

// Route untuk mengupdate referral code berdasarkan ID
router.put("/:id", updateReferralCode as RequestHandler);

// Route untuk menghapus referral code berdasarkan ID
router.delete("/:id", deleteReferralCode as RequestHandler);

// Route untuk mendapatkan semua referral codes dengan pagination dan pencarian
router.get("/", getAllReferralCodes as RequestHandler);

// Route untuk mendapatkan referral code berdasarkan kode unik
router.get("/code/:code", getReferralCodeByCode as RequestHandler);

// Route untuk memverifikasi penggunaan kode referral pada transaksi
router.post("/verify/:code", verifyReferralCode as RequestHandler);

export default router;