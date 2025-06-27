import { Request, Response } from "express";
import practiceModel from "../models/practiceModel";

export const createPractice = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const result = await practiceModel.createPractice(data);
    res.status(201).json({ message: "Practice created", data: result });
  } catch (err) {
    res.status(500).json({ message: "Failed to create practice", error: err });
  }
};

export const updatePractice = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await practiceModel.updatePractice(Number(id), req.body);
    res.status(200).json({ message: "Practice updated", data: result });
  } catch (err) {
    res.status(500).json({ message: "Failed to update practice", error: err });
  }
};

export const togglePracticeStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await practiceModel.togglePracticeStatus(Number(id));
    res.status(200).json({ message: "Practice status updated", data: result });
  } catch (err) {
    res.status(500).json({ message: "Failed to toggle status", error: err });
  }
};

export const deletePractice = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await practiceModel.deletePractice(Number(id));
    res.status(200).json({ message: "Practice deleted", data: result });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete practice", error: err });
  }
};

export const getAllPractices = async (req: Request, res: Response) => {
  try {
    const { category, mentor_id, is_active } = req.query;
    const result = await practiceModel.getAllPractices({
      category: category as string,
      mentor_id: mentor_id ? Number(mentor_id) : undefined,
      is_active: is_active !== undefined ? is_active === "true" : undefined,
    });
    res.status(200).json({ message: "Practices fetched", data: result });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch practices", error: err });
  }
};

export const getPracticeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await practiceModel.getPracticeById(Number(id));
    if (!result) {
      return res.status(404).json({ message: "Practice not found" });
    }
    res.status(200).json({ message: "Practice found", data: result });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch practice", error: err });
  }
};

export const uploadPracticeThumbnailController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const file = req.file;

  if (!file) {
    res.status(400).json({ message: "No file uploaded" });
    return;
  }

  // Simulasi update database atau penyimpanan file
  res
    .status(200)
    .json({ message: "Thumbnail uploaded", filename: file.filename });
};
