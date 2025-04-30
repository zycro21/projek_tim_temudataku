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
export const getUserBehaviorByUserId = async (
  userId: number,
  limit: number = 10,
  offset: number = 0
) => {
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

// Fungsi untuk menghapus aktivitas pengguna berdasarkan ID
export const deleteUserBehavior = async (id: number) => {
  try {
    const result = await pool.query(
      `DELETE FROM "user_behavior" WHERE "id" = $1 RETURNING *`,
      [id]
    );

    // Jika tidak ada data yang dihapus, hasilnya akan kosong
    if (result.rows.length === 0) {
      return null; // Kembalikan null jika tidak ada yang dihapus
    }

    return result.rows[0]; // Kembalikan data yang dihapus
  } catch (error) {
    throw new Error("Error while deleting user behavior");
  }
};

// Fungsi untuk mendapatkan laporan jumlah halaman yang dikunjungi
export const getPageVisitReport = async (
  startDate: string | undefined,
  endDate: string | undefined
) => {
  const queryParams: string[] = [];
  let query = `
    SELECT "page_visited", COUNT(*) AS visit_count
    FROM "user_behavior"
  `;

  if (startDate && endDate) {
    query += ` WHERE "timestamp" BETWEEN $1 AND $2`;
    queryParams.push(startDate, endDate);
  }

  query += ` GROUP BY "page_visited" ORDER BY visit_count DESC`;

  try {
    const result = await pool.query(query, queryParams);
    return result.rows;
  } catch (error) {
    throw new Error("Error while fetching page visit report");
  }
};

// Fungsi untuk mendapatkan laporan tindakan pengguna
export const getActionReport = async (
  startDate: string | undefined,
  endDate: string | undefined
) => {
  const queryParams: string[] = [];
  let query = `
    SELECT "action", COUNT(*) AS action_count
    FROM "user_behavior"
  `;

  if (startDate && endDate) {
    query += ` WHERE "timestamp" BETWEEN $1 AND $2`;
    queryParams.push(startDate, endDate);
  }

  query += ` GROUP BY "action" ORDER BY action_count DESC`;

  try {
    const result = await pool.query(query, queryParams);
    return result.rows;
  } catch (error) {
    throw new Error("Error while fetching action report");
  }
};

// Fungsi untuk mendapatkan laporan aktivitas berdasarkan waktu
export const getUserBehaviorByDateReport = async (
  startDate: string | undefined,
  endDate: string | undefined,
  interval: string
) => {
  const queryParams: string[] = [];
  let query = `SELECT DATE_TRUNC($1, "timestamp") AS period, COUNT(*) AS activity_count FROM "user_behavior"`;

  if (startDate && endDate) {
    query += ` WHERE "timestamp" BETWEEN $2 AND $3`;
    queryParams.push(startDate, endDate);
  }

  query += ` GROUP BY period ORDER BY period`;

  try {
    // Mengirimkan interval, startDate, dan endDate ke query sesuai urutan yang benar
    const result = await pool.query(query, [interval, ...queryParams]);
    return result.rows;
  } catch (error) {
    throw new Error("Error while fetching user behavior by date report");
  }
};
export default {
  createUserBehavior,
  getUserBehaviorByUserId,
  getUserBehaviorById,
  deleteUserBehavior, // Menambahkan fungsi baru ke export
  getPageVisitReport,
  getActionReport,
  getUserBehaviorByDateReport,
};
