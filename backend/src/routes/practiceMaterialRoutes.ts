import express, { RequestHandler } from "express";
import {
  createMaterial,
  updateMaterial,
  deleteMaterial,
  getAllMaterials,
  getMaterialById,
} from "../controllers/practiceMaterialController";

const router = express.Router();

// Endpoint untuk menambahkan Material ke Practice
router.post("/:practice_id", createMaterial as RequestHandler);

// Endpoint untuk mengupdate Material
router.put("/:id", updateMaterial as RequestHandler);

// Endpoint untuk menghapus Material
router.delete("/:id", deleteMaterial as RequestHandler);

// Endpoint untuk mengambil semua Material dari sebuah Practice
router.get("/:practice_id", getAllMaterials as RequestHandler);

// Endpoint untuk mengambil detail Material berdasarkan ID
router.get("/material/:id", getMaterialById as RequestHandler);

export default router;