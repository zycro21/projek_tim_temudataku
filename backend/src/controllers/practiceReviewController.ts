import { Request, Response } from "express";
import practiceReviewModel from "../models/practiceReviewModel";

// Tambah review
export const addReview = async (req: Request, res: Response) => {
  try {
    const { user_id, practice_id, rating, comment } = req.body;
    const review = await practiceReviewModel.addReview(
      Number(user_id),
      Number(practice_id),
      Number(rating),
      comment
    );
    res.status(201).json({ message: "Review added", data: review });
  } catch (err) {
    res.status(500).json({ message: "Failed to add review", error: err });
  }
};

// Update review
export const updateReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;
    const updated = await practiceReviewModel.updateReview(
      Number(id),
      Number(rating),
      comment
    );
    res.status(200).json({ message: "Review updated", data: updated });
  } catch (err) {
    res.status(500).json({ message: "Failed to update review", error: err });
  }
};

// Hapus review
export const deleteReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await practiceReviewModel.deleteReview(Number(id));
    res.status(200).json({ message: "Review deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete review", error: err });
  }
};

// Ambil semua review untuk satu Practice
export const getReviewsByPractice = async (req: Request, res: Response) => {
  try {
    const { practice_id } = req.params;
    const reviews = await practiceReviewModel.getReviewsByPractice(
      Number(practice_id)
    );
    res.status(200).json({ message: "Reviews fetched", data: reviews });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch reviews", error: err });
  }
};

// Ambil rata-rata rating
export const getAverageRating = async (req: Request, res: Response) => {
  try {
    const { practice_id } = req.params;
    const average = await practiceReviewModel.getAverageRating(
      Number(practice_id)
    );
    res.status(200).json({ message: "Average rating fetched", data: average });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch average", error: err });
  }
};
