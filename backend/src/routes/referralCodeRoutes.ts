import express from "express";
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
router.post("/", createReferralCode);

// Route untuk mendapatkan referral code berdasarkan ID
router.get("/:id", getReferralCodeById);

// Route untuk mengupdate referral code berdasarkan ID
router.put("/:id", updateReferralCode);

// Route untuk menghapus referral code berdasarkan ID
router.delete("/:id", deleteReferralCode);

// Route untuk mendapatkan semua referral codes dengan pagination dan pencarian
router.get("/", getAllReferralCodes);

// Route untuk mendapatkan referral code berdasarkan kode unik
router.get("/code/:code", getReferralCodeByCode);

// Route untuk memverifikasi penggunaan kode referral pada transaksi
router.post("/verify/:code", verifyReferralCode);

export default router;
