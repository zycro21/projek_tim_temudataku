import { Request, Response } from "express";
import {
  createSession,
  getSessionById,
  getAllSessions,
  updateSession,
  deleteSession,
} from "../models/sessionModel";

export const createSessionHandler = async (req: Request, res: Response) => {
  const { serviceId, startTime, endTime, meetingLink, status } = req.body;
  try {
    const newSession = await createSession(
      serviceId,
      startTime,
      endTime,
      meetingLink,
      status
    );
    res.status(201).json(newSession);
  } catch (error) {
    res.status(500).json({ error: "Failed to create session" });
  }
};

export const getSessionsHandler = async (req: Request, res: Response) => {
  const { page = 1, limit = 10, sortBy = 'id', order = 'asc', search = '' } = req.query;

  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  const validOrder = order === 'desc' ? 'desc' : 'asc';

  try {
    const sessions = await getAllSessions(pageNumber, limitNumber, sortBy as string, validOrder, search as string);
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ error: "Failed to get sessions" });
  }
};

export const getSessionHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const session = await getSessionById(Number(id));
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }
    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({ error: "Failed to get session" });
  }
};

export const updateSessionHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { serviceId, startTime, endTime, meetingLink, status } = req.body;

  try {
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
    res.status(200).json(updatedSession);
  } catch (error) {
    console.error("Error updating session:", error);
    res.status(500).json({ error: "Failed to update session" });
  }
};

export const deleteSessionHandler = async (req: Request, res: Response) => {
  const { id } = req.params; 

  try {
    const deletedSession = await deleteSession(Number(id));
    if (!deletedSession) {
      return res.status(404).json({ error: "Session not found" });
    }
    res.status(200).json({ message: "Session deleted successfully" });
  } catch (error) {
    console.error("Error deleting session:", error);
    res.status(500).json({ error: "Failed to delete session" });
  }
};
