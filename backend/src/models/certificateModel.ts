import pool from "../db";

// Membuat sertifikat baru
export const createCertificate = async (
  menteeId: number,
  serviceId: number,
  certificateNumber: string,
  certificatePath?: string,
  projectsData?: any,
  status: string = "completed"
) => {
  const result = await pool.query(
    `INSERT INTO certificates 
      (mentee_id, service_id, certificate_number, certificate_path, projects_data, status, created_at)
     VALUES ($1, $2, $3, $4, $5, $6, NOW())
     RETURNING *`,
    [menteeId, serviceId, certificateNumber, certificatePath || null, projectsData || null, status]
  );
  return result.rows[0];
};

// Ambil semua sertifikat berdasarkan mentee_id
export const getCertificatesByMentee = async (menteeId: number) => {
  const result = await pool.query(
    `SELECT * FROM certificates WHERE mentee_id = $1 ORDER BY issue_date DESC`,
    [menteeId]
  );
  return result.rows;
};

// Ambil detail sertifikat berdasarkan ID
export const getCertificateDetail = async (id: number) => {
  const result = await pool.query(
    `SELECT * FROM certificates WHERE id = $1`,
    [id]
  );
  return result.rows[0];
};

// Hapus sertifikat
export const deleteCertificate = async (id: number) => {
  const result = await pool.query(
    `DELETE FROM certificates WHERE id = $1 RETURNING *`,
    [id]
  );
  return result.rows[0];
};
