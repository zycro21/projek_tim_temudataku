import { Request, Response } from "express";
import practiceProgressModel from "../models/practiceProgressModel";

// Tandai sebagai selesai
export const markAsCompleted = async (req: Request, res: Response) => {
  try {
    const { user_id, practice_id, material_id, time_spent_seconds } = req.body;
    const data = await practiceProgressModel.markAsCompleted(
      Number(user_id),
      Number(practice_id),
      Number(material_id),
      Number(time_spent_seconds)
    );
    res.status(200).json({ message: "Progress updated", data });
  } catch (err) {
    res.status(500).json({ message: "Failed to update progress", error: err });
  }
};

// Ambil semua progress per Practice
export const getProgressByPractice = async (req: Request, res: Response) => {
  try {
    const { user_id, practice_id } = req.params;
    const data = await practiceProgressModel.getProgressByPractice(
      Number(user_id),
      Number(practice_id)
    );
    res.status(200).json({ message: "Progress fetched", data });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch progress", error: err });
  }
};

// Ambil total waktu dan akses terakhir
export const getTimeAndLastAccess = async (req: Request, res: Response) => {
  try {
    const { user_id, practice_id } = req.params;
    const data = await practiceProgressModel.getTimeAndLastAccess(
      Number(user_id),
      Number(practice_id)
    );
    res.status(200).json({ message: "Fetched time and access", data });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch info", error: err });
  }
};
