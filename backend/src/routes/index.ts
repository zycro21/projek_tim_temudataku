import { Router } from "express";
import authRoutes from "./authRoutes";
import adminUserRoutes from "./adminUserRoutes";
import userProfileRoutes from "./userProfileRoutes";
import roleRoutes from "./roleRoutes";
import userRoleRoutes from "./userRoleRoutes";
import mentorProfileRoutes from "./mentorProfileRoutes";
import notificationRoutes from "./notificationRoutes";
import mentorServiceRoutes from "./mentorServiceRoutes";
import mentorSessionRoutes from "./mentorSessionRoutes";
import feedbackRoutes from "./feedbackRoutes";
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
router.use('/admin/users', adminUserRoutes);
router.use('/users', userProfileRoutes);
router.use('/admin/roles', roleRoutes);
router.use('/admin/users', userRoleRoutes);
router.use(mentorProfileRoutes);
router.use('/notifications', notificationRoutes);
router.use('/mentoring-services', mentorServiceRoutes);
router.use('/mentoring-sessions', mentorSessionRoutes);
router.use('/feedback', feedbackRoutes); 


export default router;