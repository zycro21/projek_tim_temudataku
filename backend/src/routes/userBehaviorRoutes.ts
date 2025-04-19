import express from "express";
import {
  trackUserBehavior,
  getUserBehavior,
  getUserBehaviorById, // Import fungsi baru
  deleteUserBehavior, // Import fungsi untuk menghapus aktivitas
  // pengguna
  getPageVisitReport,
  getActionReport,
  getUserBehaviorByDateReport,
} from "../controllers/userBehaviorController";

const router = express.Router();

// Route untuk mencatat aktivitas pengguna
router.post("/track", trackUserBehavior);

// Route untuk mendapatkan data aktivitas pengguna berdasarkan user_id
router.get("/behavior/:userId", getUserBehavior);

// Route untuk mendapatkan data aktivitas pengguna berdasarkan ID
router.get("/behavior/id/:id", getUserBehaviorById); // Tambahkan route baru

// Route untuk menghapus aktivitas pengguna berdasarkan ID
router.delete("/behavior/id/:id", deleteUserBehavior); // Route baru untuk menghapus aktivitas pengguna

// Route untuk mendapatkan laporan jumlah halaman yang dikunjungi
router.get("/report/page-visit", getPageVisitReport);

// Route untuk mendapatkan laporan tindakan pengguna
router.get("/report/action", getActionReport);

// Route untuk mendapatkan laporan aktivitas berdasarkan waktu
router.get("/report/behavior-by-date", getUserBehaviorByDateReport);

export default router;
