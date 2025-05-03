import express, { RequestHandler } from "express";
import {
  createSessionHandler,
  getSessionsHandler,
  getSessionHandler,
  updateSessionHandler,
  deleteSessionHandler,
} from "../controllers/sessionController";

const router = express.Router();

// Perbaiki juga struktur path (hilangkan "/sessions" karena sudah ada prefix di app.ts)
router.post("/", createSessionHandler as RequestHandler);
router.get("/", getSessionsHandler as RequestHandler);
router.get("/:id", getSessionHandler as RequestHandler);
router.put("/:id", updateSessionHandler as RequestHandler);
router.delete("/:id", deleteSessionHandler as RequestHandler);

export default router;
