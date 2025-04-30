import pool from "../db";

// Membuat catatan penggunaan referral
export const createReferralUsage = async (
  userId: number,
  referralCodeId: number,
  context: string
) => {
  const result = await pool.query(
    `INSERT INTO "referral_usages" ("user_id", "referral_code_id", "used_at", "context", "created_at")
     VALUES ($1, $2, now(), $3, now())
     RETURNING *`,
    [userId, referralCodeId, context]
  );

  return result.rows[0];
};

// Mengecek apakah user sudah pernah menggunakan kode referral ini
export const hasUsedReferralCode = async (
  userId: number,
  referralCodeId: number
) => {
  const result = await pool.query(
    `SELECT 1 FROM "referral_usages" WHERE "user_id" = $1 AND "referral_code_id" = $2 LIMIT 1`,
    [userId, referralCodeId]
  );

  return result.rowCount! > 0; //
};

export default {
  createReferralUsage,
  hasUsedReferralCode, // pastikan ini diekspor
};
