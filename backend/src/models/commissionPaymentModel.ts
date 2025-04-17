import pool from "../db";

// Membuat pembayaran komisi
export const createCommissionPayment = async (
  referralCodeId: number,
  ownerId: number,
  amount: number,
  transactionId?: string
) => {
  const result = await pool.query(
    `INSERT INTO commission_payments 
      (referral_code_id, owner_id, amount, transaction_id, status, paid_at, created_at) 
     VALUES ($1, $2, $3, $4, $5, now(), now()) RETURNING *`,
    [referralCodeId, ownerId, amount, transactionId || null, "paid"]
  );
  return result.rows[0];
};

// Mendapatkan semua pembayaran komisi
export const getAllCommissionPayments = async () => {
  const result = await pool.query(`SELECT * FROM commission_payments ORDER BY paid_at DESC`);
  return result.rows;
};

// Mendapatkan pembayaran komisi berdasarkan referral code ID
export const getCommissionPaymentsByReferralCodeId = async (referralCodeId: number) => {
  const result = await pool.query(
    `SELECT * FROM commission_payments WHERE referral_code_id = $1 ORDER BY paid_at DESC`,
    [referralCodeId]
  );
  return result.rows;
};

export default {
  createCommissionPayment,
  getAllCommissionPayments,
  getCommissionPaymentsByReferralCodeId,
};
