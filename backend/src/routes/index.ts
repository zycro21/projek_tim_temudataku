import { Router } from "express";
import authRoutes from "./authRoutes";
// Import routes lain di sini

const router = Router();

// Health check endpoint
router.get("/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "API is healthy",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// Register route modules
router.use("/auth", authRoutes);
// Tambahkan routes lain seperti:
// router.use("/users", userRoutes);
// router.use("/mentors", mentorRoutes);
// router.use("/services", serviceRoutes);

export default router;