// routes/generalRoutes.ts
import { Router } from "express";

const router = Router();

// Route untuk mengecek status API
router.get("/status", (req, res) => {
  res.json({
    status: "success",
    message: "API is running smoothly",
  });
});

// Route untuk dokumentasi (misalnya bisa diarahkan ke Swagger atau dokumen lainnya)
router.get("/docs", (req, res) => {
  res.json({
    status: "success",
    message: "API documentation can be found at /docs",
  });
});

// Route untuk ping API
router.get("/ping", (req, res) => {
  res.json({
    status: "success",
    message: "Pong",
  });
});

export default router;
