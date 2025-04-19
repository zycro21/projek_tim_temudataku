// referralCommissionModel.ts
import pool from "../db";

// Membuat data referral commission
export const createReferralCommission = async (
  referralCodeId: number,
  transactionId: string,
  amount: number
) => {
  const result = await pool.query(
    `INSERT INTO "referral_commissions" ("referral_code_id", "transaction_id", "amount", "created_at")
     VALUES ($1, $2, $3, now()) RETURNING *`,
    [referralCodeId, transactionId, amount]
  );
  return result.rows[0];
};

// Menghitung total komisi untuk referral code tertentu
export const getTotalCommissionByReferralCodeId = async (
  referralCodeId: number
) => {
  const result = await pool.query(
    `SELECT COALESCE(SUM("amount"), 0) AS total_amount
     FROM "referral_commissions"
     WHERE "referral_code_id" = $1`,
    [referralCodeId]
  );
  return result.rows[0];
};

// Membayar komisi kepada pemilik referral
export const payReferralCommission = async (
  referralCodeId: number,
  ownerId: number,
  amount: number,
  transactionId?: string
) => {
  const result = await pool.query(
    `INSERT INTO "commission_payments" ("referral_code_id", "owner_id", "amount", "transaction_id", "status", "paid_at", "created_at")
     VALUES ($1, $2, $3, $4, $5, now(), now()) RETURNING *`,
    [referralCodeId, ownerId, amount, transactionId || null, "paid"]
  );
  return result.rows[0];
};

// Fungsi untuk mendapatkan komisi yang belum dibayar (status = 'pending')
export const getPendingCommissions = async () => {
  const result = await pool.query(
    `SELECT * FROM "commission_payments" WHERE "status" = 'pending'`
  );
  return result.rows;
};

export default {
  createReferralCommission,
  getTotalCommissionByReferralCodeId,
  payReferralCommission,
  getPendingCommissions,
};
