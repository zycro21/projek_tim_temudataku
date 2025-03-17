import pool from "../db";

export const createSession = async (
  serviceId: number,
  startTime: string,
  endTime: string,
  meetingLink: string,
  status: string
) => {
  const result = await pool.query(
    `INSERT INTO "mentoring_sessions" 
     ("service_id", "start_time", "end_time", "meeting_link", "status") 
     VALUES ($1, $2, $3, $4, $5) 
     RETURNING *`,
    [serviceId, startTime, endTime, meetingLink, status]
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
  const result = await pool.query(
    `UPDATE "mentoring_sessions" 
     SET "service_id" = $1, "start_time" = $2, "end_time" = $3, "meeting_link" = $4, "status" = $5, "updated_at" = now()
     WHERE "id" = $6
     RETURNING *`,
    [serviceId, startTime, endTime, meetingLink, status, id]
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

  const searchCondition = search
    ? `WHERE "status" ILIKE $3 OR "meeting_link" ILIKE $3`
    : "";

  const result = await pool.query(
    `SELECT * FROM "mentoring_sessions" ${searchCondition} ORDER BY "${sortBy}" ${order} LIMIT $1 OFFSET $2`,
    [limit, offset, `%${search}%`]
  );
  return result.rows;
};
