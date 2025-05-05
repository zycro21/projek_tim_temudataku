import { v4 as uuidv4 } from "uuid";
import pool from "../db";

// Fungsi untuk membuat referral code baru
export const createReferralCode = async (
  ownerId: number,
  discountPercentage: number,
  commissionPercentage: number,
  expiryDate: Date | null
) => {
  const code = uuidv4(); // Menghasilkan kode unik untuk referral code

  const result = await pool.query(
    `INSERT INTO "referral_codes" ("owner_id", "discount_percentage", "commission_percentage", "expiry_date", "code") 
    VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [
      ownerId,
      discountPercentage,
      commissionPercentage,
      expiryDate || null,
      code,
    ]
  );
  return result.rows[0];
};

// Fungsi untuk mendapatkan referral code berdasarkan ID
export const getReferralCodeById = async (id: number) => {
  const result = await pool.query(
    `SELECT * FROM "referral_codes" WHERE "id" = $1`,
    [id]
  );
  return result.rows[0];
};

// Fungsi untuk mengupdate referral code
export const updateReferralCode = async (
  id: number,
  ownerId: number,
  discountPercentage: number,
  commissionPercentage: number,
  expiryDate: Date | null
) => {
  const result = await pool.query(
    `UPDATE "referral_codes" 
     SET "owner_id" = $1, "discount_percentage" = $2, "commission_percentage" = $3, "expiry_date" = $4, "updated_at" = now()
     WHERE "id" = $5
     RETURNING *`,
    [ownerId, discountPercentage, commissionPercentage, expiryDate || null, id]
  );
  return result.rows[0];
};

// Fungsi untuk mengubah status kode referral (aktif/nonaktif)
export const updateReferralCodeStatus = async (
  id: number,
  isActive: boolean
) => {
  const result = await pool.query(
    `UPDATE "referral_codes" SET "is_active" = $1 WHERE "id" = $2 RETURNING *`,
    [isActive, id]
  );
  return result.rows[0];
};

// Fungsi untuk menonaktifkan kode referral yang sudah kedaluwarsa
export const deactivateExpiredCodes = async () => {
  const result = await pool.query(
    `UPDATE "referral_codes" SET "is_active" = false WHERE "expiry_date" < now() AND "is_active" = true RETURNING *`
  );
  return result.rows;
};

// Fungsi untuk menghapus referral code berdasarkan ID
export const deleteReferralCode = async (id: number) => {
  const result = await pool.query(
    `DELETE FROM "referral_codes" WHERE "id" = $1 RETURNING *`,
    [id]
  );
  return result.rows[0];
};

// Fungsi untuk mendapatkan semua referral codes dengan pagination, sorting, dan pencarian
export const getAllReferralCodes = async (
  page: number,
  limit: number,
  sortBy: string,
  order: string,
  search: string
) => {
  const offset = (page - 1) * limit;

  const validSortColumns = [
    "id",
    "owner_id",
    "discount_percentage",
    "commission_percentage",
    "expiry_date",
    "created_at",
    "updated_at",
  ];

  if (!validSortColumns.includes(sortBy)) {
    throw new Error("Invalid sortBy column");
  }

  // Menginisialisasi kondisi pencarian sebagai string kosong
  let searchCondition = "";
  let queryParams: any[] = [limit, offset]; // Array parameter SQL, dimulai dengan limit dan offset

  // Jika ada query pencarian, tambahkan kondisi pencarian
  if (search) {
    searchCondition = `WHERE "code" ILIKE $3 OR "owner_id"::text ILIKE $3`;
    queryParams.push(`%${search}%`); // Menambahkan parameter pencarian ke dalam array queryParams
  }

  // Jalankan query dengan kondisi pencarian (jika ada)
  const result = await pool.query(
    `SELECT * FROM "referral_codes" ${searchCondition} ORDER BY "${sortBy}" ${order} LIMIT $1 OFFSET $2`,
    queryParams
  );

  return result.rows;
};

// Fungsi untuk mendapatkan referral code berdasarkan kode
export const getReferralCodeByCode = async (code: string) => {
  const result = await pool.query(
    `SELECT * FROM "referral_codes" WHERE "code" = $1`,
    [code]
  );
  return result.rows[0];
};

export default {
  createReferralCode,
  getReferralCodeById,
  updateReferralCode,
  deleteReferralCode,
  getAllReferralCodes,
  getReferralCodeByCode,
  updateReferralCodeStatus,
  deactivateExpiredCodes,
};
