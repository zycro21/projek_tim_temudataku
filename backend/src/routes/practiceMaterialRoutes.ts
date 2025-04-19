import express from "express";
import {
  createMaterial,
  updateMaterial,
  deleteMaterial,
  getAllMaterials,
  getMaterialById,
} from "../controllers/practiceMaterialController";

const router = express.Router();

// Endpoint untuk menambahkan Material ke Practice
router.post("/:practice_id", createMaterial);

// Endpoint untuk mengupdate Material
router.put("/:id", updateMaterial);

// Endpoint untuk menghapus Material
router.delete("/:id", deleteMaterial);

// Endpoint untuk mengambil semua Material dari sebuah Practice
router.get("/:practice_id", getAllMaterials);

// Endpoint untuk mengambil detail Material berdasarkan ID
router.get("/material/:id", getMaterialById);

export default router;
