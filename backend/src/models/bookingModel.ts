import pool from "../db";

export const createBooking = async (
  menteeId: number,
  sessionId: number,
  status: string,
  specialRequests?: string
) => {
  const result = await pool.query(
    `INSERT INTO "bookings" ("mentee_id", "session_id", "status", "special_requests") 
       VALUES ($1, $2, $3, $4) RETURNING *`,
    [menteeId, sessionId, status, specialRequests || null]
  );
  return result.rows[0];
};

export const getBookingById = async (id: number) => {
  const result = await pool.query(`SELECT * FROM "bookings" WHERE "id" = $1`, [
    id,
  ]);
  return result.rows[0];
};

export const updateBooking = async (
  id: number,
  menteeId: number,
  sessionId: number,
  status: string,
  specialRequests?: string
) => {
  const result = await pool.query(
    `UPDATE "bookings" 
     SET "mentee_id" = $1, "session_id" = $2, "status" = $3, "special_requests" = $4, "updated_at" = now()
     WHERE "id" = $5
     RETURNING *`,
    [menteeId, sessionId, status, specialRequests || null, id]
  );
  return result.rows[0]; 
};

export const deleteBooking = async (id: number) => {
  const result = await pool.query(
    `DELETE FROM "bookings" WHERE "id" = $1 RETURNING *`,
    [id]
  );
  return result.rows[0];
};

export const getAllBookings = async (
  page: number,
  limit: number,
  sortBy: string,
  order: string,
  search: string
) => {
  const offset = (page - 1) * limit;

  const validSortColumns = ['id', 'mentee_id', 'session_id', 'status', 'special_requests', 'created_at', 'updated_at'];

  if (!validSortColumns.includes(sortBy)) {
    throw new Error('Invalid sortBy column');
  }

  const searchCondition = search ? `WHERE "status" ILIKE $3 OR "special_requests" ILIKE $3` : '';

  const result = await pool.query(
    `SELECT * FROM "bookings" ${searchCondition} ORDER BY "${sortBy}" ${order} LIMIT $1 OFFSET $2`,
    [limit, offset, `%${search}%`]
  );
  return result.rows;
};

export default {
  createBooking,
  getBookingById,
  updateBooking,
  deleteBooking,
  getAllBookings
};
