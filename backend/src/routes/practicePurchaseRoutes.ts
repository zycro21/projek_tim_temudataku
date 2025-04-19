import express from "express";
import {
  createPurchase,
  getUserPurchases,
  getPurchaseDetail,
} from "../controllers/practicePurchaseController";

const router = express.Router();

// Buat pembelian
router.post("/", createPurchase);

// Lihat semua pembelian user
router.get("/user/:user_id", getUserPurchases);

// Lihat detail pembelian user
router.get("/user/:user_id/:id", getPurchaseDetail);

export default router;
