import pool from "../db";

// Fungsi untuk menghitung durasi dalam menit antara startTime dan endTime
const calculateDurationInMinutes = (
  startTime: string,
  endTime: string
): number => {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const durationMilliseconds = end.getTime() - start.getTime();
  const durationMinutes = Math.floor(durationMilliseconds / 60000); // Mengonversi milidetik menjadi menit
  return durationMinutes;
};

export const createSession = async (
  serviceId: number,
  startTime: string,
  endTime: string,
  meetingLink: string,
  status: string
) => {
  // Menghitung durasi dalam menit
  const durationMinutes = calculateDurationInMinutes(startTime, endTime);

  const result = await pool.query(
    `INSERT INTO "mentoring_sessions" 
     ("service_id", "start_time", "end_time", "meeting_link", "status", "duration_minutes", "created_at") 
     VALUES ($1, $2, $3, $4, $5, $6, NOW()) 
     RETURNING *`,
    [serviceId, startTime, endTime, meetingLink, status, durationMinutes] // Menambahkan duration_minutes
  );
  return result.rows[0];
};

export const getSessionById = async (id: number) => {
  const result = await pool.query(
    `SELECT * FROM "mentoring_sessions" WHERE "id" = $1`,
    [id]
  );
  return result.rows[0];
};

export const updateSession = async (
  id: number,
  serviceId: number,
  startTime: string,
  endTime: string,
  meetingLink: string,
  status: string
) => {
  // Menghitung durasi dalam menit
  const durationMinutes = calculateDurationInMinutes(startTime, endTime);

  const result = await pool.query(
    `UPDATE "mentoring_sessions" 
     SET "service_id" = $1, "start_time" = $2, "end_time" = $3, "meeting_link" = $4, "status" = $5, "duration_minutes" = $6, "updated_at" = now()
     WHERE "id" = $7
     RETURNING *`,
    [serviceId, startTime, endTime, meetingLink, status, durationMinutes, id] // Menambahkan duration_minutes untuk update
  );
  return result.rows[0];
};

export const deleteSession = async (id: number) => {
  const result = await pool.query(
    `DELETE FROM "mentoring_sessions" WHERE "id" = $1 RETURNING *`,
    [id]
  );
  return result.rows[0];
};

export const getAllSessions = async (
  page: number,
  limit: number,
  sortBy: string,
  order: string,
  search: string
) => {
  const offset = (page - 1) * limit;

  const validSortColumns = [
    "id",
    "service_id",
    "start_time",
    "end_time",
    "meeting_link",
    "status",
    "created_at",
    "updated_at",
  ];

  if (!validSortColumns.includes(sortBy)) {
    throw new Error("Invalid sortBy column");
  }

  // Kondisi pencarian
  let searchCondition = "";
  let queryParams: (number | string)[] = [limit, offset]; // Allow both number and string in queryParams

  if (search) {
    // Include the search condition, and add the search parameter to the queryParams array
    searchCondition = `WHERE "status" ILIKE $3 OR "meeting_link" ILIKE $3`;
    queryParams.push(`%${search}%`); // Add search string to queryParams array
  }

  const result = await pool.query(
    `SELECT * FROM "mentoring_sessions" ${searchCondition} ORDER BY "${sortBy}" ${order} LIMIT $1 OFFSET $2`,
    queryParams // This now contains limit, offset, and search parameters in the correct order
  );

  return result.rows;
};

