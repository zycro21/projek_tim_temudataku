import express from "express";
import {
  createBookingHandler,
  getBookingsHandler,
  updateBookingHandler,
  deleteBookingHandler,
  getBookingByIdHandler,
} from "../controllers/bookingController";

const router = express.Router();

router.post("/bookings", createBookingHandler);
router.get("/bookings", getBookingsHandler);
router.get("/bookings/:id", getBookingByIdHandler);
router.put("/bookings/:id", updateBookingHandler);
router.delete("/bookings/:id", deleteBookingHandler); 

export default router;
