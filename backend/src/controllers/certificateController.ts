import { Request, Response } from "express";
import * as certificateModel from "../models/certificateModel";

// Buat sertifikat
export const createCertificate = async (req: Request, res: Response) => {
  try {
    const {
      mentee_id,
      service_id,
      certificate_number,
      certificate_path,
      projects_data,
      status,
    } = req.body;

    const data = await certificateModel.createCertificate(
      mentee_id,
      service_id,
      certificate_number,
      certificate_path,
      projects_data,
      status
    );

    res.status(201).json({ message: "Certificate created", data });
  } catch (err) {
    res.status(500).json({ message: "Failed to create certificate", error: err });
  }
};

// Ambil semua sertifikat milik mentee
export const getCertificatesByMentee = async (req: Request, res: Response) => {
  try {
    const { mentee_id } = req.params;
    const data = await certificateModel.getCertificatesByMentee(Number(mentee_id));
    res.status(200).json({ message: "Fetched certificates", data });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch certificates", error: err });
  }
};

// Ambil detail sertifikat
export const getCertificateDetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await certificateModel.getCertificateDetail(Number(id));
    if (!data) {
      return res.status(404).json({ message: "Certificate not found" });
    }
    res.status(200).json({ message: "Fetched certificate detail", data });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch certificate", error: err });
  }
};

// Hapus sertifikat
export const deleteCertificate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await certificateModel.deleteCertificate(Number(id));
    if (!deleted) {
      return res.status(404).json({ message: "Certificate not found" });
    }
    res.status(200).json({ message: "Certificate deleted", data: deleted });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete certificate", error: err });
  }
};
