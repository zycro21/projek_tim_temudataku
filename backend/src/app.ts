import express, { Express, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "./config/corsConfig";
import dotenv from "dotenv";
import bookingRoutes from "./routes/bookingRoutes";
import sessionRoutes from "./routes/sessionRoutes";
import projectsRoutes from "./routes/projectRoutes"; 
import submissionsRoutes from "./routes/submissionRoutes"; 
import paymentRoutes from './routes/paymentRoutes';
dotenv.config();

const app: Express = express();

// Middleware awal
app.use(cors);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "API is successfully connected..." });
});

app.use("/api", bookingRoutes);
app.use("/api", sessionRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/submissions", submissionsRoutes);
app.use('/api/payments', paymentRoutes);

export default app;
