import { Request, Response } from "express";
import {
  createSubmission,
  getAllSubmissions,
  updateSubmission,
  deleteSubmission,
  getSubmissionById,
} from "../models/submissionModel";

export const createSubmissionHandler = async (req: Request, res: Response) => {
  const submissionData = req.body;

  try {
    const newSubmission = await createSubmission(submissionData);
    res.status(201).json(newSubmission);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({
        message: "An unknown error occurred while creating the submission.",
      });
    }
  }
};

export const getAllSubmissionsHandler = async (req: Request, res: Response) => {
  const filters = req.query;
  try {
    const result = await getAllSubmissions(filters);

    res.status(200).json({
      data: result.submissions,
      pagination: result.pagination,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({
        message: "An unknown error occurred while fetching submissions.",
      });
    }
  }
};

export const getSubmissionByIdHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const submission = await getSubmissionById(Number(id));
    res.status(200).json(submission);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({
        message: "An unknown error occurred while fetching submission by id.",
      });
    }
  }
};

export const updateSubmissionHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedSubmission = await updateSubmission(Number(id), updateData);
    res.status(200).json(updatedSubmission);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({
        message: "An unknown error occurred while updating the submission.",
      });
    }
  }
};

export const deleteSubmissionHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedSubmission = await deleteSubmission(Number(id));
    res.status(200).json(deletedSubmission);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({
        message: "An unknown error occurred while deleting the submission.",
      });
    }
  }
};
