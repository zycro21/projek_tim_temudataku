import { Request, Response } from "express";
import practicePurchaseModel from "../models/practicePurchaseModel";

// 1. Buat pembelian
export const createPurchase = async (req: Request, res: Response) => {
  try {
    const { user_id, practice_id, payment_id, referral_usage_id } = req.body;

    const purchase = await practicePurchaseModel.createPurchase(
      Number(user_id),
      Number(practice_id),
      payment_id ? Number(payment_id) : undefined,
      referral_usage_id ? Number(referral_usage_id) : undefined
    );

    res.status(201).json({
      message: "Practice purchased successfully",
      data: purchase,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to purchase", error });
  }
};

// 2. Get semua pembelian user
export const getUserPurchases = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;
    const data = await practicePurchaseModel.getUserPurchases(Number(user_id));
    res.status(200).json({ message: "Fetched user purchases", data });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch", error });
  }
};

// 3. Get detail pembelian
export const getPurchaseDetail = async (req: Request, res: Response) => {
  try {
    const { user_id, id } = req.params;
    const detail = await practicePurchaseModel.getPurchaseDetail(Number(user_id), Number(id));

    if (!detail) {
      return res.status(404).json({ message: "Purchase not found" });
    }

    res.status(200).json({ message: "Fetched purchase detail", data: detail });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch detail", error });
  }
};
