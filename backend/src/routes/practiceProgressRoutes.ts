import express from "express";
import {
  markAsCompleted,
  getProgressByPractice,
  getTimeAndLastAccess,
} from "../controllers/practiceProgressController";

const router = express.Router();

router.post("/complete", markAsCompleted);
router.get("/:user_id/:practice_id", getProgressByPractice);
router.get("/:user_id/:practice_id/time", getTimeAndLastAccess);

export default router;
