import { Request, Response } from "express";
import practiceFileModel from "../models/practiceFileModel";
import { IncomingForm } from "formidable";
import path from "path";
import fs from "fs";

// Upload file ke dalam material
export const uploadFile = async (req: Request, res: Response) => {
  // Tentukan path penyimpanan untuk file belajar (Practice Files)
  const uploadPath = path.join(__dirname, "../../uploads/practice-files");

  // Pastikan folder uploads/practice-files ada
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  const form = new IncomingForm({
    uploadDir: uploadPath, // Tentukan direktori penyimpanan
    keepExtensions: true, // Menyimpan ekstensi file
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error uploading file", error: err });
    }

    // Ambil file yang diupload
    let file = files.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Ubah ke single file jika array
    const uploadedFile = Array.isArray(file) ? file[0] : file;
    const { originalFilename, filepath } = uploadedFile;

    try {
      const { practice_material_id } = req.params;
      // Menyimpan data file ke database
      const result = await practiceFileModel.uploadFile(
        Number(practice_material_id),
        originalFilename ?? "untitled",
        filepath
      );

      // Mengirimkan respon setelah file berhasil di-upload
      res
        .status(201)
        .json({ message: "File uploaded successfully", data: result });
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
    const result = await practiceFileModel.getAllFiles(
      Number(practice_material_id)
    );

    res.status(200).json({ message: "Files fetched", data: result });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch files", error: err });
  }
};
