import pool from "../db";

// Buat pembelian Practice
export const createPurchase = async (
  user_id: number,
  practice_id: number,
  payment_id?: number,
  referral_usage_id?: number
) => {
  const result = await pool.query(
    `INSERT INTO "practice_purchases" 
      (user_id, practice_id, payment_id, referral_usage_id, status, created_at) 
     VALUES ($1, $2, $3, $4, $5, NOW())
     RETURNING *`,
    [
      user_id,
      practice_id,
      payment_id || null,
      referral_usage_id || null,
      "paid",
    ]
  );
  return result.rows[0];
};

// Ambil semua Practice yang dibeli oleh user
export const getUserPurchases = async (user_id: number) => {
  const result = await pool.query(
    `SELECT pp.*, p.title, p.description, p.price
     FROM "practice_purchases" pp
     JOIN "practices" p ON pp.practice_id = p.id
     WHERE pp.user_id = $1
     ORDER BY pp.created_at DESC`,
    [user_id]
  );
  return result.rows;
};

// Ambil detail pembelian Practice oleh user
export const getPurchaseDetail = async (
  user_id: number,
  purchase_id: number
) => {
  const result = await pool.query(
    `SELECT pp.*, p.title, p.description, p.price
     FROM "practice_purchases" pp
     JOIN "practices" p ON pp.practice_id = p.id
     WHERE pp.user_id = $1 AND pp.id = $2`,
    [user_id, purchase_id]
  );
  return result.rows[0];
};

export default {
  createPurchase,
  getUserPurchases,
  getPurchaseDetail,
};
