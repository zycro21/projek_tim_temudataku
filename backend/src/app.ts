import express, { Express, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "./config/corsConfig";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app: Express = express();

// Middleware awal
app.use(cors);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// Routes
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "API is success connected..." });
});

export default app;