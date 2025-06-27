import express from "express";
import {
  createProjectHandler,
  getAllProjectsHandler,
  updateProjectHandler,
  deleteProjectHandler,
  getProjectByIdHandler,
} from "../controllers/projectController";
import uploadProjectFile from "../middlewares/uploadProjectFile";
import { uploadProjectFileHandler } from "../controllers/projectController"; // Buat sebentar lagi

const router = express.Router();

router.post("/", createProjectHandler);
router.get("/", getAllProjectsHandler);
router.get("/:id", getProjectByIdHandler);
router.put("/:id", updateProjectHandler);
router.delete("/:id", deleteProjectHandler);
router.post("/upload-file", uploadProjectFile.single("file"), uploadProjectFileHandler);

export default router;
