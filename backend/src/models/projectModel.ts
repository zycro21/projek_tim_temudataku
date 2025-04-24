import pool from "../db";

export const createProject = async (projectData: any) => {
  const {
    mentee_id,
    session_id,
    title,
    description,
    file_path,
    plagiarism_score,
  } = projectData;

  try {
    const result = await pool.query(
      `INSERT INTO "projects" ("mentee_id", "session_id", "title", "description", "file_path", "plagiarism_score") 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [mentee_id, session_id, title, description, file_path, plagiarism_score]
    );
    return result.rows[0];
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Error creating project: " + error.message);
    } else {
      throw new Error("An unknown error occurred during project creation");
    }
  }
};

export const getAllProjects = async (filters: any) => {
  const {
    page = 1,
    limit = 10,
    sortBy = "id",
    order = "asc",
    search = "",
  } = filters;

  const offset = (parseInt(page as string) - 1) * parseInt(limit as string);
  const validOrder = order === "desc" ? "desc" : "asc";

  const validSortColumns = ["id", "title", "created_at", "updated_at"];
  if (!validSortColumns.includes(sortBy)) {
    throw new Error(`Invalid column for sorting: ${sortBy}`);
  }

  try {
    const result = await pool.query(
      `SELECT * FROM "projects" 
       WHERE "title" ILIKE $1 OR "description" ILIKE $1
       ORDER BY "${sortBy}" ${validOrder} 
       LIMIT $2 OFFSET $3`,
      [`%${search}%`, parseInt(limit as string), offset]
    );

    const totalResult = await pool.query(
      `SELECT COUNT(*) FROM "projects" 
       WHERE "title" ILIKE $1 OR "description" ILIKE $1`,
      [`%${search}%`]
    );

    const totalItems = parseInt(totalResult.rows[0].count);
    const totalPages = Math.ceil(totalItems / parseInt(limit as string));

    return {
      projects: result.rows,
      pagination: {
        totalItems,
        totalPages,
        currentPage: parseInt(page as string),
        perPage: parseInt(limit as string),
      },
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Error fetching projects: " + error.message);
    } else {
      throw new Error("An unknown error occurred during project fetching");
    }
  }
};

export const getProjectById = async (id: number) => {
  try {
    const result = await pool.query(
      `SELECT * FROM "projects" WHERE "id" = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      throw new Error("Project not found");
    }

    return result.rows[0];
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Error fetching project by id: " + error.message);
    } else {
      throw new Error("An unknown error occurred during project fetching");
    }
  }
};

export const updateProject = async (id: number, updateData: any) => {
  const { title, description, file_path, plagiarism_score } = updateData;

  try {
    const result = await pool.query(
      `UPDATE "projects" SET "title" = $1, "description" = $2, "file_path" = $3, "plagiarism_score" = $4, "updated_at" = NOW() 
       WHERE "id" = $5 RETURNING *`,
      [title, description, file_path, plagiarism_score, id]
    );
    return result.rows[0];
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Error updating project: " + error.message);
    } else {
      throw new Error("An unknown error occurred during project update");
    }
  }
};

export const deleteProject = async (id: number) => {
  try {
    const result = await pool.query(
      `DELETE FROM "projects" WHERE "id" = $1 RETURNING *`,
      [id]
    );
    return result.rows[0];
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Error deleting project: " + error.message);
    } else {
      throw new Error("An unknown error occurred during project deletion");
    }
  }
};
