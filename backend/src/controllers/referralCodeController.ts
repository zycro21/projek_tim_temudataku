import { Request, Response } from "express";
import referralCodeModel from "../models/referralCodeModel";
import referralCommissionModel from "../models/referralCommissionModel";

// Membuat referral code baru
export const createReferralCode = async (req: Request, res: Response) => {
  const { ownerId, discountPercentage, commissionPercentage, expiryDate } =
    req.body;

  try {
    const newReferralCode = await referralCodeModel.createReferralCode(
      ownerId,
      discountPercentage,
      commissionPercentage,
      expiryDate
    );
    res.status(201).json(newReferralCode);
  } catch (error) {
    console.error("Error creating referral code:", error);
    res.status(500).json({ message: "Failed to create referral code" });
  }
};

// Mendapatkan referral code berdasarkan ID
export const getReferralCodeById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const referralCode = await referralCodeModel.getReferralCodeById(
      Number(id)
    );
    if (!referralCode) {
      return res.status(404).json({ message: "Referral code not found" });
    }
    res.status(200).json(referralCode);
  } catch (error) {
    console.error("Error fetching referral code:", error);
    res.status(500).json({ message: "Failed to fetch referral code" });
  }
};

// Mengupdate referral code berdasarkan ID
export const updateReferralCode = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ownerId, discountPercentage, commissionPercentage, expiryDate } =
    req.body;

  try {
    const updatedReferralCode = await referralCodeModel.updateReferralCode(
      Number(id),
      ownerId,
      discountPercentage,
      commissionPercentage,
      expiryDate
    );
    if (!updatedReferralCode) {
      return res.status(404).json({ message: "Referral code not found" });
    }
    res.status(200).json(updatedReferralCode);
  } catch (error) {
    console.error("Error updating referral code:", error);
    res.status(500).json({ message: "Failed to update referral code" });
  }
};

// Menghapus referral code berdasarkan ID
export const deleteReferralCode = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedReferralCode = await referralCodeModel.deleteReferralCode(
      Number(id)
    );
    if (!deletedReferralCode) {
      return res.status(404).json({ message: "Referral code not found" });
    }
    res.status(200).json({ message: "Referral code deleted successfully" });
  } catch (error) {
    console.error("Error deleting referral code:", error);
    res.status(500).json({ message: "Failed to delete referral code" });
  }
};

// Mendapatkan semua referral codes dengan pagination, sorting, dan pencarian
export const getAllReferralCodes = async (req: Request, res: Response) => {
  const {
    page = 1,
    limit = 10,
    sortBy = "id",
    order = "ASC",
    search = "",
  } = req.query;

  try {
    const referralCodes = await referralCodeModel.getAllReferralCodes(
      Number(page),
      Number(limit),
      String(sortBy),
      String(order),
      String(search)
    );
    res.status(200).json(referralCodes);
  } catch (error) {
    console.error("Error fetching referral codes:", error);
    res.status(500).json({ message: "Failed to fetch referral codes" });
  }
};

// Mendapatkan referral code berdasarkan kode unik
export const getReferralCodeByCode = async (req: Request, res: Response) => {
  const { code } = req.params;

  try {
    const referralCode = await referralCodeModel.getReferralCodeByCode(code);
    if (!referralCode) {
      return res.status(404).json({ message: "Referral code not found" });
    }
    res.status(200).json(referralCode);
  } catch (error) {
    console.error("Error fetching referral code:", error);
    res.status(500).json({ message: "Failed to fetch referral code" });
  }
};

// Menonaktifkan kode referral secara manual (mengubah is_active ke false)
export const deactivateReferralCode = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // Mengubah status is_active menjadi false untuk menonaktifkan kode referral
    const updatedReferralCode =
      await referralCodeModel.updateReferralCodeStatus(Number(id), false);

    if (!updatedReferralCode) {
      return res.status(404).json({ message: "Referral code not found" });
    }

    res.status(200).json({ message: "Referral code deactivated successfully" });
  } catch (error) {
    console.error("Error deactivating referral code:", error);
    res.status(500).json({ message: "Failed to deactivate referral code" });
  }
};

// Menonaktifkan referral code yang sudah kedaluwarsa secara otomatis
export const autoDeactivateExpiredCodes = async () => {
  try {
    const expiredCodes = await referralCodeModel.deactivateExpiredCodes();
    console.log(`Deactivated ${expiredCodes.length} expired referral codes.`);
  } catch (error) {
    console.error("Error deactivating expired referral codes:", error);
  }
};

// Memverifikasi penggunaan kode referral pada transaksi
// Mendapatkan informasi referral code dan memverifikasi transaksi

export const verifyReferralCode = async (req: Request, res: Response) => {
  const { code } = req.params;
  const { transactionAmount, transactionId } = req.body;  // Amount dan transactionId datang dari body request

  try {
    // 1. Verifikasi apakah kode referral valid
    const referralCode = await referralCodeModel.getReferralCodeByCode(code);

    if (!referralCode) {
      return res.status(404).json({ message: "Referral code not found" });
    }

    if (!referralCode.is_active) {
      return res.status(400).json({ message: "Referral code is not active" });
    }

    if (referralCode.expiry_date && new Date(referralCode.expiry_date) < new Date()) {
      return res.status(400).json({ message: "Referral code has expired" });
    }

    // 2. Menghitung komisi berdasarkan transaksi dan persentase komisi dari referralCode
    const commissionAmount = (transactionAmount * referralCode.commission_percentage) / 100;

    // 3. Membuat entri referral commission
    await referralCommissionModel.createReferralCommission(
      referralCode.id,  // referralCodeId
      transactionId,     // transactionId dari body request
      commissionAmount   // commissionAmount yang dihitung
    );

    res.status(200).json({
      message: "Referral code is valid",
      discountPercentage: referralCode.discount_percentage,
      commissionAmount,
    });
  } catch (error) {
    console.error("Error verifying referral code:", error);
    res.status(500).json({ message: "Failed to verify referral code" });
  }
};