import express from "express";
import { uploadFile, updateFile, deleteFile, getAllFiles } from "../controllers/practiceFileController";

const router = express.Router();

// Endpoint untuk upload file
router.post("/:practice_material_id/upload", uploadFile);

// Endpoint untuk mengupdate file
router.put("/:id", updateFile);

// Endpoint untuk menghapus file
router.delete("/:id", deleteFile);

// Endpoint untuk mengambil semua file dari sebuah material
router.get("/:practice_material_id", getAllFiles);

export default router;
