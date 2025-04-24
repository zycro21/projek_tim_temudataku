import express, { Express, Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import cors from "./config/corsConfig";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

// Import dari struktur KEDUA (main)
import bookingRoutes from "./routes/bookingRoutes";
import sessionRoutes from "./routes/sessionRoutes";
import projectsRoutes from "./routes/projectRoutes";
import submissionsRoutes from "./routes/submissionRoutes";
import paymentRoutes from "./routes/paymentRoutes";
import generalRoutes from "./routes/generalRoutes";
import userBehaviorRoutes from "./routes/userBehaviorRoutes";
import referralCodeRoutes from "./routes/referralCodeRoutes";
import referralCommissionRoutes from "./routes/referralCommissionRoutes";
import commissionPaymentRoutes from "./routes/commissionPaymentRoutes";
import practiceRoutes from "./routes/practiceRoutes";
import practiceMaterialRoutes from "./routes/practiceMaterialRoutes";
import practiceFileRoutes from "./routes/practiceFileRoutes";
import practicePurchaseRoutes from "./routes/practicePurchaseRoutes";
import practiceProgressRoutes from "./routes/practiceProgressRoutes";
import practiceReviewRoutes from "./routes/practiceReviewRoutes";
import certificateRoutes from "./routes/certificateRoutes";

// Import dari struktur PERTAMA (habdil-temu-dataku)
import routes from "./routes";

dotenv.config();

const app: Express = express();

// Security middlewares
app.use(helmet());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 menit
    max: 100, // limit setiap IP ke 100 request per windowMs
    standardHeaders: true,
    legacyHeaders: false,
  })
);

// Middleware dasar
app.use(cors);
app.use(cookieParser());
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

// Logging di development
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routes
app.get("/", (req: Request, res: Response) => {
  res.json({
    status: "success",
    message: "API is running successfully",
    version: "1.0.0",
    documentation: "/api/docs",
  });
});

// Routes dari KEDUA (main)
app.use("/api/general", generalRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/submissions", submissionsRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/user-behavior", userBehaviorRoutes);
app.use("/api/referral-codes", referralCodeRoutes);
app.use("/api/referral-commissions", referralCommissionRoutes);
app.use("/api/commission-payments", commissionPaymentRoutes);
app.use("/api/practices", practiceRoutes);
app.use("/api/practice-materials", practiceMaterialRoutes);
app.use("/api/practice-files", practiceFileRoutes);
app.use("/api/practice-purchases", practicePurchaseRoutes);
app.use("/api/practice-progress", practiceProgressRoutes);
app.use("/api/practice-reviews", practiceReviewRoutes);
app.use("/api/certificates", certificateRoutes);

// Routes dari PERTAMA (habdil-temu-dataku)
app.use("/api", routes);

// 404 handler
app.all("*", (req: Request, res: Response) => {
  res.status(404).json({
    status: "error",
    message: `Route ${req.originalUrl} not found`,
  });
});

// Global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Error:", err);
  
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  
  res.status(statusCode).json({
    status: "error",
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

export default app;