import { Request, Response } from "express";
import practiceMaterialModel from "../models/practiceMaterialModel";

// Menambahkan Material
export const createMaterial = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const result = await practiceMaterialModel.createMaterial(data);
    res.status(201).json({ message: "Material created", data: result });
  } catch (err) {
    res.status(500).json({ message: "Failed to create material", error: err });
  }
};

// Mengupdate Material
export const updateMaterial = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await practiceMaterialModel.updateMaterial(
      Number(id),
      req.body
    );
    res.status(200).json({ message: "Material updated", data: result });
  } catch (err) {
    res.status(500).json({ message: "Failed to update material", error: err });
  }
};

// Menghapus Material
export const deleteMaterial = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await practiceMaterialModel.deleteMaterial(Number(id));
    res.status(200).json({ message: "Material deleted", data: result });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete material", error: err });
  }
};

// Mengambil Semua Material berdasarkan Practice ID
export const getAllMaterials = async (req: Request, res: Response) => {
  try {
    const { practice_id } = req.params;
    const result = await practiceMaterialModel.getAllMaterials(
      Number(practice_id)
    );
    res.status(200).json({ message: "Materials fetched", data: result });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch materials", error: err });
  }
};

// Mengambil Detail Material berdasarkan ID
export const getMaterialById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await practiceMaterialModel.getMaterialById(Number(id));
    if (!result) {
      return res.status(404).json({ message: "Material not found" });
    }
    res.status(200).json({ message: "Material found", data: result });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch material", error: err });
  }
};
