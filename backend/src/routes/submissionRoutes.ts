import express from "express";
import {
  createSubmissionHandler,
  getAllSubmissionsHandler,
  updateSubmissionHandler,
  deleteSubmissionHandler,
} from "../controllers/submissionController";

const router = express.Router();

router.post("/", createSubmissionHandler); 
router.get("/", getAllSubmissionsHandler); 
router.put("/:id", updateSubmissionHandler); 
router.delete("/:id", deleteSubmissionHandler);

export default router;
