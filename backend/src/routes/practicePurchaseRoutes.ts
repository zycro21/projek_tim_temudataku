import express, { RequestHandler } from "express";
import {
  createPurchase,
  getUserPurchases,
  getPurchaseDetail,
} from "../controllers/practicePurchaseController";

const router = express.Router();

// Buat pembelian
router.post("/", createPurchase as RequestHandler);

// Lihat semua pembelian user
router.get("/user/:user_id", getUserPurchases as RequestHandler);

// Lihat detail pembelian user
router.get("/user/:user_id/:id", getPurchaseDetail as RequestHandler);

export default router;