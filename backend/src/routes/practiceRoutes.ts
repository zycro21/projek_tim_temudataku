import express, { RequestHandler } from "express";
import {
  createPractice,
  updatePractice,
  togglePracticeStatus,
  deletePractice,
  getAllPractices,
  getPracticeById,
} from "../controllers/practiceController";
import uploadPracticeThumbnail from "../middlewares/uploadPracticeThumbnail";
import { uploadPracticeThumbnailController } from "../controllers/practiceController";


const router = express.Router();

router.post("/", createPractice as RequestHandler);
router.put("/:id", updatePractice as RequestHandler);
router.patch("/:id/toggle-status", togglePracticeStatus as RequestHandler);
router.delete("/:id", deletePractice as RequestHandler);
router.get("/", getAllPractices as RequestHandler);
router.get("/:id", getPracticeById as RequestHandler);
router.post(
  "/:id/thumbnail",
  uploadPracticeThumbnail.single("thumbnail"),
  uploadPracticeThumbnailController
);

export default router;