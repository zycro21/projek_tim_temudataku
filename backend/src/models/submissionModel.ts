import pool from "../db";

export const createSubmission = async (submissionData: any) => {
  const { project_id, mentee_id, file_url, status, grade, feedback } =
    submissionData;

  try {
    const result = await pool.query(
      `INSERT INTO "submissions" ("project_id", "mentee_id", "file_url", "status", "grade", "feedback") 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [project_id, mentee_id, file_url, status, grade, feedback]
    );
    return result.rows[0];
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Error creating submission: " + error.message);
    } else {
      throw new Error(
        "An unknown error occurred while creating the submission."
      );
    }
  }
};

const allowedSortColumns = [
  "id",
  "project_id",
  "mentee_id",
  "file_url",
  "status",
  "created_at",
  "updated_at",
];

export const getAllSubmissions = async (filters: any) => {
  const {
    page = 1,
    limit = 10,
    sortBy = "id",
    order = "asc",
    search = "",
  } = filters;

  if (!allowedSortColumns.includes(sortBy)) {
    throw new Error("Invalid column for sorting.");
  }

  const offset = (parseInt(page as string) - 1) * parseInt(limit as string);
  const validOrder = order === "desc" ? "desc" : "asc";

  try {
    const result = await pool.query(
      `SELECT * FROM "submissions" 
       WHERE "file_url" ILIKE $1 OR "status" ILIKE $1 OR "grade" ILIKE $1 OR "feedback" ILIKE $1
       ORDER BY "${sortBy}" ${validOrder} 
       LIMIT $2 OFFSET $3`,
      [`%${search}%`, parseInt(limit as string), offset]
    );

    const totalResult = await pool.query(
      `SELECT COUNT(*) FROM "submissions" 
       WHERE "file_url" ILIKE $1 OR "status" ILIKE $1 OR "grade" ILIKE $1 OR "feedback" ILIKE $1`,
      [`%${search}%`]
    );

    const totalItems = parseInt(totalResult.rows[0].count);
    const totalPages = Math.ceil(totalItems / parseInt(limit as string));

    return {
      submissions: result.rows,
      pagination: {
        totalItems,
        totalPages,
        currentPage: parseInt(page as string),
        perPage: parseInt(limit as string),
      },
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Error fetching submissions: " + error.message);
    } else {
      throw new Error(
        "An unknown error occurred while fetching the submissions."
      );
    }
  }
};

export const getSubmissionById = async (id: number) => {
  try {
    const result = await pool.query(
      `SELECT * FROM "submissions" WHERE "id" = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      throw new Error("Submission not found");
    }

    return result.rows[0];
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Error fetching submission by id: " + error.message);
    } else {
      throw new Error("An unknown error occurred during submission fetching");
    }
  }
};

export const updateSubmission = async (id: number, updateData: any) => {
  const { status, grade, feedback } = updateData;

  try {
    const result = await pool.query(
      `UPDATE "submissions" SET "status" = $1, "grade" = $2, "feedback" = $3, "updated_at" = NOW() 
       WHERE "id" = $4 RETURNING *`,
      [status, grade, feedback, id]
    );
    return result.rows[0];
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Error updating submission: " + error.message);
    } else {
      throw new Error(
        "An unknown error occurred while updating the submission."
      );
    }
  }
};

export const deleteSubmission = async (id: number) => {
  try {
    const result = await pool.query(
      `DELETE FROM "submissions" WHERE "id" = $1 RETURNING *`,
      [id]
    );
    return result.rows[0];
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Error deleting submission: " + error.message);
    } else {
      throw new Error(
        "An unknown error occurred while deleting the submission."
      );
    }
  }
};
