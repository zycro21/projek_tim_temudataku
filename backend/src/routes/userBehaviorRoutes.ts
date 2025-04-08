import express from "express";
import {
  trackUserBehavior,
  getUserBehavior,
  getUserBehaviorById, // Import fungsi baru
} from "../controllers/userBehaviorController";

const router = express.Router();

// Route untuk mencatat aktivitas pengguna
router.post("/track", trackUserBehavior);

// Route untuk mendapatkan data aktivitas pengguna berdasarkan user_id
router.get("/behavior/:userId", getUserBehavior);

// Route untuk mendapatkan data aktivitas pengguna berdasarkan ID
router.get("/behavior/id/:id", getUserBehaviorById); // Tambahkan route baru

export default router;
