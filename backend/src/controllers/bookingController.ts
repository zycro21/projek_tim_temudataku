import { Request, Response } from "express";
import {
  createBooking,
  getBookingById,
  getAllBookings,
  updateBooking,
  deleteBooking,
} from "../models/bookingModel";

export const createBookingHandler = async (req: Request, res: Response) => {
  const { menteeId, sessionId, status, specialRequests } = req.body;
  console.log("Received booking data:", req.body);

  try {
    const newBooking = await createBooking(
      menteeId,
      sessionId,
      status,
      specialRequests
    );
    console.log("Booking created:", newBooking);
    res.status(201).json(newBooking);
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Failed to create booking" });
  }
};

export const getBookingsHandler = async (req: Request, res: Response) => {
  let {
    page = "1",
    limit = "10",
    sortBy = "id",
    order = "asc",
    search = "",
  } = req.query;

  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  // Validasi page
  if (isNaN(pageNumber) || pageNumber < 1) {
    return res
      .status(400)
      .json({ error: "Page must be a positive number greater than 0" });
  }

  // Validasi limit
  if (isNaN(limitNumber) || limitNumber < 1) {
    return res
      .status(400)
      .json({ error: "Limit must be a positive number greater than 0" });
  }

  // Validasi jika limit lebih dari batas maksimum yang diinginkan
  if (limitNumber > 100) {
    return res.status(400).json({ error: "Limit cannot be greater than 100" });
  }

  // Validasi sortBy
  const validSortColumns = [
    "id",
    "mentee_id",
    "session_id",
    "status",
    "special_requests",
    "created_at",
    "updated_at",
  ];

  if (!validSortColumns.includes(sortBy as string)) {
    return res.status(400).json({
      error: `Invalid sortBy value. Valid values are: ${validSortColumns.join(", ")}`,
    });
  }

  // Validasi order (hanya 'asc' atau 'desc' yang diterima)
  const validOrder = order === "desc" ? "desc" : "asc";

  try {
    const bookings = await getAllBookings(
      pageNumber,
      limitNumber,
      sortBy as string,
      validOrder,
      search as string
    );
    res.status(200).json(bookings);
  } catch (error) {
    const errorAsError = error as Error;
    res
      .status(500)
      .json({ error: "Failed to get bookings", details: errorAsError.message });
  }
};

export const getBookingByIdHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  // Validasi ID
  const bookingId = Number(id);
  if (isNaN(bookingId)) {
    return res
      .status(400)
      .json({ error: "Invalid booking ID. It must be a valid number." });
  }

  try {
    const booking = await getBookingById(bookingId);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: "Failed to get booking" });
  }
};

export const updateBookingHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { menteeId, sessionId, status, specialRequests } = req.body;

  // Validasi apakah ada perubahan yang dikirimkan oleh pengguna
  if (!menteeId && !sessionId && !status && !specialRequests) {
    return res.status(400).json({
      error:
        "No data provided for update. Please send at least one field to update.",
    });
  }

  // Validasi jika nilai yang diberikan kosong
  if (
    (status && status.trim() === "") ||
    (specialRequests && specialRequests.trim() === "")
  ) {
    return res.status(400).json({
      error: "Status and specialRequests cannot be empty strings.",
    });
  }

  // Pastikan id adalah angka yang valid
  const bookingId = Number(id);
  if (isNaN(bookingId)) {
    return res
      .status(400)
      .json({ error: "Invalid booking ID. It must be a number." });
  }

  try {
    const updatedBooking = await updateBooking(
      bookingId,
      menteeId,
      sessionId,
      status,
      specialRequests
    );

    if (!updatedBooking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.status(200).json(updatedBooking);
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).json({ error: "Failed to update booking" });
  }
};

export const deleteBookingHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedBooking = await deleteBooking(Number(id));
    if (!deletedBooking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ error: "Failed to delete booking" });
  }
};
