import express from "express";
import {
  addReview,
  updateReview,
  deleteReview,
  getReviewsByPractice,
  getAverageRating,
} from "../controllers/practiceReviewController";

const router = express.Router();

router.post("/", addReview);
router.put("/:id", updateReview);
router.delete("/:id", deleteReview);
router.get("/:practice_id", getReviewsByPractice);
router.get("/:practice_id/average", getAverageRating);

export default router;
