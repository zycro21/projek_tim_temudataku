// referralCommissionController.ts
import { Request, Response } from "express";
import referralCommissionModel from "../models/referralCommissionModel";
import commissionPaymentModel from "../models/commissionPaymentModel";

// ✅ Fungsi helper (utility) - langsung di sini aja dulu
const processReferralPayment = async (
  referralCodeId: number,
  ownerId: number,
  amount: number,
  transactionId?: string
) => {
  return await referralCommissionModel.payReferralCommission(
    referralCodeId,
    ownerId,
    amount,
    transactionId
  );
};

const createReferralCommission = async (req: Request, res: Response) => {
  try {
    const { referralCodeId, transactionId, amount } = req.body;

    const commission = await referralCommissionModel.createReferralCommission(
      referralCodeId,
      transactionId,
      amount
    );

    res.status(201).json({
      message: "Referral commission created successfully",
      data: commission,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ error: err.message });
  }
};

const getTotalCommission = async (req: Request, res: Response) => {
  try {
    const { referralCodeId } = req.params;

    const total =
      await referralCommissionModel.getTotalCommissionByReferralCodeId(
        parseInt(referralCodeId)
      );

    res.status(200).json({ totalAmount: total.total_amount });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ error: err.message });
  }
};

// Proses pembayaran komisi untuk referral
const payReferralCommission = async (req: Request, res: Response) => {
  try {
    const { referralCodeId, ownerId, amount, transactionId } = req.body;

    const payment = await processReferralPayment(
      referralCodeId,
      ownerId,
      amount,
      transactionId
    );

    res.status(200).json({
      message: "Referral commission paid successfully",
      data: payment,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ error: err.message });
  }
};

// Fungsi batch untuk membayar semua komisi yang terakumulasi
const payAllPendingCommissions = async () => {
  try {
    const pendingCommissions = await referralCommissionModel.getPendingCommissions();

    for (const commission of pendingCommissions) {
      await processReferralPayment(
        commission.referral_code_id,
        commission.owner_id,
        commission.amount,
        commission.transaction_id
      );
    }

    console.log(`Successfully paid ${pendingCommissions.length} referral commissions.`);
  } catch (error) {
    console.error("Error paying referral commissions:", error);
  }
};

export default {
  createReferralCommission,
  getTotalCommission,
  payReferralCommission,
  payAllPendingCommissions,
};
