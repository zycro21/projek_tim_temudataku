import { Request, Response } from "express";
import {
  createSession,
  getSessionById,
  getAllSessions,
  updateSession,
  deleteSession,
} from "../models/sessionModel";

// Handler untuk membuat session baru
export const createSessionHandler = async (req: Request, res: Response) => {
  const { serviceId, startTime, endTime, meetingLink, status } = req.body;

  // Validasi data input
  if (!serviceId || !startTime || !endTime || !meetingLink || !status) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Membuat session baru di database
    const newSession = await createSession(
      serviceId,
      startTime,
      endTime,
      meetingLink,
      status
    );
    res.status(201).json(newSession); // Kembali ke client dengan session yang baru dibuat
  } catch (error) {
    console.error("Error creating session:", error);
    res.status(500).json({ error: "Failed to create session" });
  }
};

// Handler untuk mendapatkan semua sessions
export const getSessionsHandler = async (req: Request, res: Response) => {
  const {
    page = 1,
    limit = 10,
    sortBy = "id",
    order = "asc",
    search = "",
  } = req.query;

  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  const validOrder = order === "desc" ? "desc" : "asc";
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

  // Validasi parameter sorting
  if (!validSortColumns.includes(sortBy as string)) {
    return res.status(400).json({ error: `Invalid sort column: ${sortBy}` });
  }

  try {
    // Ambil session dari database
    const sessions = await getAllSessions(
      pageNumber,
      limitNumber,
      sortBy as string,
      validOrder,
      search as string
    );
    res.status(200).json(sessions); // Kembali ke client dengan data sessions
  } catch (error) {
    console.error("Error fetching sessions:", error);
    res.status(500).json({ error: "Failed to get sessions" });
  }
};

// Handler untuk mendapatkan session berdasarkan ID
export const getSessionHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  // Validasi input ID
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: "Invalid session ID" });
  }

  try {
    // Ambil session berdasarkan ID
    const session = await getSessionById(Number(id));
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }
    res.status(200).json(session); // Kembali ke client dengan data session
  } catch (error) {
    console.error("Error fetching session:", error);
    res.status(500).json({ error: "Failed to get session" });
  }
};

// Handler untuk mengupdate session berdasarkan ID
export const updateSessionHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { serviceId, startTime, endTime, meetingLink, status } = req.body;

  // Validasi input ID dan data yang diperlukan
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: "Invalid session ID" });
  }

  if (!serviceId || !startTime || !endTime || !meetingLink || !status) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Update session di database
    const updatedSession = await updateSession(
      Number(id),
      serviceId,
      startTime,
      endTime,
      meetingLink,
      status
    );
    if (!updatedSession) {
      return res.status(404).json({ error: "Session not found" });
    }
    res.status(200).json(updatedSession); // Kembali ke client dengan session yang sudah diperbarui
  } catch (error) {
    console.error("Error updating session:", error);
    res.status(500).json({ error: "Failed to update session" });
  }
};

// Handler untuk menghapus session berdasarkan ID
export const deleteSessionHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  // Validasi input ID
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: "Invalid session ID" });
  }

  try {
    // Hapus session dari database
    const deletedSession = await deleteSession(Number(id));
    if (!deletedSession) {
      return res.status(404).json({ error: "Session not found" });
    }
    res.status(200).json({ message: "Session deleted successfully" }); // Kembali ke client setelah session dihapus
  } catch (error) {
    console.error("Error deleting session:", error);
    res.status(500).json({ error: "Failed to delete session" });
  }
};
