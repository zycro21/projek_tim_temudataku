import pool from "../db";

// Buat Material
export const createMaterial = async (data: {
  practice_id: number;
  title: string;
  description?: string;
  url?: string;
  type: string; // bisa berupa video, document, atau lainnya
}) => {
  const result = await pool.query(
    `INSERT INTO "practice_materials" 
     ("practice_id", "title", "description", "url", "type") 
     VALUES ($1, $2, $3, $4, $5) 
     RETURNING *`,
    [
      data.practice_id,
      data.title,
      data.description || null,
      data.url || null,
      data.type,
    ]
  );
  return result.rows[0];
};

// Update Material
export const updateMaterial = async (
  id: number,
  data: Partial<{
    title: string;
    description: string;
    url: string;
    type: string;
  }>
) => {
  const fields: string[] = [];
  const values: (string | number | boolean | null)[] = [];
  let count = 1;

  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined) {
      fields.push(`"${key}" = $${count}`);
      values.push(value);
      count++;
    }
  }

  const query = `
    UPDATE "practice_materials" 
    SET ${fields.join(", ")}, updated_at = now() 
    WHERE id = $${count} 
    RETURNING *`;

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
    `SELECT * FROM "practice_materials" WHERE practice_id = $1 ORDER BY created_at DESC`,
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
