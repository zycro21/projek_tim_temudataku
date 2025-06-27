import { Request, Response } from "express";
import {
  createProject,
  getAllProjects,
  updateProject,
  deleteProject,
  getProjectById, // Import fungsi baru
} from "../models/projectModel";

export const createProjectHandler = async (req: Request, res: Response) => {
  const projectData = req.body;

  try {
    const newProject = await createProject(projectData);
    res.status(201).json(newProject);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res
        .status(500)
        .json({ message: "An unknown error occurred during project creation" });
    }
  }
};

export const getAllProjectsHandler = async (req: Request, res: Response) => {
  const filters = req.query;

  const searchQuery = filters.search ? String(filters.search) : ""; // Default pencarian kosong

  try {
    const result = await getAllProjects({ ...filters, search: searchQuery });

    res.status(200).json({
      data: result.projects,
      pagination: result.pagination,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res
        .status(500)
        .json({ message: "An unknown error occurred during project fetching" });
    }
  }
};

export const getProjectByIdHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const project = await getProjectById(Number(id));
    res.status(200).json(project);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({
        message: "An unknown error occurred during project fetching by id",
      });
    }
  }
};

export const updateProjectHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedProject = await updateProject(Number(id), updateData);
    res.status(200).json(updatedProject);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res
        .status(500)
        .json({ message: "An unknown error occurred during project update" });
    }
  }
};

export const deleteProjectHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedProject = await deleteProject(Number(id));
    res.status(200).json(deletedProject);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res
        .status(500)
        .json({ message: "An unknown error occurred during project deletion" });
    }
  }
};

export const uploadProjectFileHandler = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      res.status(400).json({ message: "No file uploaded" });
    } else {
      const filename = req.file.filename;
      const filePath = `uploads/project-files/${filename}`;

      res.status(200).json({
        message: "Project file uploaded successfully",
        filename: filename,
        file_path: filePath,
      });
    }
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Upload failed" });
  }
};
