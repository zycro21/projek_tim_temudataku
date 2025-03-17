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
  console.log("Received booking data:", req.body); // Log data yang diterima

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
  // Default page = 1, limit = 10, sortBy = 'id', order = 'asc', search = ''
  const { page = 1, limit = 10, sortBy = 'id', order = 'asc', search = '' } = req.query;

  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  const validOrder = order === 'desc' ? 'desc' : 'asc';

  try {
    const bookings = await getAllBookings(pageNumber, limitNumber, sortBy as string, validOrder, search as string);
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Failed to get bookings" });
  }
};

export const getBookingHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const booking = await getBookingById(Number(id));
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

  try {
    const updatedBooking = await updateBooking(
      Number(id),
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
