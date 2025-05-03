import pool from "../db";

// Buat Material
export const createMaterial = async (data: {
  practice_id: number;
  title: string;
  description?: string;
  order_number: number;
}) => {
  const result = await pool.query(
    `INSERT INTO "practice_materials" ("practice_id", "title", "description", "order_number") 
    VALUES ($1, $2, $3, $4) RETURNING *`,
    [data.practice_id, data.title, data.description || null, data.order_number]
  );
  return result.rows[0];
};

// Update Material
export const updateMaterial = async (
  id: number,
  data: Partial<{
    title: string;
    description: string;
    order_number: number;
  }>
) => {
  const fields: string[] = [];
  const values: (string | number | null)[] = [];
  let count = 1;

  // Untuk masing-masing field, buat query dinamis
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined) {
      fields.push(`"${key}" = $${count}`);
      values.push(value);
      count++;
    }
  }

  if (fields.length === 0) {
    throw new Error("No valid fields to update");
  }

  const query = `UPDATE "practice_materials" SET ${fields.join(", ")}, "updated_at" = now() WHERE id = $${count} RETURNING *`;
  values.push(id);

  const result = await pool.query(query, values);
  return result.rows[0];
};

// Hapus Material
export const deleteMaterial = async (id: number) => {
  const result = await pool.query(
    `DELETE FROM "practice_materials" WHERE id = $1 RETURNING *`,
    [id]
  );
  return result.rows[0];
};

// Ambil Semua Material dari Practice
export const getAllMaterials = async (practice_id: number) => {
  const result = await pool.query(
    `SELECT * FROM "practice_materials" WHERE "practice_id" = $1 ORDER BY "order_number" ASC, "created_at" DESC`,
    [practice_id]
  );
  return result.rows;
};

// Ambil Material berdasarkan ID
export const getMaterialById = async (id: number) => {
  const result = await pool.query(
    `SELECT * FROM "practice_materials" WHERE id = $1`,
    [id]
  );
  return result.rows[0];
};

export default {
  createMaterial,
  updateMaterial,
  deleteMaterial,
  getAllMaterials,
  getMaterialById,
};
