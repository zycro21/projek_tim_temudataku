import pool from "../db";

// Buat Practice
export const createPractice = async (data: {
  mentor_id: number;
  title: string;
  description?: string;
  thumbnail_image?: string;
  price: number;
  practice_type?: string;
  category?: string;
  tags?: object;
}) => {
  const result = await pool.query(
    `INSERT INTO "practices" 
     ("mentor_id", "title", "description", "thumbnail_image", "price", "practice_type", "category", "tags") 
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING *`,
    [
      data.mentor_id,
      data.title,
      data.description || null,
      data.thumbnail_image || null,
      data.price,
      data.practice_type || null,
      data.category || null,
      data.tags ? JSON.stringify(data.tags) : null,
    ]
  );
  return result.rows[0];
};

// Update Practice
export const updatePractice = async (
  id: number,
  data: Partial<{
    title: string;
    description: string;
    thumbnail_image: string;
    price: number;
    practice_type: string;
    category: string;
    tags: object;
  }>
) => {
  const fields: string[] = [];
  const values: (string | number | boolean | null)[] = [];
  let count = 1;

  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined) {
      fields.push(`"${key}" = $${count}`);
      values.push(
        key === "tags"
          ? (JSON.stringify(value) as string)
          : (value as string | number | boolean | null)
      );
      count++;
    }
  }

  const query = `
    UPDATE "practices" 
    SET ${fields.join(", ")}, updated_at = now() 
    WHERE id = $${count} 
    RETURNING *`;

  values.push(id);

  const result = await pool.query(query, values);
  return result.rows[0];
};

// Aktif / Nonaktif
export const togglePracticeStatus = async (id: number) => {
  const result = await pool.query(
    `UPDATE "practices" 
     SET is_active = NOT is_active, updated_at = now() 
     WHERE id = $1 RETURNING *`,
    [id]
  );
  return result.rows[0];
};

// Hapus Practice
export const deletePractice = async (id: number) => {
  const result = await pool.query(
    `DELETE FROM "practices" WHERE id = $1 RETURNING *`,
    [id]
  );
  return result.rows[0];
};

// Ambil semua Practice (dengan filter opsional)
export const getAllPractices = async (filters: {
  category?: string;
  mentor_id?: number;
  is_active?: boolean;
}) => {
  const conditions: string[] = [];
  const values: (string | number | boolean | null)[] = [];

  if (filters.category) {
    values.push(filters.category);
    conditions.push(`"category" = $${values.length}`);
  }
  if (filters.mentor_id) {
    values.push(filters.mentor_id);
    conditions.push(`"mentor_id" = $${values.length}`);
  }
  if (filters.is_active !== undefined) {
    values.push(filters.is_active);
    conditions.push(`"is_active" = $${values.length}`);
  }

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  const result = await pool.query(
    `SELECT * FROM "practices" ${whereClause} ORDER BY created_at DESC`,
    values
  );
  return result.rows;
};

// Ambil Practice by ID
export const getPracticeById = async (id: number) => {
  const result = await pool.query(`SELECT * FROM "practices" WHERE id = $1`, [
    id,
  ]);
  return result.rows[0];
};

export default {
  createPractice,
  updatePractice,
  togglePracticeStatus,
  deletePractice,
  getAllPractices,
  getPracticeById,
};
