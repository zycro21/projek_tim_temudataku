import express, { Express, Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import cors from "./config/corsConfig";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import routes from "./routes";

// Load environment variables
dotenv.config();

const app: Express = express();

// Security middlewares
app.use(helmet()); // Menambahkan HTTP security headers
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
app.use(express.json({ limit: "10kb" })); // Batasi ukuran request body
app.use(express.urlencoded({ extended: true }));

// Logging di development
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routes
app.use("/api", routes);

// Basic route
app.get("/", (req: Request, res: Response) => {
  res.json({ 
    status: "success", 
    message: "API is running successfully",
    version: "1.0.0",
    documentation: "/api/docs" // Jika Anda menambahkan Swagger/OpenAPI docs nanti
  });
});

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