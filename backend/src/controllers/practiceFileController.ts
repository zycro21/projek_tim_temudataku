import { Request, Response } from "express";
import practiceFileModel from "../models/practiceFileModel";
import formidable from "formidable";
import path from "path";
import fs from "fs";

// Upload file ke dalam material
export const uploadFile = async (req: Request, res: Response) => {
  const form = new formidable.IncomingForm();
  form.uploadDir = path.join(__dirname, "../uploads"); // Tentukan direktori penyimpanan file
  form.keepExtensions = true; // Menyimpan ekstensi file asli
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ message: "Error uploading file", error: err });
    }

    // Pastikan file ada
    const file = files.file;
    if (!file || Array.isArray(file)) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Dapatkan nama file dan path
    const { originalFilename, filepath } = file;

    try {
      const { practice_material_id } = req.params;
      const result = await practiceFileModel.uploadFile(
        Number(practice_material_id),
        originalFilename,
        filepath
      );

      res.status(201).json({ message: "File uploaded successfully", data: result });
    } catch (err) {
      res.status(500).json({ message: "Failed to upload file", error: err });
    }
  });
};

// Update file (nama, urutan, dll)
export const updateFile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await practiceFileModel.updateFile(Number(id), data);

    res.status(200).json({ message: "File updated", data: result });
  } catch (err) {
    res.status(500).json({ message: "Failed to update file", error: err });
  }
};

// Hapus file
export const deleteFile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await practiceFileModel.deleteFile(Number(id));

    res.status(200).json({ message: "File deleted", data: result });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete file", error: err });
  }
};

// Ambil semua file dari sebuah material
export const getAllFiles = async (req: Request, res: Response) => {
  try {
    const { practice_material_id } = req.params;
    const result = await practiceFileModel.getAllFiles(Number(practice_material_id));

    res.status(200).json({ message: "Files fetched", data: result });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch files", error: err });
  }
};
