import express from "express";
import {
  createPractice,
  updatePractice,
  togglePracticeStatus,
  deletePractice,
  getAllPractices,
  getPracticeById,
} from "../controllers/practiceController";

const router = express.Router();

router.post("/", createPractice);
router.put("/:id", updatePractice);
router.patch("/:id/toggle-status", togglePracticeStatus);
router.delete("/:id", deletePractice);
router.get("/", getAllPractices);
router.get("/:id", getPracticeById);

export default router;
