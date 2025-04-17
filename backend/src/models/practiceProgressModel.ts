import pool from "../db";

// Tandai material selesai
export const markAsCompleted = async (
  user_id: number,
  practice_id: number,
  material_id: number,
  time_spent_seconds: number
) => {
  const existing = await pool.query(
    `SELECT * FROM "practice_progress" 
     WHERE user_id = $1 AND practice_id = $2 AND material_id = $3`,
    [user_id, practice_id, material_id]
  );

  if (existing.rows.length > 0) {
    const result = await pool.query(
      `UPDATE "practice_progress" 
       SET is_completed = true, 
           last_accessed = NOW(), 
           time_spent_seconds = time_spent_seconds + $4, 
           updated_at = NOW()
       WHERE user_id = $1 AND practice_id = $2 AND material_id = $3 
       RETURNING *`,
      [user_id, practice_id, material_id, time_spent_seconds]
    );
    return result.rows[0];
  } else {
    const result = await pool.query(
      `INSERT INTO "practice_progress"
       (user_id, practice_id, material_id, is_completed, last_accessed, time_spent_seconds, created_at)
       VALUES ($1, $2, $3, true, NOW(), $4, NOW())
       RETURNING *`,
      [user_id, practice_id, material_id, time_spent_seconds]
    );
    return result.rows[0];
  }
};

// Ambil progress per Practice
export const getProgressByPractice = async (
  user_id: number,
  practice_id: number
) => {
  const result = await pool.query(
    `SELECT * FROM "practice_progress" 
     WHERE user_id = $1 AND practice_id = $2
     ORDER BY material_id`,
    [user_id, practice_id]
  );
  return result.rows;
};

// Ambil total waktu dan akses terakhir
export const getTimeAndLastAccess = async (
  user_id: number,
  practice_id: number
) => {
  const result = await pool.query(
    `SELECT 
       SUM(time_spent_seconds) as total_time,
       MAX(last_accessed) as last_accessed
     FROM "practice_progress"
     WHERE user_id = $1 AND practice_id = $2`,
    [user_id, practice_id]
  );
  return result.rows[0];
};

export default {
  markAsCompleted,
  getProgressByPractice,
  getTimeAndLastAccess,
};
