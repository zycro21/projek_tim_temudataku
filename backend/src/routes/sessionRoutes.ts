import express from "express";
import {
  createSessionHandler,
  getSessionsHandler,
  getSessionHandler,
  updateSessionHandler,
  deleteSessionHandler,
} from "../controllers/sessionController";

const router = express.Router();

router.post("/sessions", createSessionHandler);
router.get("/sessions", getSessionsHandler);
router.get("/sessions/:id", getSessionHandler);
router.put("/sessions/:id", updateSessionHandler); 
router.delete("/sessions/:id", deleteSessionHandler);

export default router;
