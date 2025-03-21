// app.ts
import express, { Express, Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import cors from "./config/corsConfig";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

// Import route files
import bookingRoutes from "./routes/bookingRoutes";
import sessionRoutes from "./routes/sessionRoutes";
import projectsRoutes from "./routes/projectRoutes"; 
import submissionsRoutes from "./routes/submissionRoutes"; 
import paymentRoutes from "./routes/paymentRoutes";
import generalRoutes from "./routes/generalRoutes"; // Import generalRoutes

dotenv.config();

const app: Express = express();

// Security middlewares
app.use(helmet());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 menit
    max: 100, // limit setiap IP ke 100 request
    standardHeaders: true,
    legacyHeaders: false,
  })
);

// Middleware dasar
app.use(cors);
app.use(cookieParser());
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

// Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routes
app.get("/", (req: Request, res: Response) => {
  res.json({ 
    status: "success", 
    message: "API is running successfully",
    version: "1.0.0",
    documentation: "/api/docs"
  });
});

app.use("/api", generalRoutes); // Menambahkan rute generalRoutes
app.use("/api", bookingRoutes);
app.use("/api", sessionRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/submissions", submissionsRoutes);
app.use("/api/payments", paymentRoutes);

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
