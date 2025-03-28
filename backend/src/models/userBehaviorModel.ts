import pool from "../db";

// Fungsi untuk mencatat aktivitas pengguna
export const createUserBehavior = async (
  userId: number,
  pageVisited: string,
  action: string | null,
  ipAddress: string | null,
  userAgent: string | null
) => {
  try {
    const result = await pool.query(
      `INSERT INTO "user_behavior" ("user_id", "page_visited", "action", "ip_address", "user_agent")
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [userId, pageVisited, action, ipAddress, userAgent]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error("Error while inserting user behavior");
  }
};

// Fungsi untuk mendapatkan aktivitas pengguna berdasarkan user_id dengan paginasi
export const getUserBehaviorByUserId = async (userId: number, limit: number = 10, offset: number = 0) => {
  try {
    const result = await pool.query(
      `SELECT * FROM "user_behavior" WHERE "user_id" = $1 ORDER BY "timestamp" DESC LIMIT $2 OFFSET $3`,
      [userId, limit, offset]
    );
    return result.rows;
  } catch (error) {
    throw new Error("Error while fetching user behavior data");
  }
};

// Fungsi untuk mendapatkan aktivitas pengguna berdasarkan ID
export const getUserBehaviorById = async (id: number) => {
  try {
    const result = await pool.query(
      `SELECT * FROM "user_behavior" WHERE "id" = $1`,
      [id]
    );
    return result.rows[0]; // Ambil satu hasil, karena ID adalah unik
  } catch (error) {
    throw new Error("Error while fetching user behavior by ID");
  }
};

export default {
  createUserBehavior,
  getUserBehaviorByUserId,
  getUserBehaviorById,
};
