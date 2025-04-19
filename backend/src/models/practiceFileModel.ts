import pool from "../db";

// Upload file
export const uploadFile = async (
  practice_material_id: number,
  originalname: string,
  filepath: string
) => {
  const result = await pool.query(
    `INSERT INTO "practice_files" 
     ("practice_material_id", "filename", "filepath") 
     VALUES ($1, $2, $3) 
     RETURNING *`,
    [practice_material_id, originalname, filepath]
  );
  return result.rows[0];
};

// Update file
export const updateFile = async (
  id: number,
  data: Partial<{ filename: string; filepath: string }>
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
    UPDATE "practice_files" 
    SET ${fields.join(", ")}, updated_at = now() 
    WHERE id = $${count} 
    RETURNING *`;

  values.push(id);

  const result = await pool.query(query, values);
  return result.rows[0];
};

// Hapus file
export const deleteFile = async (id: number) => {
  const result = await pool.query(
    `DELETE FROM "practice_files" WHERE id = $1 RETURNING *`,
    [id]
  );
  return result.rows[0];
};

// Ambil semua file berdasarkan ID materi
export const getAllFiles = async (practice_material_id: number) => {
  const result = await pool.query(
    `SELECT * FROM "practice_files" WHERE practice_material_id = $1 ORDER BY created_at DESC`,
    [practice_material_id]
  );
  return result.rows;
};

export default {
  uploadFile,
  updateFile,
  deleteFile,
  getAllFiles,
};
