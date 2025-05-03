import pool from "../db";

import path from "path";

// Upload file
export const uploadFile = async (
  practice_material_id: number,
  originalname: string,
  filepath: string
) => {
  try {
    const fileExtension = path.extname(originalname).slice(1);

    // Hitung jumlah file yang sudah ada untuk material ini
    const countResult = await pool.query(
      `SELECT COUNT(*) FROM "practice_files" WHERE material_id = $1`,
      [practice_material_id]
    );
    const orderNumber = parseInt(countResult.rows[0].count, 10) + 1;

    const result = await pool.query(
      `INSERT INTO "practice_files" 
       ("material_id", "file_name", "file_path", "file_type", "order_number") 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING *`,
      [practice_material_id, originalname, filepath, fileExtension, orderNumber]
    );
    return result.rows[0];
  } catch (err) {
    console.error("Error during file upload:", err);
    throw new Error("Failed to upload file");
  }
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
    `SELECT * FROM "practice_files" WHERE material_id = $1 ORDER BY created_at DESC`,
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
