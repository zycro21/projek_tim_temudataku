import pool from "../db";

// Tambah review
export const addReview = async (
  user_id: number,
  practice_id: number,
  rating: number,
  comment?: string
) => {
  const result = await pool.query(
    `INSERT INTO practice_reviews (user_id, practice_id, rating, comment, submitted_date, created_at)
     VALUES ($1, $2, $3, $4, NOW(), NOW())
     RETURNING *`,
    [user_id, practice_id, rating, comment]
  );
  return result.rows[0];
};

// Update review
export const updateReview = async (
  id: number,
  rating: number,
  comment?: string
) => {
  const result = await pool.query(
    `UPDATE practice_reviews
     SET rating = $1, comment = $2, updated_at = NOW()
     WHERE id = $3
     RETURNING *`,
    [rating, comment, id]
  );
  return result.rows[0];
};

// Hapus review
export const deleteReview = async (id: number) => {
  await pool.query(`DELETE FROM practice_reviews WHERE id = $1`, [id]);
};

// Ambil semua review by practice
export const getReviewsByPractice = async (practice_id: number) => {
  const result = await pool.query(
    `SELECT pr.*, u.full_name
     FROM practice_reviews pr
     JOIN users u ON pr.user_id = u.id
     WHERE pr.practice_id = $1
     ORDER BY pr.submitted_date DESC`,
    [practice_id]
  );
  return result.rows;
};

// Ambil rata-rata rating
export const getAverageRating = async (practice_id: number) => {
  const result = await pool.query(
    `SELECT AVG(rating)::numeric(3,2) as average_rating
     FROM practice_reviews
     WHERE practice_id = $1`,
    [practice_id]
  );
  return result.rows[0];
};

export default {
  addReview,
  updateReview,
  deleteReview,
  getReviewsByPractice,
  getAverageRating,
};
