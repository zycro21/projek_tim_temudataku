// routes/generalRoutes.ts
import { Router } from "express";

const router = Router();

router.get("/status", (req, res) => {
  res.json({
    status: "success",
    message: "API is running smoothly",
  });
});

router.get("/docs", (req, res) => {
  res.json({
    status: "success",
    message: "API documentation can be found at /docs",
  });
});

router.get("/ping", (req, res) => {
  res.json({
    status: "success",
    message: "Pong",
  });
});

export default router;
