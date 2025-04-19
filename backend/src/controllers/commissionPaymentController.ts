import { Request, Response } from "express";
import commissionPaymentModel from "../models/commissionPaymentModel";

// Membuat pembayaran komisi
export const createCommissionPayment = async (req: Request, res: Response) => {
  try {
    const { referralCodeId, ownerId, amount, transactionId } = req.body;

    const payment = await commissionPaymentModel.createCommissionPayment(
      referralCodeId,
      ownerId,
      amount,
      transactionId
    );

    res.status(201).json({
      message: "Commission payment created successfully",
      data: payment,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};

// Mendapatkan semua pembayaran komisi
export const getAllCommissionPayments = async (req: Request, res: Response) => {
  try {
    const payments = await commissionPaymentModel.getAllCommissionPayments();
    res.status(200).json(payments);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};

// Mendapatkan komisi berdasarkan referral code
export const getCommissionPaymentsByReferralCodeId = async (
  req: Request,
  res: Response
) => {
  try {
    const referralCodeId = parseInt(req.params.referralCodeId);
    const payments =
      await commissionPaymentModel.getCommissionPaymentsByReferralCodeId(
        referralCodeId
      );
    res.status(200).json(payments);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};
